import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect } from "react";

import { Filters } from "@/hooks/use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      selectedIngredients: Array.from(filters.selectedIngredients),
    };

    const queryString = qs.stringify(params, {
      arrayFormat: "comma",
    });

    router.push(`?${queryString}`, { scroll: false });
  }, [filters, router]);
};
