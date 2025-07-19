import { CardListContainer } from "./card-list.styles";
import type { DishDataType } from "../../types/dish.type";

import Card from "../card/card.component";
import CardAdd from "../card-add-recipe/card-add-recipe.component";

type CardListProps = {
  dishData: DishDataType[];
  onCardClick: (dish: DishDataType) => void;
  searchField: string;
};

const CardList = ({ dishData, onCardClick, searchField }: CardListProps) => {
  return (
    <CardListContainer>
      {dishData.length > 0 ? (
        <>
          {dishData.map((dish) => (
            <Card
              key={dish.dishName}
              dish={dish}
              onClick={() => onCardClick(dish)}
            />
          ))}
          {searchField === "" && <CardAdd />}
        </>
      ) : (
        searchField === "" && <CardAdd />
      )}
    </CardListContainer>
  );
};

export default CardList;
