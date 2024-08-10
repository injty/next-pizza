import { Container, Header } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Корзина",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <Container>
        <Header className="border-b-gray-200" hasSearch={false} hasCart={false} />
        {children}
      </Container>
    </main>
  );
}
