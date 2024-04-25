
import "./App.css";
import { Login } from "./components/Login/Login";
import {SignUp} from "./components/Signup/Signup";
// import { Register } from "./components/Signup/Signup";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";

import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";

function App() {
  const { authUser } = useAuthContext() || {};
  return (
    <div>

    <Routes>
      <Route
      path="/"
      element={<LandingPage/>}
      />
      <Route
      path="/signup"
      element={authUser ? <Navigate to={"/home"} /> : <SignUp/>}
      />
      <Route
      path="/login"
      element={authUser ? <Navigate to={"/home"} /> : <Login/>}
      />
      <Route
      path="/home"
      element={authUser ? <Home /> : <Navigate to={"/login"} />}
      />
    </Routes>
    <Toaster/>
      
    </div>
  );
}

export default App;
