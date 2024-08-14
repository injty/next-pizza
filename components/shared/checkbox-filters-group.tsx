"use client";
import { ChangeEvent, FC, useState } from "react";

import { Input, Skeleton } from "../ui";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  className?: string;
  defaultItems?: Item[];
  defaultValue?: string[];
  items: Item[];
  limit?: number;
  loading?: boolean;
  name?: string;
  onClickCheckbox?: (id: string) => void;
  searchInputPlaceholder?: string;
  selected: Set<string>;
  title: string;
}

export const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = ({
  className,
  defaultItems,
  defaultValue,
  items,
  limit = 5,
  loading,
  name,
  onClickCheckbox,
  searchInputPlaceholder = "Поиск...",
  selected,
  title,
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
          <Skeleton className="mb-5 h-6 rounded-[8px]" key={index} />
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
          <Input className="border-none bg-gray-50" onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} />
        </div>
      )}

      <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
        {list.map((item, index) => (
          <FilterCheckbox
            checked={selected.has(item.value)}
            endAdornment={item.endAdornment}
            key={index}
            name={name}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            text={item.text}
            value={item.value}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 pt-4" : ""}>
          <button className="mt-3 text-primary" onClick={() => setShowAll((prev) => !prev)} type="button">
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
