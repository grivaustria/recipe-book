import { useState, useEffect } from "react";

import { ModalBackground, Modal } from "../modal.styles";

import {
  AddRecipeContainer,
  RecipeTitleContainer,
  InputLabelContainer,
  LabelText,
  InputText,
  SelectOption,
  List,
  ContentContainer,
  OptionsContainer,
  RemoveButton,
  AddItemButton,
} from "./add-recipe.styles";

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [dishType, setDishType] = useState<string>("");
  const [ingredientColumn, setIngredientColumn] = useState<string[]>([]);
  const maxColumn = 5;

  

  return (
    <ModalBackground>
      <Modal>
        {/* Form */}
        <AddRecipeContainer>
          <RecipeTitleContainer>
            <InputLabelContainer>
              <LabelText htmlFor="recipeName">Recipe Name:</LabelText>
              <InputText id="recipeName" />
            </InputLabelContainer>
            <InputLabelContainer>
              <LabelText htmlFor="dishType">Dish Type:</LabelText>
              <SelectOption id="dishType">
                <option value="">&nbsp;</option>
                <option value="fish">Fish</option>
                <option value="meat">Meat</option>
                <option value="dessert">Dessert</option>
              </SelectOption>
            </InputLabelContainer>
          </RecipeTitleContainer>

          <List>
            <ContentContainer>
              <LabelText>Quantity:</LabelText>
              <LabelText>Unit:</LabelText>
              <LabelText>Ingredients:</LabelText>
              <LabelText>Options:</LabelText>
            </ContentContainer>

            <ContentContainer>
              <InputText type="number" className="quantity" />
              <SelectOption>
                <optgroup label="Weight">
                  <option value="milligram">milligram (mg)</option>
                  <option value="gram">gram (g)</option>
                  <option value="kilogram">kilogram (kg)</option>
                  <option value="ounce">ounce (oz)</option>
                  <option value="pound">pound (lb)</option>
                </optgroup>

                <optgroup label="Volume">
                  <option value="milliliter">milliliter (ml)</option>
                  <option value="liter">liter (L)</option>
                  <option value="teaspoon">teaspoon (tsp)</option>
                  <option value="tablespoon">tablespoon (tbsp)</option>
                  <option value="fluid-ounce">fluid ounce (fl oz)</option>
                  <option value="cup">cup (c)</option>
                  <option value="pint">pint (pt)</option>
                  <option value="quart">quart (qt)</option>
                  <option value="gallon">gallon (gal)</option>
                </optgroup>

                <optgroup label="Length">
                  <option value="millimeter">millimeter (mm)</option>
                  <option value="inch">inch (in)</option>
                </optgroup>
              </SelectOption>
              <InputText type="text" />
              <OptionsContainer>
                <RemoveButton>&#10005;</RemoveButton>
                <AddItemButton>Add Item</AddItemButton>
              </OptionsContainer>
            </ContentContainer>
          </List>

          <List>
            <ContentContainer>
              <LabelText>Procedure</LabelText>
            </ContentContainer>

            <ContentContainer>
              <InputText />
              <OptionsContainer>
                <RemoveButton>&#10005;</RemoveButton>
                <AddItemButton>Add Item</AddItemButton>
              </OptionsContainer>
            </ContentContainer>
          </List>
        </AddRecipeContainer>
      </Modal>
    </ModalBackground>
  );
};

export default AddRecipe;
