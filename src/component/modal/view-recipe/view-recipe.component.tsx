import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import type { DishDataType, Procedure } from "../../../types/dish.type";
import ViewRecipeTitle from "./view-recipe-title.component";
import UpdateRecipeForm from "../update-recipe/update-recipe-form.component";

type ViewRecipeProps = {
  dish: DishDataType;
  onClose: () => void;
  onDelete: (dish: DishDataType) => void;
  onUpdate: () => void;
};

const ViewRecipe = ({ dish, onClose, onDelete, onUpdate }: ViewRecipeProps) => {
  const { id, dishType, dishName, dishImage, ingredients, procedure } = dish;
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const slug = dish.dishName.toLocaleLowerCase().replace(/\s+/g, "-");

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith("/recipe/update/")) {
      setIsUpdateOpen(true);
    } else {
      setIsUpdateOpen(false);
    }
  }, []);

  const handleUpdateClick = () => {
    setIsUpdateOpen(true);
    navigate(`/recipe/update/${slug}`);
  };

  const handleUpdateClose = () => {
    onUpdate();
    setIsUpdateOpen(false);
    navigate(`/recipe/view/${slug}`);
  };

  const handleBackgroundClick = () => {
    if (!isUpdateOpen) {
      onClose();
    }
  };

  if (id === undefined) {
    // console.warn(
    //   "Recipe being viewed has no ID. Cannot perform update/delete."
    // );
    return (
      <div
        className="absolute z-50 flex h-screen w-full flex-col justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          className="z-60 mx-4 flex h-[90vh] bg-stone-50 md:mx-12 xl:mx-52 xl:h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div>Error: Recipe ID not found.</div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  return (
    <div
      className="absolute z-50 flex h-screen w-full flex-col justify-center bg-black/50"
      onClick={handleBackgroundClick}
    >
      <div
        className="z-60 mx-4 flex h-[90vh] bg-stone-50 md:mx-12 xl:mx-52 xl:h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isUpdateOpen ? (
          <UpdateRecipeForm recipe={dish} onClose={handleUpdateClose} />
        ) : (
          <div className="flex w-full flex-col xl:flex-row xl:gap-4">
            <div className="flex flex-col shadow-[5px_0px_6px_0px_rgba(100,116,139,0.5)] xl:basis-2/5">
              <img
                className="max-h-[200px] object-cover md:max-h-[300px] xl:h-[600px] xl:max-h-[553px] xl:w-[450px]"
                src={dishImage}
              />
            </div>
            <div className="flex max-h-[565px] min-w-0 w-full flex-col gap-2 overflow-y-auto px-2 py-4">
              <ViewRecipeTitle
                id={id}
                title={dishName}
                tag={dishType}
                onDelete={() => onDelete(dish)}
                onUpdate={handleUpdateClick}
              />

              <div className="mr-4 flex flex-col xl:mr-0">
                <span className="cursor-default border-b-[3px] border-[#8c6662] p-2 text-2xl font-bold text-stone-900 xl:text-[28px]">
                  Ingredients
                </span>
                <ul className="list-disc pl-8 text-base leading-7 text-stone-900 md:text-[17px] xl:text-lg">
                  {ingredients.map((ingredient, index) => (
                    <li className="my-1 xl:my-2" key={index}>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mr-4 flex flex-col xl:mr-0">
                <span className="cursor-default border-b-[3px] border-[#8c6662] p-2 text-2xl font-bold text-stone-900 xl:text-[28px]">
                  Procedure
                </span>
                <ol className="list-decimal pl-8 text-base leading-7 text-stone-900 md:text-[17px] xl:text-lg">
                  {procedure.map((step, index) => (
                    <li className="my-1 xl:my-2" key={index}>
                      {typeof step === "string"
                        ? step
                        : (step as Procedure).step}
                    </li>
                  ))}
                </ol>
              </div>
              <button
                className="self-start rounded-xl bg-stone-300 px-4 py-2 text-base font-semibold text-stone-900 transition hover:cursor-pointer hover:opacity-85 xl:text-lg"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRecipe;
