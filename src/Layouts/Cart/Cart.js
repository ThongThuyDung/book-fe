import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const params = useParams();
  const [product, setProduct] = useState({});
  // const [Data,setData] = useState({
  //   productId: parseInt(params.productId),
  //   quantity: 1
   
  // });
  useEffect(() => {
    // alert(params.productId);
    getProductById(params.productId, setProduct);
  }, []);
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
    productId: parseInt(params.productId),
  });

  console.log(listCart)

  const handleUpdateCart = (idItem, quantity, typeId, index) => {

    const newList = [...listCart]
    newList[index].quantity = quantity
    setListCart(newList)
    
    setAction(true);
    updateItemInCart({
      itemId: idItem,
      quantity,
      typeId,
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
           //flexDirection: "row",
          //justifyContent: "center",
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

        <td sm="2"
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

        <td sm="2" class="product-name" data-title="Product">
          <a href={`/detail-product/${item.product.id}`}>
            {item.product?.name}
          </a>
        </td>

        <td  sm="1" class="product-price" data-title="Price">
          <span class="amount">
            {item.product?.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ
          </span>
        </td>

        {/* <td class="product-quantity" data-title="Quantity">
          <span>
            {item.product?.quantity}
          </span>
        </td> */}

        <td sm="1" class="product-quantity" data-title="Quantity" >
          <div class="quantity">
            <label class="sr-only">Số lượng</label>
            <input
                      type="number"
                      id="#"
                      class="input-text qty text w-[70px] mr-3"
                      step="1"
                      min="1"
                      // max="9"
                      name="quantity"
                      value={item?.quantity}
                      title="Qty"
                      size="4"
                      onChange={(e) => {
                        handleUpdateCart(item?.id,
                         parseInt(e.target.value),
                         item.type?.id, index
                                );
                        
                      }} 
                    />
          </div>
        </td>
        <td sm="2" class="product-category" data-title="Category">
          <span>
            {item.product?.category.name}
          </span>
        </td>


        <td sm="2" class="product-subtotal" data-title="Total">
          <span class="amount">
            {/* <span class="currencySymbol">
              <pre wp-pre-tag-3=""></pre>
            </span> */}
            {(item.product?.quantity * item.product?.price).toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ
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
            x
          </a>
        </td>
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
                
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item">
                      <a href="/">Trang chủ</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Giỏ hàng
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
                        <th class="product-name">Sách</th>
                        <th class="product-price">Giá</th>
                        <th class="product-quantity">Số lượng</th>
                        <th class="product-category">Thể loại</th>
                        <th class="product-subtotal">Tổng giá</th>
                      </tr>
                    </thead>

                    <tbody>
                      {elemListItemInCart}
                      <tr>
                        <td colspan="12" class="actions">
                          <div class="coupon">

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
                                  Mua
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
          
        </div>
      </section>
    </div>
  );
}
export default Cart;
