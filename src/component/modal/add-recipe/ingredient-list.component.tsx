import type { Ingredient } from "../../../types/dish.type";

import {
  ContentContainer,
  InputText,
  SelectOption,
  LabelText,
  OptionsContainer,
} from "../add-recipe/add-recipe.styles";

import { RemoveButton, AddItemButton } from "../../button/button.styled";

type IngredientListProps = {
  ingredients: Ingredient[];
  onChange: (index: number, field: keyof Ingredient, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const IngredientList = ({
  ingredients,
  onChange,
  onAdd,
  onRemove,
}: IngredientListProps) => {
  return (
    <>
      <ContentContainer>
        <LabelText>Quantity:</LabelText>
        <LabelText>Unit:</LabelText>
        <LabelText>Ingredients:</LabelText>
        <LabelText>Options:</LabelText>
      </ContentContainer>

      {ingredients.map((ingredient, index) => (
        <ContentContainer key={index}>
          <InputText
            type="text"
            className="quantity"
            placeholder="1"
            value={ingredient.quantity}
            onChange={(event) =>
              onChange(index, "quantity", event.target.value)
            }
          />
          <SelectOption
            value={ingredient.unit}
            onChange={(event) => onChange(index, "unit", event.target.value)}
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
            onChange={(event) => onChange(index, "name", event.target.value)}
            required={index === 0}
          />
          <OptionsContainer>
            <RemoveButton type="button" onClick={() => onRemove(index)}>
              &#10005;
            </RemoveButton>
            {index === ingredients.length - 1 && (
              <AddItemButton className="active" type="button" onClick={onAdd}>
                Add Item
              </AddItemButton>
            )}
          </OptionsContainer>
        </ContentContainer>
      ))}
    </>
  );
};

export default IngredientList;
