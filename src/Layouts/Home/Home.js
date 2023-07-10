import React, {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import ListProduct from "../../Components/ListProduct";
import  './style.css';
import Chatbot from "../../Components/Chatbot";
import { getAllProduct,getRecommend,getRecommendContent } from '../../APIs/product.api';
import { getLocalStorage, STORAGE } from '../../Utils/storage';

export default function Home({ keyword }) {
  const [listProduct, setListProduct] = useState([]);
  const [listRecommend, setListRecommend] = useState([]);
  const [listRecommendContent, setListRecommendContent] = useState([]);
  const navigate = useNavigate();
  const handleClickDetailProduct = (idProduct) => {
    navigate(`/detail-product/${idProduct}`);
  };
  useEffect(() => {
    getAllProduct(setListProduct);
    getRecommend(setListRecommend);
    getRecommendContent(setListRecommendContent);
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
        </div>
      </div>
      {keyword.length === 0 && getLocalStorage(STORAGE.USER_TOKEN) &&(
      <section class="category section pt-3 pb-0">
        <div class="container box_cont bg-white">
        <div>
          <h4 class="pt-4 p-2"><img src='assets/images/ico_menu_red.svg' alt='' />Bạn có thể thích</h4>
          </div>
        
          <div class="row border-2 border-top">
          {
            listRecommend.slice(0,4).map( item => {
              return(
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
                  <h4 class="mb-0 px-6">
                  {item.productResponse.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ
                  </h4>
                </div>
              </div>
              </div>
            )})}
          
            </div>
            </div>
      </section>
      )}
      {keyword.length === 0 && getLocalStorage(STORAGE.USER_TOKEN) &&(
      <section class="category section pt-3 pb-0">
        <div class="container box_cont bg-white">
        <div>
          <h4 class="pt-4 p-2"><img src='assets/images/ico_dealhot.png' alt='' />Gợi ý gần đây </h4>
          </div>
        
          <div class="row border-2 border-top">
            {listRecommendContent.slice(0,4).map(item => {
              return(
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
                  <h4 class="mb-0 px-6">
                  {item.productResponse.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ
                  </h4>
                </div>
              </div>
            </div>
            )})}
          </div> 
        </div>
      </section>
      )}
            <section class="category section pt-3 pb-0">
            <div class="container box_cont bg-white">
                <ListProduct keyword={keyword} />
                </div>
            </section>
      <Chatbot/>
    </div>
  );
}


