export type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
};

export type Procedure = {
  step: string;
};

export type DishDataType = {
  dishType: string;
  dishName: string;
  dishImage?: string;
  ingredients: Ingredient[];
  procedure: string[];
};
