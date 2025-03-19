import React from 'react'
import style from "./Navbar.module.css"
import logo from "../../Asserts/logo/shopping.png"
import { useDispatch, useSelector } from 'react-redux'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { filterProduct } from '../../Redux/action'


const Navbar = () => {

  const cart_count = useSelector(state=>state.cart_count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = () =>{
    if(cart_count>0)
      navigate("/cart");
  }

  const handleSearch = ()=>{ 
    if(location.pathname !='/search'){
            navigate('/search');
        }
      }

  const handleFilter = (event)=>{
    const filter = event.target.value;

    if(event.code!="Enter"){
      dispatch(filterProduct({
        filter:filter,
        filterID:'title'
      }))
    }
    else{
       handleSearch();
    }
   
  }

  return (
    <header>
        <nav className={style.navbar}>
            <div className={style.logo}>
                    <Link to="/">
                        <img src={logo} className={style.logo_icon} />
                          <span>ShopZ</span>
                          </Link>
                   </div>

            <div className={style.navbar_navigate}>
                <Link to="/search">PRODUCTS</Link>
            </div>
            <div className={style.search}>
                <input type="text" onKeyUp={handleFilter} placeholder='search product...'/>
                <button onClick={handleSearch}><i className='bx bx-search-alt' ></i></button>
            </div>
            <div className={style.cart} onClick={cart}>
                  <i className='bx bxs-cart-alt'></i>
                  {(cart_count>0)&& <span className='cart-active'>{cart_count}</span>}
            </div>
        </nav>
    </header>
  )
}

export default Navbar