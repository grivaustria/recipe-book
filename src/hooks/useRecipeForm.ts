import { type ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { generatedDishImage } from "@utils/generatedDishImage";
import type { DishDataType, Ingredient } from "@app-types/dish";
import { useAddRecipeMutation } from "@store/services/recipesApi";

const LOCAL_STORAGE_KEY = "recipeFormDraft";

interface UseRecipeFormProps {
  onClose: () => void;
  initialRecipe?: DishDataType;
  isNewRecipe?: boolean;
}

const ingredientsToMarkdown = (ingredients: Ingredient[]) => {
  if (ingredients.length === 0) {
    return "- quantity | unit | ingredient";
  }

  return ingredients
    .map(
      ({ quantity, unit, name }) =>
        `- ${quantity.trim()} | ${unit.trim()} | ${name.trim()}`,
    )
    .join("\n");
};

const markdownToIngredients = (markdown: string): Ingredient[] =>
  markdown
    .split("\n")
    .map((line) => line.replace(/^\s*(?:[-*+]\s+|\d+\.\s+)/, "").trim())
    .filter((line) => line !== "")
    .map((line) => {
      if (!line.includes("|")) {
        return {
          quantity: "",
          unit: "",
          name: line,
        };
      }

      const [quantity = "", unit = "", ...nameParts] = line
        .split("|")
        .map((part) => part.trim());

      return {
        quantity,
        unit,
        name: nameParts.join(" | "),
      };
    })
    .filter((ingredient) =>
      [ingredient.quantity, ingredient.unit, ingredient.name].some(
        (value) => value !== "",
      ),
    );

const procedureToMarkdown = (procedure: string[]) => {
  if (procedure.length === 0) {
    return "1. Describe the first step";
  }

  return procedure
    .map((step, index) => `${index + 1}. ${step.trim()}`)
    .join("\n");
};

const markdownToProcedure = (markdown: string): string[] =>
  markdown
    .split("\n")
    .map((line) => line.replace(/^\s*(?:[-*+]\s+|\d+\.\s+)/, "").trim())
    .filter((line) => line !== "");

export const useRecipeForm = ({
  onClose,
  initialRecipe,
  isNewRecipe,
}: UseRecipeFormProps) => {
  const [addRecipe] = useAddRecipeMutation();
  const savedRecipe: DishDataType | null = (() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const baseRecipe = initialRecipe || savedRecipe;

  if (isNewRecipe) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  const [dishName, setDishName] = useState(baseRecipe?.dishName || "");
  const [dishType, setDishType] = useState(baseRecipe?.dishType || "");
  const [dishImage, setDishImage] = useState(baseRecipe?.dishImage || "");

  const [ingredientsMarkdown, setIngredientsMarkdown] = useState<string>(
    baseRecipe?.ingredients && baseRecipe.ingredients.length > 0
      ? ingredientsToMarkdown(baseRecipe.ingredients)
      : "- quantity | unit | ingredient",
  );

  const [procedureMarkdown, setProcedureMarkdown] = useState<string>(
    baseRecipe?.procedure && baseRecipe.procedure.length > 0
      ? procedureToMarkdown(baseRecipe.procedure)
      : "1. Describe the first step",
  );

  useEffect(() => {
    const currentState: DishDataType = {
      dishName,
      dishType,
      dishImage,
      ingredients: markdownToIngredients(ingredientsMarkdown),
      procedure: markdownToProcedure(procedureMarkdown),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
  }, [dishName, dishType, dishImage, ingredientsMarkdown, procedureMarkdown]);

  const clearFormState = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setDishName("");
    setDishType("");
    setDishImage("");
    setIngredientsMarkdown("- quantity | unit | ingredient");
    setProcedureMarkdown("1. Describe the first step");
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { id, value } = event.target;
    if (id === "dishName") {
      setDishName(value);
    } else if (id === "dishType") {
      setDishType(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimIngredients = markdownToIngredients(ingredientsMarkdown).filter(
      (ing) => ing.quantity.trim() || ing.unit.trim() || ing.name.trim(),
    );

    const trimProcedure = markdownToProcedure(procedureMarkdown).filter(
      (step) => step.trim() !== "",
    );

    const generatedImage = generatedDishImage(dishName);

    const recipeDataToSave: DishDataType = {
      dishName,
      dishType,
      dishImage: generatedImage,
      ingredients: trimIngredients,
      procedure: trimProcedure,
    };

    try {
      await addRecipe(recipeDataToSave).unwrap();
      clearFormState();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error adding recipe";
      toast.error(message);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return {
    dishName,
    dishType,
    dishImage,
    ingredientsMarkdown,
    procedureMarkdown,
    handleInputChange,
    setIngredientsMarkdown,
    setProcedureMarkdown,
    handleSubmit,
    handleCancel,
    parseIngredientsMarkdown: markdownToIngredients,
    parseProcedureMarkdown: markdownToProcedure,
  };
};
