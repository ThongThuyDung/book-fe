"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = createOrder;
exports.getInforOrder = getInforOrder;
exports.getStatus = getStatus;
exports.getPayment = getPayment;
exports.getOrderOrdered = getOrderOrdered;
exports.getOrderReceived = getOrderReceived;
exports.getOrderTransport = getOrderTransport;
exports.getSaleInforOrderOrdered = getSaleInforOrderOrdered;
exports.getSaleInforOrderTransport = getSaleInforOrderTransport;
exports.getSaleInforOrderReceived = getSaleInforOrderReceived;

var _axios = _interopRequireDefault(require("axios"));

var _storage = require("../Utils/storage");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getStatus(setListStatus) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "order/get-status"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    setListStatus(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getPayment(setListPayment) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "order/get-payment"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    setListPayment(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getOrderTransport(setListOrderTransport) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "order/get-order-transport"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data;
  }).then(function (body) {
    setListOrderTransport(body);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getOrderReceived(setListOrderReceived) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "order/get-order-received"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data;
  }).then(function (body) {
    setListOrderReceived(body);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getOrderOrdered(setListOrderOrdered) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "order/get-order-ordered"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    return data;
  }).then(function (body) {
    setListOrderOrdered(body);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getInforOrder(Data) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "order/get-infor-order"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    console.log(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function createOrder(Data) {
  (0, _axios["default"])({
    method: "post",
    url: "".concat(_config["default"], "order/create-rder"),
    data: Data,
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data;
  }).then(function (data) {
    console.log(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getSaleInforOrderOrdered(setInforOrderOrdered) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "sale/get-info-order-ordered"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data.body;
  }).then(function (data) {
    setInforOrderOrdered(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getSaleInforOrderTransport(setInforOrderTransport) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "sale/get-info-order-transport"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data.body;
  }).then(function (data) {
    setInforOrderTransport(data);
  })["catch"](function (err) {
    console.log(err);
  });
}

function getSaleInforOrderReceived(setInforOrderReceived) {
  (0, _axios["default"])({
    method: "get",
    url: "".concat(_config["default"], "sale/get-info-order-received"),
    headers: {
      Authorization: "".concat((0, _storage.getLocalStorage)(_storage.STORAGE.USER_TOKEN))
    }
  }).then(function (res) {
    return res.data.body;
  }).then(function (data) {
    setInforOrderReceived(data);
  })["catch"](function (err) {
    console.log(err);
  });
}