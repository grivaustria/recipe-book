import { useState } from "react";
import type { ChangeEvent } from "react";
import { addRecipeToFirestore } from "../utils/firebase.utils"; // Assuming this is used for adding
import type { DishDataType, Ingredient } from "../types/dish.type";
import { toast } from "react-toastify";

// Extend the hook to accept an optional initialRecipe
export const useRecipeForm = (
  onClose: () => void,
  initialRecipe?: DishDataType
) => {
  const [dishName, setDishName] = useState(initialRecipe?.dishName || "");
  const [dishType, setDishType] = useState(initialRecipe?.dishType || "");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialRecipe?.ingredients || [{ quantity: "", unit: "", name: "" }]
  );
  const [procedure, setProcedure] = useState<string[]>(
    initialRecipe?.procedure || [""]
  );

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
    value: string,
  ): void => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value}
    setIngredients(newIngredients);
  };

  const addIngredientRow = (): void => {
    setIngredients([...ingredients, { quantity: "", unit: "", name: "" }]);
  };

  const removeIngredientRow = (index: number): void => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleProcedureChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement> 
  ): void => {
    const newProcedure = [...procedure];
    newProcedure[index] = event.target.value;
    setProcedure(newProcedure);
  };

  const addProcedureStep = (): void => {
    setProcedure([...procedure, ""]);
  };

  const removeProcedureStep = (index: number): void => {
    const newProcedure = procedure.filter((_, i) => i !== index);
    setProcedure(newProcedure);
  };

  // This handleSubmit is specifically for ADDING a recipe.
  // For EDITING, the EditRecipeForm will have its own handleSubmit logic
  // that calls updateRecipeInFirestore.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newRecipe = {
      dishName,
      dishType,
      ingredients,
      procedure,
      dishImage: "", // You'll need to handle image updates separately if needed
    };

    try {
      await addRecipeToFirestore(newRecipe);
      onClose();
      toast.success("Recipe added successfully!");
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Failed to add recipe.");
    }
  };

  return {
    dishName,
    dishType,
    ingredients,
    procedure,
    handleInputChange,
    handleIngredientChange,
    addIngredientRow,
    removeIngredientRow,
    handleProcedureChange,
    addProcedureStep,
    removeProcedureStep,
    handleSubmit, // This will be used by AddRecipeForm
  };
};
