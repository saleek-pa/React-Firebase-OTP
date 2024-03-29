import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route exact path="/home" element={<Home />} />
      </Routes>
   );
}

export default App;
