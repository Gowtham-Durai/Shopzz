import React from 'react'

import style from "./Product.module.css"
import { useDispatch } from 'react-redux'
import { addProduct } from '../../Redux/action';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Product = ({data}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();  
    const cart =   useSelector(state=>state.cart);    
    const item = cart.find((each) => each.product.id === data.id);
    const count = item ? item.count : 0; 

    const addCart = ()=>{
        dispatch(addProduct(data));
      }

    const viewDetail = ()=>{
          navigate("/detail/"+data.id);
    }
  

  return (
    <div className={style.product_container}>
                <div className={style.product_img}  onClick={viewDetail}>
                        <img src={data.image} alt="Product img" />
                </div>


                <div className={style.product_details}>
              
                    <h2>{data.title}</h2>
                    <h6>{data.category}</h6>
                   
                    <div>
                        <span className={style.price}>${data.price}</span>
                        <span className={style.rating}>
                          <span>★</span>&nbsp;
                          {data.rating.rate}</span>

                    </div>

                
                </div>
                
                <div className={style.addBtn}>
                       { (count>0) && <span>{count}</span>}
                        <button onClick={addCart} className='cart'><i class='bx bx-plus'></i></button>

                      
                </div>

    
    </div>
  )
}

export default Product