import axios from "axios";
import {
  setLocalStorage,
  STORAGE,
  removeLocalStorage,
  getLocalStorage,
} from "../Utils/storage";
import baseUrl from "./config";

function getItem(setListCart) {
  axios({
    method: "get",
    url: `${baseUrl}cart/get-item`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      if (data.message) {
        // setListCart([]);
      } else {
        setListCart(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getItemById(idItem) {
  axios({
    method: "get",
    url: `${baseUrl}cart/get-item/${idItem}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getItemOrder(idOrder) {
  axios({
    method: "get",
    url: `${baseUrl}cart/get-item-order/${idOrder}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function addItemToCart(Data, notify) {
  axios({
    method: "post",
    url: `${baseUrl}cart/add-item`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      notify("Add this item successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateItemInCart(Data) {
  axios({
    method: "put",
    url: `${baseUrl}cart/update-item`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteItemInCart(idItem, notify) {
  // console.log(getLocalStorage(STORAGE.USER_TOKEN).split(".")[2]);
  axios({
    method: "delete",
    url: `${baseUrl}cart/delete-item/${idItem}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      notify("Remove this item successfully!");
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  getItem,
  getItemById,
  getItemOrder,
  addItemToCart,
  deleteItemInCart,
  updateItemInCart,
};
