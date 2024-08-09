import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

import { Container, ProductForm } from "@/components/shared";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  });

  if (!product) return notFound();

  return (
    <Container className="my-10 flex flex-col">
      <ProductForm product={product} />
    </Container>
  );
}
