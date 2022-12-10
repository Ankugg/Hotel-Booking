import { browserRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import UserLogin from "./pages/login/Login";
import Registration from "./pages/login/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/allhotel/:id" element={<Hotel />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Registration />} />


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
