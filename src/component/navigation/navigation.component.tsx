import {
  NavigationContainer,
  NavigationHeading,
  NavigationFish,
  NavigationMeat,
  NavigationDessert,
} from "./navigation.styles";

import NavFish from "../../assets/lucide--fish.svg";
import NavMeat from "../../assets/mdi--meat-outline.svg";
import NavDessert from "../../assets/ep--dessert.svg";

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
        <NavigationFish
          onClick={() => onDishTypeChange("fish")}
          className={selectedDishType === "fish" ? "active" : ""}
        >
          <img src={NavFish} alt="icon-lucide--fish" />
          <NavigationHeading>Fish</NavigationHeading>
        </NavigationFish>
        <NavigationMeat
          onClick={() => onDishTypeChange("meat")}
          className={selectedDishType === "meat" ? "active" : ""}
        >
          <img src={NavMeat} alt="icon-mdi--meat-outline" />
          <NavigationHeading>Meat</NavigationHeading>
        </NavigationMeat>
        <NavigationDessert
          onClick={() => onDishTypeChange("dessert")}
          className={selectedDishType === "dessert" ? "active" : ""}
        >
          <img src={NavDessert} alt="icon-ep--dessert" />
          <NavigationHeading>Dessert</NavigationHeading>
        </NavigationDessert>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
