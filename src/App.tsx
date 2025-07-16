import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'

import './App.scss'

import Navigation from './component/navigation/navigation.component'
import SearchBar from './component/search-bar/search-bar.component'
import CardList from './component/card-list/card-list.component';
import ViewRecipe from './component/modal/view-recipe/view-recipe.component'

import { dishJSON } from './data/dish-temp'
import type { DishDataType } from './types/dish.type'

function App() {
  const dishData: DishDataType[] = dishJSON;
  const [searchField, setSearchField] = useState<string>("");
  const [dishFilter, setDishFilter] = useState<DishDataType[]>(dishData);
  const [selectedDish, setSelectedDish] = useState<DishDataType | null>(null);
  const [isViewRecipeOpen, setIsViewRecipeOpen] = useState<boolean>(false);

  useEffect(() => {
    const newFilteredDish = dishData.filter((dish) => dish.dishName.toLocaleLowerCase().includes(searchField));
    setDishFilter(newFilteredDish);
  }, [dishData, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  const viewRecipeClick = (dish: DishDataType) => {
    setSelectedDish(dish);
    setIsViewRecipeOpen(true);
  }

  const viewRecipeClose = () => {
    setIsViewRecipeOpen(false);
    setSelectedDish(null);
  }

  return (
    <>
      {isViewRecipeOpen && selectedDish && <ViewRecipe dish={selectedDish} onClose={viewRecipeClose} />}
      
      <Navigation />
      <SearchBar onChangeHandler={onSearchChange} />
      <CardList dishData={dishFilter} onCardClick={viewRecipeClick}/>
    </>
  )
}

export default App
