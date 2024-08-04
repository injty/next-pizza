"use client";
import { ChangeEvent, FC, useState } from "react";

import { Input, Skeleton } from "../ui";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  name?: string;
  selected: Set<string>;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  name,
  selected,
  searchInputPlaceholder = "Поиск...",
  onClickCheckbox,
  defaultValue,
  className,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : items.slice(0, limit);
  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="mb-3 font-bold">{title}</p>
        {[...new Array(limit)].map((_, index) => (
          <Skeleton key={index} className="mb-5 h-6 rounded-[8px]" />
        ))}
        <Skeleton className="mb-5 h-6 w-28 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="mb-3 font-bold">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className="border-none bg-gray-50" />
        </div>
      )}

      <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 pt-4" : ""}>
          <button className="mt-3 text-primary" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
