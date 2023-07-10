import axios from "axios";
import {
  setLocalStorage,
  STORAGE,
  removeLocalStorage,
  getLocalStorage,
} from "../Utils/storage";
import baseUrl from "./config";

function updateProfile(Data, notify) {
  axios({
    method: "post",
    url: `${baseUrl}update-profile`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      if(data.message === "Update fail!!!"){
        notify("Cập nhật thất bại")
      }
      if(data.message === "Update success!!!"){
        notify("Cập nhật thất bại")
      }
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getAddressOrder(setAddOrder) {
  axios({
    method: "post",
    url: `${baseUrl}get-address-order`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      setAddOrder(body);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getProfile(setProfile) {
  axios({
    method: "get",
    url: `${baseUrl}get-profile`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      setProfile(body);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getDistrict(setListDistrict) {
  axios({
    method: "get",
    url: `${baseUrl}get-district`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      // console.log(data);
      setListDistrict(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { updateProfile, getAddressOrder, getDistrict, getProfile };
