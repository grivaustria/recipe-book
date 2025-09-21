import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
  where,
} from "firebase/firestore";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyADKriubumnDOnNYY_pMa9IxIt43pHRaO4",
  authDomain: "recipe-book-web-app.firebaseapp.com",
  projectId: "recipe-book-web-app",
  storageBucket: "recipe-book-web-app.firebasestorage.app",
  messagingSenderId: "436779686471",
  appId: "1:436779686471:web:ef360709d41d17d6f16f62",
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Authentication
export const auth = getAuth();

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const getGoogleRedirectResult = () => getRedirectResult(auth);

export const db = getFirestore(app);

// Authentication: Creating User Document
export const createUserDocFromAuth = async (userAuth, moreInfo = {}) => {
  if (!userAuth) return console.error("userAuth does not exist");

  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log("userDocRef: ", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log("userSnapshot: ", userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...moreInfo,
      });
    } catch (err) {
      console.error("Error create user.", err.message);
    }
  }
  return userDocRef;
};

// Authentication: Sign-Up
export const authCreateUserEmailPassword = async (
  email,
  password,
  displayName
) => {
  if (!email || !password) {
    throw new Error("Email and password must be provided");
  }
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (displayName) {
    await updateProfile(user, { displayName });
  } else {
    console.error("displayName does not exist");
  }

  return userCredential;
};

// Authentication: Login
export const loginUserEmailPassword = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password must be provided");
  }
  return signInWithEmailAndPassword(auth, email, password);
};

// Authentication: Log out
export const logOutUser = async () => signOut(auth);

// CRUD: Recipes
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
    // const snapshot = await getDocs(collection(db, "recipes"));

    // const mappedData = snapshot.docs.map((doc) => {
    //   const data = doc.data();

    //   return {
    //     id: doc.id,
    //     ...data,
    //   };
    // });

    // return mappedData;

    //2nd Version
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "recipes"), where("uid", "==", user.uid));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    const user = auth.currentUser;
    if (!user) throw new Error("User must be logged in to add a recipe");

    // Previous Doc Ref
    // const docRef = await addDoc(collection(db, "recipes"), recipe);

    const docRef = await addDoc(collection(db, "recipes"), {
      ...recipe,
      userId: user.uid,
      createdAt: new Date(),
    });

    toast.success(`Recipe ${recipe.dishName} added successfully`);
    return docRef.id;
  } catch (error) {
    toast.error("Error adding recipes", error);
    throw error;
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