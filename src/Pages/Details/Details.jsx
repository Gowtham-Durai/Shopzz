import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addProduct, subtractProduct } from '../../Redux/action';

import style from "./details.module.css"
import Back from '../../Components/Back/Back';
const Details = () => {
  
  const id = useParams().id;
  const data = useSelector(state=>state.products).find((product)=>{
                                      return product.id == id }); 
  const navigate = useNavigate();
   useEffect(() => {
         if (!data) {
           navigate('/');
         }
       }, [navigate,data]);  
     
     
  const cart =   useSelector(state=>state.cart);
  const dispatch = useDispatch();

  const item = cart.find((each) => each.product.id === data.id);
  const count = item ? item.count : 0; 

  const addCart = ()=>{
      dispatch(addProduct(data));
  }
  const removeCart = ( ) =>{
    dispatch(subtractProduct(data));
  }

  
  return data&&(
  
    <div className={style.container_holder}>
          <Back/>
          <div className={style.product_container}>
            <div className={style.product_img}>
                  <img src={data.image} alt="" />
                  <span>★ {data.rating.rate}</span>
            </div>

            <div className={style.product_details}>
                  <div>
                      <h4 className={style.category}>{data.category}</h4>
                      <h1>{data.title}</h1>
                  </div>
                 
                  <p>{data.description}</p>
                  <h2 className={style.price}>${data.price}</h2>

                  <div className={style.addBtn} >
                                {(count>0)&&<div className={style.increment}>
                                  <button onClick={removeCart}>-</button>
                                <div><span>{count}</span></div>
                                <button onClick={addCart}>+</button>
                                </div>}
                            {(count==0)&&<button onClick={addCart}>+ Add to Cart</button>}

                             
                  </div>
            </div>
                    
        </div>
    </div>

  )
}

export default Details