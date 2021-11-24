import HomePage from "./page/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./page/AboutPage/AboutPage";
import ProductPage from "./page/ProductPage/ProductPage";
import ProductDetailPage from "./page/ProductDetailPage/ProductDetailPage";
import CartPage from "./page/CartPage/CartPage";
import LoginPage from "./page/auth/Login/LoginPage";
import RegisterPage from "./page/auth/RegisterPage/RegisterPage";
import { ToastContainer } from "react-toastify";
import "./App.css";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/user/about" element={<AboutPage />} />
        <Route exact path="/user/products" element={<ProductPage />} />
        <Route path="/user/products/:id" element={<ProductPage />} />
        <Route
          path="/user/products/productDetail/:id"
          element={<ProductDetailPage />}
        />
        <Route path="/user/carts" element={<CartPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
