"use server";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";

import { PayOrder } from "@/components/shared";

import { VerificationUser } from "@/components/shared/email-templates/verification-user";
import { CheckoutFormValues } from "@/utils/constants";
import { createPayment, sendEmail } from "@/utils/helpers";
import { getUserSession } from "@/utils/helpers/get-user-session";
import { hashSync } from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStrore = cookies();
    const token = cookieStrore.get("token")?.value;

    if (!token) {
      throw new Error("cart not available.");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
        user: true,
      },
      where: {
        token: token,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        address: data.address,
        comment: data.comment as string,
        email: data.email,
        fullName: data.firstName + " " + data.lastName,
        items: JSON.stringify(userCart.items),
        phone: data.phone,
        status: OrderStatus.PENDING,
        token: token,
        totalAmount: userCart.totalAmount,
      },
    });

    await prisma.cart.update({
      data: {
        totalAmount: 0,
      },
      where: {
        id: userCart.id,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      description: "Оплата заказа #" + order.id,
      orderId: order.id,
    });

    if (!paymentData) {
      throw new Error("Failed to create payment");
    }

    await prisma.order.update({
      data: {
        paymentId: paymentData.id,
      },
      where: {
        id: order.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ #" + order.id,
      PayOrder({
        orderId: order.id,
        paymentUrl,
        totalAmount: order.totalAmount,
      }),
    );

    return paymentUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      throw new Error("User not found");
    }
    await prisma.user.update({
      data: {
        email: body.email,
        fullname: body.fullname,
        password: hashSync(body.password, 10),
      },
      where: {
        id: Number(currentUser.id),
      },
    });
  } catch (error) {
    console.log("[ACTIONS ERROR]:", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Email is not verified");
      }
      throw new Error("User already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullname: body.fullname,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.verificationCode.create({
      data: {
        code: code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza / Подтверждение регистрации",
      VerificationUser({
        code,
      }),
    );
  } catch (error) {
    console.log("[ACTIONS ERROR]:", error);
    throw error;
  }
}
