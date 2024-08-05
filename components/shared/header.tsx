import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { cn } from "@/utils/lib/cn";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui";
import { Container } from "./container";
import { SearchInput } from "./search-input";

interface IProps {
  className?: string;
}

export const Header: FC<IProps> = ({ className }) => {
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

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-3">
            <User size={16} />
            Войти
          </Button>

          <div>
            <Button className="group relative">
              <b>520 ₼</b>
              <span className="mx-3 h-full w-[1px] bg-white/30" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={3} />
                <b>5</b>
              </div>
              <ArrowRight size={20} className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};