import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DishDataType } from "@app-types/dish";
import { dishImages } from "@data/dish-images";
import {
  useGetAuthUserQuery,
  useGetRecipesQuery,
} from "@store/services/recipesApi";
import { generatedDishImage } from "@utils/generatedDishImage";

const buildWalkthroughStorageKey = (userId: string) =>
  `dishGaleria:firstLoginWalkthroughDismissed:${userId}`;

export const useApp = () => {
  const [searchField, setSearchField] = useState<string>("");
  const [selectedDishType, setSelectedDishType] = useState<string>("all");
  const [selectedDish, setSelectedDish] = useState<DishDataType | null>(null);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState<boolean>(false);
  const [isDeleteRecipeOpen, setIsDeleteRecipeOpen] = useState<boolean>(false);
  const [isFirstLoginWalkthroughOpen, setIsFirstLoginWalkthroughOpen] =
    useState(false);

  const navigate = useNavigate();
  const { data: user, isLoading: isAuthLoading } = useGetAuthUserQuery();
  const {
    data: recipes = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetRecipesQuery(undefined, {
    skip: !user,
  });

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/login");
    }
  }, [isAuthLoading, navigate, user]);

  const isInitializing = isAuthLoading || Boolean(user && isLoading);
  const hasActiveSearch = searchField.trim() !== "";
  const hasActiveDishTypeFilter = selectedDishType !== "all";

  useEffect(() => {
    if (!user?.uid) {
      setIsFirstLoginWalkthroughOpen(false);
      return;
    }

    if (recipes.length > 0) {
      setIsFirstLoginWalkthroughOpen(false);
      return;
    }

    const hasDismissedWalkthrough =
      localStorage.getItem(buildWalkthroughStorageKey(user.uid)) === "true";

    setIsFirstLoginWalkthroughOpen(!hasDismissedWalkthrough);
  }, [recipes.length, user?.uid]);

  const dishFilter = useMemo(() => {
    const recipesWithImages = recipes.map((dish) => {
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

    let filteredDish = recipesWithImages;

    if (selectedDishType !== "all") {
      filteredDish = filteredDish.filter(
        (dish) =>
          dish.dishType.toLowerCase() === selectedDishType.toLowerCase(),
      );
    }

    if (searchField) {
      filteredDish = filteredDish.filter((dish) =>
        dish.dishName.toLowerCase().includes(searchField),
      );
    }

    return filteredDish;
  }, [recipes, searchField, selectedDishType]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const viewRecipeClick = (dish: DishDataType) => {
    const slug = dish.dishName.toLocaleLowerCase().replace(/\s+/g, "-");
    navigate(`/recipe/view/${slug}`);
    setSelectedDish(dish);
  };

  const viewRecipeClose = () => {
    setSelectedDish(null);
    navigate("/");
  };

  const addRecipeClick = (): void => {
    setIsAddRecipeOpen(true);
    localStorage.removeItem("recipeFormDraft");
  };

  const addRecipeClose = (): void => {
    setIsAddRecipeOpen(false);
  };

  const deleteRecipeClick = (dish: DishDataType): void => {
    const slug = dish.dishName.toLowerCase().replace(/\s+/g, "-");
    setIsDeleteRecipeOpen(true);
    navigate(`/recipe/delete/${slug}`);
  };

  const deleteRecipeClose = (): void => {
    setIsDeleteRecipeOpen(false);
    navigate("/");
  };

  const handleDishTypeChange = (dishType: string) => {
    setSelectedDishType(dishType);
  };

  const handleRecipeChange = () => {
    navigate("/");
  };

  const dismissFirstLoginWalkthrough = () => {
    if (user?.uid) {
      localStorage.setItem(buildWalkthroughStorageKey(user.uid), "true");
    }

    setIsFirstLoginWalkthroughOpen(false);
  };

  return {
    searchField,
    selectedDishType,
    dishFilter,
    totalDishCount: recipes.length,
    hasActiveGalleryFilter: hasActiveSearch || hasActiveDishTypeFilter,
    isFirstLoginWalkthroughOpen,
    selectedDish,
    isAddRecipeOpen,
    isDeleteRecipeOpen,
    fetchData: refetch,
    onSearchChange,
    viewRecipeClick,
    viewRecipeClose,
    addRecipeClick,
    addRecipeClose,
    deleteRecipeClick,
    deleteRecipeClose,
    handleDishTypeChange,
    handleRecipeChange,
    dismissFirstLoginWalkthrough,
    isInitializing,
    isLoading: isAuthLoading || isLoading || isFetching,
  };
};
