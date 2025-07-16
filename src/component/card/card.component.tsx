import {
  CardContainer,
  DishImage,
  DishName,
  DishTextContainer,
} from "./card.styles";

import type { DishDataType } from "../../types/dish.type";

type CardProps = {
  dish: DishDataType;
  onClick: () => void;
};

const Card = ({ dish, onClick }: CardProps) => {
  const { dishName, dishImage } = dish;
  return (
    <CardContainer onClick={onClick}>
      <DishImage src={dishImage} alt={`dish-${dishName.replace(/\s+/g,'')}`} />
      <DishTextContainer>
        <DishName className="dish-name">{dishName}</DishName>
      </DishTextContainer>
    </CardContainer>
    )
};

export default Card;
