import type { DishDataType } from "../types/dish.type";

import ChickenAdobo from "../assets/dish-chicken-adobo.jpg";
import PorkSinigang from "../assets/dish-pork-sinigang.jpg";

export const dishJSON: DishDataType[] = [
  {
    dishType: 'meat',
    dishName: "Chicken Adobo",
    dishImage: ChickenAdobo,
    ingredients: [
      {
        name: "Chicken",
        quantity: "2",
        unit: "lbs",
      },
      {
        name: "Soy Sauce",
        quantity: "3/4",
        unit: "cup",
      },
      {
        name: "White Vinegar",
        quantity: "3/4",
        unit: "cup",
      },
      {
        name: "Garlic Powder",
        quantity: "1",
        unit: "tsp",
      },
      {
        name: "Water",
        quantity: "360",
        unit: "mL",
      },
      {
        name: "Laurel Leaves",
        quantity: "3-4",
        unit: "pcs",
      },
      {
        name: "Potato",
        quantity: "1-2",
        unit: "pcs",
      },
    ],
    procedure: [
      {
        proc1: "Combine soy sauce, white vinegar, and garlic powder. Mix well.",
        proc2:
          "Marinate the chicken with the mixture for at least an hour. The longer, the better.",
        proc3:
          "Pour the chicken and the marinade to a hotpot. Add water and bring it to a boil.",
        proc4: "Add laurel leaves and simmer for 30 minutes.",
        proc5: "Stir and turn the heat off. Serve hot.",
      },
    ],
  },
  {
    dishType: "meat",
    dishName: "Pork Sinigang",
    dishImage: PorkSinigang,
    ingredients: [
      {
        name: "Pork Belly",
        quantity: "1",
        unit: "kg",
      },
      {
        name: "Knorr Sinigang Mix (Original / Gabi)",
        quantity: "2",
        unit: "sache",
      },
      {
        name: "Water",
        quantity: "1",
        unit: "Liter",
      },
      {
        name: "Tomatoe",
        quantity: "3",
        unit: "pcs",
      },
      {
        name: "Onion",
        quantity: "2",
        unit: "pcs",
      },
      
      {
        name: "Kangkong Leaves",
        quantity: "1",
        unit: "bundle",
      },
      {
        name: "Sitaw",
        quantity: "1",
        unit: "bundle",
      },
      {
        name: "Radish",
        quantity: "1",
        unit: "pc",
      },
      {
        name: "Gabi",
        quantity: "2",
        unit: "pcs",
      },
      {
        name: "Okra",
        quantity: "5",
        unit: "pcs",
      },
      {
        name: "Salt",
        quantity: "2",
        unit: "tbsp",
      },
    ],
    procedure: [
      {
        proc1: "Peel and quarter the tomatoes and onions. Peel the radish and gabi, then slice the radish into rounds and the gabi into chunks. Trim the sitaw into 2-inch pieces and okra into 1-inch pieces. Rinse and separate the kangkong leaves from the stems.",
        proc2: "In a large pot, combine the pork belly, onions, tomatoes, and water. Bring to a boil, then lower to a simmer. Cook for 45 minutes or until pork is tender.",
        proc3: "After 30 minutes. Add the peeled gabi and okra and continue simmerring.",
        proc4: "Add the sliced radish, sitaw, and kangkong leaves. Simmer for another 5-7 minutes until vegetables are cooked.",
        proc5: "Add the Knorr Sinigang Mix, stir and let it simmer for 1-2 minutes. Turn of the heat and serve.",
      },
    ],
  },
];
