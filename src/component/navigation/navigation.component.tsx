import {
  NavigationContainer,
  NavigationHeading,
  NavigationFish,
  NavigationMeat,
  NavigationDessert,
} from "./navigation.styles";

import NavFish from "../../assets/lucide--fish.svg"
import NavMeat from "../../assets/mdi--meat-outline.svg"
import NavDessert from "../../assets/ep--dessert.svg"

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <NavigationFish>
            <img src={NavFish} alt="icon-lucide--fish" /> 
            <NavigationHeading>Fish</NavigationHeading>
        </NavigationFish>
        <NavigationMeat>
            <img src={NavMeat} alt="icon-mdi--meat-outline" />
            <NavigationHeading>Meat</NavigationHeading>
        </NavigationMeat>
        <NavigationDessert>
            <img src={NavDessert} alt="icon-ep--dessert" />
            <NavigationHeading>Dessert</NavigationHeading>
        </NavigationDessert>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
