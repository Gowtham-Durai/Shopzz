import React, { useEffect, useState } from "react";

import CartList from "../../Components/CartList/CartList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkout_cart } from "../../Redux/action";
import style from "./cart.module.css";
import BackNavigation from "../../Components/BackNavigation/BackNavigation";

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const total = carts.reduce((prev, curr) => {
    return prev + curr.product.price * curr.count;
  }, 0);
  const checkout_Amt = total - total * (discount / 100);

  useEffect(() => {
    if (carts.length === 0) {
      navigate("/");
    }
  }, [carts]);

  const checkout = () => {
    alert("Checkout Successful");
    setTimeout(() => {
      dispatch(checkout_cart());
    }, 400);
  };

  const handleDiscount = (event) => {
    const value = event.target.value;
    if (value > -1 && value <= 100) setDiscount(value);
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
    <BackNavigation/>
      <div className={style.cart_container}>
        <h1 className={style.title}>Your Cart</h1>

        <div className={style.header}>
          <h2>Product</h2>
          <h2>Price</h2>
          <h2>Quantity</h2>
          <h2>Subtotal</h2>
        </div>
        <div className={style.cartLi_container}>
          {carts.map((val, idx) => {
            return <CartList data={val} key={idx} />;
          })}
        </div>

        <div className={style.check_details_container}>
          <div className="total">
            <span>Total Price: </span>
            <span> ${total.toFixed(2)}</span>
          </div>
          <div className="discount">
            <span>Discount: </span>
            <div>
              <input
                type="number"
                placeholder="Discount"
                onChange={handleDiscount}
                min={0}
                max={100}
                value={discount}
              />
              <span>%</span>
            </div>
          </div>

          <div className="checkout_amount">
            <span> Checkout Amount:</span>
            <span> ${checkout_Amt.toFixed(2)}</span>
          </div>

          <button onClick={checkout} className={style.checkout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
