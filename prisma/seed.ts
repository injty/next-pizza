import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";

import { Prisma } from "@prisma/client";
import { _ingredients, categories, products } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({ pizzaType, productId, size }: { pizzaType?: 1 | 2; productId: number; size?: 20 | 30 | 40 }) => {
  return {
    pizzaType,
    price: randomDecimalNumber(190, 600),
    productId,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        email: "testing@exampele.com",
        fullname: "testing user",
        password: hashSync("123456", 10),
        role: "USER",
        verified: new Date(),
      },
      {
        email: "testing_admin@exampele.com",
        fullname: "testing admin",
        password: hashSync("123456", 10),
        role: "ADMIN",
        verified: new Date(),
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      categoryId: 1,
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      name: "Пепперони фреш",
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      categoryId: 1,
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      name: "Сырная",
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      categoryId: 1,
      imageUrl: "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
      name: "Чоризо фреш",
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ pizzaType: 1, productId: pizza1.id, size: 20 }),
      generateProductItem({ pizzaType: 2, productId: pizza1.id, size: 30 }),
      generateProductItem({ pizzaType: 2, productId: pizza1.id, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ pizzaType: 1, productId: pizza2.id, size: 20 }),
      generateProductItem({ pizzaType: 1, productId: pizza2.id, size: 30 }),
      generateProductItem({ pizzaType: 1, productId: pizza2.id, size: 40 }),
      generateProductItem({ pizzaType: 2, productId: pizza2.id, size: 20 }),
      generateProductItem({ pizzaType: 2, productId: pizza2.id, size: 30 }),
      generateProductItem({ pizzaType: 2, productId: pizza2.id, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ pizzaType: 1, productId: pizza3.id, size: 20 }),
      generateProductItem({ pizzaType: 2, productId: pizza3.id, size: 30 }),
      generateProductItem({ pizzaType: 2, productId: pizza3.id, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        token: "11111",
        totalAmount: 0,
        userId: 1,
      },
      {
        token: "222222",
        totalAmount: 0,
        userId: 2,
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      productItemId: 1,
      quantity: 2,
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewImageUrl: "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewImageUrl: "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewImageUrl: "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewImageUrl: "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewImageUrl: "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        sourceUrl: "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
        storyId: 1,
      },
      {
        sourceUrl: "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
        storyId: 1,
      },
      {
        sourceUrl: "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
        storyId: 1,
      },
      {
        sourceUrl: "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
        storyId: 1,
      },
      {
        sourceUrl: "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
        storyId: 1,
      },
    ],
  });
}
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
