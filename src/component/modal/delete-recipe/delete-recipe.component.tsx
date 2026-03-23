import { useEffect } from "react";
import type { DishDataType } from "@app-types/dish";
import { toast } from "react-toastify";

import WarningImg from "@assets/noto-v1--warning.svg";

import { useDeleteRecipeMutation } from "@store/services/recipesApi";

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
    if (id) {
      try {
        await deleteRecipe(id).unwrap();
        onClose();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Error deleting recipe";
        toast.error(message);
      }
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex min-h-dvh w-full flex-col justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-auto flex w-[min(92vw,28rem)] rounded-2xl bg-stone-50"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full flex-col items-center px-5 py-4 text-center text-lg text-stone-900 md:text-xl">
          <img className="mb-2 h-20 w-20" src={WarningImg} />
          <div>
            You're deleting <span className="font-bold italic">{dishName}</span>
            . Do you confirm?
          </div>
          <div className="font-bold text-red-600">
            This action cannot be undone
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button
              className="rounded-xl bg-stone-300 px-4 py-2 text-base font-semibold text-stone-900 transition hover:cursor-pointer hover:opacity-85 md:text-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-red-500 px-4 py-2 text-base font-semibold text-white transition hover:cursor-pointer hover:opacity-85 md:text-lg"
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
