import { cn } from "@/utils/lib/cn";
import { FC } from "react";

import { Button } from "../ui";
import { CartDrawer } from "./cart-drawer";

import { ArrowRight, ShoppingCart } from "lucide-react";

interface CartButtonProps {
  className?: string;
}

export const CartButton: FC<CartButtonProps> = ({ className }) => {
  return (
    <CartDrawer>
      <div className={cn("group relative", className)}>
        <Button className="group relative">
          <b>520 ₼</b>
          <span className="mx-3 h-full w-[1px] bg-white/30" />
          <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
            <ShoppingCart size={16} className="relative" strokeWidth={3} />
            <b>5</b>
          </div>
          <ArrowRight
            size={20}
            className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </Button>
      </div>
    </CartDrawer>
  );
};
