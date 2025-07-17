import { AddRecipeContainer, AddRecipeImage, AddRecipeText } from "./card-add-recipe.styles";
import AddIcon from "../../assets/material-symbols--add.svg";
const CardAdd = () => {
  return (
    <AddRecipeContainer>
      <AddRecipeImage src={AddIcon} />
      <AddRecipeText className="add-new-dish">Add New Dish</AddRecipeText>
    </AddRecipeContainer>
  );
};

export default CardAdd;
 