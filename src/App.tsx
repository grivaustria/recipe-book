import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("./routes/main-page/main-page.route"));
const Login = lazy(() => import("./routes/auth/login.route"));
const SignUp = lazy(() => import("./routes/auth/signup.route"));

const App = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainPage />}>
        <Route path="recipe/view/:slug" element={<></>} />
        <Route path="recipe/update/:slug" element={<></>} />
        <Route path="recipe/delete/:slug" element={<></>} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Suspense>
);

export default App;
