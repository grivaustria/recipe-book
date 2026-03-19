import { Routes, Route } from "react-router-dom";
import MainPage from "./routes/main-page/main-page.route";
import Login from "./routes/auth/login.route";
import SignUp from "./routes/auth/signup.route";

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<MainPage />}>
      <Route path="recipe/view/:slug" element={<></>} />
      <Route path="recipe/update/:slug" element={<></>} />
      <Route path="recipe/delete/:slug" element={<></>} />
    </Route>
    <Route path="/signup" element={<SignUp />} />
  </Routes>
);

export default App;
