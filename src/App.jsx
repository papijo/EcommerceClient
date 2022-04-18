import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes, Route, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Review from "./pages/Review";
import Checkout from "./pages/Checkout";
import Thankyou from "./pages/Thankyou";
import History from "./pages/History";
import OrderDetail from "./pages/OrderDetail";

const App = () => {
  const user = useSelector((state) => state?.user?.currentUser) || null;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="success" element={<Success />} />
        <Route path="order-history" element={user ? <History /> : <Login />} />
        <Route
          path="order-history/:id"
          element={user ? <OrderDetail /> : <Login />}
        />
        <Route path="products/" element={<ProductList />} />
        <Route path="products/:cat" element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={user ? <Checkout /> : <Login />} />
        <Route path="review" element={<Review />} />
        <Route path="thankyou" element={<Thankyou />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
};

export default App;
