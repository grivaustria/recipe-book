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
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [fetchData, navigate]);

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

  // Main Feature: View Recipe
  const viewRecipeClick = (dish: DishDataType) => {
    const slug = dish.dishName.toLocaleLowerCase().replace(/\s+/g, "-");
    navigate(`/recipe/view/${slug}`);
    setSelectedDish(dish);
  };

  const viewRecipeClose = () => {
    setSelectedDish(null);
    navigate("/");
  };

  // Main Feature: Add Recipe
  const addRecipeClick = (): void => {
    setIsAddRecipeOpen(true);
    localStorage.removeItem("recipeFormDraft");
  };

  const addRecipeClose = (): void => {
    setIsAddRecipeOpen(false);
    fetchData(); // Refresh data after closing add Recipe
  };

  // Main Feature: Delete Recipe
  const deleteRecipeClick = (dish: DishDataType): void => {
    const slug = dish.dishName.toLowerCase().replace(/\s+/g, "-");
    setIsDeleteRecipeOpen(true);
    navigate(`/recipe/delete/${slug}`);
  };

  const deleteRecipeClose = (): void => {
    fetchData(); // Refresh data after deletion
    navigate("/");
  };

  const handleDishTypeChange = (dishType: string) => {
    setSelectedDishType(dishType);
  };

  const handleRecipeChange = () => {
    fetchData(); // Refresh data after update
  };

  return {
    searchField,
    selectedDishType,
    dishFilter,
    selectedDish,
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
