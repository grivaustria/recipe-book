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

import ChickenAdobo from "../../../assets/dish-chicken-adobo.jpg";

type ViewRecipeProps = {
  dishData: DishDataType[];
};

const ViewRecipe = ({ dishData }: ViewRecipeProps) => {
  console.log("viewRecipe", dishData);
  return (
    <ModalBackground>
      <Modal>
        <ViewRecipeContainer>
          <ImageSection>
            <ImageDisplay src={ChickenAdobo} />
            <ImageText>Chicken Inadobong Manok</ImageText>
          </ImageSection>
          <ContentSection>
            <ContentHeading>Ingredients</ContentHeading>
            <ContentBullet>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem quae officiis consequuntur animi ex aperiam, nam repellat accusamus dolores dicta illo impedit velit fugiat totam veritatis dolor distinctio? Provident, natus.</li>
                <li>allo</li>
                <li>allo</li>
                <li>allo</li>
                <li>allo</li>
                <li>allo</li>
                <li>allo</li>


            </ContentBullet>
            <ContentHeading>Procedure</ContentHeading>
            <ContentOrder>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, quidem? Saepe ad, aut minima tempora deleniti officiis doloribus nulla ullam unde enim. Nemo sit fugiat eum cumque voluptatibus laboriosam sapiente?</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, quidem? Saepe ad, aut minima tempora deleniti officiis doloribus nulla ullam unde enim. Nemo sit fugiat eum cumque voluptatibus laboriosam sapiente?</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, quidem? Saepe ad, aut minima tempora deleniti officiis doloribus nulla ullam unde enim. Nemo sit fugiat eum cumque voluptatibus laboriosam sapiente?</li>



            </ContentOrder>
            
          </ContentSection>
        </ViewRecipeContainer>
      </Modal>
    </ModalBackground>
  );
};

export default ViewRecipe;
