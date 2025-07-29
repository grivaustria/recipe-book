import {
  AddRecipeContainer, // Can reuse styles from AddRecipeForm
  RecipeTitleContainer,
  RecipeDetails,
  InputLabelContainer,
  LabelText,
  InputText,
  SelectOption,
  List,
  SubmitRecipe,
} from "../add-recipe/add-recipe.styles"; // Adjust path if necessary

import IngredientList from "../add-recipe/ingredient-list.component"; // Adjust path
import ProcedureList from "../add-recipe/procedure-list.component"; // Adjust path
import { useRecipeForm } from "../../../hooks/useRecipeForm"; // Reuse your custom hook

import type { DishDataType } from "../../../types/dish.type"; // Import DishDataType
import { updateRecipeInFirestore } from "../../../utils/firebase.utils";

type UpdateRecipeFormProps = {
  recipe: DishDataType; // Pass the entire recipe object
  onClose: () => void;
};

const UpdateRecipeForm = ({ recipe, onClose }: UpdateRecipeFormProps) => {
  // Pass the existing recipe data to useRecipeForm for initialization
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
  } = useRecipeForm(onClose, recipe); // Pass 'recipe' for initial state

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedRecipeData = {
      dishName,
      dishType,
      ingredients,
      procedure,
      dishImage: recipe.dishImage,
    };
    try {
      await updateRecipeInFirestore(recipe.id, updatedRecipeData);
      onClose();
    } catch (error) {
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
