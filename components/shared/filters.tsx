"use client";

import { FC } from "react";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients } = useFilterIngredients();
  const list = ingredients.map((ingredient) => ({ text: ingredient.name, value: String(ingredient.id) }));

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* checkboxes filters */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собрать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* price filters */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <CheckboxFiltersGroup className="mt-5" title="Ингредиенты" limit={6} defaultItems={list} items={list} />
    </div>
  );
};
