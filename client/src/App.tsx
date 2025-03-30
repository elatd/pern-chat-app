import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <div className="z-100 relative h-screen flex p-4 items-center justify-center">
      <div
        className="absolute -z-10 inset-0 h-full w-full 
      bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
      bg-[size:10px_10px]"
      ></div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
