import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
import { Suspense } from "react";

import { findPizzas, GetSeartchParams } from "@/utils/helpers/find-pizzas";

export default async function Home({ searchParams }: { searchParams: GetSeartchParams }) {
  const categories = await findPizzas(searchParams);
  console.log(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* filtration */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* item list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList key={category.id} categoryId={category.id} title={category.name} items={category.products} />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
