import { useState, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import type { DishDataType } from "../types/dish.type";
import { useNavigate } from "react-router-dom";

import { getRecipesFromFirestore, auth } from "../utils/firebase.utils";
import { dishImages } from "../data/dish-images";
import { generatedDishImage } from "../utils/generatedDishImage";
import { onAuthStateChanged } from "firebase/auth";

export const useApp = () => {
  const [dishData, setDishData] = useState<DishDataType[]>([]);
  const [searchField, setSearchField] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedDishType, setSelectedDishType] = useState<string>("all");
  const [dishFilter, setDishFilter] = useState<DishDataType[]>([]);

  const [selectedDish, setSelectedDish] = useState<DishDataType | null>(null);
  const [isViewRecipeOpen] = useState<boolean>(false);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState<boolean>(false);
  const [isDeleteRecipeOpen, setIsDeleteRecipeOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const recipes = await getRecipesFromFirestore();
    const typedRecipes = recipes as DishDataType[];

    const recipesWithImages = typedRecipes.map((dish) => {
      const mappedImage = dishImages[dish.dishName];
      const hasGenerated = dish.dishImage?.startsWith("data:image/png");

      return {
        ...dish,
        dishImage:
          mappedImage ||
          (!hasGenerated ? dish.dishImage : null) ||
          generatedDishImage(dish.dishName),
      };
    });

    setDishData(recipesWithImages);
    setIsLoading(false);
  }, []);

  // 👉 Fetch once on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        setDishData([]);
      }
    });
    return unsubscribe;
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
    const slug = dish.dishName.toLocaleLowerCase().replace(/\s+/g, "-");
    navigate(`/recipe/${slug}`);
    setSelectedDish(dish);
    // setIsViewRecipeOpen(true);
  };

  const viewRecipeClose = () => {
    // setIsViewRecipeOpen(false);
    setSelectedDish(null);
    navigate("/");
  };

  const addRecipeClick = (): void => {
    setIsAddRecipeOpen(true);
    localStorage.removeItem("recipeFormDraft");
    // console.log("Open: Add New Dish");
  };

  const addRecipeClose = (): void => {
    setIsAddRecipeOpen(false);
    fetchData(); // Refresh data after closing add Recipe
    // console.log("Close: Add New Dish");
  };

  const deleteRecipeClick = (): void => {
    setIsDeleteRecipeOpen(true);
    // setIsViewRecipeOpen(false);
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
    // setIsViewRecipeOpen(false);
    fetchData(); // Refresh data after update
  };

  return {
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
    isLoading,
  };
};
