import { prisma } from "@/prisma/prisma-client";

export interface GetSeartchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  selectedIngredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSeartchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIdArr = params.selectedIngredients?.split(",").map(Number);
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  console.log(params);

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: { in: ingredientsIdArr },
                },
              }
            : undefined,
          items: {
            some: {
              size: sizes ? { in: sizes } : undefined,
              pizzaType: pizzaTypes ? { in: pizzaTypes } : undefined,
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
          ingredients: true,
        },
      },
    },
  });

  return categories;
};
