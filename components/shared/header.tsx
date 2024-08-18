"use client";

import { cn } from "@/utils/helpers/cn";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartButton } from "./cart-button";
import { Container } from "./container";
import { AuthModal } from "./modals";
import { ProfileButton } from "./profile-button";
import { SearchInput } from "./search-input";

interface IProps {
  className?: string;
  hasCart?: boolean;
  hasSearch?: boolean;
}

export const Header: FC<IProps> = ({ className, hasCart = true, hasSearch = true }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchParams.has("paid")) {
        toast.success("Заказ успешно оплачен! Информация отправлена на почту.");
      }
    }, 500);

    const timer2 = setTimeout(() => {
      if (searchParams.has("verified")) {
        toast.success("Аккаунт успешно подтвержден!");
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cn("border-b px-5", className)}>
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
          <AuthModal onClose={() => setOpenAuthModal(false)} open={openAuthModal} />
          <ProfileButton handleClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </div>
  );
};
