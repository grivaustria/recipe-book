import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { DishDataType, Ingredient, Procedure } from "../types/dish.type";
import { addRecipeToFirestore } from "../utils/firebase.utils";
import { generatedDishImage } from "../utils/generatedDishImage";
import { toast } from "react-toastify";

export const useRecipeForm = (onClose: () => void) => {
  const [dishName, setDishName] = useState<string>("");
  const [dishType, setDishType] = useState<string>("");
  const [dishImage, setDishImage] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      quantity: "",
      unit: "",
      name: "",
    },
  ]);
  const [procedure, setProcedure] = useState<Procedure[]>([
    {
      step: "",
    },
  ]);

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
    setIngredients([...ingredients, { quantity: "", unit: "cup", name: "" }]);
  };

  const removeIngredientRow = (indexToRemove: number): void => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
    } else {
      setIngredients([{ quantity: "", unit: "cup", name: "" }]);
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimIngredients = ingredients.filter(
      (ing) => ing.quantity.trim() || ing.unit.trim() || ing.name.trim()
    );

    const trimProcedure = procedure
      .map((proc) => proc.step.trim())
      .filter((step) => step !== "");

    const generatedImage = generatedDishImage(dishName);

    const recipeData: DishDataType = {
      dishName,
      dishType,
      dishImage: generatedImage,
      ingredients: trimIngredients,
      procedure: trimProcedure,
    };

    try {
      await addRecipeToFirestore(recipeData);
      setDishName("");
      setDishImage("");
      setDishType("");
      setIngredients([{ quantity: "", unit: "cup", name: "" }]);
      setProcedure([{ step: "" }]);
      toast.success("Recipe added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add recipe.");
      console.error(error);
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
