import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { onAuthStateChanged, type User } from "firebase/auth";
import type { DishDataType } from "@app-types/dish";
import { catchError } from "@store/helper/query";
import {
  addRecipeToFirestore,
  auth,
  deleteRecipeFromFirestore,
  getRecipesFromFirestore,
  updateRecipeInFirestore,
} from "@utils/firebase.utils";

type UpdateRecipePayload = {
  recipeId: string;
  updatedData: DishDataType;
};

export type AuthUserData = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

type AuthUserCacheLifecycleApi = {
  cacheEntryRemoved: Promise<void>;
  dispatch: (action: unknown) => unknown;
};

const mapAuthUser = (user: User | null): AuthUserData | null =>
  user
    ? {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      }
    : null;

const getInitialAuthUser = () =>
  new Promise<AuthUserData | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      unsubscribe();
      resolve(mapAuthUser(currentUser));
    });
  });

const sanitizeRecipe = (
  recipe: DishDataType & Record<string, unknown>,
): DishDataType => ({
  id: typeof recipe.id === "string" ? recipe.id : undefined,
  dishName: recipe.dishName,
  dishType: recipe.dishType,
  dishImage:
    typeof recipe.dishImage === "string" ? recipe.dishImage : undefined,
  ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
  procedure: Array.isArray(recipe.procedure) ? recipe.procedure : [],
});

const runQuery = async <T>(
  operation: () => Promise<T>,
  fallbackMessage: string,
) => {
  const [data, error] = await catchError(operation(), false, fallbackMessage);

  if (error) {
    return {
      error: {
        status: "CUSTOM_ERROR" as const,
        error: error.message,
      },
    };
  }

  return { data };
};

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    getAuthUser: builder.query<AuthUserData | null, void>({
      queryFn: async () => ({ data: await getInitialAuthUser() }),
      async onCacheEntryAdded(
        _arg: void,
        { cacheEntryRemoved, dispatch }: AuthUserCacheLifecycleApi,
      ) {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          dispatch(
            recipesApi.util.upsertQueryData(
              "getAuthUser",
              undefined,
              mapAuthUser(currentUser),
            ),
          );
        });

        await cacheEntryRemoved;
        unsubscribe();
      },
    }),
    getRecipes: builder.query<DishDataType[], void>({
      async queryFn() {
        return runQuery(
          async () =>
            (
              (await getRecipesFromFirestore()) as (DishDataType &
                Record<string, unknown>)[]
            ).map(sanitizeRecipe),
          "Error fetching recipes",
        );
      },
      providesTags: ["Recipes"],
    }),
    addRecipe: builder.mutation<void, DishDataType>({
      async queryFn(recipe: DishDataType) {
        return runQuery(
          async () => addRecipeToFirestore(recipe),
          "Error adding recipe",
        );
      },
      invalidatesTags: ["Recipes"],
    }),
    updateRecipe: builder.mutation<void, UpdateRecipePayload>({
      async queryFn({ recipeId, updatedData }: UpdateRecipePayload) {
        return runQuery(
          async () => updateRecipeInFirestore(recipeId, updatedData),
          "Error updating recipe",
        );
      },
      invalidatesTags: ["Recipes"],
    }),
    deleteRecipe: builder.mutation<void, string>({
      async queryFn(recipeId: string) {
        return runQuery(
          async () => deleteRecipeFromFirestore(recipeId),
          "Error deleting recipe",
        );
      },
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useDeleteRecipeMutation,
  useGetAuthUserQuery,
  useGetRecipesQuery,
  useUpdateRecipeMutation,
} = recipesApi;
