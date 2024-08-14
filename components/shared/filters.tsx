"use client";
import { useFilters, useIngredients, useQueryFilters } from "@/hooks";
import { FC } from "react";

import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const list = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title className="mb-5 font-bold" size="sm" text="Фильтрация" />

      <CheckboxFiltersGroup
        className="mb-5"
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
        name="pizzaTypes"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        title="Типы теста"
      />
      {/* checkboxes filters */}
      <CheckboxFiltersGroup
        className="mb-5"
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        name="sizes"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        title="Размеры"
      />

      {/* price filters */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Цена от и до:</p>
        <div className="mb-5 flex gap-3">
          <Input
            max={1000}
            min={0}
            onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
            placeholder="0"
            type="number"
            value={filters.prices.priceFrom}
          />
          <Input
            max={1000}
            min={100}
            onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
            placeholder="1000"
            type="number"
            value={filters.prices.priceTo}
          />
        </div>
        <RangeSlider max={1000} min={0} onValueChange={updatePrices} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        defaultItems={list}
        items={list}
        limit={6}
        loading={loading}
        name="ingredients"
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
        title="Ингредиенты"
      />
    </div>
  );
};
