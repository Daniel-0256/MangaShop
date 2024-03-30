import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Home";
import ProductsPage from "./components/ProductsPage/ProductsPage";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:nameProduct" element={<ProductsPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
