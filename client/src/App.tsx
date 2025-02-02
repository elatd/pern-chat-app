import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div
      className="absolute -z-10 inset-0 h-full w-full 
    bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
    bg-[size:10px_10px]"
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
