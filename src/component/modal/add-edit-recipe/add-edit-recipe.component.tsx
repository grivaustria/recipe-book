import { type FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import type { DishDataType } from "@app-types/dish";
import { useRecipeForm } from "@hooks/useRecipeForm";
import { generatedDishImage } from "@utils/generatedDishImage";
import IngredientList from "@component/modal/add-recipe/ingredient-list.component";
import ProcedureList from "@component/modal/add-recipe/procedure-list.component";
import {
  useAddRecipeMutation,
  useUpdateRecipeMutation,
} from "@store/services/recipesApi";
import style from "./add-edit-recipe.module.scss";

type AddEditRecipeProps = {
  onClose: () => void;
  recipe?: DishDataType;
};

const AddEditRecipe = ({ onClose, recipe }: AddEditRecipeProps) => {
  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const isEditMode = Boolean(recipe);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const {
    dishName,
    dishType,
    ingredientsMarkdown,
    procedureMarkdown,
    handleInputChange,
    setIngredientsMarkdown,
    setProcedureMarkdown,
    parseIngredientsMarkdown,
    parseProcedureMarkdown,
  } = useRecipeForm({
    onClose,
    initialRecipe: recipe,
    isNewRecipe: !recipe,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingredients = parseIngredientsMarkdown(ingredientsMarkdown).filter(
      (ingredient) =>
        ingredient.quantity.trim() ||
        ingredient.unit.trim() ||
        ingredient.name.trim(),
    );

    const procedure = parseProcedureMarkdown(procedureMarkdown).filter((step) =>
      step.trim(),
    );

    const dishImage = recipe?.dishImage || generatedDishImage(dishName);

    const recipeData: DishDataType = {
      dishName,
      dishType,
      dishImage,
      ingredients,
      procedure,
    };

    try {
      if (isEditMode) {
        if (!recipe?.id) {
          throw new Error("Recipe ID is missing for update.");
        }

        await updateRecipe({
          recipeId: recipe.id,
          updatedData: recipeData,
        }).unwrap();
      } else {
        await addRecipe(recipeData).unwrap();
      }

      onClose();
    } catch (error) {
      const fallbackMessage = isEditMode
        ? "Error updating recipe"
        : "Error adding recipe";
      const message = error instanceof Error ? error.message : fallbackMessage;

      toast.error(message);
    }
  };

  return (
    <div className={style.modalBackdrop} onClick={onClose}>
      <div className={style.modal} onClick={(event) => event.stopPropagation()}>
        <button className={style.modalClose} type="button" onClick={onClose}>
          ✕
        </button>

        <div className={style.header}>
          <div className={style.title}>
            {isEditMode ? (
              <>
                Edit <em>your dish</em>
              </>
            ) : (
              <>
                Add a <em>new dish</em>
              </>
            )}
          </div>
          <div className={style.subtitle}>
            {isEditMode
              ? "Update your recipe details below."
              : "Fill in the details below to save your recipe."}
          </div>
        </div>

        <form className={style.body} onSubmit={handleSubmit}>
          <div className={style.topRow}>
            <div className={style.fieldBlock}>
              <label className={style.formLabel} htmlFor="dishName">
                Recipe Name
              </label>
              <input
                id="dishName"
                type="text"
                className={style.formInput}
                value={dishName}
                onChange={handleInputChange}
                placeholder="e.g. Kare-Kare"
                required
              />
            </div>

            <div className={style.fieldBlock}>
              <label className={style.formLabel} htmlFor="dishType">
                Dish Type
              </label>
              <select
                id="dishType"
                className={style.formSelect}
                value={dishType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="meat">Meat</option>
                <option value="fish">Fish</option>
                <option value="veggies">Veggies</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
          </div>

          <div className={style.editorBlock}>
            <IngredientList
              markdown={ingredientsMarkdown}
              onChange={setIngredientsMarkdown}
              labelClass={style.formLabel}
            />
          </div>

          <div className={style.editorBlock}>
            <ProcedureList
              markdown={procedureMarkdown}
              onChange={setProcedureMarkdown}
              labelClass={style.formLabel}
            />
          </div>

          <div className={style.footer}>
            <button
              className={style.btnSecondary}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className={style.btnPrimary} type="submit">
              {isEditMode ? "Update Recipe" : "Save Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditRecipe;
