import React from "react";
import Cart from "../../components/Cart/Cart";
import MenuBar from "../../components/MenuBar/MenuBar";
import Header from "./../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";

function CartPage(props) {
  return (
    <div>
      <Header />
      <MenuBar />
      <Cart />
      <Footer />
    </div>
  );
}

export default CartPage;
