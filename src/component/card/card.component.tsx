import { CardContainer, DishImage, DishName, DishTextContainer } from "./card.styles";

import ChickenAdobo from "../../assets/dish-chicken-adobo.jpg"
const Card = () => {
    return (
        <CardContainer>
            <DishImage src={ChickenAdobo} alt="dish-chicken-adobo" />
            <DishTextContainer>
                <DishName className="dish-name">Chicken Adobo</DishName>
            </DishTextContainer>
        </CardContainer>
    )
}

export default Card;