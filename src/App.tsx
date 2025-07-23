import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await getRecipesFromFirestore();

      console.log(recipes);

      const typedRecipes = recipes as DishDataType[];

      const recipesWithImages = typedRecipes.map((dish) => ({
        ...dish,
        dishImage: dishImages[dish.dishName] || "",
      }));

      setDishData(recipesWithImages);
    };

    fetchData();
  }, []);

  const [searchField, setSearchField] = useState<string>("");

  // For Sorting DishType
  const [selectedDishType, setSelectedDishType] = useState<string>("all");

  const [dishFilter, setDishFilter] = useState<DishDataType[]>(dishData);

  // For View Recipe
  const [selectedDish, setSelectedDish] = useState<DishDataType | null>(null);
  const [isViewRecipeOpen, setIsViewRecipeOpen] = useState<boolean>(false);

  useEffect(() => {
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
  }, [dishData, searchField, selectedDishType]);

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

  const handleDishTypeChange = (dishType: string) => {
    setSelectedDishType(dishType);
  };

  return (
    <>
      <AddRecipe />
      {isViewRecipeOpen && selectedDish && <ViewRecipe dish={selectedDish} onClose={viewRecipeClose} />}
      <Title />
      <Navigation
        selectedDishType={selectedDishType}
        onDishTypeChange={handleDishTypeChange}
      />
      <SearchBar onChangeHandler={onSearchChange} />
      <CardList dishData={dishFilter} onCardClick={viewRecipeClick} searchField={searchField} />
    </>
  );
};

export default App;
