import type { Ingredient } from "../../../types/dish.type";

type IngredientListProps = {
  ingredients: Ingredient[];
  onChange: (index: number, field: keyof Ingredient, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  labelClass: string;
  inputClass: string;
  removeButtonClass: string;
  addButtonClass: string;
};

const IngredientList = ({
  ingredients,
  onChange,
  onAdd,
  onRemove,
  labelClass,
  inputClass,
  removeButtonClass,
  addButtonClass,
}: IngredientListProps) => (
  <>
    <div className="hidden w-full grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,2.4fr)_auto] gap-2 md:grid">
      <span className={labelClass}>Quantity:</span>
      <span className={labelClass}>Unit:</span>
      <span className={labelClass}>Ingredients:</span>
      <span className={labelClass}>Options:</span>
    </div>

    {ingredients.map((ingredient, index) => (
      <div
        key={index}
        className="grid w-full gap-2 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,2.4fr)_auto]"
      >
        <input
          className={inputClass}
          type="text"
          placeholder="1"
          value={ingredient.quantity}
          onChange={(event) => onChange(index, "quantity", event.target.value)}
        />
        <select
          className={inputClass}
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
        </select>
        <input
          className={inputClass}
          type="text"
          placeholder="e.g., garlic, salt"
          value={ingredient.name}
          onChange={(event) => onChange(index, "name", event.target.value)}
          required={index === 0}
        />
        <div className="flex items-center gap-2">
          <button
            className={removeButtonClass}
            type="button"
            onClick={() => onRemove(index)}
          >
            &#10005;
          </button>
          {index === ingredients.length - 1 && (
            <button className={addButtonClass} type="button" onClick={onAdd}>
              Add Item
            </button>
          )}
        </div>
      </div>
    ))}
  </>
);

export default IngredientList;
