import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { addRecipeToFirestore } from "../utils/firebase.utils";
import { generatedDishImage } from "../utils/generatedDishImage";
import type { DishDataType, Ingredient, Procedure } from "../types/dish.type";

const LOCAL_STORAGE_KEY = "recipeFormDraft";

interface UseRecipeFormProps {
  onClose: () => void;
  onRecipeAdd?: () => void;
  initialRecipe?: DishDataType;
  isNewRecipe?: boolean;
}

export const useRecipeForm = ({
  onClose,
  onRecipeAdd,
  initialRecipe,
  isNewRecipe,
}: UseRecipeFormProps) => {
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

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    baseRecipe?.ingredients && baseRecipe.ingredients.length > 0
      ? baseRecipe.ingredients
      : [{ quantity: "", unit: "", name: "" }]
  );

  const [procedure, setProcedure] = useState<Procedure[]>(
    baseRecipe?.procedure && baseRecipe.procedure.length > 0
      ? baseRecipe.procedure.map((step) => ({ step }))
      : [{ step: "" }]
  );

  useEffect(() => {
    const currentState: DishDataType = {
      dishName,
      dishType,
      dishImage,
      ingredients,
      procedure: procedure.map((p) => p.step),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
  }, [dishName, dishType, dishImage, ingredients, procedure]);

  const clearFormState = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setDishName("");
    setDishType("");
    setDishImage("");
    setIngredients([{ quantity: "", unit: "", name: "" }]);
    setProcedure([{ step: "" }]);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = event.target;
    if (id === "dishName") {
      setDishName(value);
    } else if (id === "dishType") {
      setDishType(value);
    }
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ): void => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addIngredientRow = (): void => {
    setIngredients([...ingredients, { quantity: "", unit: "", name: "" }]);
  };

  const removeIngredientRow = (indexToRemove: number): void => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
    } else {
      setIngredients([{ quantity: "", unit: "", name: "" }]);
    }
  };

  const handleProcedureChange = (index: number, value: string): void => {
    const newProcedure = [...procedure];
    newProcedure[index] = { ...newProcedure[index], step: value };
    setProcedure(newProcedure);
  };

  const addProcedureStep = (): void => {
    setProcedure([...procedure, { step: "" }]);
  };

  const removeProcedureStep = (indexToRemove: number): void => {
    if (procedure.length > 1) {
      setProcedure(procedure.filter((_, index) => index !== indexToRemove));
    } else {
      setProcedure([{ step: "" }]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimIngredients = ingredients.filter(
      (ing) => ing.quantity.trim() || ing.unit.trim() || ing.name.trim()
    );

    const trimProcedure = procedure
      .map((procItem) => procItem.step.trim())
      .filter((step) => step !== "");

    const generatedImage = generatedDishImage(dishName);

    const recipeDataToSave: DishDataType = {
      dishName,
      dishType,
      dishImage: generatedImage,
      ingredients: trimIngredients,
      procedure: trimProcedure,
    };

    try {
      await addRecipeToFirestore(recipeDataToSave);
      clearFormState();

      if (onRecipeAdd) {
        onRecipeAdd();
      }
      onClose();
      // console.log("Recipe added successfully!");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return {
    dishName,
    dishType,
    dishImage,
    ingredients,
    procedure,
    handleInputChange,
    handleIngredientChange,
    addIngredientRow,
    removeIngredientRow,
    handleProcedureChange,
    addProcedureStep,
    removeProcedureStep,
    handleSubmit,
    handleCancel,
  };
};
