import type { AuthError, User } from "@supabase/supabase-js";
import { toast } from "react-toastify";

import type { DishDataType, Ingredient } from "@app-types/dish";
import { supabase } from "@utils/supabase";

export type AuthUserData = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

type SupabaseRecipeRow = {
  id: string;
  dishName: string;
  dishType: string;
  dishImage: string | null;
  userId: string;
};

type SupabaseIngredientRow = Ingredient & {
  id: string;
  recipeId: string;
};

type SupabaseProcedureRow = {
  id: string;
  recipeId: string;
  stepNumber: number;
  description: string;
};

const RECIPE_IMAGES_BUCKET = "recipe-images";
const MAX_DISH_IMAGE_SIZE_BYTES = 3 * 1024 * 1024;
const ALLOWED_DISH_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const ALLOWED_DISH_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);
const STORAGE_PUBLIC_PATH_SEGMENT = `/storage/v1/object/public/${RECIPE_IMAGES_BUCKET}/`;

const mapAuthUser = (user: User | null): AuthUserData | null =>
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

const buildRecipeMap = (
  recipes: SupabaseRecipeRow[],
  ingredients: SupabaseIngredientRow[],
  procedureRows: SupabaseProcedureRow[],
): DishDataType[] =>
  recipes.map((recipe) => ({
    id: recipe.id,
    dishName: recipe.dishName,
    dishType: recipe.dishType,
    dishImage: recipe.dishImage ?? undefined,
    ingredients: ingredients
      .filter((ingredient) => ingredient.recipeId === recipe.id)
      .map(({ name, quantity, unit }) => ({ name, quantity, unit })),
    procedure: procedureRows
      .filter((procedure) => procedure.recipeId === recipe.id)
      .sort((left, right) => left.stepNumber - right.stepNumber)
      .map((procedure) => procedure.description),
  }));

const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
};

const createIngredientsPayload = (
  recipeId: string,
  ingredients: Ingredient[],
) =>
  ingredients.map((ingredient) => ({
    recipeId,
    name: ingredient.name,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
  }));

const createProcedurePayload = (recipeId: string, steps: string[]) =>
  steps.map((description, index) => ({
    recipeId,
    stepNumber: index + 1,
    description,
  }));

const sanitizeFilename = (filename: string) =>
  filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const getStoragePathFromPublicUrl = (imageUrl: string) => {
  const parsedUrl = new URL(imageUrl);
  const pathIndex = parsedUrl.pathname.indexOf(STORAGE_PUBLIC_PATH_SEGMENT);

  if (pathIndex === -1) {
    return null;
  }

  return decodeURIComponent(
    parsedUrl.pathname.slice(pathIndex + STORAGE_PUBLIC_PATH_SEGMENT.length),
  );
};

export const getAuthErrorCode = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  typeof error.code === "string"
    ? error.code
    : null;

export const getCurrentAuthUser = async () =>
  mapAuthUser(await getCurrentUser());

export const validateDishImageFile = (file: File) => {
  const normalizedFilename = file.name.toLowerCase();
  const hasAllowedExtension = Array.from(ALLOWED_DISH_IMAGE_EXTENSIONS).some(
    (extension) => normalizedFilename.endsWith(extension),
  );

  if (!hasAllowedExtension) {
    throw new Error("Please upload a JPG, JPEG, PNG, WEBP, or GIF file.");
  }

  if (!ALLOWED_DISH_IMAGE_TYPES.has(file.type)) {
    throw new Error(
      "Please upload a valid image file: JPG, JPEG, PNG, WEBP, or GIF.",
    );
  }

  if (file.size > MAX_DISH_IMAGE_SIZE_BYTES) {
    throw new Error("Dish image must be 3MB or smaller.");
  }
};

