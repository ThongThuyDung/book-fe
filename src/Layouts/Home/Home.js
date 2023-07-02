import React, {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import ListProduct from "../../Components/ListProduct";
import  './style.css';
import Chatbot from "../../Components/Chatbot";
import { getAllProduct } from '../../APIs/product.api';

export default function Home({ keyword }) {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();
  const handleClickDetailProduct = (idProduct) => {
    navigate(`/detail-product/${idProduct}`);
  };
  useEffect(() => {
    getAllProduct(setListProduct);
  }, []);
  return (
    <div className="home-container bg-gray">
      <div className="main-slider slider slick-initialized slick-slider">
        <div
          class="slider-item"
          style={{
            backgroundImage: "url('assets/images/slide_show.png')",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-12 offset-lg-6 offset-md-6">
                <div class="slider-caption">
                  {/* <span class="lead">Trendy dress</span> */}
                  <h1 class="mt-2 mb-5">
                    <span class="text-color">Market in </span>Department
                  </h1>
                  <a href="./" class="btn btn-main">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="category section pt-3 pb-0">
        <div class="container box_cont bg-white">
        <div>
          <h4 class="pt-4 p-2"><img src='assets/images/ico_menu_red.svg' alt='' />Danh mục sản phẩm</h4>
          </div>
        
          <div class="row border-2 border-top">
          {
            listProduct.map(item => {
              // console.log(item);
              return (
            <div class="w-25 mb-4">
              <div class="cat-item mb-4 mb-lg-0">
              <p onClick={() => {
                handleClickDetailProduct(item.productResponse.id);
              }}
              style={{
                cursor: "pointer",
              }}>
               <div class='w-100 img'>
                <img src={`https://res.cloudinary.com/dn0hpi4bc/image/upload/${item.urlImgList[0].url}`} alt="" class="img-fluid image" />
                </div>
                </p>
                
                <div class="item-info">
                  <p class="mb-0 px-6">{item.productResponse.name}</p>
                </div>
              </div>
            </div>
            )})}
          
          </div> 
        </div>
       
      </section>
      <section class="category section pt-3 pb-0">
        <div class="container box_cont bg-white">
        <div>
          <h4 class="pt-4 p-2"><img src='assets/images/ico_dealhot.png' alt='' />Xu hướng </h4>
          </div>
        
          <div class="row border-2 border-top">
            {listProduct.map(item => {
              return(
              <div class="w-25 mb-4">
              {/* <div class="col-lg-4 col-sm-12 col-md-6"> */}
              <div class="cat-item mb-4 mb-lg-0">
              <p onClick={() => {
                handleClickDetailProduct(item.productResponse.id);
              }}
              style={{
                cursor: "pointer",
              }}>
              <div class='w-100 img'>
                <img src={`https://res.cloudinary.com/dn0hpi4bc/image/upload/${item.urlImgList[0].url}`} alt="" class="img-fluid image" />
                </div>
                </p>
                <div class="item-info">
                  <p class="mb-0 px-6">{item.productResponse.name}</p>
                  <h4 class="mb-0 px-6">
                  {item.productResponse.price}đ
                  </h4>
                </div>
              </div>
            </div>
            )})}
          </div> 
        </div>
      </section>
      <section class="category section pt-3 pb-0">
        <div class="container box_cont bg-white">
        <div>
          <h4 class="pt-4 p-2"><img src='assets/images/ico_menu_red.svg' alt='' />Gợi ý gần đây</h4>
          </div>
        
          <div class="row border-2 border-top">
          {
            listProduct.map( item => {
              return(
                <div class="w-25 mb-4">
            {/* <div class="col-lg-4 col-sm-12 col-md-6"> */}
              <div class="cat-item mb-4 mb-lg-0">
              <p onClick={() => {
                handleClickDetailProduct(item.productResponse.id);
              }}
              style={{
                cursor: "pointer",
              }}>
              <div class='w-100 img'>
                <img src={`https://res.cloudinary.com/dn0hpi4bc/image/upload/${item.urlImgList[0].url}`} alt="" class="img-fluid image" />
                </div>
                </p>
                <div class="item-info">
                  <p class="mb-0 px-6">{item.productResponse.name}</p>
                  <h4 class="mb-0 px-6">
                  {item.productResponse.price}đ
                  </h4>
                </div>
              </div>
              </div>
            )})}
          
            </div>
            </div>
            </section>
      <ListProduct keyword={keyword} />

      <section class="features border-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="feature-block">
                <i class="tf-ion-android-bicycle"></i>
                <div class="content">
                  <h5>Free Shipping</h5>
                  <p>On all order over $39.00</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="feature-block">
                <i class="tf-wallet"></i>
                <div class="content">
                  <h5>30 Days Return</h5>
                  <p>Money back Guarantee</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="feature-block">
                <i class="tf-key"></i>
                <div class="content">
                  <h5>Secure Checkout</h5>
                  
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="feature-block">
                <i class="tf-clock"></i>
                <div class="content">
                  <h5>24/7 Support</h5>
                  <p>All time customer support </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Chatbot/>
    </div>
  );
}


