import { CardListContainer } from "./card-list.styles";
import type { DishDataType } from "../../types/dish.type";

import Card from "../card/card.component";
import CardAdd from "../card-add-recipe/card-add-recipe.component";

type CardListProps = {
    dishData: DishDataType[];
}

const CardList = ({dishData}: CardListProps) => {
    return (
        <CardListContainer>
            {/* {dishData.map((dish) => <Card dish={dish} />)} */}
            {dishData.length > 0 ? (
                <>
                {dishData.map((dish) => <Card dish={dish} />)}
                <CardAdd />

                </>
                
            ) : (
                <CardAdd />
            )}
            
        </CardListContainer>
    )
}

export default CardList;