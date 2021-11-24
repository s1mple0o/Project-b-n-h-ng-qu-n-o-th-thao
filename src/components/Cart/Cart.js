import React, { useState, useEffect, useContext } from "react";
import "./css/Cart.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Cart() {
  const {
    productListCart,
    removeProduct,
    showToTalAmount,
    setProductListCart,
    status,
  } = useContext(CartContext);

  const [inputValue, setInputValue] = useState(0);
  const [p, setP] = useState({});
  const [i, setI] = useState({});

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate({ pathname: "/user/products" });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const onChangeAmount = (e, product, item) => {
    e.preventDefault();
    if (
      e.target.value <= 0 ||
      e.target.value == null ||
      e.target.value == undefined
    ) {
      setInputValue(1);
      return;
    } else {
      setInputValue(e.target.value);
      setP(product);
      // setI(item);
    }
  };

  useEffect(() => {
    productListCart.map((item) => {
      if (item.product.productId === p.productId) {
        item.amount = inputValue;
      }
    });
    localStorage.setItem("productCart1", JSON.stringify(productListCart));
    setProductListCart(JSON.parse(localStorage.getItem("productCart1")));
  }, [inputValue, p, status]);
  console.log(productListCart);

  const product = (item) => {
    return (
      <tr key={item.product.productId} className="product-table-tr-body">
        <th>
          <img className="product-image-cart" src={item.product.image} />
        </th>
        <th>
          <Link to={`/user/products/productDetail/${item.product.productId}`}>
            {item.product.productName}
          </Link>
        </th>
        <th>{item.optionName}</th>
        <th>{item.valueOption}</th>
        <th>
          <h6>{item.product.price} VNĐ</h6>
        </th>
        <th>
          <input
            id="product-amount-cart"
            type="number"
            defaultValue={item.amount}
            min={1}
            name="quantity"
            onChange={(e) => onChangeAmount(e, item.product, item)}
          />
        </th>
        <th>
          <h6 style={{ color: "red" }}>
            {item.product.price * item.amount} VNĐ
          </h6>
        </th>
        <th>
          <button
            className="btn-product-remove"
            onClick={() => removeProduct(item.product)}
          >
            <BsTrash />
          </button>
        </th>
      </tr>
    );
  };
  return (
    <div class="shopping-cart">
      <div class="title">Giỏ hàng của bạn</div>
      <section className="section">
        <div className="table-responsive">
          <table className="product-table">
            <thead>
              <tr className="product-table-tr-head">
                <th>Hình ảnh</th>
                <th>Sản phẩm</th>
                <th>Tên option</th>
                <th>Option value</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Tổng cộng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productListCart.length === 0 ? (
                <tr>
                  <td>Giỏ hàng không có gì</td>
                </tr>
              ) : (
                productListCart.map((item) => {
                  return product(item);
                })
              )}
            </tbody>
          </table>
          <div className="total-Price">
            <b className="note-warning">
              Lưu ý: Giá bán sản phẩm đã bao gồm thuế VAT
            </b>
            <br />
            <b>Tổng tiền:</b>{" "}
            <span
              style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}
            >
              {showToTalAmount(productListCart)} VNĐ
            </span>
          </div>
        </div>
      </section>
      <button id="btn-back" onClick={() => onClickBack()}>
        <RiArrowGoBackFill /> Tiếp tục mua hàng
      </button>

      <div className="title">Nhập thông tin giao hàng</div>
      <div className="form-cart">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label for="exampleDatepicker1" class="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            id="form3Example1q"
            className="form-control"
            {...register("cartPhone", {
              required: true,
              pattern: {
                value: /^[0-9\-\+]{9,15}$/i,
                message: "Số điện thoại không đúng định dạng",
              },
              maxLength: 11,
              minLength: 10,
            })}
          />
          <div class="error-alert">
            {errors?.cartPhone?.type === "required" && (
              <p class="p-alert-validate">Bạn chưa nhập số điện thoại</p>
            )}
            {errors?.cartPhone?.type === "maxLength" && (
              <p class="p-alert-validate">
                Số điện thoại không được quá 11 ký tự
              </p>
            )}
            {errors?.cartPhone?.type === "minLength" && (
              <p class="p-alert-validate">
                Số điện thoại it nhất phải có 10 ký tự
              </p>
            )}
            {errors?.cartPhone?.type === "pattern" && (
              <p class="p-alert-validate">Số điện thoại không đúng định dạng</p>
            )}
          </div>
          <label for="exampleDatepicker1" class="form-label">
            Nơi nhận hàng
          </label>
          <input
            type="text"
            id="form3Example1q"
            className="form-control"
            {...register("cartAddress", {
              required: true,
            })}
          />
          <div className="error-alert">
            {errors?.cartAddress?.type === "required" && (
              <p class="p-alert-validate">Bạn chưa nhập địa chỉ</p>
            )}
          </div>
          <label for="exampleDatepicker1" class="form-label">
            Ghi chú
          </label>
          <textarea
            type="text"
            id="form3Example1q"
            className="form-control"
            {...register("cartNote", {
              required: false,
            })}
          />
          <button type="submit" className="btn-order-cart">
            Đặt hàng
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
