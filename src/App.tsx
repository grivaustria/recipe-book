import { Routes, Route } from "react-router-dom";
import MainPage from "./routes/main-page/main-page.route";
import Login from "./routes/auth/login.route";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
