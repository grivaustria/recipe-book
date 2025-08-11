import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApp } from "./hooks/useApp";

import { GlobalStyle, RootContainer } from "./App.styles";

import Title from "./component/title/title.component";
import Navigation from "./component/navigation/navigation.component";
import SearchBar from "./component/search-bar/search-bar.component";
import CardList from "./component/card-list/card-list.component";
import ViewRecipe from "./component/modal/view-recipe/view-recipe.component";
import AddRecipe from "./component/modal/add-recipe/add-recipe.component";
import DeleteRecipe from "./component/modal/delete-recipe/delete-recipe.component";

const App = () => {
  const {
    searchField,
    selectedDishType,
    dishFilter,
    selectedDish,
    isViewRecipeOpen,
    isAddRecipeOpen,
    isDeleteRecipeOpen,
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
  } = useApp();

  return (
    <>
      <GlobalStyle />
      <RootContainer>
        <ToastContainer />
        {isAddRecipeOpen && (
          <AddRecipe onClose={addRecipeClose} onRecipeAdd={fetchData} />
        )}
        {isDeleteRecipeOpen && selectedDish && (
          <DeleteRecipe dish={selectedDish} onClose={deleteRecipeClose} />
        )}
        {isViewRecipeOpen && selectedDish && (
          <ViewRecipe
            dish={selectedDish}
            onClose={viewRecipeClose}
            onDelete={deleteRecipeClick}
            onUpdate={handleRecipeChange}
          />
        )}

        <Title />
        <Navigation
          selectedDishType={selectedDishType}
          onDishTypeChange={handleDishTypeChange}
        />
        <SearchBar onChangeHandler={onSearchChange} />

        <CardList
          dishData={dishFilter}
          onCardClick={viewRecipeClick}
          searchField={searchField}
          onAddRecipeClick={addRecipeClick}
        />
      </RootContainer>
    </>
  );
};

export default App;
