import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DishDataType } from "@app-types/dish";
import { catchError } from "@store/helper/query";
import { supabase } from "@utils/supabase";
import {
  addRecipeToSupabase,
  deleteRecipeFromSupabase,
  getCurrentAuthUser,
  getRecipesFromSupabase,
  type AuthUserData,
  updateRecipeInSupabase,
} from "@utils/supabase.utils";

export type { AuthUserData };

type UpdateRecipePayload = {
  recipeId: string;
  updatedData: DishDataType;
  previousImageUrl?: string;
};

type DeleteRecipePayload = {
  recipeId: string;
  imageUrl?: string;
};

type AuthUserCacheLifecycleApi = {
  cacheEntryRemoved: Promise<void>;
  dispatch: (action: unknown) => unknown;
};

const mapAuthUser = (
  user: {
    id: string;
    email?: string | null;
    user_metadata?: {
      display_name?: string;
      full_name?: string;
      name?: string;
    };
  } | null,
): AuthUserData | null =>
  user
    ? {
        uid: user.id,
        displayName:
          user.user_metadata?.display_name ??
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          null,
        email: user.email ?? null,
      }
    : null;

const getInitialAuthUser = async () => getCurrentAuthUser();

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
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          dispatch(
            recipesApi.util.upsertQueryData(
              "getAuthUser",
              undefined,
              mapAuthUser(session?.user ?? null),
            ),
          );
        });

        await cacheEntryRemoved;
        subscription.unsubscribe();
      },
    }),
    getRecipes: builder.query<DishDataType[], void>({
      async queryFn() {
        return runQuery(
          async () =>
            (
              (await getRecipesFromSupabase()) as (DishDataType &
                Record<string, unknown>)[]
            ).map(sanitizeRecipe),
          "Error fetching recipes",
        );
      },
      providesTags: ["Recipes"],
    }),
    addRecipe: builder.mutation<string, DishDataType>({
      async queryFn(recipe: DishDataType) {
        return runQuery(
          async () => addRecipeToSupabase(recipe),
          "Error adding recipe",
        );
      },
      invalidatesTags: ["Recipes"],
    }),
    updateRecipe: builder.mutation<void, UpdateRecipePayload>({
      async queryFn({
        recipeId,
        updatedData,
        previousImageUrl,
      }: UpdateRecipePayload) {
        return runQuery(
          async () =>
            updateRecipeInSupabase(recipeId, updatedData, previousImageUrl),
          "Error updating recipe",
        );
      },
      invalidatesTags: ["Recipes"],
    }),
    deleteRecipe: builder.mutation<void, DeleteRecipePayload>({
      async queryFn({ recipeId, imageUrl }: DeleteRecipePayload) {
        return runQuery(
          async () => deleteRecipeFromSupabase(recipeId, imageUrl),
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
