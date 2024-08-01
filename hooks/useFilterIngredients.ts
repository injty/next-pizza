import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

type IngredientItem = Pick<Ingredient, "id" | "name">;
interface ReturnProps {
  ingredients: IngredientItem[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<ReturnProps["ingredients"]>([]);

  useEffect(() => {
    (async () => {
      try {
        const ingredients = await Api.ingredients.getAllIngredients();
        setIngredients(ingredients.map((ingredient) => ({ id: ingredient.id, name: ingredient.name })));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return { ingredients };
};
