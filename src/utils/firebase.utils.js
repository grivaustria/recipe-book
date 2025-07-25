// firebase.utils.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import { dishJSON } from "../data/dish-temp";

const firebaseConfig = {
  apiKey: "AIzaSyADKriubumnDOnNYY_pMa9IxIt43pHRaO4",
  authDomain: "recipe-book-web-app.firebaseapp.com",
  projectId: "recipe-book-web-app",
  storageBucket: "recipe-book-web-app.appspot.com", // fixed .app typo
  messagingSenderId: "436779686471",
  appId: "1:436779686471:web:ef360709d41d17d6f16f62",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addDishToFirestore = async () => {
  try {
    for (const dish of dishJSON) {
      const { dishImage, ...data } = dish; // exclude image
      await addDoc(collection(db, "recipes"), data);
      console.log(`✅ Added: ${data.dishName}`);
    }
    console.log("🎉 All dishes uploaded with unique IDs!");
  } catch (error) {
    console.error("❌ Error uploading dishes:", error);
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
      // console.log('Document data:', data);

      return {
        id: doc.id,
        ...data,
      };
    });

    // console.log("Mapped recipes", mappedData);

    return mappedData;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
