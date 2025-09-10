import {
  Container,
  NavigationContainer,
  NavigationDish,
} from "./navigation.styles";
import type { ChangeEventHandler } from "react";
import SearchBar from "../search-bar/search-bar.component";


type NavigationProps = {
  selectedDishType: string;
  onDishTypeChange: (dishType: string) => void;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
};

const Navigation = ({
  selectedDishType,
  onDishTypeChange,
  onSearchChange,
}: NavigationProps) => {
  return (
    <Container>
      <NavigationContainer>
        <NavigationDish
          onClick={() =>
            onDishTypeChange(selectedDishType === "all" ? "" : "all")
          }
          className={selectedDishType === "all" ? "active" : ""}
        >
          All
        </NavigationDish>
        <NavigationDish
          onClick={() =>
            onDishTypeChange(selectedDishType === "fish" ? "all" : "fish")
          }
          className={selectedDishType === "fish" ? "active" : ""}
        >
          Fish
        </NavigationDish>
        <NavigationDish
          onClick={() =>
            onDishTypeChange(selectedDishType === "meat" ? "all" : "meat")
          }
          className={selectedDishType === "meat" ? "active" : ""}
        >
          Meat
        </NavigationDish>
        <NavigationDish
          onClick={() =>
            onDishTypeChange(selectedDishType === "dessert" ? "all" : "dessert")
          }
          className={selectedDishType === "dessert" ? "active" : ""}
        >
          Dessert
        </NavigationDish>
      </NavigationContainer>
      <SearchBar onChangeHandler={onSearchChange} />
    </Container>
  );
};

export default Navigation;
