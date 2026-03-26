import type { DishDataType } from "@app-types/dish";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import LazyImage from "@component/lazy-image/LazyImage";
import style from "./gallery-list.module.scss";

type GalleryListProps = {
  dishData: DishDataType[];
  totalDishCount: number;
  hasActiveGalleryFilter: boolean;
  isFirstLoginWalkthroughOpen: boolean;
  onCardClick: (dish: DishDataType) => void;
  onDeleteClick: (dish: DishDataType) => void;
  onAddRecipeClick: () => void;
  onDismissWalkthrough: () => void;
};

const firstLoginSteps = [
  {
    step: "01",
    title: "Add your first dish",
    description:
      "Open the recipe form, enter a dish name, choose a category, then add ingredients and steps.",
  },
  {
    step: "02",
    title: "Choose an image",
    description:
      "Upload a real photo if you have one, or skip it and let the app generate a preview for now.",
  },
  {
    step: "03",
    title: "Use search and filters later",
    description:
      "Once your recipes are saved, search by name or filter by category to find dishes faster.",
  },
] as const;

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
  totalDishCount,
  hasActiveGalleryFilter,
  isFirstLoginWalkthroughOpen,
  onCardClick,
  onDeleteClick,
  onAddRecipeClick,
  onDismissWalkthrough,
}: GalleryListProps) => {
  const hasDishes = dishData.length > 0;
  const isCollectionEmpty = totalDishCount === 0;
  const shouldShowFilteredEmptyState =
    !hasDishes && !isCollectionEmpty && hasActiveGalleryFilter;

  return (
    <div className={hasDishes ? style.listShell : style.emptyShell}>
      {hasDishes ? (
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
                    <LazyImage
                      src={dish.dishImage}
                      alt={dish.dishName}
                      className={style.dishImage}
                      wrapperClassName={style.lazyImageFrame}
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
          {shouldShowFilteredEmptyState ? (
            <>
              <div className={style.emptyEmoji}>Empty</div>
              <div className={style.emptyTitle}>No dishes found</div>
              <div className={style.emptySub}>
                Try a different search or filter.
              </div>
            </>
          ) : (
            <>
              <div className={style.emptyEyebrow}>First time here?</div>
              <div className={style.emptyTitle}>Let's set up your gallery</div>
              <div className={style.emptySub}>
                You do not have any saved dishes yet. Start with one recipe and
                the rest of your collection will build from there.
              </div>

              {isFirstLoginWalkthroughOpen && (
                <section className={style.walkthroughPanel}>
                  <div className={style.walkthroughHeader}>
                    <div>
                      <div className={style.walkthroughLabel}>
                        Quick walkthrough
                      </div>
                      <div className={style.walkthroughTitle}>
                        Here's what to do first
                      </div>
                    </div>

                    <button
                      className={style.walkthroughDismiss}
                      type="button"
                      onClick={onDismissWalkthrough}
                    >
                      Dismiss
                    </button>
                  </div>

                  <div className={style.walkthroughSteps}>
                    {firstLoginSteps.map((item) => (
                      <article
                        key={item.step}
                        className={style.walkthroughStep}
                      >
                        <div className={style.walkthroughStepNumber}>
                          {item.step}
                        </div>
                        <div className={style.walkthroughStepTitle}>
                          {item.title}
                        </div>
                        <p className={style.walkthroughStepDescription}>
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <button
                className={style.emptyAction}
                type="button"
                onClick={onAddRecipeClick}
              >
                Add your first dish
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryList;
