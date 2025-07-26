import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";

import { addRecipeToFirestore } from "../../../utils/firebase.utils";

import { ModalBackground, Modal } from "../modal.styles";
import {
  AddRecipeContainer,
  RecipeTitleContainer,
  RecipeDetails,
  InputLabelContainer,
  LabelText,
  InputText,
  SelectOption,
  List,
  SubmitRecipe,
} from "./add-recipe.styles";

import type {
  DishDataType,
  Ingredient,
  Procedure,
} from "../../../types/dish.type";

import IngredientList from "./ingredient-list.component";
import ProcedureList from "./procedure-list.component";
type AddRecipeProps = {
  onClose: () => void;
};

const AddRecipe = ({ onClose }: AddRecipeProps) => {
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

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const recipeData: DishDataType = {
      dishName,
      dishType,
      ingredients: ingredients.filter(
        (ing) =>
          ing.quantity.trim() !== "" ||
          ing.unit.trim() !== "" ||
          ing.name.trim() !== ""
      ),
      procedure: procedure
        .map((p) => p.step.trim())
        .filter((step) => step !== ""),
    };

    try {
      await addRecipeToFirestore(recipeData);
      setDishName("");
      setDishImage("");
      setDishType("");
      setIngredients([{ quantity: "", unit: "cup", name: "" }]);
      setProcedure([{ step: "" }]);
      onClose();
      toast.success("Recipe added successfully!");
    } catch (error) {
      toast.error("Failed to add recipe.");
      console.error(error);
    }

    console.log("Submitting Recipe:", recipeData);
  };

  return (
    <ModalBackground onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {/* Form */}
        <AddRecipeContainer onSubmit={handleSubmit}>
          <RecipeDetails>
            <RecipeTitleContainer>
              <InputLabelContainer>
                <LabelText htmlFor="dishName">Recipe Name:</LabelText>
                <InputText
                  id="dishName"
                  type="text"
                  value={dishName}
                  onChange={handleInputChange}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer>
                <LabelText htmlFor="dishType">Dish Type:</LabelText>
                <SelectOption
                  id="dishType"
                  value={dishType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="fish">Fish</option>
                  <option value="meat">Meat</option>
                  <option value="dessert">Dessert</option>
                </SelectOption>
              </InputLabelContainer>
            </RecipeTitleContainer>

            <List className="ingredient">
              <IngredientList
                ingredients={ingredients}
                onChange={handleIngredientChange}
                onAdd={addIngredientRow}
                onRemove={removeIngredientRow}
              />
            </List>

            <List className="procedure">
              <ProcedureList
                procedure={procedure}
                onChange={handleProcedureChange}
                onAdd={addProcedureStep}
                onRemove={removeProcedureStep}
              />
            </List>
          </RecipeDetails>

          <SubmitRecipe type="submit">Add Recipe</SubmitRecipe>
        </AddRecipeContainer>
      </Modal>
    </ModalBackground>
  );
};

export default AddRecipe;
