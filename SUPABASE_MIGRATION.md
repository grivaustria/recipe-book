# Supabase Migration Plan

This document maps the current Firebase implementation to Supabase and keeps the migration incremental so the app can continue working while each part is swapped over.

## Current Firebase Usage

### Auth

- Email/password signup in `src/routes/auth/signup.route.tsx`
- Email/password login in `src/routes/auth/login.route.tsx`
- Google popup sign-in in `src/routes/auth/login.route.tsx` and `src/routes/auth/signup.route.tsx`
- Auth session tracking in `src/store/services/recipesApi.ts`
- Logout in `src/component/header/Header.tsx`, `src/component/title/title.component.tsx`, and `src/component/app-drawer/app-drawer.component.tsx`

### Database

- User profile document creation and lookup in `src/utils/firebase.utils.js`
- Recipe create/read/update/delete in `src/utils/firebase.utils.js`
- Recipe queries wired into RTK Query in `src/store/services/recipesApi.ts`
- User profile export in `src/routes/main-page/main-page.route.tsx`

### Storage

- Firebase Storage is configured in `src/utils/firebase.utils.js`, but there is no active storage API usage in the app.
- `dishImage` is currently stored as a string URL or data URL and rendered directly.

## Firebase-Dependent Files

- `package.json`
- `vite.config.ts`
- `README.md`
- `src/utils/firebase.utils.js`
- `src/store/services/recipesApi.ts`
- `src/routes/auth/login.route.tsx`
- `src/routes/auth/signup.route.tsx`
- `src/routes/main-page/main-page.route.tsx`
- `src/component/header/Header.tsx`
- `src/component/title/title.component.tsx`
- `src/component/app-drawer/app-drawer.component.tsx`

## Service Mapping

| Current Firebase use           | Supabase equivalent                                         | Notes                                                           |
| ------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------- |
| Firebase Auth email/password   | `supabase.auth.signUp` / `supabase.auth.signInWithPassword` | Direct replacement                                              |
| Firebase Auth Google popup     | `supabase.auth.signInWithOAuth({ provider: "google" })`     | Uses redirect flow instead of popup by default                  |
| `onAuthStateChanged`           | `supabase.auth.onAuthStateChange`                           | Same job, different event payload                               |
| Firestore `users` collection   | `public.profiles` table                                     | Keep one row per auth user                                      |
| Firestore `recipes` collection | `public.recipes` table                                      | One row per recipe, owned by `user_id`                          |
| Firestore security rules       | Postgres Row Level Security policies                        | Enforce ownership at the database layer                         |
| Firebase Storage               | Supabase Storage bucket                                     | Not needed immediately because current app stores image strings |

## Recommended Incremental Migration Order

### Phase 1: Safe setup

1. Install `@supabase/supabase-js`
2. Add Vite-compatible Supabase env vars
3. Add `src/utils/supabase.ts`
4. Create Supabase schema and RLS
5. Keep Firebase as the live backend while Supabase is prepared

### Phase 2: Auth migration

1. Replace Firebase auth helpers with Supabase auth helpers behind the same app-level API surface
2. Update RTK Query auth subscription to use `supabase.auth.onAuthStateChange`
3. Update login/signup screens to handle Supabase auth errors
4. Confirm route guards and logout behavior still match current UX

### Phase 3: Recipe data migration

1. Replace Firestore recipe CRUD calls with Supabase table queries
2. Keep the same RTK Query endpoints and hook names to minimize UI churn
3. Update user export to read from `public.profiles`
4. Optionally bulk-import old Firestore export data into Supabase

### Phase 4: Cleanup

1. Remove Firebase dependency
2. Remove Firebase chunking in Vite
3. Rename any remaining Firebase-specific helpers
4. Update README

## Manual Supabase Dashboard Steps

### Required now

