"use client";
import { ChangeEvent, FC, useState } from "react";

import { Input } from "../ui";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onChange,
  defaultValue,
  className,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : items.slice(0, limit);
  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox key={index} text={item.text} value={item.value} endAdornment={item.endAdornment} checked={false} onCheckedChange={(dsl) => console.log(dsl)} />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 pt-4" : ""}>
          <button className="text-primary mt-3" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
