import { Header } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
        {modal}
      </main>
    </>
  );
}