1. Create or open your Supabase project
2. In `SQL Editor`, run [`supabase/migrations/0001_initial_schema.sql`](/c:/Users/User/Documents/personal/recipe-book/supabase/migrations/0001_initial_schema.sql)
3. In `Authentication > Providers`, enable `Email`
4. In `Authentication > Providers`, enable `Google`
5. For Google auth, paste your Google OAuth client ID and secret
6. In `Authentication > URL Configuration`, add your local dev URL, for example `http://localhost:5173`
7. Add the redirect URL `http://localhost:5173/login`
8. Add the redirect URL `http://localhost:5173/signup`
9. Add the redirect URL `http://localhost:5173/`

### Required for image upload

1. In `SQL Editor`, run [`supabase/migrations/0002_recipe_images_storage.sql`](/c:/Users/User/Documents/personal/recipe-book/supabase/migrations/0002_recipe_images_storage.sql)
2. This creates or updates the `recipe-images` bucket
3. It also adds storage policies so authenticated users can upload, update, and delete only files inside their own folder, for example `<auth.uid()>/filename.jpg`

### Optional later

1. If you stop using public image URLs, switch to signed URLs instead of a public bucket

## Schema Design

### `public.profiles`

- `id uuid primary key`
- linked directly to `auth.users.id`
- stores `email`, `display_name`, timestamps
- auto-created by trigger after signup

### `public.recipes`

- `id uuid primary key`
- `user_id uuid` references `auth.users`
- `dish_name text`
- `dish_type text`
- `dish_image text`
- `ingredients jsonb`
- `procedure jsonb`
- timestamps

This schema preserves current behavior closely because your app already treats `ingredients` as structured objects and `procedure` as an array of strings.

## RLS Design

Profiles:

- users can select only their own row
- users can insert only their own row
- users can update only their own row

Recipes:

- users can select only recipes where `user_id = auth.uid()`
- users can insert only rows with their own `user_id`
- users can update only their own recipes
- users can delete only their own recipes

## Storage Migration Recommendation

The app now supports real dish image uploads through Supabase Storage.

Current storage setup assumptions:

- bucket name is `recipe-images`
- bucket is public so `<img src="...">` can load the returned URL directly
- uploads are stored under `user-id/filename` paths
- client-side validation allows `.jpg`, `.jpeg`, `.png`, `.webp`, and `.gif`
- client-side file size limit is `3 MB`

The matching storage RLS policies live in [`supabase/migrations/0002_recipe_images_storage.sql`](/c:/Users/User/Documents/personal/recipe-book/supabase/migrations/0002_recipe_images_storage.sql).

## Existing Supabase Schema Note

If you already created tables in Supabase using the dashboard and your columns are:

- `recipes.id`
- `recipes.dishName`
- `recipes.dishType`
- `recipes.dishImage`
- `recipes.userId`
- `ingredients.recipeId`
- `procedure.recipeId`

then do not run the fresh-schema SQL in [`supabase/migrations/0001_initial_schema.sql`](/c:/Users/User/Documents/personal/recipe-book/supabase/migrations/0001_initial_schema.sql) as-is.

That SQL assumes a new schema with:

- `recipes.user_id`
- `recipes.dish_name`
- `recipes.dish_type`
- `recipes.dish_image`
- JSON-based `ingredients` and `procedure` columns on `recipes`

For your already-created dashboard schema, use policies and queries that match the real column names. The `column "user_id" does not exist` error happens because your current table uses `userId`, not `user_id`.

## Exact File-by-File Code Changes

The changes below are the practical next edits to switch runtime behavior from Firebase to Supabase while keeping the UI stable.

### 1. `src/utils/firebase.utils.js` -> replace with `src/utils/supabase.utils.ts`

Create a new Supabase-focused helper module with the same app responsibilities:

- get current session user
- sign up with email/password
- sign in with email/password
- sign in with Google
- sign out
- fetch profile
- fetch recipes
- add recipe
- update recipe
- delete recipe

Recommended implementation:

