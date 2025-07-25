
import { AddRecipeContainer, AddRecipeImage, AddRecipeText } from "./card-add-recipe.styles";
import AddIcon from "../../assets/material-symbols--add.svg";

type CardAddProps = {
  onAddRecipeClick: () => void;
}

const CardAdd = ( {onAddRecipeClick}: CardAddProps) => {



  return (
    <AddRecipeContainer onClick={onAddRecipeClick}>
      <AddRecipeImage src={AddIcon} />
      <AddRecipeText className="add-new-dish">Add New Dish</AddRecipeText>
    </AddRecipeContainer>
  );
};

export default CardAdd;
 