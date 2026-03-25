import { useEffect } from "react";
import { toast } from "react-toastify";
import type { DishDataType } from "@app-types/dish";
import { useDeleteRecipeMutation } from "@store/services/recipesApi";
import style from "./delete-recipe.module.scss";

type DeleteRecipeProps = {
  dish: DishDataType;
  onClose: () => void;
};

const DeleteRecipe = ({ dish, onClose }: DeleteRecipeProps) => {
  const { id, dishName } = dish;
  const [deleteRecipe] = useDeleteRecipeMutation();

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const handleConfirmDelete = async () => {
    if (!id) {
      toast.error("Recipe ID is missing");
      return;
    }

    try {
      await deleteRecipe({
        recipeId: id,
        imageUrl: dish.dishImage,
      }).unwrap();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error deleting recipe";
      toast.error(message);
    }
  };

  return (
    <div className={style.modalBackdrop} onClick={onClose}>
      <div className={style.modal} onClick={(event) => event.stopPropagation()}>
        <div className={style.deleteInner}>
          <div className={style.deleteIconWrap}>🗑️</div>

          <div className={style.deleteTitle}>
            Delete recipe?
            <span className={style.deleteDishName}>{dishName}</span>
          </div>

          <p className={style.deleteSub}>
            You're about to remove this recipe from your collection permanently.
          </p>

          <div className={style.deleteWarning}>
            This action cannot be undone
          </div>

          <div className={style.deleteActions}>
            <button
              className={style.btnSecondary}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={style.btnDeleteConfirm}
              type="button"
              onClick={handleConfirmDelete}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecipe;
