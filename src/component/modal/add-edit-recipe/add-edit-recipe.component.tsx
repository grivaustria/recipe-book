import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
import {
  deleteDishImageFromSupabase,
  uploadDishImageToSupabase,
  validateDishImageFile,
} from "@utils/supabase.utils";
import style from "./add-edit-recipe.module.scss";

type AddEditRecipeProps = {
  onClose: () => void;
  recipe?: DishDataType;
};

const DEFAULT_INGREDIENTS_MARKDOWN = "- quantity | unit | ingredient";
const DEFAULT_PROCEDURE_MARKDOWN = "1. Describe the first step";

const AddEditRecipe = ({ onClose, recipe }: AddEditRecipeProps) => {
  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const isEditMode = Boolean(recipe);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fallbackPreview, setFallbackPreview] = useState(
    () =>
      recipe?.dishImage ||
      generatedDishImage(recipe?.dishName || "Untitled Recipe"),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

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
    dishImage,
    ingredientsMarkdown,
    procedureMarkdown,
    handleInputChange,
    setDishImage,
    setIngredientsMarkdown,
    setProcedureMarkdown,
    clearFormState,
    parseIngredientsMarkdown,
    parseProcedureMarkdown,
  } = useRecipeForm({
    initialRecipe: recipe,
    isNewRecipe: !recipe,
  });

  useEffect(() => {
    if (imagePreviewUrl) {
      return () => {
        URL.revokeObjectURL(imagePreviewUrl);
      };
    }
  }, [imagePreviewUrl]);

  useEffect(() => {
    if (!imagePreviewUrl && !dishImage) {
      setFallbackPreview(generatedDishImage(dishName || "Untitled Recipe"));
    }
  }, [dishImage, dishName, imagePreviewUrl]);

  const previewImage = imagePreviewUrl || dishImage || fallbackPreview;
  const isNewRecipeDirty =
    !isEditMode &&
    (dishName.trim() !== "" ||
      dishType.trim() !== "" ||
      Boolean(dishImage) ||
      Boolean(selectedImageFile) ||
      ingredientsMarkdown.trim() !== DEFAULT_INGREDIENTS_MARKDOWN ||
      procedureMarkdown.trim() !== DEFAULT_PROCEDURE_MARKDOWN);

  const closeModal = () => {
    setIsDiscardModalOpen(false);
    onClose();
  };

  const handleRequestClose = () => {
    if (isSubmitting) {
      return;
    }

    if (isNewRecipeDirty) {
      setIsDiscardModalOpen(true);
      return;
    }

    closeModal();
  };

  const handleDiscardChanges = () => {
    clearFormState();
    closeModal();
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setSelectedImageFile(null);
    setImagePreviewUrl(null);
    setDishImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      validateDishImageFile(file);

      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }

      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } catch (error) {
      event.target.value = "";
      const message =
        error instanceof Error ? error.message : "Invalid dish image";
      toast.error(message);
    }
  };

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

    setIsSubmitting(true);
    let uploadedImageUrl: string | undefined;

    try {
      let nextDishImage = dishImage;

      if (selectedImageFile) {
        uploadedImageUrl = await uploadDishImageToSupabase(selectedImageFile);
        nextDishImage = uploadedImageUrl;
      }

      if (!nextDishImage) {
        nextDishImage = generatedDishImage(dishName);
      }

      const recipeData: DishDataType = {
        dishName,
        dishType,
        dishImage: nextDishImage,
        ingredients,
        procedure,
      };

      if (isEditMode) {
        if (!recipe?.id) {
          throw new Error("Recipe ID is missing for update.");
        }

        await updateRecipe({
          recipeId: recipe.id,
          updatedData: recipeData,
          previousImageUrl: recipe.dishImage,
        }).unwrap();
      } else {
        await addRecipe(recipeData).unwrap();
        clearFormState();
      }

      closeModal();
    } catch (error) {
      if (uploadedImageUrl) {
        try {
          await deleteDishImageFromSupabase(uploadedImageUrl);
        } catch {
          // Ignore cleanup failures here and preserve the main submit error.
        }
      }

      const fallbackMessage = isEditMode
        ? "Error updating recipe"
        : "Error adding recipe";
      const message = error instanceof Error ? error.message : fallbackMessage;

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.modalBackdrop} onClick={handleRequestClose}>
      <div className={style.modal} onClick={(event) => event.stopPropagation()}>
        <button
          className={style.modalClose}
          type="button"
          onClick={handleRequestClose}
        >
          x
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

          <div className={style.imageSection}>
            <div className={style.imageHeader}>
              <label className={style.formLabel} htmlFor="dishImageUpload">
                Dish Image
              </label>
              <span className={style.imageHint}>
                JPG, JPEG, PNG, WEBP, or GIF up to 3MB
              </span>
            </div>

            <input
              ref={fileInputRef}
              id="dishImageUpload"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.gif,image/png,image/jpeg,image/webp,image/gif"
              className={style.fileInput}
              onChange={handleImageChange}
            />

            <div className={style.imageCard}>
              <div className={style.imagePreviewWrap}>
                <img
                  className={style.imagePreview}
                  src={previewImage}
                  alt={dishName || "Recipe preview"}
                />
              </div>

              <div className={style.imageActions}>
                <button
                  className={style.btnSecondary}
                  type="button"
                  onClick={handleChooseImage}
                >
                  {selectedImageFile || dishImage
                    ? "Replace Image"
                    : "Upload Image"}
                </button>
                <button
                  className={style.btnGhost}
                  type="button"
                  onClick={handleRemoveImage}
                >
                  Remove
                </button>
              </div>
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
              onClick={handleRequestClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className={style.btnPrimary}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Uploading..."
                : isEditMode
                  ? "Update Recipe"
                  : "Save Recipe"}
            </button>
          </div>
        </form>
      </div>

      {isDiscardModalOpen && (
        <div
          className={style.confirmBackdrop}
          onClick={() => setIsDiscardModalOpen(false)}
        >
          <div
            className={style.confirmModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={style.confirmTitle}>Discard new recipe?</div>
            <p className={style.confirmText}>
              If you exit now, this new dish will not be saved to your
              collection. Are you sure you want to leave?
            </p>
            <div className={style.confirmActions}>
              <button
                className={style.btnSecondary}
                type="button"
                onClick={() => setIsDiscardModalOpen(false)}
              >
                Keep Editing
              </button>
              <button
                className={style.btnPrimary}
                type="button"
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEditRecipe;
