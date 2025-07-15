export type Ingredient = {
    name: string,
    quantity: string,
    unit: string,
}

export type Procedure = {
    proc1: string,
    proc2: string,
    proc3: string,
    proc4: string,
    proc5: string,
}

export type DishDataType = {
    dishType: string,
    dishName: string,
    dishImage: string,
    ingredients: Ingredient[];
    procedure: Procedure[];
}