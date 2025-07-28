import { useState, useEffect, useCallback } from "react";

import type { ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";

import Title from "./component/title/title.component";
import Navigation from "./component/navigation/navigation.component";
import SearchBar from "./component/search-bar/search-bar.component";
import CardList from "./component/card-list/card-list.component";
import ViewRecipe from "./component/modal/view-recipe/view-recipe.component";

import type { DishDataType } from "./types/dish.type";

import { getRecipesFromFirestore } from "./utils/firebase.utils";
import { dishImages } from "./data/dish-images";
import AddRecipe from "./component/modal/add-recipe/add-recipe.component";

const App = () => {
  const [dishData, setDishData] = useState<DishDataType[]>([]);
  const [searchField, setSearchField] = useState<string>("");

  // For Sorting DishType
  const [selectedDishType, setSelectedDishType] = useState<string>("all");
  const [dishFilter, setDishFilter] = useState<DishDataType[]>(dishData);

  // For View Recipe
  const [selectedDish, setSelectedDish] = useState<DishDataType | null>(null);
  const [isViewRecipeOpen, setIsViewRecipeOpen] = useState<boolean>(false);

  // For Add Recipe
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const recipes = await getRecipesFromFirestore();
    const typedRecipes = recipes as DishDataType[];

    const recipesWithImages = typedRecipes.map((dish) => ({
      ...dish,
      dishImage: dishImages[dish.dishName] ?? dish.dishImage,
    }));

    setDishData(recipesWithImages);
  }, []);

  useEffect(() => {
    fetchData();

    let filteredDish = dishData;

    if (selectedDishType !== "all") {
      filteredDish = filteredDish.filter(
        (dish) => dish.dishType.toLowerCase() === selectedDishType.toLowerCase()
      );
    }

    if (searchField) {
      filteredDish = filteredDish.filter((dish) =>
        dish.dishName.toLocaleLowerCase().includes(searchField)
      );
    }

    setDishFilter(filteredDish);
    fetchData();
  }, [dishData, fetchData, searchField, selectedDishType]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const viewRecipeClick = (dish: DishDataType) => {
    setSelectedDish(dish);
    setIsViewRecipeOpen(true);
  };

  const viewRecipeClose = () => {
    setIsViewRecipeOpen(false);
    setSelectedDish(null);
  };

  const addRecipeClick = (): void => {
    setIsAddRecipeOpen(true);
  };

  const addRecipeClose = (): void => {
    setIsAddRecipeOpen(false);
    console.log(isAddRecipeOpen);
  };

  const handleDishTypeChange = (dishType: string) => {
    setSelectedDishType(dishType);
  };

  const handleRecipeDeleted = () => {
    viewRecipeClose();
    fetchData();
  };

  return (
    <>
      <ToastContainer />
      {isAddRecipeOpen && <AddRecipe onClose={addRecipeClose} />}

      {isViewRecipeOpen && selectedDish && (
        <ViewRecipe dish={selectedDish} onClose={viewRecipeClose} onDelete={handleRecipeDeleted} />
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
    </>
  );
};

export default App;
