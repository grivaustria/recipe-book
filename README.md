# Dish Galeria

A recipe collection app built with React, Vite, Firebase, and styled components. Users can sign up, log in, save their own recipes, search through them, and manage entries with add, view, update, and delete flows.

## Features

- Email/password authentication with Firebase Auth
- Google sign-in with popup flow
- Personal recipe storage in Firestore
- Create, view, update, and delete recipe entries
- Search and category-based filtering
- Toast notifications for feedback
- Responsive UI built with React, MUI, and styled-components

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

### Install

```bash
npm install
```

### Run the app

```bash
npm run dev
```

To expose the dev server on your local network:

```bash
npm run devnet
```

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run devnet` starts the dev server with `--host`
- `npm run build` runs TypeScript build checks and creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint
- `npm run stylelint` runs Stylelint on styles
- `npm run prettier:check` checks formatting
- `npm run format` formats the repository with Prettier
- `npm run ci:check` runs lint, stylelint, and prettier checks

## Project Structure

```text
src/
  assets/        Images and icons
  component/     Reusable UI components and modal flows
  data/          Static dish data and image mappings
  hooks/         App and form logic
  routes/        Login, signup, and main page routes
  types/         Shared TypeScript types
  utils/         Firebase setup, helpers, and theme utilities
```

## App Flow

1. Users create an account or sign in with email/password or Google.
2. Authenticated users are redirected to the main recipe page.
3. Recipes are fetched from Firestore and scoped to the current user.
4. Users can search recipes, filter by dish type, and open modal-based CRUD flows.

## Firebase Notes

The Firebase configuration is currently defined in `src/utils/firebase.utils.js`. If you plan to publish or collaborate on this project, moving those values into Vite environment variables would be a safer next step.

## Current Routes

- `/` main recipe dashboard
- `/login` login page
- `/signup` account creation page
- `/recipe/view/:slug` recipe view modal route
- `/recipe/update/:slug` recipe update modal route
- `/recipe/delete/:slug` recipe delete modal route

## Status

This project is actively structured around a personal recipe manager workflow and already includes authentication, Firestore integration, search, and CRUD behavior.
