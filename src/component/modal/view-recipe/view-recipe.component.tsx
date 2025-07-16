import { ModalBackground, Modal } from "../modal.styles";
import {
  ViewRecipeContainer,
  ImageSection,
  ContentSection,
  ImageDisplay,
  ImageText,
  ContentHeading,
  ContentBullet,
  ContentOrder,
} from "./view-recipe.styles";

import type { DishDataType } from "../../../types/dish.type";


type ViewRecipeProps = {
  dish: DishDataType;
  onClose: () => void;
};

const ViewRecipe = ({ dish, onClose }: ViewRecipeProps) => {
  const {dishName, dishImage, ingredients, procedure} = dish;
  return (
    <ModalBackground onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ViewRecipeContainer>
          <ImageSection>
            <ImageDisplay src={dishImage} />
            <ImageText>{dishName}</ImageText>
          </ImageSection>
          <ContentSection>
            <ContentHeading>Ingredients</ContentHeading>
            <ContentBullet>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                ))}


            </ContentBullet>
            <ContentHeading>Procedure</ContentHeading>
            <ContentOrder>
                {procedure.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}


            </ContentOrder>
            
          </ContentSection>
        </ViewRecipeContainer>
      </Modal>
    </ModalBackground>
  );
};

export default ViewRecipe;
