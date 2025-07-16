import type { DishDataType } from "../types/dish.type";

import ChickenAdobo from "../assets/dish-chicken-adobo.jpg";
import PorkSinigang from "../assets/dish-pork-sinigang.jpg";
import ChickenAfritada from "../assets/dish-chicken-afritada.jpg";
import FriedTilapia from "../assets/dish-fried-tilapia.jpg"

export const dishJSON: DishDataType[] = [
  {
    dishType: 'meat',
    dishName: "Chicken Adobo",
    dishImage: ChickenAdobo,
    ingredients: [
      { name: "Chicken", quantity: "2", unit: "lbs" },
      { name: "Soy Sauce", quantity: "3/4", unit: "cup" },
      { name: "White Vinegar", quantity: "3/4", unit: "cup" },
      { name: "Garlic Powder", quantity: "1", unit: "tsp" },
      { name: "Water", quantity: "360", unit: "mL" },
      { name: "Laurel Leaves", quantity: "3-4", unit: "pcs" },
      { name: "Potato", quantity: "1-2", unit: "pcs" },
    ],
    procedure: [
      "Combine soy sauce, white vinegar, and garlic powder. Mix well.",
      "Marinate the chicken with the mixture for at least an hour. The longer, the better.",
      "Pour the chicken and the marinade to a hotpot. Add water and bring it to a boil.",
      "Add laurel leaves and simmer for 30 minutes.",
      "Stir and turn the heat off. Serve hot.",
    ],
  },
  {
    dishType: "meat",
    dishName: "Pork Sinigang",
    dishImage: PorkSinigang,
    ingredients: [
      { name: "Pork Belly", quantity: "1", unit: "kg" },
      { name: "Knorr Sinigang Mix (Original / Gabi)", quantity: "2", unit: "sache" },
      { name: "Water", quantity: "1", unit: "Liter" },
      { name: "Tomatoe", quantity: "3", unit: "pcs" },
      { name: "Onion", quantity: "2", unit: "pcs" },
      { name: "Kangkong Leaves", quantity: "1", unit: "bundle" },
      { name: "Sitaw", quantity: "1", unit: "bundle" },
      { name: "Radish", quantity: "1", unit: "pc" },
      { name: "Gabi", quantity: "2", unit: "pcs" },
      { name: "Okra", quantity: "5", unit: "pcs" },
      { name: "Salt", quantity: "2", unit: "tbsp" },
    ],
    procedure: [
      "Peel and quarter the tomatoes and onions. Peel the radish and gabi, then slice the radish into rounds and the gabi into chunks. Trim the sitaw into 2-inch pieces and okra into 1-inch pieces. Rinse and separate the kangkong leaves from the stems.",
      "In a large pot, combine the pork belly, onions, tomatoes, and water. Bring to a boil, then lower to a simmer. Cook for 45 minutes or until pork is tender.",
      "After 30 minutes. Add the peeled gabi and okra and continue simmering.",
      "Add the sliced radish, sitaw, and kangkong leaves. Simmer for another 5-7 minutes until vegetables are cooked.",
      "Add the Knorr Sinigang Mix, stir and let it simmer for 1-2 minutes. Turn off the heat and serve.",
    ],
  },
  {
    dishType: 'meat',
    dishName: "Chicken Afritada",
    dishImage: ChickenAfritada,
    ingredients: [
      { name: "Chicken", quantity: "2", unit: "lbs" },
      { name: "Potato", quantity: "2", unit: "pcs" },
      { name: "Carrot", quantity: "1", unit: "pc" },
      { name: "Bell Pepper (Red & Green)", quantity: "1/2", unit: "each" },
      { name: "Tomato Sauce", quantity: "1", unit: "cup" },
      { name: "Garlic", quantity: "4", unit: "cloves" },
      { name: "Onion", quantity: "1", unit: "pc" },
      { name: "Water", quantity: "240", unit: "mL" },
      { name: "Cooking Oil", quantity: "2", unit: "tbsp" },
      { name: "Salt & Pepper", quantity: "to taste", unit: "" },
    ],
    procedure: [
      "Heat oil in a pan. Sauté garlic and onion until fragrant.",
      "Add chicken pieces and cook until lightly browned on all sides.",
      "Pour in tomato sauce and water. Stir and bring to a boil.",
      "Add potatoes and carrots. Simmer for 20 minutes or until tender.",
      "Add bell peppers, season with salt and pepper, and simmer for 5 more minutes. Serve hot.",
    ],
  },
  {
    dishType: 'fish',
    dishName: "Fried Tilapia",
    dishImage: FriedTilapia,
    ingredients: [
      { name: "Tilapia", quantity: "1.5", unit: "kg" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Black Pepper", quantity: "1/2", unit: "tsp" },
      { name: "Garlic Powder", quantity: "1/2", unit: "tsp" },
      { name: "Cooking Oil", quantity: "500", unit: "mL" },
      { name: "Calamansi or Lemon", quantity: "2", unit: "pcs" },
    ],
    procedure: [
      "Clean and pat dry the tilapia. Score both sides with 2-3 diagonal cuts.",
      "Rub salt, black pepper, and garlic powder all over the fish, including inside the cuts.",
      "Heat cooking oil in a pan over medium heat until hot.",
      "Fry the tilapia for about 5-7 minutes per side or until golden brown and crispy.",
      "Remove from oil and drain excess oil on paper towels. Serve with calamansi or lemon wedges.",
    ],
  },
];