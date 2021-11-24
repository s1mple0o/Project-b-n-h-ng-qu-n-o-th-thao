import { createContext, useState, useEffect } from "react";
import toastifyAlert from "./../toastify-message/toastify";
export const CartContext = createContext(null);
const CartContextProvider = ({ children }) => {
  const [productListCart, setProductListCart] = useState(
    localStorage.getItem("productCart1") != null
      ? JSON.parse(localStorage.getItem("productCart1"))
      : []
  );
  const loadCart = () => {
    console.log("LOAD CARD");
    setProductListCart(onGetCart());
  };
  const onGetCart = () => {
    return localStorage.getItem("productCart1") != null
      ? JSON.parse(localStorage.getItem("productCart1"))
      : [];
  };
  const [status, setStatus] = useState(false);

  const addToCart = (e, product, optionName, valueOption) => {
    if (status == false) {
      setStatus(true);
    } else {
      setStatus(false);
    }

    let b = Math.random() * 1000;
    if (valueOption === null || valueOption === undefined) {
      toastifyAlert.error(`Bạn chưa chọn ${optionName}`);
      return;
    } else {
      let obj = {
        // key: b,
        amount: 0,
        product: product,
        optionName: optionName,
        valueOption: valueOption,
      };

      if (productListCart.length <= 0) {
        productListCart.push(obj);
      }

      for (let i = 0; i < productListCart.length; i++) {
        if (
          productListCart[i].product.productId === obj.product.productId &&
          productListCart[i].product.optionId === obj.product.optionId &&
          productListCart[i].valueOption === obj.valueOption
        ) {
          productListCart[i].amount++;
        }
      }
      let a = productListCart.find(
        (pr) =>
          pr.product.productId === obj.product.productId &&
          pr.product.optionId === obj.product.optionId &&
          pr.valueOption === obj.valueOption
      );
      console.log("a", a);
      if (a == null || a == undefined) {
        productListCart.push({ ...obj, amount: 1 });
      }
      // , key: b
      console.log(productListCart);
      localStorage.setItem("productCart1", JSON.stringify(productListCart));
      toastifyAlert.success(`Đã thêm ${product.productName} vào giỏ hàng`);
    }
  };
  console.log(productListCart);
  const removeProduct = (product) => {
    const result = productListCart.filter(
      (item) => item.product.productId !== product.productId
    );
    setProductListCart(result);
    localStorage.setItem("productCart1", JSON.stringify(result));

    toastifyAlert.warn(
      `Bạn vừa bỏ sản phẩm ${product.productName} khỏi giỏ hàng `
    );
    if (status == false) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    // window.location.reload();
  };

  const showToTalAmount = (cart) => {
    var total = 0;
    if (cart != null) {
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].product.price * cart[i].amount;
      }
    }
    return total;
  };

  const CartContextValue = {
    productListCart,
    status,
    showToTalAmount,
    setProductListCart,
    addToCart,
    onGetCart,
    removeProduct,
    loadCart,
  };
  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
