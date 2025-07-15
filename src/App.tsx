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

  useEffect(() => {
    // console.log(dishData)
    const newFilteredDish = dishData.filter((dish) => dish.dishName.toLocaleLowerCase().includes(searchField));
    setDishFilter(newFilteredDish);
  }, [dishData, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <>
      <ViewRecipe dishData={dishFilter} />
      <Navigation />
      <SearchBar onChangeHandler={onSearchChange} />
      <CardList dishData={dishFilter} />
    </>
  )
}

export default App
