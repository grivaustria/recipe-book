import { ModalBackground, Modal } from "../modal.styles";
import AddRecipeForm from "./add-recipe-form.component";

type AddRecipeProps = {
  onClose: () => void;
  onRecipeAdd?: () => void;
};

const AddRecipe = ({ onClose, onRecipeAdd }: AddRecipeProps) => {
  return (
    <ModalBackground>
      <Modal>
        <AddRecipeForm onClose={onClose} onRecipeAdd={onRecipeAdd}/>
      </Modal>
    </ModalBackground>
  );
};

export default AddRecipe;
