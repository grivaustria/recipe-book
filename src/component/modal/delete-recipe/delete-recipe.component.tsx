import type { DishDataType } from "../../../types/dish.type";
import { ModalBackground } from "../modal.styles";
import {
  ButtonContainer,
  DeleteContainer,
  DeleteText,
  DeleteWarning,
  TinyModal,
} from "./delete-recipe.styles";

import { CancelButton, DeleteButton } from "../../button/button.styled";

import { deleteRecipeFromFirestore } from "../../../utils/firebase.utils";

type DeleteRecipeProps = {
  dish: DishDataType;
  onClose: () => void;
};

const DeleteRecipe = ({ dish, onClose }: DeleteRecipeProps) => {
  const { id, dishName } = dish;

  const handleConfirmDelete = async () => {
    if (id) {
      try {
        await deleteRecipeFromFirestore(id);
        onClose();
      } catch (error) {
        console.error("Error deleting recipe: ", error);
      }
    }
  };
  return (
    <ModalBackground onClick={onClose}>
      <TinyModal onClick={(event) => event.stopPropagation()}>
        <DeleteContainer>
          <DeleteText>
            Are you sure you want to delete {dishName} from the recipe book?{" "}
          </DeleteText>
          <DeleteWarning>This action cannot be undone</DeleteWarning>
          <ButtonContainer>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <DeleteButton onClick={handleConfirmDelete}>Delete Recipe</DeleteButton>
          </ButtonContainer>
        </DeleteContainer>
      </TinyModal> 
    </ModalBackground>
  );
};

export default DeleteRecipe;
