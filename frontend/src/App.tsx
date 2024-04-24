import "./App.css";
import SignUp from "./components/Signup/Signup";
import LandingPage from "./pages/LandingPage";

import { Route, Routes } from "react-router";

function App() {
  return (
    <div>

    <Routes>
      <Route
      path="/"
      element={<LandingPage/>}
      />
      <Route
      path="/signup"
      element={<SignUp/>}
      />
    </Routes>
      
    </div>
  );
}

export default App;
