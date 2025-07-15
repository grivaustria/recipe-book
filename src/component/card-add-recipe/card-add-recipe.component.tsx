import { AddRecipeContainer, AddRecipeImage, AddRecipeText } from "./card-add-recipe.styles";
import AddIcon from "../../assets/lets-icons--add-duotone.svg";
const CardAdd = () => {
  return (
    <AddRecipeContainer>
      <AddRecipeImage src={AddIcon} />
      <AddRecipeText className="add-new-dish">New Dish</AddRecipeText>
    </AddRecipeContainer>
  );
};

export default CardAdd;
