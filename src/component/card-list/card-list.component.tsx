import { CardListContainer } from "./card-list.styles";
import type { DishDataType } from "../../types/dish.type";

import Card from "../card/card.component";

type CardListProps = {
    dishData: DishDataType[];
}

const CardList = ({dishData}: CardListProps) => {
    return (
        <CardListContainer>
            {dishData.map((dish) => <Card dish={dish} />)}
            
        </CardListContainer>
    )
}

export default CardList;