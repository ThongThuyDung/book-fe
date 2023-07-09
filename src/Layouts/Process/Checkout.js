import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, getInforOrder, getPayment } from "../../APIs/order.api";
import { getAddressOrder ,getProfile} from "../../APIs/profile.api";
import { ToastContainer, toast } from "react-toastify";

function Checkout({ listItemChosen }) {
  const [listMethod, setListMethod] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [listItemAfter, setListItemAfter] = useState({});
  const [currentProfile, setCurrentProfile] = useState({});
  const [dataOrder, setDataOrder] = useState({
    idPayment: 1,
    listIdItem: listItemChosen,
    province: "",
    address: "",
    name: "",
    phone: "",
  });
  const notify = (value) => toast(value);
  const [fillInfor, setFillInfor] = useState({});
  const [isClickContinue, setIsClickContinue] = useState(false);
  useEffect(() => {
    getPayment(setListMethod);
    getAddressOrder(setFillInfor);
  }, []);
  useEffect(() => {
    getProfile(setCurrentProfile);
  }, []);

  // console.log(currentProfile)
  
  const [errData, setErrData] = useState({
    errStreet: "err",
    errProvince: "err",
    errCommon: "",
  });

  const validateStreet = (value) => {
    if (value === "") {
      setErrData({
        ...errData,
        errStreet: "Yêu cầu nhập địa chỉ/số nhà",
      });
    } else {
      setErrData({
        ...errData,
        errStreet: "",
      });
    }
  };

  const validateProvince = (value) => {
    if (value === "") {
      setErrData({
        ...errData,
        errProvince: "Yêu cầu nhập tỉnh thành",
      });
    } else {
      setErrData({
        ...errData,
        errProvince: "",
      });
    }
  };

  useEffect(() => {
    setDataOrder({
      ...dataOrder,
      province: currentProfile.province?.province_name,
      address: fillInfor?.address,
      name: currentProfile.name,
      phone: currentProfile.phone,
    });
    getInforOrder(dataOrder, setListItem, navigate);
  }, [fillInfor,currentProfile]);

  const navigate = useNavigate();

  const handleGetInforOrder = () => {
    if (dataOrder.address && dataOrder.province) {
      setErrData({
        ...errData,
        errCommon: "",
      });
      setIsClickContinue(true);
      getInforOrder(dataOrder, setListItem, navigate);
    } else {
      setErrData({
        ...errData,
        errCommon: "Bạn cần nhập thông tin địa chỉ đầy đủ",
      });
    }
  };

  useEffect(() => {
    let objectRes = {
      totalPrice: 0,
      products: [],
    };

    listItem.forEach((item, index) => {
      objectRes.totalPrice += item.totalPrice;
      for (let i = 0; i < item.products.length; i++) {
        objectRes.products.push(item.products[i]);
      }
    });
    setListItemAfter(objectRes);
  }, [listItem]);

  const handleOrder = () => {
    let data = {
      // idPayment: 1,
      listIdItem: listItemChosen,
      province: dataOrder.province,
      address: dataOrder.address,
      info: dataOrder.name + "; " + dataOrder.phone + "; " + dataOrder.address,
    };
    // console.log(data);
    // console.log(fillInfor.district.province.province_name);
    createOrder(dataOrder, navigate, notify);
  };

  const elemListItemInCart = listItemAfter.products?.map((item, index) => {
    return (
      <tr
        class="cart_item"
        style={{
          // flexDirection: "row",
          // // justifyContent: "center",
          alignItems: "center !important",
        }}
      >
        <td class="product-name" data-title="Product">
          <a>{item.nameProduct}</a>
        </td>

        <td class="product-price" data-title="Price">
          <span class="amount">
            {item.price.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}
          </span>
        </td>
        <td class="product-price" data-title="Quantity">
          <span class="quantity">{item.numberProduct}</span>
        </td>
        <td class="product-price" data-title="Category">
          <span class="category">{item.typeOrder}</span>
        </td>

        <td class="product-subtotal" data-title="Total">
          <span class="amount">{(item.numberProduct * item.price).toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ</span>
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
                <h1 class="mb-3">Đặt hàng</h1>
                

                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item">
                      <a href="/">Trang chủ</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Đặt hàng
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
        <div class="page-wrapper">
          <div class="checkout shopping">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 pr-5">
                  <div class="billing-details mt-5">
                    <h4 class="mb-4">Hóa đơn chi tiết</h4>
                    <form class="checkout-form">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="form-group mb-4">
                            <label for="first_name">Số nhà/địa chỉ</label>
                            <input
                              type="text"
                              class="form-control"
                              id="street"
                              placeholder=""
                              value={dataOrder.address}
                              onChange={(e) => {
                                setDataOrder({
                                  ...dataOrder,
                                  address: e.target.value,
                                });
                                validateStreet(e.target.value);
                              }}
                            />
                            {errData.errStreet &&
                            errData.errStreet !== "err" ? (
                              <p
                                style={{
                                  color: "red",
                                  marginTop: 2,
                                  marginBottom: -5,
                                }}
                              >
                                {errData.errStreet}!!!
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div class="col-lg-12">
                          <div class="form-group mb-4">
                            <label for="first_name">Tỉnh thành </label>
                            <input
                              type="text"
                              class="form-control"
                              id="Province"
                              placeholder=""
                              value={dataOrder.province}
                              onChange={(e) => {
                                setDataOrder({
                                  ...dataOrder,
                                  province: e.target.value,
                                });
                                validateProvince(e.target.value);
                              }}
                            />
                            {errData.errProvince &&
                            errData.errProvince !== "err" ? (
                              <p
                                style={{
                                  color: "red",
                                  marginTop: 2,
                                  marginBottom: 2,
                                }}
                              >
                                {errData.errProvince}!!!
                              </p>
                            ) : null}
                            {errData.errCommon &&
                            errData.errCommon !== "err" ? (
                              <p
                                style={{
                                  color: "red",
                                  marginBottom: 2,
                                  marginTop: 2,
                                }}
                              >
                                {errData.errCommon}!!!
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div class="col-lg-12">
                          <div class="form-group mb-4">
                            <label for="first_name">
                              Văn phòng
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="apartment"
                              placeholder="văn phòng"
                            />
                          </div>
                        </div>          
                        <div class="col-lg-12">
                          <div class="form-group mb-4">
                            <label for="first_name">
                            Ghi chú
                            </label>
                            <textarea
                              class="form-control"
                              id="msg"
                              cols="30"
                              rows="5"
                              placeholder="ghi chú những gì mà bạn muốn ghi chú về sản phẩm"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="cart shopping page-wrapper">
          <div className="row justify-content-center">
            <div class="col-lg-6">
              <div class="cart-info card p-4 mt-4">
                <h4 class="mb-4">Thông tin người dùng</h4>
                <ul class="list-unstyled mb-4">
                  <li class="d-flex align-items-start py-2">
                    <p class="mr-3">Tên:</p>
                    <p>{dataOrder.name}</p>
                  </li>
                  <li class="d-flex align-items-start py-2">
                    <p class="mr-3">Số điện thoại:</p>
                    <p>{dataOrder.phone}</p>
                  </li>
                  <li class="d-flex align-items-start py-2">
                    <p class="mr-3">Địa chỉ:</p>
                    <p>{dataOrder.address + ", " + dataOrder.province}</p>
                  </li>

                  <li class="d-flex align-items-start py-2">
                    <p class="mr-3">Ngày đặt hàng:</p>
                    <p>{listItem[0]?.dateOrder.split("T")[0]}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cart-info card p-4 mt-4">
                <h4 class="mb-4">Tổng kết</h4>
                <ul class="list-unstyled mb-4">
                  <li class="d-flex align-items-start py-2">
                    <p class="mr-3">Tổng phí:</p>
                    <p>{listItemAfter?.totalPrice}đ</p>
                  </li>
                  <li class="d-flex align-items-start py-2">
                    <p class="mr-3">Phí vận chuyển:</p>
                    <p>Miễn phí</p>
                  </li>
                  <li class="d-flex align-items-start py-2">
                    <p class="mr-3">Tổng giá:</p>
                    <p>{listItemAfter?.totalPrice}đ</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="container mt-5">
            <div class="row justify-content-center">
              <div class="col-lg-12">
                <div class="product-list">
                  <form class="cart-form">
                    {listItem[0]?.products.length > 0 ? (
                      <table
                        class="table shop_table shop_table_responsive cart"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th class="product-name">Sách</th>
                            {/* <th class="product-name">Shop</th> */}
                            <th class="product-price">Giá</th>
                            <th class="product-quantity">Số lượng</th>
                            <th class="product-category">Thể loại</th>
                            <th class="product-subtotal">Tổng giá</th>
                          </tr>
                        </thead>

                        <tbody>
                          {elemListItemInCart}
                          <tr></tr>
                        </tbody>
                      </table>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
            <a
              class="btn btn-dark btn-small text-white"
              style={{
                cursor: "pointer",
                marginRight: 10,
              }}
              // onClick={() => {
              //   setIsClickContinue(false);
              // }}
              onClick={() => {
                  navigate("/cart");
              }}
            >
                Quay lại
            </a>
            <a
              class="btn btn-main btn-small"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                handleOrder();
              }}
            >
              Xác nhận
            </a>
            
          </div>
        </section>
   

      <div class="modal fade" id="coupon-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content py-5">
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Enter Coupon Code"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-main btn-small"
                  data-dismiss="modal"
                >
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
export default Checkout;
