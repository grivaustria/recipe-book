import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";

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
  SubmitRecipe,
  RecipeDetails,
} from "./add-recipe.styles";

import type {
  DishDataType,
  Ingredient,
  Procedure,
} from "../../../types/dish.type";

const AddRecipe = () => {
  const [dishName, setDishName] = useState<string>("");
  const [dishType, setDishType] = useState<string>("");
  const [dishImage, setDishImage] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      quantity: "",
      unit: "",
      name: "",
    },
  ]);
  const [procedure, setProcedure] = useState<Procedure[]>([
    {
      step: "",
    },
  ]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = event.target;
    if (id === "dishName") {
      setDishName(value);
    } else if (id === "dishType") {
      setDishType(value);
    }
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ): void => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addIngredientRow = (): void => {
    setIngredients([...ingredients, { quantity: "", unit: "cup", name: "" }]);
  };

  const removeIngredientRow = (indexToRemove: number): void => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
    } else {
      setIngredients([{ quantity: "", unit: "cup", name: "" }]);
    }
  };

  const handleProcedureChange = (index: number, value: string): void => {
    const newProcedure = [...procedure];
    newProcedure[index] = { ...newProcedure[index], step: value };
    setProcedure(newProcedure);
  };

  const addProcedureStep = (): void => {
    setProcedure([...procedure, { step: "" }]);
  };

  const removeProcedureStep = (indexToRemove: number): void => {
    if (procedure.length > 1) {
      setProcedure(procedure.filter((_, index) => index !== indexToRemove));
    } else {
      setProcedure([{ step: "" }]);
    }
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const recipeData: DishDataType = {
      dishName,
      dishType,
      ingredients: ingredients.filter(
        (ing) =>
          ing.quantity.trim() !== "" ||
          ing.unit.trim() !== "" ||
          ing.name.trim() !== ""
      ),
      procedure: procedure
        .map((p) => p.step.trim())
        .filter((step) => step !== ""),
    };

    console.log("Submitting Recipe:", recipeData);
    setDishName("");
    setDishImage("");
  };

  return (
    <ModalBackground>
      <Modal>
        {/* Form */}
        <AddRecipeContainer onSubmit={handleSubmit}>
          <RecipeDetails>
            <RecipeTitleContainer>
              <InputLabelContainer>
                <LabelText htmlFor="dishName">Recipe Name:</LabelText>
                <InputText
                  id="dishName"
                  type="text"
                  value={dishName}
                  onChange={handleInputChange}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer>
                <LabelText htmlFor="dishType">Dish Type:</LabelText>
                <SelectOption
                  id="dishType"
                  value={dishType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="fish">Fish</option>
                  <option value="meat">Meat</option>
                  <option value="dessert">Dessert</option>
                </SelectOption>
              </InputLabelContainer>
            </RecipeTitleContainer>

            <List className="ingredient">
              <ContentContainer>
                <LabelText>Quantity:</LabelText>
                <LabelText>Unit:</LabelText>
                <LabelText>Ingredients:</LabelText>
                <LabelText>Options:</LabelText>
              </ContentContainer>

              {ingredients.map((ingredient, index) => (
                <ContentContainer key={index}>
                  <InputText
                    type="number"
                    className="quantity"
                    placeholder="1"
                    value={ingredient.quantity}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleIngredientChange(
                        index,
                        "quantity",
                        event.target.value
                      )
                    }
                  />
                  <SelectOption
                    value={ingredient.unit}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      handleIngredientChange(index, "unit", event.target.value)
                    }
                  >
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
                    <option value="piece">piece(s)</option>
                  </SelectOption>
                  <InputText
                    type="text"
                    placeholder="e.g., garlic, salt"
                    value={ingredient.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleIngredientChange(index, "name", event.target.value)
                    }
                    required={index === 0}
                  />
                  <OptionsContainer>
                    <RemoveButton
                      type="button"
                      onClick={() => removeIngredientRow(index)}
                    >
                      &#10005;
                    </RemoveButton>
                    {index === ingredients.length - 1 && (
                      <AddItemButton
                        className="active"
                        type="button"
                        onClick={addIngredientRow}
                      >
                        Add Item
                      </AddItemButton>
                    )}
                  </OptionsContainer>
                </ContentContainer>
              ))}
            </List>

            <List className="procedure">
              <ContentContainer>
                <LabelText>Procedure</LabelText>
                <LabelText></LabelText>
                <LabelText></LabelText>
              </ContentContainer>

              {procedure.map((stepItem, index) => (
                <ContentContainer key={index}>
                  <InputText type="text" value={index + 1} readOnly />
                  <InputText
                    type="text"
                    placeholder="e.g. Marinate the chicken for 30 minutes"
                    value={stepItem.step}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleProcedureChange(index, event.target.value)
                    }
                    required={index === 0}
                  />
                  <OptionsContainer>
                    <RemoveButton
                      type="button"
                      onClick={() => removeProcedureStep(index)}
                    >
                      &#10005;
                    </RemoveButton>

                    {index === procedure.length - 1 && (
                      <AddItemButton type="button" onClick={addProcedureStep}>
                        Add Item
                      </AddItemButton>
                    )}
                  </OptionsContainer>
                </ContentContainer>
              ))}
            </List>
          </RecipeDetails>

          <SubmitRecipe type="submit">Add Recipe</SubmitRecipe>
        </AddRecipeContainer>
      </Modal>
    </ModalBackground>
  );
};

export default AddRecipe;
