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
          class="product-price"
          data-title="Price"
          style={{
            width: "11%",
          }}
        >
          <a className="mb-2">{item1.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}</a>
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
          data-title="DateOrder"
          style={{
            width: "9%",
          }}
        >
          <a className="mb-2">{item1.dateOrder.slice(0,10)}</a>
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
            width: "42%",
          }}
        >
          <span class="amount">{(item1.numberProduct * item1.price).toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })} đ</span>
        </td>
      </tr>
    );
  });
  return (
    <div className="checkout-container">
      <section class="cart shopping page-wrapper">
        <h2>Danh sách đặt hàng</h2>
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
                        <th class="product-name">Sách</th>
                        <th class="product-price">Giá</th>
                        <th class="product-quantity">Số lượng</th>
                        <th class="product-category">Ngày đặt</th>
                        <th class="product-subtotal">Tổng giá</th>
                      </tr>
                    </thead>

                    <tbody>{elemListItemInCart}</tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ListOrder;
