import Login from "./assets/pages/loginPage/login";
import Forget from "./assets/pages/forgetPage/Forget";
import Register from "./assets/pages/registerPage/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/homePage/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element ={<Home />} />
    </Routes>
  );
}

export default App;