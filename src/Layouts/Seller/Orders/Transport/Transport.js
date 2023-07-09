import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React, { useState,useEffect } from 'react';
import {
  getSaleInforOrderTransport,
  apiUpdateStatus
} from "../../../../APIs/order.api";
function Transport() {
  const [listInforTransport, setListOrderTransport] = useState([])
  useEffect(() => {
    getSaleInforOrderTransport(setListOrderTransport);
 },[])
 const updateStatus = (id) => {
  apiUpdateStatus({
    idOrder : id,
    idStatus: 3
  })
}

  return (
  <div className="p-4 block">
      <div className="d-flex">
        <h4>Đang vận chuyển</h4>
      </div>
      <MDBCol className="mt-4" style={{marginLeft : "-15px"}}>
          <MDBCard className="mb-4">
            <MDBCardBody>
            <div class="container-fluid" style={{marginLeft : "110px"}}>
              <form class="d-flex w-75">
                  <input
                      type="Filter order"
                      class="form-control rounded"
                      placeholder="Tìm kiếm đơn hàng"
                      aria-label="Filter order"
                      aria-describedby="search-addon"
                  />
                  <span class="input-group-text border-0 ml-4" id="search-addon">
                  <i class="fas fa-search"></i>
                  </span>
              </form>
              </div>
              <MDBRow className="mt-4 ml-1">
                <MDBCol sm="2">
                  <MDBCardText>Ngày vận chuyển</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Tên người mua</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Địa chỉ</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Sách</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Số điện thoại</MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>Tổng giá</MDBCardText>
                </MDBCol>
              </MDBRow>
              {listInforTransport.map((item, index) => (
              <MDBRow className="mt-4 ml-1 pt-4 border-top">
                <MDBCol sm="2">
                  <MDBCardText>{item.dateOrder.slice(0,10)}</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{item.namePersonOrder}</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{item.addressOrder}</MDBCardText>
                </MDBCol>
                <MDBCol sm="4" style={{ width : "40%"}}>
                {(item?.products).map((product, index) =>(
                  <MDBRow>
                    <MDBCol style={{ width : "40%"}}>
                      <MDBCardText>{product.nameProduct} - SL: {product.numberProduct}</MDBCardText>
                    </MDBCol>
                    <MDBCol >
                      <MDBCardText>{item.phoneNumber}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  ))}
                  <MDBCol sm="4">
                      <MDBCardText>{item.phoneNumber}</MDBCardText>
                    </MDBCol>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>{item.totalPrice.toLocaleString('vi', { style: 'decimal', minimumFractionDigits: 0 })}đ</MDBCardText>
                </MDBCol>
                <MDBCol sm="1" style={{marginTop : "-5px", marginLeft : "-28px"}}>
                  <button type="button" style={{padding: "2px 12px", fontSize:"15px",fontSize :"13px", borderRadius:30}} class="btn btn-dark " name="edit" disabled=""
                   onClick={() => updateStatus(item.idOrder)}
                  >Đã nhận</button>
                </MDBCol>
              </MDBRow>
              ))}
            </MDBCardBody>
          </MDBCard>
      </MDBCol>
  </div>
  )
}
export default Transport