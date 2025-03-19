import React, {  useEffect, useState } from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../../Redux/action';
import Product from '../../Components/Product/Product';
import { useNavigate } from 'react-router-dom';
const Base = () => {
    const products = useSelector(state=>state.products);
   const navigate = useNavigate();
    const [random, setRandom] = useState(() => {
        const savedRandom = sessionStorage.getItem('random');
        return savedRandom ? parseInt(savedRandom, 10) : null;
    });

    const makeRandom = (data)=>{
        const randomValue = Math.floor(Math.random() * data.length);
        setRandom(randomValue);
        sessionStorage.setItem('random', randomValue);
    }
    const dispatch = useDispatch();

      useEffect(()=>{
       const fetchProducts = async () => {
       if(products.length>0) return
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                dispatch(loadProducts(data));
                makeRandom(data);
               
            
            } catch (error) {
                console.log(error.message);
            } 
       };


        fetchProducts();
        const sliderMotion =  setInterval(()=>{
            makeRandom(products);
        },4000);

        return ()=>clearInterval(sliderMotion);
      },[dispatch,random,products]);
 
     
        
    
      const ToSearchPage= ()=>{
            navigate("/search");
      }

      const TopProducts = products[0] && [...products].sort(
            (a,b)=>b.rating.rate - a.rating.rate);
      
      const TopPrice = products[0] && [...products].sort(
          (a, b) => b.price - a.price);

          console.log(TopPrice);

      
  
      
  return products[0]&&(
    <div className='Base_container'>
        <div className="Base">
        
            <div className="Base_category_container">
                                <div className='Base_category_details'>
                                        <h2>{ products[random].title}</h2>
                                        <p>{products[random].description}</p>
                                        <button className="shop_now" onClick={ToSearchPage}>
                                            Shop Now
                                        </button>
                                </div>

                                <img src={products[random].image} alt="" />
                            </div>
                    
               
        </div>




        <div className="Base_product_container">
                 <h2 className='product_title'>Top rating products</h2>
                <div className='Base_product'>
                {   [...new Array(5)].map((val,idx)=>(
                            <Product data ={TopProducts[idx]} key={idx}/>
                    ))
                }
                </div>

                <div className="Base_subCategory_container">
                    <div className="left">
                          <img src={products[11].image} alt="" />
                            <div className='left_left'>
                                <h2>{ products[11].title}</h2>
                                        <p>{products[11].description}</p>
                                        <button className="shop_now" onClick={ToSearchPage}>
                                            Shop Now
                                        </button>
                            </div>
                            
                    </div>
                    <div className="right">
                            <div className='right_block'>
                                    <img src={products[12].image} alt="" />
                                    <div>
                                        <h2>{products[12].title}</h2>
                                        <p>{products[12].description}</p>
                                        <button onClick={ToSearchPage}>Show Now</button>
                                    </div>
                                    
                            </div>

                            <div className="right_block">
                                    <img src={products[13].image} alt="" />
                                     <div>
                                        <h2>{products[13].title}</h2>
                                        <p>{products[13].description}</p>
                                        <button onClick={ToSearchPage}>Show Now</button>
                                    </div>
                                   
                            </div>
                           
                           
                    </div>
                </div>
                <h2 className='product_title'>Top Price products</h2>

                <div className='Base_product'>
                    {   [...new Array(5)].map((val,idx)=>(
                                <Product data ={TopPrice[idx]} key={idx}/>
                        ))
                    }
                </div>
                    
        </div>
    </div>
  )
}

export default Base