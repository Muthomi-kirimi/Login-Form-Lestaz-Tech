import Login from "./assets/pages/loginPage/Login";
import Forget from "./assets/pages/forgetPage/Forget";
import Register from "./assets/pages/registerPage/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/homePage/Home";
import ResetPassword from "./assets/pages/forgetPage/ResetPassword";
import ProtectedRoute from "./assets/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/home" element ={
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>
      }
        />
    </Routes>
  );
}

export default App;