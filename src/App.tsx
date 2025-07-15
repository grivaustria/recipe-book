import { useState } from 'react'

import './App.scss'

import Navigation from './component/navigation/navigation.component'
import SearchBar from './component/search-bar/search-bar.component'
import Card from './component/card/card.component'

import { dishJSON } from './data/dish-temp'

function App() {
  const dishData = dishJSON;
  return (
    <>
      <Navigation />
      <SearchBar />
      <Card />
    </>
  )
}

export default App
