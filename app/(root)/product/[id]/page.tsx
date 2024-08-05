import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

import {
  Container,
  GroupVariants,
  PizzaImage,
  Title,
} from "@/components/shared";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) return notFound();

  return (
    <Container className="my-10 flex flex-col">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />
        <div className="w-[490px] bg-[#fcfcfc] p-7">
          <Title
            text={product.name}
            size="md"
            className="mb-1 font-extrabold"
          />
          <p className="text-gray-400">details</p>
          <GroupVariants
            value="1"
            items={[
              { name: "S", value: "1" },
              { name: "M", value: "2", disabled: true },
              { name: "L", value: "3" },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
