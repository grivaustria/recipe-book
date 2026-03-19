import type { FormEvent } from "react";

import IngredientList from "../add-recipe/ingredient-list.component";
import ProcedureList from "../add-recipe/procedure-list.component";

import { updateRecipeInFirestore } from "../../../utils/firebase.utils";
import { useRecipeForm } from "../../../hooks/useRecipeForm";

import type { DishDataType } from "../../../types/dish.type";

type UpdateRecipeFormProps = {
  recipe: DishDataType;
  onClose: () => void;
};

const UpdateRecipeForm = ({ recipe, onClose }: UpdateRecipeFormProps) => {
  const labelClass = "mb-1 text-base font-bold text-stone-800 md:text-lg";
  const inputClass =
    "w-full rounded-xl border-2 border-stone-900 bg-white px-3 py-2 text-base text-stone-900 outline-none transition focus:border-stone-700 md:text-lg";
  const actionButtonClass =
    "rounded-xl border-none px-4 py-2 text-base font-semibold transition hover:cursor-pointer hover:opacity-85 md:text-lg";

  const {
    dishName,
    dishType,
    ingredients,
    procedure,
    handleInputChange,
    handleIngredientChange,
    addIngredientRow,
    removeIngredientRow,
    handleProcedureChange,
    addProcedureStep,
    removeProcedureStep,
  } = useRecipeForm({ onClose, initialRecipe: recipe });

  const handleUpdateSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedIngredientsForUpdate = ingredients.filter(
      (ing) => ing.quantity.trim() || ing.unit.trim() || ing.name.trim(),
    );

    const trimmedProcedureForUpdate = procedure
      .map((procItem) => procItem.step.trim())
      .filter((step) => step !== "");

    const updatedRecipeData: DishDataType = {
      dishName,
      dishType,
      ingredients: trimmedIngredientsForUpdate,
      procedure: trimmedProcedureForUpdate,
      dishImage: recipe.dishImage,
    };

    try {
      if (!recipe.id) {
        throw new Error("Recipe ID is missing for update.");
      }
      await updateRecipeInFirestore(recipe.id, updatedRecipeData);
      onClose();
    } catch (error: unknown) {
      // console.error("Error updating recipe:", error);
    }
  };

  return (
    <form
      onSubmit={handleUpdateSubmit}
      className="flex h-full max-h-[550px] w-full flex-col justify-between gap-4 overflow-x-hidden overflow-y-auto p-6"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex w-full flex-col">
            <label className={labelClass} htmlFor="dishName">
              Recipe Name:
            </label>
            <input
              className={inputClass}
              id="dishName"
              type="text"
              value={dishName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex w-full flex-col">
            <label className={labelClass} htmlFor="dishType">
              Dish Type:
            </label>
            <select
              className={inputClass}
              id="dishType"
              value={dishType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="fish">Fish</option>
              <option value="meat">Meat</option>
              <option value="veggies">Veggies</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <IngredientList
            ingredients={ingredients}
            onChange={handleIngredientChange}
            onAdd={addIngredientRow}
            onRemove={removeIngredientRow}
            labelClass={labelClass}
            inputClass={inputClass}
            removeButtonClass={`${actionButtonClass} bg-red-500 px-3 text-xl font-bold text-white`}
            addButtonClass={`${actionButtonClass} bg-green-600 text-white`}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <ProcedureList
            procedure={procedure}
            onChange={handleProcedureChange}
            onAdd={addProcedureStep}
            onRemove={removeProcedureStep}
            labelClass={labelClass}
            inputClass={inputClass}
            removeButtonClass={`${actionButtonClass} bg-red-500 px-3 text-xl font-bold text-white`}
            addButtonClass={`${actionButtonClass} bg-green-600 text-white`}
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2">
        <button
          className={`${actionButtonClass} bg-stone-300 text-stone-900`}
          type="button"
          onClick={onClose}
        >
          Close
        </button>
        <button
          className={`${actionButtonClass} bg-blue-600 text-white`}
          type="submit"
        >
          Update Recipe
        </button>
      </div>
    </form>
  );
};

export default UpdateRecipeForm;
