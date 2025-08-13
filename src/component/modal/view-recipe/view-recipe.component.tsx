import { useState } from "react";

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
  CloseButton,
} from "./view-recipe.styles";

import type { DishDataType, Procedure } from "../../../types/dish.type";
import ViewRecipeTitle from "./view-recipe-title.component";
import UpdateRecipeForm from "../update-recipe/update-recipe-form.component";

type ViewRecipeProps = {
  dish: DishDataType;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: () => void;
};

const ViewRecipe = ({ dish, onClose, onDelete, onUpdate }: ViewRecipeProps) => {
  const { id, dishType, dishName, dishImage, ingredients, procedure } = dish;
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  const handleUpdateClick = () => {
    setIsUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setIsUpdateOpen(false);
    onUpdate();
  };

  const handleBackgroundClick = () => {
    if (!isUpdateOpen) {
      onClose();
    }
  };

  if (id === undefined) {
    console.warn(
      "Recipe being viewed has no ID. Cannot perform update/delete."
    );
    return (
      <ModalBackground onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <div>Error: Recipe ID not found.</div>
          <button onClick={onClose}>Close</button>
        </Modal>
      </ModalBackground>
    );
  }
  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {isUpdateOpen ? (
          <UpdateRecipeForm recipe={dish} onClose={handleUpdateClose} />
        ) : (
          <ViewRecipeContainer>
            <ImageSection>
              <ImageDisplay src={dishImage} />
            </ImageSection>
            <ContentSection>
              <ViewRecipeTitle
                id={id}
                title={dishName}
                tag={dishType}
                onDelete={onDelete}
                onUpdate={handleUpdateClick}
              />

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
                    <li key={index}>
                      {typeof step === "string"
                        ? step
                        : (step as Procedure).step}
                    </li>
                  ))}
                </ContentOrder>
              </ContentList>
              <CloseButton onClick={onClose}>Close</CloseButton>
            </ContentSection>
          </ViewRecipeContainer>
        )}
      </Modal>
    </ModalBackground>
  );
};

export default ViewRecipe;
