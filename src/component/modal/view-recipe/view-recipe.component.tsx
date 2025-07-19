import { ModalBackground, Modal } from "../modal.styles";
import {
  ViewRecipeContainer,
  ImageSection,
  ContentSection,
  ImageDisplay,
  ContentTitle,
  ContentHeading,
  ContentText,
  ContentBullet,
  ContentOrder,
  ContentTag,
  ContentList,
} from "./view-recipe.styles";

import type { DishDataType } from "../../../types/dish.type";

type ViewRecipeProps = {
  dish: DishDataType;
  onClose: () => void;
};

const ViewRecipe = ({ dish, onClose }: ViewRecipeProps) => {
  const { dishType, dishName, dishImage, ingredients, procedure } = dish;
  return (
    <ModalBackground onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ViewRecipeContainer>
          <ImageSection>
            <ImageDisplay src={dishImage} />
          </ImageSection>
          <ContentSection>
            <ContentTitle>
              <ContentText>{dishName}</ContentText>
              <ContentTag>{dishType}</ContentTag>
            </ContentTitle>

            <ContentList>
              <ContentHeading>Ingredients</ContentHeading>
              <ContentBullet>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ContentBullet>
            </ContentList>

            <ContentList>
              <ContentHeading>Procedure</ContentHeading>
              <ContentOrder>
                {procedure.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ContentOrder>
            </ContentList>
          </ContentSection>
        </ViewRecipeContainer>
      </Modal>
    </ModalBackground>
  );
};

export default ViewRecipe;
