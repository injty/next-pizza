import { Container, Filters, ProductCard, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* filtration */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* item list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList categoryId={1} title="Пиццы" items={[{ id: 1, name: "Пицца", items: [{ price: "50", imageUrl: "https://picsum.photos/200/300" }] }]} />
              <ProductsGroupList
                categoryId={2}
                title="Комбо"
                items={[
                  { id: 1, name: "Пицца", items: [{ price: "50", imageUrl: "https://picsum.photos/200/300" }] },
                  { id: 2, name: "Пицца", items: [{ price: "50", imageUrl: "https://picsum.photos/200/300" }] },
                  { id: 3, name: "Пицца", items: [{ price: "50", imageUrl: "https://picsum.photos/200/300" }] },
                  { id: 4, name: "Пицца", items: [{ price: "50", imageUrl: "https://picsum.photos/200/300" }] },
                ]}
              />
              <ProductsGroupList categoryId={3} title="Закуски" items={[{ id: 1, name: "Пицца", items: [{ price: "50", imageUrl: "https://picsum.photos/200/300" }] }]} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
