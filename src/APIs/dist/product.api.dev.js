"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllProduct = getAllProduct;
exports.searchProductByCategory = searchProductByCategory;
exports.searchProductByKeyword = searchProductByKeyword;
exports.getAllCategory = getAllCategory;
exports.getProductById = getProductById;
exports.getProductByShop = getProductByShop;
exports.apiCreateProduct = apiCreateProduct;
exports.apiUpdateProduct = apiUpdateProduct;

var _axios = _interopRequireDefault(require("axios"));

var _storage = require("../Utils/storage");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getAllProduct(setListProduct) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "product/get-all-product")
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    setListProduct(body);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getProductById(idProduct, setProduct) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "product/get-product/").concat(idProduct)
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    setProduct(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function apiCreateProduct(Data) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "product/create-product"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN)),
      "Content-Type": "multipart/form-data"
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    window.location.reload();
    return data.body;
  }).then(function (body) {
    console.log(body);
  })["catch"](function (err) {
    console.log(err);
  });
}

function apiUpdateProduct(Data) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "product/update-product"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN)),
      "Content-Type": "multipart/form-data"
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    window.location.reload();
    return data.body;
  }).then(function (body) {
    console.log(body);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getProductByShop(setProduct) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "product/get-product"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data.body;
  }).then(function (data) {
    setProduct(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getAllCategory(setListCategory) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "product/get-all-category")
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    setListCategory(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function searchProductByKeyword(keyword, setData) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "product/search-product/").concat(keyword)
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    // console.log(body);
    setData(body);
  })["catch"](function (err) {
    console.log(err);
  });
}

function searchProductByCategory(idCategory, setData) {
  // console.log(getLocalStorage(STORAGE.USER_TOKEN).split(".")[2]);
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "product/search-product-by-category-id/").concat(idCategory) // headers: {
    //   Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
    // },

  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data.body;
  }).then(function (body) {
    setData(body);
  })["catch"](function (err) {
    console.log(err);
  });
}