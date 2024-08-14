import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect, useRef } from "react";

import { Filters } from "@/hooks/use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
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
      console.log(filters);
    }

    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
};
