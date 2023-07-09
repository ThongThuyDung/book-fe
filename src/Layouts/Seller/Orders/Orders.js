import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from 'react';

import {
  getSaleInforOrderOrdered,
  getSaleInforOrderTransport,
  getSaleInforOrderReceived,
} from "../../../APIs/order.api";

function Orders() {
  const [listInforOrdered, setListOrderOrdered] = useState([])
  const [listInforTransport, setListOrderTransport] = useState([])
  const [listInforReceived, setListOrderReceived] = useState([])

  useEffect(() => {
     getSaleInforOrderOrdered(setListOrderOrdered);
     getSaleInforOrderTransport(setListOrderTransport);
     getSaleInforOrderReceived(setListOrderReceived);
  },[])
  
  return (
  <div className="p-4 block">
      <div className="d-flex">
        <h4>Đặt mua hàng</h4>
      </div>
      <MDBCol className="mt-4" style={{marginLeft : "-15px"}}>
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow className="mt-4 ml-1">
                <MDBCol sm="2">
                  <MDBCardText></MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Tất cả</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Đã đặt hàng</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Đang vận chuyển</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Đã nhận</MDBCardText>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4 ml-1 pt-4 border-top">
              <MDBCol sm="1">
                  <MDBCardText></MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>Tổng giá</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{listInforOrdered.length + listInforTransport.length + listInforTransport.length}</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{listInforOrdered.length}</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{listInforTransport.length}</MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>{listInforReceived.length}</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
      </MDBCol>
  </div>
  )
}
export default Orders