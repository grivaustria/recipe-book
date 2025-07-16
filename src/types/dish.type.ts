export type Ingredient = {
    name: string,
    quantity: string,
    unit: string,
}

export type Procedure = string;

export type DishDataType = {
    dishType: string,
    dishName: string,
    dishImage: string,
    ingredients: Ingredient[];
    procedure: Procedure[];
}