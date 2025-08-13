import { CardListContainer } from "./card-list.styles";
import type { DishDataType } from "../../types/dish.type";

import Card from "../card/card.component";
import CardAdd from "../card-add-recipe/card-add-recipe.component";

import { useWindowResize } from "../../hooks/useWindowResize";

type CardListProps = {
  dishData: DishDataType[];
  onCardClick: (dish: DishDataType) => void;
  searchField: string;
  onAddRecipeClick: () => void;
};

const CardList = ({
  dishData,
  onCardClick,
  searchField,
  onAddRecipeClick,
}: CardListProps) => {
  const { showComponent } = useWindowResize();

  return (
    <CardListContainer>
      {dishData.length > 0 ? (
        <>
          {dishData.map((dish) => (
            <Card key={dish.id} dish={dish} onClick={() => onCardClick(dish)} />
          ))}
          {searchField === "" &&
            (showComponent ? (
              <CardAdd onAddRecipeClick={onAddRecipeClick} />
            ) : null)}
        </>
      ) : (
        searchField === "" &&
        (showComponent ? <CardAdd onAddRecipeClick={onAddRecipeClick} /> : null)
      )}
    </CardListContainer>
  );
};

export default CardList;
