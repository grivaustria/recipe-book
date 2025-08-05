import { ModalBackground, Modal } from "../modal.styles";
import AddRecipeForm from "./add-recipe-form.component";

type AddRecipeProps = {
  onClose: () => void;
};

const AddRecipe = ({ onClose }: AddRecipeProps) => {
  return (
    <ModalBackground>
      <Modal>
        <AddRecipeForm onClose={onClose} />
      </Modal>
    </ModalBackground>
  );
};

export default AddRecipe;