```ts
import { toast } from "react-toastify";
import { supabase } from "@utils/supabase";
import type { DishDataType } from "@app-types/dish";

export type AuthUserData = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

const mapUser = (
  user: {
    id: string;
    email?: string | null;
    user_metadata?: { display_name?: string; full_name?: string };
  } | null,
): AuthUserData | null =>
  user
    ? {
        uid: user.id,
        email: user.email ?? null,
        displayName:
          user.user_metadata?.display_name ??
          user.user_metadata?.full_name ??
          null,
      }
    : null;

export const getCurrentAuthUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return mapUser(user);
};

export const authCreateUserEmailPassword = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) throw error;
  return data;
};

export const loginUserEmailPassword = async (
  email: string,
  password: string,
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });

  if (error) throw error;
  return data;
};

export const logOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUserProfile = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, display_name, created_at, updated_at")
    .eq("id", user.id)
    .single();

  if (error) throw error;
  return data;
};

export const getRecipes = async (): Promise<DishDataType[]> => {
  const { data, error } = await supabase
    .from("recipes")
    .select("id, dish_name, dish_type, dish_image, ingredients, procedure")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((recipe) => ({
    id: recipe.id,
    dishName: recipe.dish_name,
    dishType: recipe.dish_type,
    dishImage: recipe.dish_image ?? undefined,
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    procedure: Array.isArray(recipe.procedure) ? recipe.procedure : [],
  }));
};

export const addRecipe = async (recipe: DishDataType) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("User must be logged in to add a recipe");

  const { data, error } = await supabase
    .from("recipes")
    .insert({
      user_id: user.id,
      dish_name: recipe.dishName,
      dish_type: recipe.dishType,
      dish_image: recipe.dishImage ?? null,
      ingredients: recipe.ingredients,
      procedure: recipe.procedure,
    })
    .select("id")
    .single();

  if (error) throw error;
  toast.success(`Recipe ${recipe.dishName} added successfully`);
  return data.id;
};

export const updateRecipe = async (
  recipeId: string,
  updatedData: DishDataType,
) => {
  const { error } = await supabase
    .from("recipes")
    .update({
      dish_name: updatedData.dishName,
      dish_type: updatedData.dishType,
      dish_image: updatedData.dishImage ?? null,
      ingredients: updatedData.ingredients,
      procedure: updatedData.procedure,
    })
    .eq("id", recipeId);

  if (error) throw error;
  toast.success(`Recipe ${updatedData.dishName} updated successfully.`);
};

export const deleteRecipe = async (recipeId: string) => {
  const { error } = await supabase.from("recipes").delete().eq("id", recipeId);
  if (error) throw error;
  toast.success("Recipe deleted successfully");
};
```

### 2. `src/store/services/recipesApi.ts`

Replace Firebase auth subscription and Firestore calls with Supabase equivalents while keeping existing hook names stable.

Key edits:

- remove `firebase/auth` import
- subscribe with `supabase.auth.onAuthStateChange`
- replace Firebase helper imports with Supabase helper imports
- keep `useGetAuthUserQuery`, `useGetRecipesQuery`, `useAddRecipeMutation`, `useUpdateRecipeMutation`, and `useDeleteRecipeMutation`

Exact edit outline:

```ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DishDataType } from "@app-types/dish";
import { catchError } from "@store/helper/query";
import { supabase } from "@utils/supabase";
import {
  addRecipe,
  deleteRecipe,
  getCurrentAuthUser,
  getRecipes,
  updateRecipe,
} from "@utils/supabase.utils";
```

Replace the auth lifecycle helpers with:

```ts
const getInitialAuthUser = async () => getCurrentAuthUser();
```

Inside `onCacheEntryAdded`:

```ts
const {
  data: { subscription },
} = supabase.auth.onAuthStateChange((_event, session) => {
  const currentUser = session?.user;

  dispatch(
    recipesApi.util.upsertQueryData(
      "getAuthUser",
      undefined,
      {
        uid: currentUser?.id ?? "",
        displayName:
          currentUser?.user_metadata?.display_name ??
          currentUser?.user_metadata?.full_name ??
          null,
        email: currentUser?.email ?? null,
      } || null,
    ),
  );
});

await cacheEntryRemoved;
subscription.unsubscribe();
```

