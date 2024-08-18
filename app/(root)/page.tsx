import { Container, Filters, ProductsGroupList, Stories, Title, TopBar } from "@/components/shared";
import { Suspense } from "react";

import { findPizzas, GetSeartchParams } from "@/utils/helpers/find-pizzas";

export default async function Home({ searchParams }: { searchParams: GetSeartchParams }) {
  const categories = await findPizzas(searchParams);
  console.log(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title className="font-extrabold" size="lg" text="Все пиццы" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Stories />
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
                    <ProductsGroupList categoryId={category.id} items={category.products} key={category.id} title={category.name} />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
