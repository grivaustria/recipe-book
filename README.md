# Dish Galeria

Dish Galeria is a recipe collection app built with React, Vite, Firebase, and styled-components. It lets users create an account, sign in, store their own recipes in Firestore, and manage them through search, filter, add, update, view, and delete flows.

## Features

- Email/password authentication with Firebase Auth
- Google sign-in with popup
- Personal recipe storage in Firestore
- Add, view, update, and delete recipe entries
- Search and category-based filtering
- Toast notifications for user feedback
- Responsive UI built with MUI and styled-components

## Tech Stack

- React 19
- TypeScript and JavaScript
- Vite
- Firebase Auth
- Firebase Firestore
- React Router
- MUI
- styled-components
- react-toastify
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

To expose the app on your local network:

```bash
npm run devnet
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run devnet` starts the dev server with `--host`
- `npm run build` runs TypeScript checks and creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint
- `npm run stylelint` runs Stylelint
- `npm run prettier:check` checks formatting
- `npm run format` formats the project with Prettier
- `npm run ci:check` runs lint, stylelint, and prettier checks together

## Project Structure

```text
src/
  assets/        Images and icons
  component/     Reusable UI components and modal flows
  data/          Static dish data and image mappings
  hooks/         App and form logic
  routes/        Login, signup, and main page routes
  types/         Shared TypeScript types
  utils/         Firebase setup and shared helpers
```

## App Flow

1. Users sign up or log in with email/password or Google.
2. Authenticated users are redirected to the main recipe dashboard.
3. Recipes are fetched from Firestore and scoped to the current user.
4. Users can search, filter, add, update, view, and delete recipes through modal-driven flows.

## Routes

- `/` main recipe dashboard
- `/login` login page
- `/signup` account creation page
- `/recipe/view/:slug` recipe view modal route
- `/recipe/update/:slug` recipe update modal route
- `/recipe/delete/:slug` recipe delete modal route

## Firebase Notes

- Firebase client configuration is currently defined in `src/utils/firebase.utils.js`.
- For a safer public repo setup, move these values into Vite environment variables.
- Keep real env files out of source control and use `.env.example` for placeholders only.

## Release Workflow

If you release from your release branch, the typical flow is:

```bash
git checkout release-V1.5
git tag -a v1.5 -m "Release version 1.5"
git push origin v1.5
```

For future releases, repeat the same process with the next version tag. If you prefer, you can also create the tag directly from the GitHub Releases UI instead of doing it manually in git.

## Status

Dish Galeria already includes authentication, Firestore integration, search, and recipe CRUD functionality, and is set up with linting, formatting, and CI checks for ongoing development.
