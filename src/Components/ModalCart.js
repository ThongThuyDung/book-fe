import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItemInCart, getItem } from "../APIs/cart.api";
import { ToastContainer, toast } from "react-toastify";

function ModalCart({ listCart, totalPrice }) {
  const notify = (value) => toast(value);
  const handleDeleteItemInCart = (idItem) => {
    deleteItemInCart(idItem, notify);
  };
  const navigate = useNavigate();
  const handleClickDetailProduct = (idProduct) => {
    navigate(`/detail-product/${idProduct}`);
  };
  const elemItem = listCart.map((item, index) => {
    return (
      <div class="media" key={index}>
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
        <div class="media-body">
          <a href={`/detail-product/${item.product.id}`}>
            <h6>{item.product.name}</h6>
          </a>
          <div class="cart-price">
            <span>{item.quantity} x</span>
            <span>{item.product.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ</span>
          </div>
        </div>
        <a
          class="remove"
          onClick={() => {
            handleDeleteItemInCart(item.id);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <i class="tf-ion-close"></i>
        </a>
      </div>
    );
  });
  return (
    <div class="dropdown-menu cart-dropdown">
      {listCart.length === 0 ? (
        <p className="text-center">Giỏ hàng của bạn đang trống</p>
      ) : (
        <div
          style={{
            maxHeight: "300px",
            overflowY: "scroll",
            msOverflowStyle: "none",
            scrollbarWidth: "none" /* Firefox */,
          }}
        >
          {elemItem}
        </div>
      )}
      <div class="cart-summary">
        {listCart.length === 0 ? null : (
          <div>
            <span class="h6">Tổng giá</span>
            <span class="total-price h6">{totalPrice}đ</span>
          </div>
        )}

        <div class="text-center cart-buttons mt-3">
          <a href="cart" class="btn btn-small btn-transparent btn-block">
            Xem giỏ hàng
          </a>
          {/* <a class="btn btn-small btn-main btn-block">Checkout</a> */}
        </div>
      </div>
    </div>
  );
}

export default ModalCart;
