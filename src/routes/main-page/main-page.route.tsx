import { Suspense } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@hooks/useApp";
import { Outlet } from "react-router";

import Header from "@component/header/Header";
import Gallery from "@component/gallery/gallery";
import GalleryModal from "@component/gallery/gallery-modal/gallery-modal.component";
import UpdateRecipeForm from "@component/modal/update-recipe/update-recipe-form.component";
import AddEditRecipe from "@component/modal/add-edit-recipe/add-edit-recipe.component";
import DeleteRecipe from "@component/modal/delete-recipe/revamp/delete-recipe.component";
import ResponsiveFeedback from "@component/responsive-feedback/responsive-feedback.component";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const {
    searchField,
    selectedDishType,
    dishFilter,
    totalDishCount,
    hasActiveGalleryFilter,
    isFirstLoginWalkthroughOpen,
    isAddRecipeOpen,
    onSearchChange,
    viewRecipeClick,
    viewRecipeClose,
    addRecipeClick,
    addRecipeClose,
    deleteRecipeClick,
    deleteRecipeClose,
    handleDishTypeChange,
    dismissFirstLoginWalkthrough,
    isInitializing,
    isLoading,
  } = useApp();

  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentSelectedDish = slug
    ? dishFilter.find(
        (dish) => dish.dishName.toLowerCase().replace(/\s/g, "-") === slug,
      )
    : null;

  return (
    <>
      <ResponsiveFeedback />
      <Suspense fallback={null}>
        {isAddRecipeOpen && <AddEditRecipe onClose={addRecipeClose} />}

        {slug &&
          location.pathname.startsWith("/recipe/view/") &&
          currentSelectedDish && (
            <GalleryModal
              dish={currentSelectedDish}
              onClose={viewRecipeClose}
              onDelete={deleteRecipeClick}
            />
          )}

        {slug &&
          location.pathname.startsWith("/recipe/update/") &&
          currentSelectedDish && (
            <UpdateRecipeForm
              recipe={currentSelectedDish}
              onClose={() => navigate(`/recipe/view/${slug}`)}
            />
          )}

        {slug &&
          location.pathname.startsWith("/recipe/delete/") &&
          currentSelectedDish && (
            <DeleteRecipe
              dish={currentSelectedDish}
              onClose={deleteRecipeClose}
            />
          )}
      </Suspense>

      <div className="flex h-full w-full flex-col items-center gap-4">
        <section className="w-full flex flex-col">
          <Header
            onSearchChange={onSearchChange}
            onDishTypeChange={handleDishTypeChange}
            selectedDishType={selectedDishType}
          />
          <Gallery
            dishData={dishFilter}
            totalDishCount={totalDishCount}
            hasActiveGalleryFilter={hasActiveGalleryFilter}
            isFirstLoginWalkthroughOpen={isFirstLoginWalkthroughOpen}
            onCardClick={viewRecipeClick}
            searchField={searchField}
            onAddRecipeClick={addRecipeClick}
            onDeleteClick={deleteRecipeClick}
            onDismissWalkthrough={dismissFirstLoginWalkthrough}
            isInitializing={isInitializing}
            isLoading={isLoading}
          />
        </section>
      </div>
      <Outlet />
    </>
  );
};

export default MainPage;
