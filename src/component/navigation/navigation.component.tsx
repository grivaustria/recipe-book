import { NavigationContainer, NavigationDish } from "./navigation.styles";

type NavigationProps = {
  selectedDishType: string;
  onDishTypeChange: (dishType: string) => void;
};

const Navigation = ({
  selectedDishType,
  onDishTypeChange,
}: NavigationProps) => {
  return (
    <>
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
    </>
  );
};

export default Navigation;
