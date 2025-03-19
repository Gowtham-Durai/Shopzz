import React from 'react'
import style from "./CartLi.module.css"
import { addProduct, deleteProduct, subtractProduct } from '../../Redux/action';
import { useDispatch } from 'react-redux';
import remove from "../../Asserts/remove.svg"
const CartLi = ({data}) => {
    const dispatch = useDispatch();

    const count = data.count;
    const total = parseFloat(data.product.price)*count;

    
      const addCart = ()=>{
          dispatch(addProduct(data.product));
      }
      const removeCart = ( ) =>{
        dispatch(subtractProduct(data.product));
      }

      const deleteCart = ()=>{
        dispatch(deleteProduct(data.product));
      }


 


    
  return (
    <div className={style.cartli_container}>
        <div className={style.img_data}>
            <div className="left">
                <img src={data.product.image} alt=" " className={style.product_image} />
            </div>
            <div className={style.middle}>
              
                    <h2>{data.product.title}</h2>
                    <h4>{data.product.category}</h4>
                    
            </div>
        </div>
        <div className={style.meta_data}>
                <div className={style.price}><h3>${data.product.price}</h3></div>
                  
              <div className={style.increment}>
                              <button onClick={removeCart}>-</button>
                              <div><span>{count}</span></div>
                              <button onClick={addCart}>+</button>
                </div>
              <div className={style.total}>
                    <h3>${total.toFixed(2)}</h3>  
              </div>
              <div className={style.right}>
                  <button onClick={deleteCart}>
                      <img src={remove} alt="" />
                  </button>
              </div>
        </div>

    </div>
  )
}

export default CartLi;