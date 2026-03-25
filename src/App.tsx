import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useGetAuthUserQuery } from "@store/services/recipesApi";

const MainPage = lazy(() => import("./routes/main-page/main-page.route"));
const Login = lazy(() => import("./routes/auth/login.route"));
const SignUp = lazy(() => import("./routes/auth/signup.route"));
const ErrorPage = lazy(() => import("./routes/error-page"));
const LandingPage = lazy(
  () => import("./routes/landing-page/landing-page.route"),
);

const App = () => {
  const { data: user, isLoading: isAuthLoading } = useGetAuthUserQuery();

  if (isAuthLoading) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/auth" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <MainPage /> : <LandingPage />} />
        <Route
          path="/recipe/view/:slug"
          element={user ? <MainPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/recipe/update/:slug"
          element={user ? <MainPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/recipe/delete/:slug"
          element={user ? <MainPage /> : <Navigate replace to="/login" />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
