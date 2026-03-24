# Dish Galeria

Dish Galeria is a small personal web app for collecting and managing recipes in one place. It includes a public landing page, Firebase authentication, and an authenticated recipe dashboard where users can add, browse, update, and delete their own dishes.

## Overview

This project is built as a mini-project with real app structure rather than a single demo screen. It combines:

- a marketing-style landing page
- email/password and Google authentication
- Firestore-backed recipe storage
- gallery browsing, filtering, and search
- modal-based recipe CRUD flows

## Features

- Public landing page with section-based component styling
- Separate login and signup routes with a shared auth layout
- Firebase email/password authentication
- Google sign-in
- Firestore-backed recipe data per authenticated user
- Add, view, update, and delete recipe flows
- Search and category filtering
- Generated fallback images for dishes without uploaded artwork
- Toast feedback for auth and recipe actions
- Responsive UI across landing, auth, and app screens

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit Query
- Firebase Auth
- Firestore
- Sass modules
- MUI
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

## Routes

- `/` shows the landing page for signed-out users and the main app for signed-in users
- `/auth` redirects to `/login`
- `/login` login page
- `/signup` signup page
- `/recipe/view/:slug` recipe view modal route
- `/recipe/update/:slug` recipe update modal route
- `/recipe/delete/:slug` recipe delete modal route

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
  utils/         Firebase helpers, auth helpers, image generation, and theme utilities
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
3. Users authenticate with email/password or Google.
4. After successful authentication, the app refreshes and loads the authenticated experience.
5. Signed-in users land on the main recipe dashboard.
6. Recipes are fetched from Firestore and displayed in the gallery.
7. Users can search, filter, and manage recipes through modal-based flows.

## Firebase Note

Firebase setup is currently defined in [`src/utils/firebase.utils.js`](src/utils/firebase.utils.js). If you plan to deploy or share this project publicly, moving those config values into Vite environment variables would be a better next step.
