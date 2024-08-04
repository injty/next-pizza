import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

type IngredientItem = Pick<Ingredient, "id" | "name">;

interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<ReturnProps["ingredients"]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAllIngredients();
        setIngredients(ingredients.map((ingredient) => ({ id: ingredient.id, name: ingredient.name })));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { ingredients, loading };
};
