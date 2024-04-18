import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ProductsPage from "./components/Products/ProductsPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddProduct from "./components/Products/AddProduct";
import ProductDetails from "./components/Products/ProductDetails";
import EditProduct from "./components/Products/EditProduct";
import DeleteProduct from "./components/Products/DeleteProduct";
import Favorites from "./components/Favorites/Favorites";
import Cart from "./components/Cart/Cart";
import ConfirmPurchase from "./components/ConfirmPurchase/ConfirmPurchase";
import AddUserDetails from "./components/UserDetails/AddUserDetails";
import OrdersUser from "./components/OrdersUser/OrdersUser";
import OrderDetailsUser from "./components/OrdersDetailsUser/OrderDetailsUser";
import AdminOrders from "./components/AdminOrders/AdminOrders";
import AdminOrderDetails from "./components/AdminOrderDetails/AdminOrderDetails";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirm-purchase" element={<ConfirmPurchase />} />
            <Route path="/add-user-details" element={<AddUserDetails />} />
            <Route path="/orders" element={<OrdersUser />} />
            <Route path="/order-details/:orderId" element={<OrderDetailsUser />} />
            <Route path="/adminorders" element={<AdminOrders />} />
            <Route path="/orderdetails-admin/:orderId" element={<AdminOrderDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
