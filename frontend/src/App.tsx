import "./App.css";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/Signup/Signup";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";

import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AddFood from "./components/Food/Add-Food";
import RequestFood from "./components/Food/Request-Food";
import MyFoods from "./components/Food/MyFood";
import MyRequests from "./components/Food/MyRequests";

function App() {
  const { authUser } = useAuthContext() || {};
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/home"} /> : <SignUp />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/home"} /> : <Login />}
        />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/add"
          element={authUser ? <AddFood /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/request"
          element={authUser ? <RequestFood /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/home/myfood"
          element={authUser ? <MyFoods /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/home/myrequest"
          element={authUser ? <MyRequests /> : <Navigate to={"/login"} /> }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;