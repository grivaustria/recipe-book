import type { FormEvent } from "react";

import {
  AddRecipeContainer,
  RecipeTitleContainer,
  RecipeDetails,
  InputLabelContainer,
  LabelText,
  InputText,
  SelectOption,
  List,
} from "../add-recipe/add-recipe.styles";

import { SubmitRecipe } from "../../button/button.styled";

import IngredientList from "../add-recipe/ingredient-list.component";
import ProcedureList from "../add-recipe/procedure-list.component";

import { updateRecipeInFirestore } from "../../../utils/firebase.utils";
import { useRecipeForm } from "../../../hooks/useRecipeForm";

import type { DishDataType } from "../../../types/dish.type";

type UpdateRecipeFormProps = {
  recipe: DishDataType;
  onClose: () => void;
};

const UpdateRecipeForm = ({ recipe, onClose }: UpdateRecipeFormProps) => {
  const {
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
  } = useRecipeForm({ onClose, initialRecipe: recipe });

  const handleUpdateSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedIngredientsForUpdate = ingredients.filter(
      (ing) => ing.quantity.trim() || ing.unit.trim() || ing.name.trim()
    );

    const trimmedProcedureForUpdate = procedure
      .map((procItem) => procItem.step.trim())
      .filter((step) => step !== "");

    const updatedRecipeData: DishDataType = {
      dishName,
      dishType,
      ingredients: trimmedIngredientsForUpdate,
      procedure: trimmedProcedureForUpdate,
      dishImage: recipe.dishImage,
    };

    try {
      if (!recipe.id) {
        throw new Error("Recipe ID is missing for update.");
      }
      await updateRecipeInFirestore(recipe.id, updatedRecipeData);
      onClose();
    } catch (error: unknown) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <AddRecipeContainer onSubmit={handleUpdateSubmit}>
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
      <SubmitRecipe type="submit">Update Recipe</SubmitRecipe>
    </AddRecipeContainer>
  );
};

export default UpdateRecipeForm;
