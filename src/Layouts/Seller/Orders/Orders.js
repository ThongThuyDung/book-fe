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
        <h4>Orders</h4>
      </div>
      <MDBCol className="mt-4" style={{marginLeft : "-15px"}}>
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow className="mt-4 ml-1">
                <MDBCol sm="2">
                  <MDBCardText></MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>All</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Ordered</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Transport</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Received</MDBCardText>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4 ml-1 pt-4 border-top">
              <MDBCol sm="1">
                  <MDBCardText></MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>Total</MDBCardText>
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