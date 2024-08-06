import { cn } from "@/utils/lib/cn";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn("h-[60px] w-[60px]", className)} src={src} alt="" />;
};
