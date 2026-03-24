import type { DishDataType } from "@app-types/dish";
import GalleryList from "@component/gallery/gallery-list/gallery-list.component";
import GalleryHeader from "@component/gallery/galler-header/gallery-header.component";
import Spinner from "@component/spinner/spinner.component";
import style from "./gallery.module.scss";

type GalleryProps = {
  dishData: DishDataType[];
  totalDishCount: number;
  hasActiveGalleryFilter: boolean;
  isFirstLoginWalkthroughOpen: boolean;
  onCardClick: (dish: DishDataType) => void;
  searchField: string;
  onAddRecipeClick: () => void;
  onDeleteClick: (dish: DishDataType) => void;
  onDismissWalkthrough: () => void;
  isInitializing: boolean;
  isLoading: boolean;
};

const Gallery = ({
  dishData,
  totalDishCount,
  hasActiveGalleryFilter,
  isFirstLoginWalkthroughOpen,
  onCardClick,
  onAddRecipeClick,
  onDeleteClick,
  onDismissWalkthrough,
  isInitializing,
}: GalleryProps) => {
  const dishCount = dishData.length;
  const dishLabel = dishCount === 1 ? "dish" : "dishes";

  return (
    <main className={style.main}>
      <GalleryHeader dishCount={dishCount} label={dishLabel} />
      <div className={style.content}>
        {isInitializing ? (
          <div className={style.loadingState}>
            <Spinner />
          </div>
        ) : (
          <GalleryList
            dishData={dishData}
            totalDishCount={totalDishCount}
            hasActiveGalleryFilter={hasActiveGalleryFilter}
            isFirstLoginWalkthroughOpen={isFirstLoginWalkthroughOpen}
            onCardClick={onCardClick}
            onDeleteClick={onDeleteClick}
            onAddRecipeClick={onAddRecipeClick}
            onDismissWalkthrough={onDismissWalkthrough}
          />
        )}
      </div>
    </main>
  );
};

export default Gallery;
