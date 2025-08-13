import {
  CardContainer,
  DishImage,
  DishName,
  DishTextContainer,
  DishType,
} from "./card.styles";

import type { DishDataType } from "../../types/dish.type";

type CardProps = {
  dish: DishDataType;
  onClick: () => void;
};

const Card = ({ dish, onClick }: CardProps) => {
  const { dishName, dishImage, dishType } = dish;

  return (
    <CardContainer onClick={onClick}>
      <DishImage src={dishImage} alt={`dish-${dishName.replace(/\s+/g, "")}`} />
      <DishTextContainer>
        <DishName className="dish-name">{dishName}</DishName>
        <DishType>{dishType}</DishType>
      </DishTextContainer>
    </CardContainer>
  );
};

export default Card;
