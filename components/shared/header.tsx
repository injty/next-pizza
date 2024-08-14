"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";

import { User } from "lucide-react";
import { Button } from "../ui";
import { CartButton } from "./cart-button";
import { Container } from "./container";
import { SearchInput } from "./search-input";

import { cn } from "@/utils/helpers/cn";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface IProps {
  className?: string;
  hasCart?: boolean;
  hasSearch?: boolean;
}

export const Header: FC<IProps> = ({ className, hasCart = true, hasSearch = true }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchParams.has("paid")) {
        toast.success("Заказ успешно оплачен! Информация отправлена на почту.");
      }
    }, 500);
    console.log(timer);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* left side  */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image alt="logo." height={35} src="/logo.png" width={35} />
            <div>
              <h1 className="text-2xl font-black uppercase">Next Pizza</h1>
              <p className="text-sm leading-3 text-gray-400">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* right side */}
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-3" variant="outline">
            <User size={16} />
            Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </div>
  );
};
