import AddRecipeForm from "./add-recipe-form.component";

type AddRecipeProps = {
  onClose: () => void;
  onRecipeAdd?: () => void;
};

const AddRecipe = ({ onClose, onRecipeAdd }: AddRecipeProps) => (
  <div className="absolute z-50 flex h-screen w-full flex-col justify-center bg-black/50">
    <div className="z-60 mx-4 flex h-[90vh] bg-stone-50 md:mx-12 xl:mx-52 xl:h-auto">
      <AddRecipeForm onClose={onClose} onRecipeAdd={onRecipeAdd} />
    </div>
  </div>
);

export default AddRecipe;
