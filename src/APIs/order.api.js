import axios from "axios";
import {
  setLocalStorage,
  STORAGE,
  removeLocalStorage,
  getLocalStorage,
} from "../Utils/storage";
import baseUrl from "./config";

function getStatus(setListStatus) {
  axios({
    method: "get",
    url: `${baseUrl}order/get-status`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setListStatus(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPayment(setListPayment) {
  axios({
    method: "get",
    url: `${baseUrl}order/get-payment`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setListPayment(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getOrderTransport(setListOrderTransport) {
  axios({
    method: "get",
    url: `${baseUrl}order/get-order-transport`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      data.sort((a, b) => {
        return Date.parse(b.dateOrder) - Date.parse(a.dateOrder);
      });
      setListOrderTransport(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getOrderReceived(setListOrderReceived) {
  axios({
    method: "get",
    url: `${baseUrl}order/get-order-received`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      data.sort((a, b) => {
        return Date.parse(b.dateOrder) - Date.parse(a.dateOrder);
      });
      setListOrderReceived(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getOrderOrdered(setListOrderOrdered) {
  axios({
    method: "get",
    url: `${baseUrl}order/get-order-ordered`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      data.sort((a, b) => {
        return Date.parse(b.dateOrder) - Date.parse(a.dateOrder);
      });
      setListOrderOrdered(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getInforOrder(Data, setListItem, navigate) {
  axios({
    method: "post",
    url: `${baseUrl}order/get-info-order`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => 
    {
      console.log(res.data);
      setListItem(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
}

function createOrder(Data, navigate, notify) {
  axios({
    method: "post",
    url: `${baseUrl}order/create-order`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      notify("Order successfully!");
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}


function getSaleInforOrderOrdered(setInforOrderOrdered) {
  axios({
    method: "get",
    url: `${baseUrl}sale/get-info-order-ordered`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setInforOrderOrdered(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getSaleInforOrderTransport(setInforOrderTransport) {
  axios({
    method: "get",
    url: `${baseUrl}sale/get-info-order-transport`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setInforOrderTransport(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getSaleInforOrderReceived(setInforOrderReceived) {
  axios({
    method: "get",
    url: `${baseUrl}sale/get-info-order-received`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      setInforOrderReceived(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function apiUpdateStatus(Data) {
  axios({
    method: "post",
    url: `${baseUrl}sale/update-status`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      // window.location.reload();
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  createOrder,
  getInforOrder,
  getStatus,
  getPayment,
  getOrderOrdered,
  getOrderReceived,
  getOrderTransport,
  getSaleInforOrderOrdered,
  getSaleInforOrderTransport,
  getSaleInforOrderReceived,
  apiUpdateStatus,
};
