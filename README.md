# Dish Galeria

Dish Galeria is a personal recipe web app for saving, organizing, and revisiting favorite dishes in one place. It includes a public landing page, Supabase authentication, and a private dashboard where each user can manage their own recipe collection.

This project originally used Firebase for authentication and recipe storage, and was recently migrated to Supabase. Some legacy Firebase files may still exist in the repo during cleanup, but the active app flow now runs on Supabase.

## Overview

This project is structured like a small production app rather than a single-page demo. It includes:

- a marketing-style landing page
- email/password and Google authentication with Supabase
- user-scoped recipe storage
- gallery browsing, filtering, and search
- modal-based recipe create, update, view, and delete flows
- optional dish image upload to Supabase Storage

## Features

- Public landing page with section-based layout and branding
- Separate login and signup routes with shared auth UI
- Supabase email/password authentication
- Google sign-in with Supabase OAuth
- Per-user recipe CRUD backed by Supabase
- Search and category filtering
- Dish image upload with type validation and a 3 MB limit
- Generated fallback images when no dish image is provided
- Toast feedback for auth and recipe actions
- Responsive UI across landing, auth, and app screens

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit Query
- Supabase Auth
- Supabase Database
- Supabase Storage
- Sass modules
- MUI
- Tailwind CSS 4
- React Toastify
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- a Supabase project

### Install

```bash
npm install
```

### Environment Variables

For local development, create a `.env.local` file in the project root with your
development Supabase project values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_or_publishable_key
```

Vite will load `.env.local` for your machine without committing it. Keep
production Supabase values in your deployment provider environment variables,
not in your local dev file.

You can copy from either [\.env.example](/c:/Users/User/Documents/personal/recipe-book/.env.example)
or [\.env.local.example](/c:/Users/User/Documents/personal/recipe-book/.env.local.example).
The app reads these from [src/utils/supabase.ts](/c:/Users/User/Documents/personal/recipe-book/src/utils/supabase.ts).

### Supabase Setup

Run the SQL migrations in your Supabase project:

1. Run [supabase/migrations/0001_initial_schema.sql](/c:/Users/User/Documents/personal/recipe-book/supabase/migrations/0001_initial_schema.sql)
2. Run [supabase/migrations/0002_recipe_images_storage.sql](/c:/Users/User/Documents/personal/recipe-book/supabase/migrations/0002_recipe_images_storage.sql) if you want dish image upload enabled

Then configure authentication in the Supabase dashboard:

1. Enable `Email` in `Authentication > Providers`
2. Enable `Google` if you want Google sign-in
3. Add your local and deployed URLs in `Authentication > URL Configuration`

### Create a Google OAuth Client

If you want Google sign-in, create a Web OAuth client in Google Cloud Console:

1. Open the Google Cloud Console and select or create a project.
2. Go to `Google Auth Platform > Clients`.
3. If prompted, configure the consent screen first:
   Set an app name, support email, and audience details, then save.
4. Click `Create client`.
5. Choose `Web application`.
6. Add your app origins under `Authorized JavaScript origins`, for example:
   `http://localhost:5173`
   `https://your-production-domain.vercel.app`
7. In your Supabase project, open `Authentication > Sign In / Providers > Google`
   and copy the callback URL shown in the Google provider settings.
   This is your Supabase callback URI.
8. Add that callback URL to `Authorized redirect URIs` in Google Cloud.
   It usually looks like:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
9. Click `Create`, then copy the generated `Client ID` and `Client Secret`.
10. Paste those values into the Google provider settings in your Supabase project.

Recommended setup:

- use a separate Google OAuth client for Development and Production
- use your Dev Supabase callback URL in the Dev Google client
- use your Production Supabase callback URL in the Production Google client

For more detailed setup notes, see [SUPABASE_MIGRATION.md](/c:/Users/User/Documents/personal/recipe-book/SUPABASE_MIGRATION.md).

### Run Locally

```bash
npm run dev
```

To expose the dev server on your local network:

```bash
npm run devnet
```

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run devnet` starts the dev server with `--host`
- `npm run build` runs TypeScript checks and creates a production build
- `npm run preview` previews the production build
- `npm run lint` runs ESLint
- `npm run stylelint` runs Stylelint for `css` and `scss`
- `npm run format` formats the repo with Prettier
- `npm run prettier:check` checks formatting with Prettier
- `npm run ci:check` runs lint, stylelint, format, and prettier checks

## Routes

- `/` shows the landing page for signed-out users and the main app for signed-in users
- `/auth` redirects to `/login`
- `/login` shows the login page
- `/signup` shows the signup page
- `/recipe/view/:slug` shows the recipe view modal route
- `/recipe/update/:slug` shows the recipe update modal route
- `/recipe/delete/:slug` shows the recipe delete modal route

## Project Structure

```text
src/
  assets/        Images, icons, and SVG assets
  component/     Reusable UI, auth, gallery, and modal components
  context/       React context providers
  data/          Static dish data and image mappings
  hooks/         App, auth, resize, and form hooks
  routes/        Landing, auth, and main app routes
  store/         RTK Query API and Redux store setup
  types/         Shared TypeScript types
  utils/         Supabase helpers, auth helpers, image generation, and theme utilities

supabase/
  migrations/    SQL schema and storage policy migrations
```

## Path Aliases

The app uses aliases configured in `tsconfig.app.json` and `vite.config.ts`:

- `@assets/*`
- `@component/*`
- `@context/*`
- `@data/*`
- `@hooks/*`
- `@routes/*`
- `@store/*`
- `@app-types/*`
- `@utils/*`
- `@src/*`

## App Flow

1. Signed-out users land on the public landing page.
2. The landing page CTA routes them to signup.
3. Users authenticate with email/password or Google through Supabase.
4. After successful authentication, the app loads the authenticated dashboard.
5. Signed-in users can add, view, update, delete, search, and filter recipes.
6. Recipe data is scoped to the authenticated user through Supabase RLS policies.
7. Dish images can be uploaded to Supabase Storage or generated locally as fallbacks.

## Image Upload Notes

- Dish image uploads are stored in the `recipe-images` Supabase Storage bucket.
- Allowed file types are `.jpg`, `.jpeg`, `.png`, `.webp`, and `.gif`.
- Client-side validation limits uploads to `3 MB`.
- Uploaded files are stored in per-user folders so storage RLS can enforce ownership.
- If no image is uploaded, the app generates a fallback image from the dish name.

## Notes

- The app previously used Firebase and was recently migrated to Supabase for auth, database access, and storage.
- The repo still contains some legacy Firebase files while the migration cleanup is being finalized, but the active auth and recipe flows now use Supabase.
- If you are troubleshooting setup or RLS errors, start with [SUPABASE_MIGRATION.md](/c:/Users/User/Documents/personal/recipe-book/SUPABASE_MIGRATION.md).
