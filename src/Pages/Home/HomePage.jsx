
import React, { useEffect, useState } from 'react'
import Product from '../../Components/Product/Product'
import style from "./home.module.css"
import { useDispatch, useSelector } from 'react-redux'
import {  loadProducts } from '../../Redux/action'
import no_data from"../../Asserts/no_data.jpg"

const HomePage = () => {

  const products = useSelector(state=>state.products);
  const filter = useSelector(state=>state.search);
  const dispatch = useDispatch();
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(1000);
  const [slide,setSlide] = useState(false);
  const [page,setPage] = useState(0);
  const step = 4;
  const [secondFilters,setFilters] = useState({
    'category':'All',
    'rating':0
  
  });

  const handleRateCheck = (rate)=>{
    setFilters((prev)=>({...prev,'rating':rate}));
    setPage(0);
  }
  function Rating(rate) {
    let elements = [];
   
    
    for (let i = 0; i < 5; i++) {
      const star = i < rate ? '★' : '☆';
      elements.push(
        <button 
          key={i} 
          className={style.rating} 
          onClick={() => handleRateCheck(i+1 )}
        >
          {star}
        </button>
      );
    }
    
    return elements
  }


  useEffect(()=>{
    const fetching = async()=>{
      await fetch("https://fakestoreapi.com/products").then(data=>data.json())
              .then((data)=>{
                
                dispatch(loadProducts(data));
              
              });

    }
    fetching();
  },[]);

  
  function applyFilter(middleware){

    const category = secondFilters['category'];
    
    if(category !="All"){
      middleware =  middleware.filter((val)=>{
        return (val.category == secondFilters.category)
              
      });
    }
    middleware =  middleware.filter((val)=>{
      return (val.price >=minValue && val.price<=maxValue) 
             
    });

    middleware = middleware.filter((val)=>{
      return (val.rating.rate>secondFilters.rating);
    });

    
    return middleware

   
  }
  let Products;
  let retriveProducts;
  if(!filter['filter']){
      let middleware = products

      middleware = applyFilter(middleware)
      
      retriveProducts = middleware;
      middleware = middleware.slice(0,step*(page+1));
  
      Products =   middleware&&middleware.map((val,idx)=>{
        return  <Product data={val} key={idx}/>
      });

      if(middleware.length==0 ){
          if(products[0]) {
            Products =  <img src={no_data} className={style.no_data}/> 
          }
          else{
            Products = <div className="loadContainer">
                <div className='Loader'></div>
            </div>
          }
          
      }


    
  }
  else{
        const filter_products = filter['filter'];
        const filter_id = filter['filterID'];
        let middleware = filter_products&&products.filter((element)=>{
          return element[filter_id].toLowerCase().includes(filter_products.toLowerCase());
        })

        middleware = applyFilter(middleware)

        retriveProducts = middleware;
        middleware = middleware.slice(0,step*(page+1));
        if(middleware.length>0){
          Products = middleware.map((val,idx)=>{
            return <Product data={val} key={idx}/>
        });
        }
        else {
     
          Products =  <img src={no_data} className={style.no_data}/>
        }
      

}
  const handleOptions = (event)=>{
    const value = event.target.value;
    setFilters(prev=>({...prev,category:value}));
    setPage(0);
  }

  const reset = ()=>{
    setFilters({category:'All',rating:0});
    set_maxValue(1000);
    set_minValue(0);
    setPage(0);
}

 const seeMore = ()=>{
  setPage((prev)=>(prev+1));
 }

 const minSlider = (event)=>{
  const value = event.target.value;
  set_minValue(value);
  setPage(0);
 }
 const maxSlider = (event)=>{
  const value = event.target.value;
  set_maxValue(value);
  setPage(0);
 }

  return (
    <div style={{padding:'10px'}} className={style.withFilter}>
      
      <div className={style.filter_holder}>
            <div onClick={()=>setSlide(!slide)} className={style.slider}>
              <i class='bx bx-filter' ></i>
          </div>


          {slide && 
                  <div className={style.filter_container}>
                            <h2 onClick={()=>setSlide(!slide)}>Filter : </h2>
                            <div className="category_filter">
                                  <h3>Category</h3>
                                    <select className={style.options} onChange={handleOptions}>
                                      <option >All</option>
                                        {  [...new Set(products.map(val => val.category))].map(
                                          (category, idx) => (<option key={idx} >{category}</option>))
                                        }   
                                
                                  </select>
                            </div>

                          <div className={style.price_filter}>
                                <h3>Price</h3>
                                  <label htmlFor="">minimum-${minValue}</label>
                                      <input type="range" min ={0} max={1000} onChange={minSlider}  defaultValue={minValue} value={minValue}/>
                                  <label htmlFor="">maximum-${maxValue}</label>
                                      <input type="range" min ={0} max={1000} onChange={maxSlider} defaultValue={maxValue} value={maxValue}/>
                          
                            
                          </div>
                            <div className="rating_filter">
                                  <h3>Rating</h3>
                                  {Rating(secondFilters['rating'])} & up
                            </div>

                            <button onClick={reset} className={style.reset}>
                              Reset
                            </button>
                  </div>
                  }
      </div>
     
      




      {/* container------------------------------- */}
        
        <div className={style.home_container}>
        
        {Products }
                {((page+1)*step<retriveProducts.length)&&( <div className={style.see_more}  >
                     <span onClick={seeMore}>See more</span>
                 </div>)}
          </div> 
      </div>
  )
}

export default HomePage