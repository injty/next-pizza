import { prisma } from "@/prisma/prisma-client";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { findOrCreateCart } from "@/utils/helpers/find-or-create-cart";
import { updateCartTotalAmount } from "@/utils/helpers/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    // const token = "11111";

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 });
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
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      where: {
        OR: [{ token }],
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json({ message: "cart not reachable" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("token")?.value;
    // let token = "11111";
    const data = (await req.json()) as CreateCartItemValues;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        ingredients: data.ingredients
          ? {
              every: {
                id: {
                  in: data.ingredients,
                },
              },
            }
          : undefined,
        productItemId: data.productItemId,
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        data: {
          quantity: findCartItem.quantity + 1,
        },
        where: {
          id: findCartItem.id,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })),
          },
          productItemId: data.productItemId,
          quantity: 1,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("token", token);

    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json({ message: "cart not reachable." }, { status: 500 });
  }
}
