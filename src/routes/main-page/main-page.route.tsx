import { useParams, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApp } from "../../hooks/useApp";
import { Outlet } from "react-router";
import { GlobalStyle, RootContainer } from "../../App.styles";

import Title from "../../component/title/title.component";
import Navigation from "../../component/navigation/navigation.component";
import CardList from "../../component/card-list/card-list.component";
import ViewRecipe from "../../component/modal/view-recipe/view-recipe.component";
import AddRecipe from "../../component/modal/add-recipe/add-recipe.component";
import DeleteRecipe from "../../component/modal/delete-recipe/delete-recipe.component";

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
        (dish) => dish.dishName.toLowerCase().replace(/\s/g, "-") === slug
      )
    : null;

  return (
    <>
      <GlobalStyle />

      <RootContainer>
        <ToastContainer />
        {isAddRecipeOpen && (
          <AddRecipe onClose={addRecipeClose} onRecipeAdd={fetchData} />
        )}

        {slug &&
          location.pathname.startsWith("/recipe/view/") &&
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
      </RootContainer>
      <Outlet />
    </>
  );
};

export default MainPage;
