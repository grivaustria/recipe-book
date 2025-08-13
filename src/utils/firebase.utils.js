import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyADKriubumnDOnNYY_pMa9IxIt43pHRaO4",
  authDomain: "recipe-book-web-app.firebaseapp.com",
  projectId: "recipe-book-web-app",
  storageBucket: "recipe-book-web-app.appspot.com",
  messagingSenderId: "436779686471",
  appId: "1:436779686471:web:ef360709d41d17d6f16f62",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addDishToFirestore = async () => {
  try {
    for (const dish of dishJSON) {
      const { dishImage, ...data } = dish;
      await addDoc(collection(db, "recipes"), data);
      console.log(`✅ Added: ${data.dishName}`);
    }
    console.log("🎉 All dishes uploaded with unique IDs!");
  } catch (error) {
    console.error("❌ Error uploading dishes:", error);
    throw error;
  }
};

/**
 * @typedef {import('../types/dish.type').DishDataType} DishDataType
 */

/**
 * @returns {Promise<DishDataType[]>}
 */

export const getRecipesFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "recipes"));

    const mappedData = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
      };
    });

    return mappedData;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

/**
 * @param {object} recipe - Recipe data to add.
 * @returns {Promise<void>}
 */

export const addRecipeToFirestore = async (recipe) => {
  try {
    const docRef = await addDoc(collection(db, "recipes"), recipe);
    toast.success(`Recipe ${recipe.dishName} added successfully`);
    return docRef.id;
  } catch (error) {
    toast.error("Error adding recipes", error);
  }
};

/**
 * Update an existing recipe in Firestore
 * @param {string} recipeId - The ID of the recipe to update
 * @param {object} updatedData - The updated recipe data
 * @returns {Promise<void>}
 */

export const updateRecipeInFirestore = async (recipeID, updatedData) => {
  try {
    const recipeRef = doc(db, "recipes", recipeID);
    await updateDoc(recipeRef, updatedData);
    toast.success(`Recipe ${updatedData.dishName} updated successfully.`);
  } catch (error) {
    toast.error("Error updating recipe:", error);
    throw error;
  }
};

/**
 * Delete a recipe from Firestore
 * @param {string} recipeID - The ID of the recipe to delete
 * @returns {Promise<void>}
 */

export const deleteRecipeFromFirestore = async (recipeID) => {
  try {
    const recipeRef = doc(db, "recipes", recipeID);
    await deleteDoc(recipeRef);
    toast.success("Recipe deleted successfully");
  } catch (error) {
    toast.error("There was a problem deleting recipe:", error);
    throw error;
  }
};

/**
 * Update specific fields of a recipe (partial update)
 * @param {string} recipeID - The ID of the recipe to update
 * @param {object} fieldsToUpdate - Object containing only the fields to update
 * @returns {Promise<void>}
 */

export const updateRecipeFields = async (recipeID, fieldsToUpdate) => {
  try {
    const recipeRef = doc(db, "recipes", recipeID);
    await updateDoc(recipeRef, fieldsToUpdate);
    toast.success("Recipe fields updated successfully", recipeID);
  } catch (error) {
    toast.error("Error updating recipe fields:", error);
    throw error;
  }
};
