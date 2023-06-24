import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, getInforOrder, getPayment } from "../../APIs/order.api";

function ListOrder({ listProduct, name }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    let arr = [];
    listProduct.forEach((item, index) => {
      for (let i = 0; i < item.products.length; i++) {
        arr.push(item.products[i]);
      }
    });
    setList(arr);
  }, []);

  const elemListItemInCart = list?.map((item1, index) => {
    // if (item.products?.length === 0) {
    //   return null;
    // }
    return (
      <tr class="cart_item">
        <td
          class="product-name"
          data-title="Product"
          style={{
            width: "13%",
          }}
        >
          <img
            class="img-fluid w-100 mb-3 img-first"
            src={
              item1.url
                ? `https://res.cloudinary.com/dn0hpi4bc/image/upload/${item1.url}`
                : ""
            }
            alt="product-img"
          />
        </td>
        <td
          class="product-name"
          data-title="Product"
          style={{
            width: "16%",
          }}
        >
          {/* <a>{item.products.nameProduct}</a> */}
          <a className="mb-2">{item1.nameProduct}</a>
        </td>
        <td
          class="product-shop"
          data-title="Shop"
          style={{
            width: "15%",
          }}
        >
          <a className="mb-2">{item1.nameShop}</a>
        </td>

        <td
          class="product-price"
          data-title="Price"
          style={{
            width: "11%",
          }}
        >
          <a className="mb-2">{item1.price}</a>
        </td>
        <td
          class="product-price"
          data-title="Quantity"
          style={{
            width: "9%",
          }}
        >
          <a className="mb-2">{item1.numberProduct}</a>
        </td>
        <td
          class="product-price"
          data-title="Category"
          style={{
            width: "23%",
          }}
        >
          <a className="mb-2">{item1.typeOrder}</a>
        </td>

        <td
          class="product-subtotal"
          data-title="Total"
          style={{
            width: "12%",
          }}
        >
          <span class="amount">{item1.numberProduct * item1.price} đ</span>
        </td>
      </tr>
    );
    // return (
    //   <tr class="cart_item">
    //     <td
    //       class="product-name"
    //       data-title="Product"
    //       style={{
    //         width: "13%",
    //       }}
    //     >
    //       <div className="d-flex flex-column">
    //         {item.products.map((item1, index1) => {
    //           return (
    //             <img
    //               class="img-fluid w-100 mb-3 img-first"
    //               src={
    //                 item1.urlImgList?.length > 0
    //                   ? `https://res.cloudinary.com/dpnhk5kup/image/upload/${item1.urlImgList[0]?.url}`
    //                   : "assets/images/322.jpg"
    //               }
    //               alt="product-img"
    //             />
    //           );
    //         })}
    //       </div>
    //     </td>
    //     <td
    //       class="product-name"
    //       data-title="Product"
    //       style={{
    //         width: "17%",
    //         backgroundColor: "red",
    //       }}
    //     >
    //       {/* <a>{item.products.nameProduct}</a> */}
    //       <div
    //         className="d-flex flex-column"
    //         style={{
    //           height: "100%",
    //           backgroundColor: "blue",
    //         }}
    //       >
    //         {item.products.map((item1, index1) => {
    //           return <a className="mb-2">{item1.nameProduct}</a>;
    //         })}
    //       </div>
    //     </td>
    //     <td
    //       class="product-shop"
    //       data-title="Shop"
    //       style={{
    //         width: "15%",
    //       }}
    //     >
    //       <div className="d-flex flex-column">
    //         {item.products.map((item1, index1) => {
    //           return <a className="mb-2">{item1.nameShop}</a>;
    //         })}
    //       </div>
    //     </td>

    //     <td
    //       class="product-price"
    //       data-title="Price"
    //       style={{
    //         width: "11%",
    //       }}
    //     >
    //       <div className="d-flex flex-column">
    //         {item.products.map((item1, index1) => {
    //           return <a className="mb-2">{item1.price}</a>;
    //         })}
    //       </div>
    //     </td>
    //     <td
    //       class="product-price"
    //       data-title="Quantity"
    //       style={{
    //         width: "8%",
    //       }}
    //     >
    //       <div className="d-flex flex-column">
    //         {item.products.map((item1, index1) => {
    //           return <a className="mb-2">{item1.numberProduct}</a>;
    //         })}
    //       </div>
    //     </td>
    //     <td
    //       class="product-price"
    //       data-title="Category"
    //       style={{
    //         width: "23%",
    //       }}
    //     >
    //       <div className="d-flex flex-column">
    //         {item.products.map((item1, index1) => {
    //           return <a className="mb-2">{item1.typeOrder}</a>;
    //         })}
    //       </div>
    //     </td>

    //     <td
    //       class="product-subtotal"
    //       data-title="Total"
    //       style={{
    //         width: "12%",
    //       }}
    //     >
    //       <span class="amount">{item.totalPrice} đ</span>
    //     </td>
    //   </tr>
    // );
  });
  return (
    <div className="checkout-container">
      <section class="cart shopping page-wrapper">
        <h2>List Product {name}</h2>
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="product-list">
                <form class="cart-form">
                  <table
                    class="table shop_table shop_table_responsive cart"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th class="product-name"></th>
                        <th class="product-name">Product</th>
                        <th class="product-name">Shop</th>
                        <th class="product-price">Price</th>
                        <th class="product-quantity">Quantity</th>
                        <th class="product-category">Category</th>
                        <th class="product-subtotal">Total</th>
                      </tr>
                    </thead>

                    <tbody>{elemListItemInCart}</tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          {/* <a
            class="btn btn-dark btn-small text-white"
            style={{
              cursor: "pointer",
              marginRight: 10,
            }}
            onClick={() => {
              //   setIsClickContinue(false);
            }}
          >
            Back
          </a>
          <a
            class="btn btn-main btn-small"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              //   handleOrder();
            }}
          >
            Confirm
          </a> */}
        </div>
      </section>
    </div>
  );
}
export default ListOrder;
