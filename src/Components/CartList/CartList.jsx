import React from "react";
import style from "./CartList.module.css";
import { addProduct, deleteProduct, subtractProduct } from "../../Redux/action";
import { useDispatch } from "react-redux";
import remove from "../../Asserts/remove.svg";
const CartList = ({ data }) => {
  const dispatch = useDispatch();

  const count = data.count;
  const total = parseFloat(data.product.price) * count;

  const addCart = () => {
    dispatch(addProduct(data.product));
  };
  const removeCart = () => {
    dispatch(subtractProduct(data.product));
  };

  const deleteCart = () => {
    dispatch(deleteProduct(data.product));
  };

  return (
    <div className={style.cartList_container}>
      {/* CartList element Descrtion here */}
      <div className={style.cartList_container__img_data}>
            <section className="leftContainer">
              <img
                src={data.product.image}
                alt=" "
                className={style.cartList_container__img_data__product_image}
              />
            </section>
            <section className={style.cartList_container__img_data__middle}>
              <h2>{data.product.title}</h2>
              <h4>{data.product.category}</h4>
            </section>
      </div>

      {/* products meta data details here */}
      <div className={style.cartList_container__meta_data}>
            
              <h3 >${data.product.price}</h3>
            
           
            <div className={style.cartList_container__meta_data__increment}>
                    <button onClick={removeCart}>-</button>
                   <span >{count}</span> 
                    <button onClick={addCart}>+</button>
            </div>
 
             <h3  className={style.cartList_container__meta_data__total}> ${total.toFixed(2)}</h3>

        <div className={style.cartList_container__meta_data__rightContainer}>
          <button onClick={deleteCart}>
            <img src={remove} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
