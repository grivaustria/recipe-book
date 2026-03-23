import type { DishDataType } from "@app-types/dish";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./gallery-modal.module.scss";

type GalleryModalProps = {
  dish: DishDataType;
  onClose: () => void;
  onDelete: (dish: DishDataType) => void;
};

const dishTypeIcons: Record<string, string> = {
  meat: "🍖",
  fish: "🐟",
  veggies: "🥦",
  dessert: "🍮",
};

const dishTypeBadgeStyles: Record<string, string> = {
  meat: style.catMeat,
  fish: style.catFish,
  veggies: style.catVeggies,
  dessert: style.catDessert,
};

const GalleryModal = ({ dish, onClose, onDelete }: GalleryModalProps) => {
  const navigate = useNavigate();
  const category = dish.dishType.toLowerCase();
  const emoji = dishTypeIcons[category] || "🍽";
  const badgeClass = dishTypeBadgeStyles[category] || "";
  const ingredientList = dish.ingredients.filter(
    (ingredient) =>
      ingredient.quantity.trim() ||
      ingredient.unit.trim() ||
      ingredient.name.trim(),
  );
  const procedureList = dish.procedure.filter((step) => step.trim());
  const slug = dish.dishName.toLocaleLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const handleEdit = () => {
    navigate(`/recipe/update/${slug}`);
  };

  return (
    <div className={style.modalBackdrop} onClick={onClose}>
      <div className={style.modal} onClick={(event) => event.stopPropagation()}>
        <button className={style.modalClose} type="button" onClick={onClose}>
          ✕
        </button>

        <div className={style.viewImageWrap}>
          {dish.dishImage ? (
            <img
              className={style.viewImage}
              src={dish.dishImage}
              alt={dish.dishName}
            />
          ) : (
            <span className={style.viewEmoji}>{emoji}</span>
          )}
        </div>

        <div className={style.viewBody}>
          <div className={style.viewCat}>
            <span className={`${style.dishCatBadge} ${badgeClass}`}>
              {emoji} {dish.dishType}
            </span>
          </div>

          <div className={style.viewName}>{dish.dishName}</div>

          <section className={style.recipeSection}>
            <h3 className={style.sectionTitle}>Ingredients</h3>
            {ingredientList.length > 0 ? (
              <ul className={style.ingredientList}>
                {ingredientList.map((ingredient, index) => (
                  <li key={`${ingredient.name}-${index}`}>
                    {[ingredient.quantity, ingredient.unit, ingredient.name]
                      .filter(Boolean)
                      .join(" ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={style.emptyCopy}>No ingredients added yet.</p>
            )}
          </section>

          <section className={style.recipeSection}>
            <h3 className={style.sectionTitle}>Procedure</h3>
            {procedureList.length > 0 ? (
              <ol className={style.procedureList}>
                {procedureList.map((step, index) => (
                  <li key={`${step}-${index}`}>{step}</li>
                ))}
              </ol>
            ) : (
              <p className={style.emptyCopy}>No procedure added yet.</p>
            )}
          </section>

          <div className={style.viewActions}>
            <button
              className={style.btnEdit}
              type="button"
              onClick={handleEdit}
            >
              Edit Dish
            </button>
            <button
              className={style.btnDelete}
              type="button"
              onClick={() => onDelete(dish)}
            >
              Delete Dish
            </button>
            <button className={style.btnSave} type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
