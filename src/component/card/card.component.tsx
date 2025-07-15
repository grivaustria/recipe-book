import {
  CardContainer,
  DishImage,
  DishName,
  DishTextContainer,
} from "./card.styles";

import type { DishDataType } from "../../types/dish.type";

type CardProps = {
  dish: DishDataType;
};

const Card = ({ dish }: CardProps) => {
  const { dishName, dishImage } = dish;
  return (
    <CardContainer>
      <DishImage src={dishImage} alt="dish-chicken-adobo" />
      <DishTextContainer>
        <DishName className="dish-name">{dishName}</DishName>
      </DishTextContainer>
    </CardContainer>
    )
};

export default Card;