Use `getRecipes`, `addRecipe`, `updateRecipe`, and `deleteRecipe` for the query/mutation bodies.

### 3. `src/routes/auth/login.route.tsx`

Replace:

- `FirebaseError` checks
- `signInWithGooglePopup`
- Firebase helper imports

With:

```ts
import { AuthError } from "@supabase/supabase-js";
import {
  loginUserEmailPassword,
  signInWithGoogle,
} from "@utils/supabase.utils";
```

Error mapping:

```ts
if (error instanceof AuthError) {
  switch (error.code) {
    case "invalid_credentials":
      toast.error("Invalid email or password. Please try again.");
      break;
    case "email_not_confirmed":
      toast.error("Please confirm your email before signing in.");
      break;
    default:
      toast.error("Unable to sign in right now. Please try again.");
  }
}
```

Google handler:

```ts
const handleGoogleAuth = async () => {
  setIsSubmitting(true);

  try {
    await signInWithGoogle();
  } catch {
    toast.error("Error continuing with Google.");
    setIsSubmitting(false);
  }
};
```

Do not call `refreshToHome()` after OAuth start because Supabase will redirect.

### 4. `src/routes/auth/signup.route.tsx`

Replace Firebase signup calls with:

```ts
import { AuthError } from "@supabase/supabase-js";
import {
  authCreateUserEmailPassword,
  signInWithGoogle,
} from "@utils/supabase.utils";
```

Signup handler:

```ts
await authCreateUserEmailPassword(
  formFields.email,
  formFields.password,
  formFields.displayName,
);

toast.success("Account created successfully.");
setFormFields(defaultSignupFields);
refreshToHome();
```

If you enable email confirmation in Supabase, change the toast to explain that confirmation is required.

### 5. `src/routes/main-page/main-page.route.tsx`

Replace:

```ts
import { getCurrentUserDataFromFirestore } from "@utils/firebase.utils";
```

With:

```ts
import { getCurrentUserProfile } from "@utils/supabase.utils";
```

Then update:

```ts
const userData = await getCurrentUserProfile();

if (!userData) {
  toast.error("No Supabase profile found for the current account");
  return;
}
```

### 6. `src/component/header/Header.tsx`

### 7. `src/component/title/title.component.tsx`

### 8. `src/component/app-drawer/app-drawer.component.tsx`

Only change the logout import:

```ts
import { logOutUser } from "@utils/supabase.utils";
```

The rest of the component behavior can stay the same.

### 9. `vite.config.ts`

After Firebase is fully removed, replace:

```ts
if (id.includes("firebase")) {
  return "firebase";
}
```

With:

```ts
if (id.includes("@supabase")) {
  return "supabase";
}
```

### 10. `package.json`

After the app is fully migrated and tested:

- remove `"firebase": "^11.10.0"`
- keep `"@supabase/supabase-js"`

### 11. `README.md`

Update product and setup docs:

- replace Firebase/Firestore references with Supabase/Auth/Postgres references
- explain `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- document required auth provider setup and SQL migration

## Data Migration Notes

### If you want to migrate old Firestore users/recipes

Do this after the app is working against Supabase in development:

1. Export Firestore data
2. Normalize recipe fields to match:
   - `dish_name`
   - `dish_type`
   - `dish_image`
   - `ingredients`
   - `procedure`
   - `user_id`
3. Import into `public.recipes`
4. Import profile rows into `public.profiles`

If the `recipes-backup.json` file on your desktop is your working backup source, it can be transformed into the `public.recipes` insert format in a follow-up step.

## Risk Notes

- The biggest behavior change is Google auth moving from popup to redirect.
- Supabase auth error codes differ from Firebase error codes.
- Firestore document IDs become UUIDs in Postgres unless you explicitly preserve legacy IDs.
- Because RLS enforces ownership in the database, missing `user_id` values will fail inserts instead of silently creating globally readable records.

## Recommended Next Implementation Step

Switch runtime auth first, but keep the RTK Query endpoint names and component hook usage unchanged. That gives you the smallest UI diff and the clearest rollback path.
