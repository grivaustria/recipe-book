import { useState } from "react";
import type { ChangeEvent } from "react";
import { addRecipeToFirestore } from "../utils/firebase.utils"; 
import { generatedDishImage } from "../utils/generatedDishImage";
import type { DishDataType, Ingredient, Procedure } from "../types/dish.type";


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

  const [procedure, setProcedure] = useState<Procedure[]>(
    (initialRecipe?.procedure && initialRecipe.procedure.length > 0)
      ? initialRecipe.procedure.map(step => ({ step })) 
      : [{ step: "" }]
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
      onClose();
      console.log("Recipe added successfully!");
      
      setDishName("");
      setDishType("");
      setDishImage("");
      setIngredients([{ quantity: "", unit: "", name: "" }]);
      setProcedure([{ step: "" }]);
    } catch (error: unknown) {
      console.error("Error adding recipe:", error);
    }
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
  };
};