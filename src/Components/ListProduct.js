import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../APIs/cart.api";
import {
  getAllCategory,
  getAllProduct,
  searchProductByCategory,
} from "../APIs/product.api";
import { ToastContainer, toast } from "react-toastify";

function ListProduct({ keyword }) {
  const itemEachPage = 6;
  const [listProduct, setListProduct] = useState([]);
  const [numberPage, setNumberPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listEachProductPage, setListEachProductPage] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [typeCategory, setTypeCategory] = useState(0);
  // const totalPages = 10;
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  // const renderItems = () => {
  //   const itemsPerPage = 5;
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  // }
  const notify = (value) => toast(value);

  useEffect(() => {
    getAllCategory(setListCategory);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (typeCategory === 0) {
      getAllProduct(setListProduct);
    } else {
      searchProductByCategory(typeCategory, setListProduct);
    }
  }, [typeCategory, keyword]);

  useEffect(() => {
    let filterProduct = listProduct.filter((item) => {
      let copyItem = item.productResponse.name.toLowerCase();
      return copyItem.includes(keyword.toLowerCase());
    });
    let arr = [];
    let arr1 = [];
    for (let i = 1; i <= Math.ceil(filterProduct.length / itemEachPage); i++) {
      arr.push(i);
    }

    arr1 = filterProduct.slice(
      (currentPage - 1) * itemEachPage,
      currentPage * itemEachPage
    );

    setNumberPage(arr);
    setListEachProductPage(arr1);
  }, [listProduct]);

  useEffect(() => {
    // console.log());
  }, [listEachProductPage]);

  useEffect(() => {
    let arr = [];
    arr = listProduct.slice(
      (currentPage - 1) * itemEachPage,
      currentPage * itemEachPage
    );

    setListEachProductPage(arr);
  }, [currentPage]);
  const navigate = useNavigate();
  const handleClickDetailProduct = (idProduct) => {
    navigate(`/detail-product/${idProduct}`);
  };
  //console.log(listProduct)
  const handleAddToCart = (productId, existType) => {
    // if (existType.length > 0) {
      addItemToCart(
        {
          productId: productId,
          quantity: 1
        },
        notify
      );
    // } else {
    //   addItemToCart(
    //     {
    //       productId: productId,
    //       quantity: 1
    //     },
    //     notify
    //   );
    // }
  };
  const elemListProduct = listEachProductPage?.map((item, index) => {
    return (
      <div class="col-lg-4 col-12 col-md-6 col-sm-6 mb-5" key={index}>
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
            <a>
              <i class="tf-ion-ios-heart"></i>
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
            <span class="price">{item.productResponse.price}đ</span>
          </div>
        </div>
      </div>
    );
  });

  const elemPage = numberPage?.map((item, index) => {
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
          <div class="col-md-9">
            <div class="row align-items-center">
              <div class="col-lg-12 mb-4 mb-lg-0">
                <div class="section-title">
                  <h2 class="d-block text-left-sm">Products</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <div class="heading d-flex justify-content-between mb-5 mr-4">
                      <p class="result-count mb-0">
                        {" "}
                        {/* Showing 1–6 of {listProduct.length} results */}
                      </p>
                      <form class="ordering " method="get">
                        <select
                          name="orderby"
                          class="orderby form-control"
                          aria-label="Shop order"
                          onChange={(e) => {
                            // alert(e.target.value);
                            setTypeCategory(e.target.value);
                          }}
                        >
                          <option value={0} selected="selected">
                            All Category
                          </option>
                          {elemCategory}
                        </select>
                        {/* <input type="hidden" name="paged" value="1" /> */}
                      </form>
                    </div>

                    <div class="heading d-flex justify-content-between mb-5">
                      <p class="result-count mb-0">
                        {" "}
                        {/* Showing 1–6 of {listProduct.length} results */}
                      </p>
                      <form class="ordering " method="get">
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
                      </form>
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