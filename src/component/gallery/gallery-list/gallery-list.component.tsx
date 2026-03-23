import type { DishDataType } from "@app-types/dish";
import style from "./gallery-list.module.scss";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

type GalleryListProps = {
  dishData: DishDataType[];
  onCardClick: (dish: DishDataType) => void;
  onDeleteClick: (dish: DishDataType) => void;
  onAddRecipeClick: () => void;
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

const GalleryList = ({
  dishData,
  onCardClick,
  onDeleteClick,
  onAddRecipeClick,
}: GalleryListProps) => (
  <div className={dishData.length > 0 ? style.listShell : style.emptyShell}>
    {dishData.length > 0 ? (
      <div className={style.masonry}>
        {dishData.map((dish, index) => {
          const category = dish.dishType.toLowerCase();
          const emoji = dishTypeIcons[category] || "🍽";
          const badgeClass = dishTypeBadgeStyles[category] || "";

          return (
            <article
              key={dish.id ?? dish.dishName}
              className={style.dishCard}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => onCardClick(dish)}
            >
              <div className={style.imgWrap}>
                {dish.dishImage ? (
                  <img
                    src={dish.dishImage}
                    alt={dish.dishName}
                    loading="lazy"
                  />
                ) : (
                  <div className={style.imageFallback}>{emoji}</div>
                )}
                <div className={style.dishOverlay}>
                  <div className={style.overlayActions}>
                    <button
                      className={style.overlayBtn}
                      type="button"
                      title={`View ${dish.dishName}`}
                    >
                      <FaRegEye className="text-xl" />
                    </button>
                    <button
                      className={style.overlayBtn}
                      type="button"
                      title={`Delete ${dish.dishName}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteClick(dish);
                      }}
                    >
                      <RiDeleteBinFill className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
              <div className={style.dishInfo}>
                <span className={`${style.dishCatBadge} ${badgeClass}`}>
                  {emoji} {dish.dishType}
                </span>
                <div className={style.dishName}>{dish.dishName}</div>
              </div>
            </article>
          );
        })}

        <button
          className={style.addCard}
          type="button"
          onClick={onAddRecipeClick}
        >
          <div className={style.addIcon}>+</div>
          <div className={style.addLabel}>Add new dish</div>
        </button>
      </div>
    ) : (
      <div className={style.emptyState}>
        <div className={style.emptyEmoji}>Empty</div>
        <div className={style.emptyTitle}>No dishes found</div>
        <div className={style.emptySub}>Try a different search or filter.</div>
      </div>
    )}
  </div>
);

export default GalleryList;
