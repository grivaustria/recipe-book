import {
  AddRecipeContainer,
  RecipeTitleContainer,
  RecipeDetails,
  InputLabelContainer,
  LabelText,
  InputText,
  SelectOption,
  List,
} from "./add-recipe.styles";

import {
  ButtonsContainer,
  CancelButton,
  SubmitRecipe,
} from "../../button/button.styled";

import IngredientList from "./ingredient-list.component";
import ProcedureList from "./procedure-list.component";
import { useRecipeForm } from "../../../hooks/useRecipeForm";

type AddRecipeFormProps = {
  onClose: () => void;
  onRecipeAdd?: () => void;
};

const AddRecipeForm = ({ onClose, onRecipeAdd }: AddRecipeFormProps) => {
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
    handleSubmit,
  } = useRecipeForm({ onClose, onRecipeAdd });

  return (
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
              <option value="" disabled>
                Select Type
              </option>
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
      <ButtonsContainer>
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
        <SubmitRecipe type="submit">Add Recipe</SubmitRecipe>
      </ButtonsContainer>
    </AddRecipeContainer>
  );
};

export default AddRecipeForm;
