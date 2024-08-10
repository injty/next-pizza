import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { User } from "lucide-react";
import { Button } from "../ui";
import { CartButton } from "./cart-button";
import { Container } from "./container";
import { SearchInput } from "./search-input";

import { cn } from "@/utils/helpers/cn";

interface IProps {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<IProps> = ({ className, hasSearch = true, hasCart = true }) => {
  return (
    <div className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* left side  */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo." width={35} height={35} />
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
          <Button variant="outline" className="flex items-center gap-3">
            <User size={16} />
            Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </div>
  );
};