export const uploadDishImageToSupabase = async (file: File) => {
  validateDishImageFile(file);

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User must be logged in to upload an image");
  }

  const safeFilename = sanitizeFilename(file.name || "dish-image");
  const uploadPath = `${user.id}/${crypto.randomUUID()}-${safeFilename}`;

  const { error: uploadError } = await supabase.storage
    .from(RECIPE_IMAGES_BUCKET)
    .upload(uploadPath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message || "Error uploading dish image");
  }

  const { data } = supabase.storage
    .from(RECIPE_IMAGES_BUCKET)
    .getPublicUrl(uploadPath);

  return data.publicUrl;
};

export const deleteDishImageFromSupabase = async (imageUrl?: string) => {
  if (!imageUrl) {
    return;
  }

  let storagePath: string | null = null;

  try {
    storagePath = getStoragePathFromPublicUrl(imageUrl);
  } catch {
    storagePath = null;
  }

  if (!storagePath) {
    return;
  }

  const { error } = await supabase.storage
    .from(RECIPE_IMAGES_BUCKET)
    .remove([storagePath]);

  if (error) {
    throw new Error(error.message || "Error deleting dish image");
  }
};

export const authCreateUserEmailPassword = async (
  email: string,
  password: string,
  displayName: string,
) => {
  if (!email || !password) {
    throw new Error("Email and password must be provided");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const loginUserEmailPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) {
    throw new Error("Email and password must be provided");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const logOutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const getRecipesFromSupabase = async (): Promise<DishDataType[]> => {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const { data: recipes, error: recipesError } = await supabase
    .from("recipes")
    .select("id, dishName, dishType, dishImage, userId")
    .eq("userId", user.id)
    .order("dishName", { ascending: true });

  if (recipesError) {
    toast.error(recipesError.message || "Error fetching recipes");
    throw recipesError;
  }

  if (!recipes || recipes.length === 0) {
    return [];
  }

  const recipeIds = recipes.map((recipe) => recipe.id);

  const [
    { data: ingredients, error: ingredientsError },
    { data: procedureRows, error: procedureError },
  ] = await Promise.all([
    supabase
      .from("ingredients")
      .select("id, recipeId, name, quantity, unit")
      .in("recipeId", recipeIds),
    supabase
      .from("procedure")
      .select("id, recipeId, stepNumber, description")
      .in("recipeId", recipeIds),
  ]);

  if (ingredientsError) {
    toast.error(ingredientsError.message || "Error fetching ingredients");
    throw ingredientsError;
  }

  if (procedureError) {
    toast.error(procedureError.message || "Error fetching procedure");
    throw procedureError;
  }

  return buildRecipeMap(
    recipes as SupabaseRecipeRow[],
    (ingredients ?? []) as SupabaseIngredientRow[],
    (procedureRows ?? []) as SupabaseProcedureRow[],
  );
};

export const getCurrentUserDataFromSupabase = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? null,
    displayName:
      user.user_metadata?.display_name ??
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      null,
    metadata: user.user_metadata ?? {},
  };
};

export const addRecipeToSupabase = async (recipe: DishDataType) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User must be logged in to add a recipe");
  }

  const recipeId = crypto.randomUUID();

  const { error: recipeError } = await supabase.from("recipes").insert({
    id: recipeId,
    dishName: recipe.dishName,
    dishType: recipe.dishType,
    dishImage: recipe.dishImage ?? null,
    userId: user.id,
  });

  if (recipeError) {
    toast.error(recipeError.message || "Error adding recipe");
    throw recipeError;
  }

  try {
    const ingredientsPayload = createIngredientsPayload(
      recipeId,
      recipe.ingredients,
    );
    const procedurePayload = createProcedurePayload(recipeId, recipe.procedure);

    if (ingredientsPayload.length > 0) {
      const { error: ingredientsError } = await supabase
        .from("ingredients")
        .insert(ingredientsPayload);

      if (ingredientsError) {
        throw ingredientsError;
      }
    }

    if (procedurePayload.length > 0) {
      const { error: procedureError } = await supabase
        .from("procedure")
        .insert(procedurePayload);

      if (procedureError) {
        throw procedureError;
      }
    }
  } catch (error) {
    await supabase.from("procedure").delete().eq("recipeId", recipeId);
    await supabase.from("ingredients").delete().eq("recipeId", recipeId);
    await supabase.from("recipes").delete().eq("id", recipeId);

    const message =
      error instanceof Error ? error.message : "Error adding recipe details";
    toast.error(message);
    throw error;
  }

  toast.success(`Recipe ${recipe.dishName} added successfully`);
  return recipeId;
};

