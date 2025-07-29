// src/hooks/useRecipeForm.ts

import { useState } from "react";
import type { ChangeEvent } from "react";
import { addRecipeToFirestore } from "../utils/firebase.utils"; // Used for adding new recipes
import { generatedDishImage } from "../utils/generatedDishImage"; // For generating image URLs
import type { DishDataType, Ingredient, Procedure } from "../types/dish.type"; // Import all necessary types
import { toast } from "react-toastify";

// Define the props for the hook (optional initialRecipe for editing)
interface UseRecipeFormProps {
  onClose: () => void;
  initialRecipe?: DishDataType;
}

export const useRecipeForm = ({ onClose, initialRecipe }: UseRecipeFormProps) => {
  const [dishName, setDishName] = useState(initialRecipe?.dishName || "");
  const [dishType, setDishType] = useState(initialRecipe?.dishType || "");
  const [dishImage, setDishImage] = useState(initialRecipe?.dishImage || "");

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    (initialRecipe?.ingredients && initialRecipe.ingredients.length > 0)
      ? initialRecipe.ingredients
      : [{ quantity: "", unit: "", name: "" }]
  );

  // CRITICAL: Initialize 'procedure' state as Procedure[] (array of objects)
  // by mapping incoming string[] data from initialRecipe.
  const [procedure, setProcedure] = useState<Procedure[]>(
    (initialRecipe?.procedure && initialRecipe.procedure.length > 0)
      ? initialRecipe.procedure.map(step => ({ step })) // Convert string to { step: string }
      : [{ step: "" }] // Default for a new, empty step
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
    newProcedure[index] = { ...newProcedure[index], step: value }; // Update the 'step' property of the object
    setProcedure(newProcedure);
  };

  const addProcedureStep = (): void => {
    setProcedure([...procedure, { step: "" }]); // Add a new { step: "" } object
  };

  const removeProcedureStep = (indexToRemove: number): void => {
    if (procedure.length > 1) {
      setProcedure(procedure.filter((_, index) => index !== indexToRemove));
    } else {
      setProcedure([{ step: "" }]);
    }
  };

  // This handleSubmit is for ADDING new recipes.
  // It converts the internal `Procedure[]` state back to `string[]` for Firestore.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimIngredients = ingredients.filter(
      (ing) => ing.quantity.trim() || ing.unit.trim() || ing.name.trim()
    );

    // CRITICAL: Convert `Procedure[]` state back to `string[]` for Firestore storage
    const trimProcedure = procedure
      .map((procItem) => procItem.step.trim()) // Map to array of strings
      .filter((step) => step !== ""); // Remove empty strings

    const generatedImage = generatedDishImage(dishName);

    const recipeDataToSave: DishDataType = { // Type it as DishDataType
      dishName,
      dishType,
      dishImage: generatedImage, // Use generated image for new recipes
      ingredients: trimIngredients,
      procedure: trimProcedure, // This is now string[]
    };

    try {
      await addRecipeToFirestore(recipeDataToSave);
      onClose();
      toast.success("Recipe added successfully!");
      // Reset form fields
      setDishName("");
      setDishType("");
      setDishImage("");
      setIngredients([{ quantity: "", unit: "", name: "" }]);
      setProcedure([{ step: "" }]); // Reset to default { step: "" }
    } catch (error: unknown) {
      console.error("Error adding recipe:", error);
      // toast.error(`Failed to add recipe: ${error.message || "Unknown error"}`);
    }
  };

  return {
    dishName,
    dishType,
    dishImage,
    ingredients,
    procedure, // Exposes Procedure[]
    handleInputChange,
    handleIngredientChange,
    addIngredientRow,
    removeIngredientRow,
    handleProcedureChange,
    addProcedureStep,
    removeProcedureStep,
    handleSubmit, // For adding recipes
  };
};