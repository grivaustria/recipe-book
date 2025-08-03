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
import AddRecipe from "./component/modal/add-recipe/add-recipe.component";
import DeleteRecipe from "./component/modal/delete-recipe/delete-recipe.component";

import type { DishDataType } from "./types/dish.type";

import { getRecipesFromFirestore } from "./utils/firebase.utils";
import { dishImages } from "./data/dish-images";
import { generatedDishImage } from "./utils/generatedDishImage";

const App = () => {
  const [dishData, setDishData] = useState<DishDataType[]>([]);
  const [searchField, setSearchField] = useState<string>("");

  const [selectedDishType, setSelectedDishType] = useState<string>("all");
  const [dishFilter, setDishFilter] = useState<DishDataType[]>([]);

  const [selectedDish, setSelectedDish] = useState<DishDataType | null>(null);
  const [isViewRecipeOpen, setIsViewRecipeOpen] = useState<boolean>(false);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState<boolean>(false);
  const [isDeleteRecipeOpen, setIsDeleteRecipeOpen] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const recipes = await getRecipesFromFirestore();
    const typedRecipes = recipes as DishDataType[];

    const recipesWithImages = typedRecipes.map((dish) => ({
      ...dish,
      dishImage:
        dish.dishImage ||
        dishImages[dish.dishName] ||
        generatedDishImage(dish.dishName),
    }));

    setDishData(recipesWithImages);
  }, []);

  // 👉 Fetch once on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 👉 Filtering logic when dishData, searchField, or selectedDishType changes
  useEffect(() => {
    let filteredDish = dishData;

    if (selectedDishType !== "all") {
      filteredDish = filteredDish.filter(
        (dish) => dish.dishType.toLowerCase() === selectedDishType.toLowerCase()
      );
    }

    if (searchField) {
      filteredDish = filteredDish.filter((dish) =>
        dish.dishName.toLowerCase().includes(searchField)
      );
    }

    setDishFilter(filteredDish);
  }, [dishData, searchField, selectedDishType]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
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
  };

  const deleteRecipeClick = (): void => {
    setIsDeleteRecipeOpen(true);
    setIsViewRecipeOpen(false);
  };

  const deleteRecipeClose = (): void => {
    setIsDeleteRecipeOpen(false);
    setSelectedDish(null);
    fetchData(); // Refresh data after deletion
  };

  const handleDishTypeChange = (dishType: string) => {
    setSelectedDishType(dishType);
  };

  const handleRecipeChange = () => {
    setIsViewRecipeOpen(false);
    fetchData(); // Refresh data after update
  };

  return (
    <>
      <ToastContainer />
      {isAddRecipeOpen && <AddRecipe onClose={addRecipeClose} />}
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
    </>
  );
};

export default App;
