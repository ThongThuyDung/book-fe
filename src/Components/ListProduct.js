import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../APIs/cart.api";
import {
  getAllCategory,
  getAllProduct,
  searchProductByCategory,
  searchProductByKeyword,
} from "../APIs/product.api";
import { ToastContainer, toast } from "react-toastify";

function ListProduct({ keyword }) {
  const itemEachPage = 24;
  const [listProduct, setListProduct] = useState([]);
  const [numberPage, setNumberPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listEachProductPage, setListEachProductPage] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [typeCategory, setTypeCategory] = useState(0);
  
  const notify = (value) => toast(value);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  useEffect(() => {
    getAllCategory(setListCategory);
    console.log(getRandomInt(5, numberPage.length - 6));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if(typeCategory == 0 && keyword == "")
    {
      getAllProduct(setListProduct, setNumberPage, 1);
    }
    else if(keyword == "" && typeCategory != 0)
    {
      searchProductByCategory(typeCategory, setListProduct, setNumberPage, 1);
    }
    else 
    {
      searchProductByKeyword(keyword, setListProduct, setNumberPage, 1);
    }
  }, [typeCategory, keyword]);


  useEffect(() => {
    // let arr = [];
    let arr1 = [];
    // for (let i = 1; i <= Math.ceil(listProduct?.length / itemEachPage); i++) {
    //   arr.push(i);
    // }

    // arr1 = listProduct?.slice(
    //   (currentPage - 1) * itemEachPage,
    //   currentPage * itemEachPage
    // );

    // setNumberPage(arr);
    setListEachProductPage(listProduct);
    
  }, [listProduct]);

  useEffect(() => {
    // console.log());
  }, [listEachProductPage]);

  useEffect(() => {
    // let arr = [];
    // arr = listProduct.slice(
    //   (currentPage - 1) * itemEachPage,
    //   currentPage * itemEachPage
    // );
    if(typeCategory == 0 && keyword == "")
    {
      getAllProduct(setListProduct, setNumberPage, currentPage);
    }
    else if(keyword == "" && typeCategory != 0)
    {
      searchProductByCategory(typeCategory, setListProduct, setNumberPage, currentPage);
    }
    else 
    {
      searchProductByKeyword(keyword, setListProduct, setNumberPage, currentPage);
    }
    
    // setListEachProductPage(arr);
  }, [currentPage]);

  const navigate = useNavigate();
  const handleClickDetailProduct = (idProduct) => {
    navigate(`/detail-product/${idProduct}`);
  };
  //console.log(listProduct)
  const handleAddToCart = (productId) => {
    // if (existType.length > 0) {
      addItemToCart(
        {
          productId: productId,
          quantity: 1
        },
        notify
      );

  };
  const elemListProduct = listEachProductPage?.map((item, index) => {
    return (
      <div class="col-lg-3 col-12 col-md-6 col-sm-6 mb-3 mb-lg-0" key={index}>
        <div class="product">
          <div class="product-wrap" >
            <p
              onClick={() => {
                handleClickDetailProduct(item.productResponse.id);
              }}
              style={{
                cursor: "pointer",
              }}
            >
            <div class='w-100 img'>
              <img
                class="img-fluid image"
                src={
                  item.urlImgList.length > 0
                    ? `https://res.cloudinary.com/dn0hpi4bc/image/upload/${item.urlImgList[0].url}`
                    : "assets/images/322.jpg"
                }
                alt="product-img"
              />
              </div>
            </p>
            <p 
              onClick={() => {
                handleClickDetailProduct(item.productResponse.id);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <img
                class="img-fluid w-100 mb-3 img-second"
                src={
                  item.urlImgList.length > 0
                    ? `https://res.cloudinary.com/dn0hpi4bc/image/upload/${item.urlImgList[0].url}`
                    : "assets/images/444.jpg"
                }
                alt="product-img"
              />
            </p>
          </div>

          {/* <span class="onsale">Sale</span> */}
          <div class="product-hover-overlay" >
            <a 
              onClick={() => {
                handleAddToCart(item.productResponse.id, item.typeList);
              }}
            >
              <i class="tf-ion-android-cart text-white"></i>
            </a>
          </div>

          <div class="product-info">
            <h2 class="product-title h5 mb-0 mt-4" >
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleClickDetailProduct(item.productResponse.id);
                }}
              >
                {item.productResponse.name}
              </p>
            </h2>
            <span class="price">{item.productResponse.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ</span>
          </div>
        </div>
      </div>
    );
  });

  const elemPage = numberPage?.map((item, index) => {
    if(numberPage.length > 10)
    {
      // if(item > 5 && item < numberPage.length - 5)
      // {
      //   var random = random();
      //   if(numberPage.length)
      //   {

      //   }
      //   return <></>;
      // }
      if(currentPage <= 3 || currentPage >= numberPage.length - 3)
      {
        if(item > 5 && item <= numberPage.length - 5)
        {
          
          if(Math.ceil(numberPage.length / 2) == item)
          {
            return <li
                      class="page-item"
                      key={index}
                      // style={{ cursor: "pointer" }}
                    >
                      <p class="page-link" >...</p>
                    </li>;
          }
          return <></>;
        }
      }
      if(currentPage > 3 && currentPage < numberPage.length - 3)
      {
        if((item < currentPage - 2 && item > 3) || (item > currentPage + 2 && item <= numberPage.length - 3))
        {
          if(item == 4 || item == numberPage.length - 4)
          {
            return <li
                      class="page-item"
                      key={index}
                      // style={{ cursor: "pointer" }}
                    >
                      <p class="page-link" >...</p>
                    </li>;
          }
          return <></>;
        }
      }
      if (currentPage === item) {
        return (
          <li
            class="page-item active"
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCurrentPage(item);
            }}
          >
            <p class="page-link"> {item}</p>
          </li>
        );
      }
      return (
        <li
          class="page-item"
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setCurrentPage(item);
          }}
        >
          <p class="page-link" > {item}</p>
        </li>
      );
    }
    else 
    {
      if (currentPage === item) {
        return (
          <li
            class="page-item active"
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCurrentPage(item);
            }}
          >
            <p class="page-link"> {item}</p>
          </li>
        );
      }
      return (
        <li
          class="page-item"
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setCurrentPage(item);
          }}
        >
          <p class="page-link" > {item}</p>
        </li>
      );
    }
  });
  const elemCategory = listCategory?.map((item, index) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <section class="products-shop section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row align-items-center">
              <div class="col-lg-12 mb-4 col-md-6 col-sm-6 mb-lg-0">
                <div class="section-title">
                  <h2 class="d-block text-left-sm">Sách</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <div class="heading d-flex justify-content-between mb-5">
                      <p class="result-count mb-0">
                        {" "}
                      </p>
                      <form class="ordering " method="get">
                        <select
                          name="orderby"
                          class="orderby form-control"
                          aria-label="Shop order"
                          onChange={(e) => {
                            setTypeCategory(e.target.value);
                          }}
                        >
                          <option value={0} selected="selected">
                            Tất cả thể loại
                          </option>
                          {elemCategory}
                        </select>
                      </form>
                    </div>

                    <div class="heading d-flex justify-content-between mb-5">
                      <p class="result-count mb-0">
                        {" "}
                        {/* Showing 1–6 of {listProduct.length} results */}
                      </p>
                      {/* <form class="ordering " method="get">
                        <select
                          name="orderby"
                          class="orderby form-control"
                          aria-label="Shop order"
                        >
                          <option value="" selected="selected">
                            Default sorting
                          </option>
                          <option value="">Sort by popularity</option>
                          <option value="">Sort by latest</option>
                          <option value="">Sort by price: low to high</option>
                          <option value="">Sort by price: high to low</option>
                        </select>
                        <input type="hidden" name="paged" value="1" />
                      </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              {elemListProduct}
              <div class="col-12">
                <nav aria-label="Page navigation">
                  <ul class="pagination">
                    {elemPage.length > 0 ? (
                      <li
                        class="page-item"
                        onClick={() => {
                          if (currentPage === 1) {
                            setCurrentPage(currentPage);
                          } else {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <p class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </p>
                      </li>
                    ) : null}

                    {elemPage}
                    {elemPage.length > 0 ? (
                      <li
                        class="page-item"
                        onClick={() => {
                          if (currentPage === numberPage.length) {
                            setCurrentPage(currentPage);
                          } else {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <p class="page-link" aria-label="Next" >
                          <span aria-hidden="true">&raquo;</span>
                        </p>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </section>
  );
}

export default ListProduct;
