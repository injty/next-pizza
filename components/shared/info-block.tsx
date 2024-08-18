import { cn } from "@/utils/helpers/cn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Title } from "./title";

interface Props {
  className?: string;
  imageUrl?: string;
  text: string;
  title: string;
}

export const InfoBlock: React.FC<Props> = ({ className, imageUrl, text, title }) => {
  return (
    <div className={cn(className, "flex w-[840px] items-center justify-between gap-12")}>
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title className="font-extrabold" size="lg" text={title} />
          <p className="text-lg text-gray-400">{text}</p>
        </div>

        <div className="mt-11 flex gap-5">
          <Link href="/">
            <Button className="gap-2" variant="outline">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button className="border-gray-400 text-gray-500 hover:bg-gray-50" variant="outline">
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <img alt={title} src={imageUrl} width={300} />
    </div>
  );
};
