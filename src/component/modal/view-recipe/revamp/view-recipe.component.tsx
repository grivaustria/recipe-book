import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { DishDataType } from "@app-types/dish";
import style from "./view-recipe.module.scss";

type ViewRecipeProps = {
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

const ViewRecipe = ({ dish, onClose, onDelete }: ViewRecipeProps) => {
  const navigate = useNavigate();
  const category = dish.dishType.toLowerCase();
  const emoji = dishTypeIcons[category] || "🍽";
  const badgeClass = dishTypeBadgeStyles[category] || "";
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

        <div className={style.viewHero}>
          {dish.dishImage ? (
            <img src={dish.dishImage} alt={dish.dishName} />
          ) : (
            <span className={style.viewHeroFallback}>{emoji}</span>
          )}

          <div className={style.viewHeroGradient} />

          <div className={style.viewHeroMeta}>
            <div className={style.viewHeroCat}>
              <span className={`${style.dishCatBadge} ${badgeClass}`}>
                {emoji} {dish.dishType}
              </span>
            </div>
            <div className={style.viewHeroName}>{dish.dishName}</div>
          </div>
        </div>

        <div className={style.viewBody}>
          <div>
            <div className={style.viewSectionTitle}>Ingredients</div>
            <ul className={style.ingredientsList}>
              {dish.ingredients.map((ingredient, index) => (
                <li key={`${ingredient.name}-${index}`}>
                  <span className={style.ingrQty}>
                    {[ingredient.quantity, ingredient.unit]
                      .filter(Boolean)
                      .join(" ")}
                  </span>
                  <span className={style.ingrName}>{ingredient.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={style.viewSectionTitle}>Procedure</div>
            <ol className={style.procedureList}>
              {dish.procedure.map((step, index) => (
                <li key={`${step}-${index}`}>
                  <span className={style.stepNum}>{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={style.viewFooter}>
            <button
              className={`${style.btnSecondary} ${style.btnDelete}`}
              type="button"
              onClick={() => onDelete(dish)}
            >
              Delete
            </button>
            <button
              className={`${style.btnPrimary} ${style.btnEdit}`}
              type="button"
              onClick={handleEdit}
            >
              Edit Recipe
            </button>
            <button
              className={style.btnSecondary}
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
