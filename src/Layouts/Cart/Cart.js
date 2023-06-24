import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteItemInCart,
  getItem,
  updateItemInCart,
} from "../../APIs/cart.api";
import baseUrl from "../../APIs/config";
import { getAllProduct, getProductById } from "../../APIs/product.api";
import { ToastContainer, toast } from "react-toastify";

function Cart({ setListItemChosen, listItemChosen }) {
  const notify = (value) => toast(value);
  const [listCart, setListCart] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [checked, setChecked] = useState(false);
  const [action, setAction] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getItem(setListCart);
    getAllProduct(setListProduct);
    setListItemChosen([]);
  }, []);

  useEffect(() => {
    if (action) {
      getItem(setListCart);
      getAllProduct(setListProduct);
    }
    return setAction(false);
  }, []);

  const [data, setData] = useState({
    quantity: "",
    itemId: 0,
  });

  const handleUpdateCart = (idItem, quantity) => {
  
    // console.log({
    //   itemId: idItem,
    //   quantity,
    //   typeId,
    // });
    setAction(true);
    updateItemInCart({
      itemId: idItem,
      quantity
    });
  };
  const handleDeleteCart = (idItem) => {
    setAction(true);
    deleteItemInCart(idItem, notify);
  };
  // useEffect(() => {
  //   console.log(listItemChosen);
  // }, [listItemChosen]);
  const elemListItemInCart = listCart.map((item, index) => {
    let product = listProduct.find((itemProduct, indexProduct) => {
      return itemProduct.productResponse?.id === item.product?.id;
    });
    return (
      <tr
        class="cart_item"
        style={{
          // flexDirection: "row",
          // // justifyContent: "center",
          alignItems: "center !important",
          width: "100%",
        }}
      >
        <td>
          {/* {checked ? (
            <input type="checkbox" checked={checked ? true : false}></input>
          ) : ( */}
          <input
            type="checkbox"
            checked={listItemChosen.includes(item.id)}
            onChange={(e) => {
              let listItem = [...listItemChosen];
              // alert(e.target.checked);
              if (!e.target.checked) {
                listItem = listItem.filter((item1, index1) => {
                  return item.id !== item1;
                });
                setListItemChosen(listItem);
              } else {
                listItem.push(item.id);
                setListItemChosen(listItem);
              }
            }}
          ></input>
        </td>

        <td
          class="product-thumbnail"
          data-title="Thumbnail"
          style={{
            width: "13%",
          }}
        >
          <a href={`/detail-product/${item.product.id}`}>
            <img
              class="media-object img- mr-3"
              src={
                item.urlImgList.length > 0
                  ? `https://res.cloudinary.com/dn0hpi4bc/image/upload/${item.urlImgList[0].url}`
                  : ""
              }
              alt="img"
              
            />
          </a>
        </td>

        <td class="product-name" data-title="Product">
          <a href={`/detail-product/${item.product.id}`}>
            {item.product?.name}
          </a>
        </td>

        <td class="product-price" data-title="Price">
          <span class="amount">
            {/* <span class="currencySymbol">
              <pre wp-pre-tag-3=""></pre>
            </span> */}
            {item.product?.price}
          </span>
        </td>
        <td class="product-quantity" data-title="Quantity">
          <div class="quantity">
            <label class="sr-only">Quantity</label>
            <input 
              class="input-text qty text"
               type="number" 
               value={data?.quantity}
              onChange={(e) => {
                handleUpdateCart(
                  item?.id,
                  parseInt(e.target.value),
                  item.type?.id
                );
                setData({
                  ...data,
                  quantity: parseInt(e.target.value),
                });
              }}
               />
          </div>
        </td>

        <td class="product-category" data-title="Category">
          <div class="category">
            <label class="sr-only">Category</label>
            {/* {product?.typeList.length > 0 ? (
              <select
                class="form-control"
                defaultValue={item.type?.id}
                onChange={(e) => {
                  handleUpdateCart(
                    item?.id,
                    item?.quantity,
                    parseInt(e.target.value)
                  );
                  setData({
                    ...data,
                    typeId: parseInt(e.target.value),
                  });
                }}
                style={{
                  width: "70%",
                }}
              >
                {product?.typeList.map((item, index) => {
                  return (
                    <option value={item?.id} key={item?.id}>
                      {item?.language}
                      {" - "}
                      {item?.size}
                    </option>
                  );
                })}
              </select>
            ) : null} */}
          </div>
        </td>

        <td class="product-subtotal" data-title="Total">
          <span class="amount">
            {/* <span class="currencySymbol">
              <pre wp-pre-tag-3=""></pre>
            </span> */}
            {item?.quantity * item.product?.price}đ
          </span>
        </td>
        <td class="product-remove" data-title="Remove">
          <a
            class="remove"
            aria-label="Remove this item"
            data-product_id="30"
            data-product_sku=""
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              handleDeleteCart(item?.id);
            }}
          >
            ×
          </a>
        </td>

        {/* <td class="product-remove" data-title="update">
          <span class="float-right mt-3 mt-md-0">
            <button
              type="button"
              class="btn btn-dark btn-small"
              name="update_cart"
              value="Update cart"
              disabled=""
            >
              Update cart
            </button>
          </span>
        </td> */}
      </tr>
    );
  });
  return (
    <div className="checkout-container">
      <section class="page-header">
        <div class="overly"></div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="content text-center">
                <h1 class="mb-3">Cart</h1>
                Hath after appear tree great fruitful green dominion moveth
                sixth abundantly image that midst of god day multiply you’ll
                which
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Cart
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cart shopping page-wrapper">
        <div class="container">
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
                        <th class="product-choose">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              // setChecked(e.target.checked);
                              setChecked(!checked);
                              if (e.target.checked) {
                                let listItem = listCart.map((item, index) => {
                                  return item.id;
                                });
                                setListItemChosen(listItem);
                              } else {
                                setListItemChosen([]);
                              }
                              // alert(e.target.checked);
                            }}
                          ></input>
                        </th>
                        <th class="product-thumbnail"> </th>
                        <th class="product-name">Product</th>
                        <th class="product-price">Price</th>
                        <th class="product-quantity">Quantity</th>
                        <th class="product-category">Category</th>
                        <th class="product-subtotal">Total</th>
                        <th class="product-remove"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {elemListItemInCart}
                      <tr>
                        <td colspan="12" class="actions">
                          <div class="coupon">
                            <input
                              type="text"
                              name="coupon_code"
                              class="input-text form-control"
                              id="coupon_code"
                              value=""
                              placeholder="Coupon code"
                            />
                            <button
                              type="button"
                              class="btn btn-black btn-small"
                              name="apply_coupon"
                              value="Apply coupon"
                            >
                              Apply coupon
                            </button>
                            {listItemChosen.length > 0 ? (
                              <span class="float-right mt-3 mt-lg-0">
                                <button
                                  type="button"
                                  class="btn btn-main btn-small"
                                  name="update_cart"
                                  value="Update cart"
                                  disabled=""
                                  onClick={() => {
                                    navigate("/checkout");
                                  }}
                                >
                                  Buy
                                </button>
                              </span>
                            ) : null}
                          </div>
                          <input
                            type="hidden"
                            id="woocommerce-cart-nonce"
                            name="woocommerce-cart-nonce"
                            value="27da9ce3e8"
                          />
                          <input
                            type="hidden"
                            name="_wp_http_referer"
                            value="/cart/"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          {/* <div class="row justify-content-end">
            <div class="col-lg-4">
              <div class="cart-info card p-4 mt-4">
                <h4 class="mb-4">Cart totals</h4>
                <ul class="list-unstyled mb-4">
                  <li class="d-flex justify-content-between pb-2 mb-3">
                    <h5>Subtotal</h5>
                    <span>$90.00</span>
                  </li>
                  <li class="d-flex justify-content-between pb-2 mb-3">
                    <h5>Shipping</h5>
                    <span>Free</span>
                  </li>
                  <li class="d-flex justify-content-between pb-2">
                    <h5>Total</h5>
                    <span>$90.00</span>
                  </li>
                </ul>
                <a href="#" class="btn btn-main btn-small">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
export default Cart;
