# Dish Galeria

A personal recipe collection app built with React, Vite, Firebase, and TypeScript. Users can sign up, log in, save recipes, browse their collection, and manage entries through modal-based add, view, update, and delete flows.

## Features

- Firebase email/password auth
- Google sign-in
- Firestore-backed recipe storage
- Add, view, update, and delete recipe flows
- Search and dish-type filtering
- Generated placeholder recipe images for dishes without uploaded artwork
- Toast feedback for create, update, and delete actions
- Responsive UI with route-driven modals

## Tech Stack

- React 19
- TypeScript
- Vite
- Firebase Auth and Firestore
- React Router
- Redux Toolkit Query
- MUI
- Sass modules
- Tailwind CSS 4
- React Toastify
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

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

## Project Structure

```text
src/
  assets/        Images, icons, and SVG assets
  component/     Reusable UI pieces and modal components
  context/       React context providers
  data/          Static dish data and image mappings
  hooks/         App, auth, resize, and form hooks
  routes/        Route-level pages and modal route orchestration
  store/         RTK Query API and Redux store setup
  types/         Shared TypeScript types
  utils/         Firebase helpers, image generation, and theme utilities
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

1. Users sign in with email/password or Google.
2. Authenticated users land on the main recipe dashboard.
3. Recipes are fetched from Firestore and mapped into the gallery.
4. Users can search, filter, open modal routes, and manage recipes.
5. If a recipe has no stored image, the app can generate a temporary placeholder image from the dish name.

## Routes

- `/` main dashboard
- `/login` login page
- `/signup` signup page
- `/recipe/view/:slug` recipe view modal
- `/recipe/update/:slug` recipe update modal
- `/recipe/delete/:slug` recipe delete modal

## Firebase Note

Firebase setup is currently defined in `src/utils/firebase.utils.js`. If you plan to deploy or share this project, moving those values into Vite environment variables would be a safer next step.
