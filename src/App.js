import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SingleProductPage from "./pages/SingleProductPage";
import AllNFTExplore from "./pages/AllNFTExplore";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/shop/product" element={<SingleProductPage />}></Route>
          <Route path="/explore/base/all" element={<AllNFTExplore />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
