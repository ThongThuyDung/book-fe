import axios from "axios";
import {
  setLocalStorage,
  STORAGE,
  removeLocalStorage,
  getLocalStorage,
} from "../Utils/storage";
import baseUrl from "./config";

function login(Data, navigate, setErr) {
  axios({
    method: "post",
    url: `${baseUrl}auth/login`,
    data: Data,
  })
    .then((res) => res.data)
    .then((data) => {
      if (data.message) {
        setErr(data.message);
      } else {
        setLocalStorage(STORAGE.USER_DATA, JSON.stringify(data));
        setLocalStorage(STORAGE.USER_TOKEN, data.accessToken);
        setLocalStorage("EXPIRE", JSON.stringify(new Date()));
        console.log(data)
        if(data.role === 'ROLE_BUYER'){
          navigate("/home");
        }else{
          navigate("/seller");
        }
        window.location.reload(false);
      }
    })
    .catch((err) => {
      setErr(err);
      console.log(err);
    });
}

function register(Data, navigate, setErr) {
  axios({
    method: "post",
    url: `${baseUrl}auth/register`,
    data: Data,
  })
    .then((res) => res.data)
    .then((data) => {
      setLocalStorage(STORAGE.USER_DATA, JSON.stringify(data));
      setLocalStorage(STORAGE.USER_TOKEN, data.accessToken);
      setLocalStorage("EXPIRE", JSON.stringify(new Date()));
      navigate("/home");
      console.log(data);
    })
    .catch((err) => {
      setErr(err);
      console.log(err);
    });
}

function logout(navigate) {
  // console.log(getLocalStorage(STORAGE.USER_TOKEN).split(".")[2]);
  axios({
    method: "post",
    url: `${baseUrl}auth/logout`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      removeLocalStorage(STORAGE.USER_DATA);
      removeLocalStorage(STORAGE.USER_TOKEN);
      removeLocalStorage("EXPIRE");
    })
    .catch((err) => {
      removeLocalStorage(STORAGE.USER_DATA);
      removeLocalStorage(STORAGE.USER_TOKEN);
      removeLocalStorage("EXPIRE");
      navigate("/login");
      // console.log(err);
    });
}

function currentUser() {
  axios({
    method: "get",
    url: `${baseUrl}auth/current`,
    headers: {
      authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "content-type": "application/json",
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

export { login, register, logout, currentUser };