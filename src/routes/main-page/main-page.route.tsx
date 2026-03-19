import { lazy, Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApp } from "../../hooks/useApp";
import { Outlet } from "react-router";

import Title from "../../component/title/title.component";
import Navigation from "../../component/navigation/navigation.component";
import CardList from "../../component/card-list/card-list.component";

const ViewRecipe = lazy(
  () => import("../../component/modal/view-recipe/view-recipe.component"),
);
const AddRecipe = lazy(
  () => import("../../component/modal/add-recipe/add-recipe.component"),
);
const DeleteRecipe = lazy(
  () => import("../../component/modal/delete-recipe/delete-recipe.component"),
);

const MainPage = () => {
  const {
    searchField,
    selectedDishType,
    dishFilter,
    isAddRecipeOpen,
    fetchData,
    onSearchChange,
    viewRecipeClick,
    viewRecipeClose,
    addRecipeClick,
    addRecipeClose,
    deleteRecipeClick,
    deleteRecipeClose,
    handleDishTypeChange,
    handleRecipeChange,
    isLoading,
  } = useApp();

  const { slug } = useParams();
  const location = useLocation();

  const currentSelectedDish = slug
    ? dishFilter.find(
        (dish) => dish.dishName.toLowerCase().replace(/\s/g, "-") === slug,
      )
    : null;

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center gap-4">
        <ToastContainer />
        <Suspense fallback={null}>
          {isAddRecipeOpen && (
            <AddRecipe onClose={addRecipeClose} onRecipeAdd={fetchData} />
          )}

          {slug &&
            (location.pathname.startsWith("/recipe/view/") ||
              location.pathname.startsWith("/recipe/update/")) &&
            currentSelectedDish && (
              <ViewRecipe
                dish={currentSelectedDish}
                onClose={viewRecipeClose}
                onDelete={deleteRecipeClick}
                onUpdate={handleRecipeChange}
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

        <Title />
        <Navigation
          selectedDishType={selectedDishType}
          onDishTypeChange={handleDishTypeChange}
          onSearchChange={onSearchChange}
        />

        <CardList
          dishData={dishFilter}
          onCardClick={viewRecipeClick}
          searchField={searchField}
          onAddRecipeClick={addRecipeClick}
          isLoading={isLoading}
        />
      </div>
      <Outlet />
    </>
  );
};

export default MainPage;
