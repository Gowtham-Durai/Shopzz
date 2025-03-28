import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../Redux/action";
import Product from "../../Components/Product/Product";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Base = () => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [random, setRandom] = useState(() => {
    const savedRandom = sessionStorage.getItem("random");
    return savedRandom ? parseInt(savedRandom, 10) : null;
  });

  const storeRandomNumber = (data) => {
    const randomValue = Math.floor(Math.random() * data.length);
    setRandom(randomValue);
    sessionStorage.setItem("random", randomValue);
  };

  const dispatch = useDispatch();

  const loadProductsFromAPI = async () => {
    if (products.length > 0) return;
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

      const data = response.data;
  
      dispatch(loadProducts(data));
      (data);
    } catch (error) {

      console.log(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    loadProductsFromAPI();

    const sliderMotion = setInterval(() => {
      storeRandomNumber(products);
    }, 4000);

    return () => clearInterval(sliderMotion);
  }, [dispatch, random, products]);

  const ToSearchPage = () => {
    navigate("/search");
  };

  const TopProducts =
    products?.length && [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0,5);

  const TopPrice =
    products?.length && [...products].sort((a, b) => b.price - a.price).slice(0,5);

  return (
    products?.length ? (
      <div className="Base_container">
        <div className="Base">
          <div className="Base_category_container">
            <div className="Base_category_details">
              <h2>{products[random].title}</h2>
              <p>{products[random].description}</p>
              <button className="shop_now" onClick={ToSearchPage}>
                Shop Now
              </button>
            </div>

            <img src={products[random].image} alt="" />
          </div>
        </div>

        <div className="Base_container__product_container">
            <h2 className="product_title">Top rating products</h2>
            <div className="Base_product">
              {TopProducts.map((val, idx) => (
                <Product data={val} key={idx} />
              ))}
            </div>

          <div className="Base_container__product_container__subCategory_container">
            <div className="leftContainer">
              <img src={products[11].image} alt="" />
              <div className="left_left">
                <h2>{products[11].title}</h2>
                <p>{products[11].description}</p>
                <button className="shop_now" onClick={ToSearchPage}>
                  Shop Now
                </button>
              </div>
            </div>
            <div className="RightContainer">
              <div className="RightContainer__block">
                <img src={products[12].image} alt="" />
                <div>
                  <h2>{products[12].title}</h2>
                  <p>{products[12].description}</p>
                  <button onClick={ToSearchPage}>Show Now</button>
                </div>
              </div>

              <div className="RightContainer__block">
                <img src={products[13].image} alt="" />
                <div>
                  <h2>{products[13].title}</h2>
                  <p>{products[13].description}</p>
                  <button onClick={ToSearchPage}>Show Now</button>
                </div>
              </div>
            </div>
          </div>


          <h2 className="product_title">Top Price products</h2>

          <div className="Base_product">
            {TopPrice.map((val, idx) => (
              <Product data={val} key={idx} />
            ))}
          </div>
        </div>
      </div>
    ):<></>
  );
};

export default Base;
