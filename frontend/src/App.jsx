import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
