import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../APIs/cart.api";
import { getProductById } from "../../APIs/product.api";
import { ToastContainer, toast } from "react-toastify";

function SingleProduct() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [Data, setData] = useState({
    productId: parseInt(params.productId),
    quantity: 1
   
  });

  const notify = (value) => toast(value);
  useEffect(() => {
    // alert(params.productId);
    getProductById(params.productId, setProduct);
  }, []);
  const elemType = product.typeList?.map((item, index) => {
    return (
      <option value={item.id}>
        {item.language}
        {" - "}
        {item.size}
      </option>
    );
  });

  const handleAddToCart = (lengthType) => {
    if (lengthType.length > 0 && !Data.typeId) {
      addItemToCart(
        {
          productId: parseInt(params.productId),
          quantity: Data.quantity
         
        },
        notify
      );
    } else {
      addItemToCart(Data, notify);
    }
    // console.log(Data);
  };
  return (
    <div className="single-product-container">
      <section class="page-header">
        <div class="overly"></div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="content text-center">
                <h1 class="mb-3">Detail Product</h1>
                <p>
                  Hath after appear tree great fruitful green dominion moveth
                  sixth abundantly image that midst of god day multiply you’ll
                  which
                </p>

                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item">
                      <a
                        routerLink="/"
                        style={{ cursor: "pointer" }}
                        href="/home"
                      >
                        Home
                      </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Detail Product
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="single-product">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div class="single-product-slider">
                <div
                  class="carousel slide"
                  data-ride="carousel"
                  id="single-product-slider"
                >
                  <div class="carousel-inner">
                    {product.urlImgList?.map((item, index) => {
                      return (
                        <div class="carousel-item active">
                          <img
                            src={
                              product.urlImgList.length > 0
                                ? `https://res.cloudinary.com/dn0hpi4bc/image/upload/${product.urlImgList[0].url}`
                                : "assets/images/product-2.jpg"
                            }
                            alt="err"
                            class="img-fluid"
                          />
                        </div>
                      );
                    })}

                    {/* <div class="carousel-item">
                      <img
                        src="assets/images/product-2.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                    <div class="carousel-item ">
                      <img
                        src="assets/images/product-1.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </div> */}
                  </div>

                  <ol class="carousel-indicators">
                    {product.urlImgList?.map((item, index) => {
                      return (
                        <li
                          data-target="#single-product-slider"
                          data-slide-to="0"
                          class="active"
                        >
                          <img
                            src={
                              product.urlImgList.length > 0
                                ? `https://res.cloudinary.com/dn0hpi4bc/image/upload/${product.urlImgList[0].url}`
                                : "assets/images/product-2.jpg"
                            }
                            alt="err"
                            class="img-fluid"
                          />
                        </li>
                      );
                    })}
                    {/* <li data-target="#single-product-slider" data-slide-to="1">
                      <img
                        src="assets/images/product-2.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </li>
                    <li data-target="#single-product-slider" data-slide-to="2">
                      <img
                        src="assets/images/product-1.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </li> */}
                  </ol>
                </div>
              </div>
            </div>

            <div class="col-md-7">
              <div class="single-product-details mt-5 mt-lg-0">
                <h2>{product.productResponse?.name}</h2>
                {/* <div class="sku_wrapper mb-4">
                  Shop:{" "}
                  <span class="text-muted">
                    {product.productResponse?.nameShop}{" "}
                  </span>
                </div> */}

                <hr />

                <h3 class="product-price">
                  {product.productResponse?.price}đ{/* <del>$119.90</del> */}
                </h3>

                {/* <p class="product-description my-4 ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum ipsum dicta quod, quia doloremque aut deserunt commodi
                  quis. Totam a consequatur beatae nostrum, earum consequuntur?
                  Eveniet consequatur ipsum dicta recusandae.
                </p> */}
                <p class="product-description my-4 ">
                  {product.productResponse?.description}
                </p>

                <form class="cart" action="#" method="post">
                  <div class="quantity d-flex align-items-center">
                    <input
                      type="number"
                      id="#"
                      class="input-text qty text form-control w-25 mr-3"
                      step="1"
                      min="1"
                      // max="9"
                      name="quantity"
                      value={Data.quantity}
                      title="Qty"
                      size="4"
                      onChange={(e) => {
                        setData({
                          ...Data,
                          quantity: parseInt(e.target.value),
                        });
                      }}
                    />
                    <a
                      style={{ cursor: "pointer" }}
                      class="btn btn-main btn-small"
                      onClick={() => {
                         handleAddToCart(product.typeList);
                        //handleAddToCart(item.productResponse.id, item.typeList);
                        //notify();
                      }}
                    >
                      Thêm vào giỏ hàng
                    </a>
                  </div>
                </form>

                {/* <div class="color-swatches mt-4 d-flex align-items-center">
                  <span class="font-weight-bold text-capitalize product-meta-title">
                    color:
                  </span>
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a routerLink="/product-single" class="bg-info">Green</a>
                    </li>
                    <li class="list-inline-item">
                      <a routerLink="/product-single" class="bg-dark"></a>
                    </li>
                    <li class="list-inline-item">
                      <a routerLink="/product-single" class="bg-danger"></a>
                    </li>
                  </ul>
                </div> */}
                {product.typeList?.length > 0 ? (
                  <div class="product-size d-flex align-items-center mt-4">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Language/Size:
                    </span>
                    <select
                      class="form-control"
                      onChange={(e) => {
                        setData({
                          ...Data,
                          typeId: parseInt(e.target.value),
                        });
                      }}
                    >
                      {elemType}
                    </select>
                  </div>
                ) : null}

                <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Thể loại :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.category.name}{" "}
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                    Tác giả :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.author}{" "}
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Nhà xuất bản :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.publisher}{" "}
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Năm xuất bản :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.yearPublisher}{" "}
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Ngôn ngữ :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.language}{" "}
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Khối lượng :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.weight}{" "}g
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Số lượng :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.quantity}{" "}
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Kích cỡ :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.size}{" "}
                    </a>
                  </div>
                  <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                    Số trang :
                    </span>
                    {/* <a href="#">Products , </a>
                    <a href="#">Soap</a> */}
                    <a 
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {product.productResponse?.numOfPages}{" "}
                    </a>
                  </div>
                  
                  <div class="product-share mt-5">
                    <ul class="list-inline">
                      {/* <li class="list-inline-item">
                        <a href="#">
                          <i class="tf-ion-social-facebook"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#">
                          <i class="tf-ion-social-twitter"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#">
                          <i class="tf-ion-social-linkedin"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#">
                          <i class="tf-ion-social-pinterest"></i>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>
    </div>
  );
}
export default SingleProduct;