export const updateRecipeInSupabase = async (
  recipeId: string,
  updatedData: DishDataType,
  previousImageUrl?: string,
) => {
  const { error: recipeError } = await supabase
    .from("recipes")
    .update({
      dishName: updatedData.dishName,
      dishType: updatedData.dishType,
      dishImage: updatedData.dishImage ?? null,
    })
    .eq("id", recipeId);

  if (recipeError) {
    toast.error(recipeError.message || "Error updating recipe");
    throw recipeError;
  }

  const [{ error: deleteIngredientsError }, { error: deleteProcedureError }] =
    await Promise.all([
      supabase.from("ingredients").delete().eq("recipeId", recipeId),
      supabase.from("procedure").delete().eq("recipeId", recipeId),
    ]);

  if (deleteIngredientsError) {
    toast.error(deleteIngredientsError.message || "Error updating ingredients");
    throw deleteIngredientsError;
  }

  if (deleteProcedureError) {
    toast.error(deleteProcedureError.message || "Error updating procedure");
    throw deleteProcedureError;
  }

  const ingredientsPayload = createIngredientsPayload(
    recipeId,
    updatedData.ingredients,
  );
  const procedurePayload = createProcedurePayload(
    recipeId,
    updatedData.procedure,
  );

  if (ingredientsPayload.length > 0) {
    const { error: insertIngredientsError } = await supabase
      .from("ingredients")
      .insert(ingredientsPayload);

    if (insertIngredientsError) {
      toast.error(insertIngredientsError.message || "Error saving ingredients");
      throw insertIngredientsError;
    }
  }

  if (procedurePayload.length > 0) {
    const { error: insertProcedureError } = await supabase
      .from("procedure")
      .insert(procedurePayload);

    if (insertProcedureError) {
      toast.error(insertProcedureError.message || "Error saving procedure");
      throw insertProcedureError;
    }
  }

  toast.success(`Recipe ${updatedData.dishName} updated successfully.`);

  if (previousImageUrl && previousImageUrl !== updatedData.dishImage) {
    try {
      await deleteDishImageFromSupabase(previousImageUrl);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error deleting old dish image";
      toast.error(message);
    }
  }
};

export const deleteRecipeFromSupabase = async (
  recipeId: string,
  imageUrl?: string,
) => {
  const [{ error: deleteIngredientsError }, { error: deleteProcedureError }] =
    await Promise.all([
      supabase.from("ingredients").delete().eq("recipeId", recipeId),
      supabase.from("procedure").delete().eq("recipeId", recipeId),
    ]);

  if (deleteIngredientsError) {
    toast.error(
      deleteIngredientsError.message || "There was a problem deleting recipe",
    );
    throw deleteIngredientsError;
  }

  if (deleteProcedureError) {
    toast.error(
      deleteProcedureError.message || "There was a problem deleting recipe",
    );
    throw deleteProcedureError;
  }

  const { error: recipeError } = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId);

  if (recipeError) {
    toast.error(recipeError.message || "There was a problem deleting recipe");
    throw recipeError;
  }

  if (imageUrl) {
    try {
      await deleteDishImageFromSupabase(imageUrl);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error deleting dish image";
      toast.error(message);
    }
  }

  toast.success("Recipe deleted successfully");
};

export const isSupabaseAuthError = (error: unknown): error is AuthError =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  typeof error.name === "string" &&
  error.name.toLowerCase().includes("auth");
