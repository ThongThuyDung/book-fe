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

  // const handleAddToCart = (lengthType) => {
  //   if (lengthType.length > 0 && !Data.typeId) {
  //     addItemToCart(
  //       {
  //         productId: parseInt(params.productId),
  //         quantity: Data.quantity
         
  //       },
  //       notify
  //     );
  //   } else {
  //     addItemToCart(Data, notify);
  //   }
  //   // console.log(Data);
  // };
  const handleAddToCart = (productId, existType) => {
    // if (existType.length > 0) {
      addItemToCart(
        Data,
        notify
      );
      
  };
  return (
    <div className="single-product-container">
      <section class="page-header">
        <div class="overly"></div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="content text-center">
                <h1 class="mb-3">Chi tiết sách</h1>

                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item">
                      <a
                        routerLink="/"
                        style={{ cursor: "pointer" }}
                        href="/home"
                      >
                        Trang chủ
                      </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Chi tiết sách
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
                   
                  </ol>
                </div>
              </div>
            </div>

            <div class="col-md-7">
              <div class="single-product-details mt-5 mt-lg-0">
                <h2>{product.productResponse?.name}</h2>

                <hr />

                <h3 class="product-price">
                  {product.productResponse?.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ{/* <del>$119.90</del> */}
                </h3>



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
                      onChange={(e) =>
                        setData({
                          ...Data,
                          quantity: e.target.value
                        })
                      }
                      title="Qty"
                      size="4"
                      // onChange={(e) => {
                      //   handleAddToCart(product.productResponse.id, product.typeList);
                      //   setData({
                      //     ...Data,
                      //     quantity: parseInt(e.target.value),
                      //   });
                      // }}
                    />
                    <a
                      style={{ cursor: "pointer" }}
                      class="btn btn-main btn-small"
                      onClick={() => {
                          handleAddToCart(product.productResponse.id, product.typeList);
                        }}
                    >
                      Thêm vào giỏ hàng
                    </a>
                  </div>
                </form>


                <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Thể loại :
                    </span>
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
                  <p class="product-description my-4 ">
                  {product.productResponse?.description}
                </p>
                  <div class="product-share mt-5">
                    <ul class="list-inline">
                     
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
