import { lazy, Suspense, type ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useGetAuthUserQuery } from "@store/services/recipesApi";
import AppLoadingScreen from "@component/app-loading-screen/app-loading-screen.component";

const MainPage = lazy(() => import("./routes/main-page/main-page.route"));
const Login = lazy(() => import("./routes/auth/login.route"));
const SignUp = lazy(() => import("./routes/auth/signup.route"));
const ErrorPage = lazy(() => import("./routes/error-page"));
const LandingPage = lazy(
  () => import("./routes/landing-page/landing-page.route"),
);

type RouteGateProps = {
  isAuthenticated: boolean;
  children: ReactElement;
};

const PublicRoute = ({ isAuthenticated, children }: RouteGateProps) =>
  isAuthenticated ? <Navigate replace to="/" /> : children;

const ProtectedRoute = ({ isAuthenticated, children }: RouteGateProps) =>
  isAuthenticated ? children : <Navigate replace to="/login" />;

const App = () => {
  const { data: user, isLoading: isAuthLoading } = useGetAuthUserQuery();
  const isAuthenticated = Boolean(user);

  if (isAuthLoading) {
    return <AppLoadingScreen />;
  }

  return (
    <Suspense fallback={<AppLoadingScreen />}>
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Navigate replace to="/login" />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={isAuthenticated ? <MainPage /> : <LandingPage />}
        />
        <Route
          path="/recipe/view/:slug"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/update/:slug"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/delete/:slug"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
