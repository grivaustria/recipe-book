import { ModalBackground, Modal } from "../modal.styles";
import {
  ViewRecipeContainer,
  ImageSection,
  ContentSection,
  ImageDisplay,
  ContentHeading,
  ContentBullet,
  ContentOrder,
  ContentList,
} from "./view-recipe.styles";

import type { DishDataType } from "../../../types/dish.type";
import ViewRecipeTitle from "./view-recipe-title.component";

type ViewRecipeProps = {
  dish: DishDataType;
  onClose: () => void;
  onDelete: () => void;
};

const ViewRecipe = ({ dish, onClose, onDelete }: ViewRecipeProps) => {
  const { id, dishType, dishName, dishImage, ingredients, procedure } = dish;
  return (
    <ModalBackground onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ViewRecipeContainer>
          <ImageSection>
            <ImageDisplay src={dishImage} />
          </ImageSection>
          <ContentSection>
            <ViewRecipeTitle id={id} title={dishName} tag={dishType} onDelete={onDelete} />

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
