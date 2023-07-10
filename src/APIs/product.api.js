import axios from "axios";
import {
  setLocalStorage,
  STORAGE,
  removeLocalStorage,
  getLocalStorage,
} from "../Utils/storage";
import baseUrl from "./config";

function getAllProduct(setListProduct, setNumberPage, page) {
  axios({
    method: "get",
    url: `${baseUrl}product/get-all-product?num=${page}`,
  })
    .then((res) => res.data)
    .then((data) => {
      return data.body;
    })
    .then((body => 
      {
        setListProduct(body.productListResponse);
        let arrPage = []
        for(let i = 1; i <= body.totalGet; i++)
        {
          arrPage.push(i);
        }
        setNumberPage(arrPage);
      }))
    .catch((err) => {
      console.log(err);
    });
}
function getRecommend(setListRecommend) {
  axios({
    method: "get",
    url: `${baseUrl}product/get-recommend-one`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      setListRecommend(body.productListResponse);
      console.log(body)
    })
    .catch((err) => {
      console.log(err);
    });
}
function getRecommendContent(setListRecommendContent) {
  axios({
    method: "get",
    url: `${baseUrl}product/get-recommend-content`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      setListRecommendContent(body.productListResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getProductById(idProduct, setProduct = null) {
  axios({
    method: "get",
    url: `${baseUrl}product/get-product/${idProduct}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      if (setProduct) {
        setProduct(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function apiCreateProduct(Data) {
  axios({
    method: "post",
    url: `${baseUrl}product/create-product`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      window.location.reload();
      return data.body;
    })
    .then((body) => {
      console.log(body);
    })
    .catch((err) => {
      console.log(err);
    });
}

function apiUpdateProduct(Data) {
  axios({
    method: "post",
    url: `${baseUrl}product/update-product`,
    data: Data,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      window.location.reload();
      return data.body;
    })
    .then((body) => {
      console.log(body);
    })
    .catch((err) => {
      console.log(err);
    });
}

function apiDeleteProduct(idProduct) {
  axios({
    method: "post",
    url: `${baseUrl}product/delete-product/${idProduct}`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.data)
    .then((data) => {
      window.location.reload();
      return data.body;
    })
    .then((body) => {
      console.log(body);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getProductByShop(setProduct) {
  axios({
    method: "get",
    url: `${baseUrl}product/get-product?num=1`,
    headers: {
      Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    },
  })
    .then((res) => res.data.body)
    .then((data) => {
      setProduct(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getAllCategory(setListCategory) {
  axios({
    method: "get",
    url: `${baseUrl}product/get-all-category`,
  })
    .then((res) => res.data)
    .then((data) => {
      setListCategory(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function searchProductByKeyword(keyword, setData, setNumberPage, page) {
  axios({
    method: "get",
    url: `${baseUrl}product/search-product/${keyword}?num=${page}`,
  })
    .then((res) => 
    {
      console.log(res.data);
      return res.data;
    }
    )
    .then((data) => {
      setData(data.productListResponse);
      let arrPage = []
      for(let i = 1; i <= data.totalGet; i++)
      {
        arrPage.push(i);
      }
      setNumberPage(arrPage);
    })
    .catch((err) => {
      console.log(err);
    });
}

function searchProductByCategory(idCategory, setData, setNumberPage, page) {
  axios({
    method: "get",
    url: `${baseUrl}product/search-product-by-category-id/${idCategory}?num=${page}`,
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => data.body)
    .then((body => 
      {
        setData(body.productListResponse);
        let arrPage = []
        for(let i = 1; i <= body.totalGet; i++)
        {
          arrPage.push(i);
        }
        setNumberPage(arrPage);
      }))
    .catch((err) => {
      console.log(err);
    });
}

export {
  getAllProduct,
  searchProductByCategory,
  searchProductByKeyword,
  getAllCategory,
  getProductById,
  getProductByShop,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  getRecommend,
  getRecommendContent
};
