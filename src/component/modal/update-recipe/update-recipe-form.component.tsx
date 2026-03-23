import type { DishDataType } from "@app-types/dish";
import AddEditRecipe from "@component/modal/add-edit-recipe/add-edit-recipe.component";

type UpdateRecipeFormProps = {
  recipe: DishDataType;
  onClose: () => void;
};

const UpdateRecipeForm = ({ recipe, onClose }: UpdateRecipeFormProps) => (
  <AddEditRecipe recipe={recipe} onClose={onClose} />
);

export default UpdateRecipeForm;
