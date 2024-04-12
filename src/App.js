import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Home";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import AddProduct from "./components/ProductsPage/AddProduct";
import ProductDetails from "./components/ProductsPage/ProductDetails";
import EditProduct from "./components/ProductsPage/EditProduct";
import DeleteProduct from "./components/ProductsPage/DeleteProduct";
import Favorites from "./components/FavoritesPage/Favorites";
import Cart from "./components/CartPage/Cart";
import ConfirmPurchase from "./components/UserDetails/ConfirmPurchase";
import AddUserDetails from "./components/UserDetails/AddUserDetails";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:nameProduct" element={<ProductsPage />} />
            <Route path="/product/details/:productId" element={<ProductDetails />} />
            <Route path="/product/edit/:productId" element={<EditProduct />} />
            <Route path="/product/delete/:productId" element={<DeleteProduct />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirm-purchase" element={<ConfirmPurchase />} />
            <Route path="/add-user-details" element={<AddUserDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
