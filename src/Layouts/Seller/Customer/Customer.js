import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
  } from "mdb-react-ui-kit";
  import React, { useState } from 'react';
  
  function Customer() {
    const [isEdit, setIsEdit] = useState(false);
    const toggleShowEdit = () => setIsEdit(!isEdit);
    return (
    <div className="p-4 block">
        <div className="d-flex">
          <h4>Customer</h4>
        </div>
        <MDBCol className="mt-4" style={{marginLeft : "-15px"}}>
            <MDBCard className="mb-4">
              <MDBCardBody>
              <div class="container-fluid" style={{marginLeft : "110px"}}>
                <form class="d-flex w-75">
                    <input
                        type="Filter Customer"
                        class="form-control rounded"
                        placeholder="Filter Customer"
                        aria-label="Filter Customer"
                        aria-describedby="search-addon"
                    />
                    <span class="input-group-text border-0 ml-4" id="search-addon">
                    <i class="fas fa-search"></i>
                    </span>
                </form>
                </div>
                <MDBRow className="mt-4 ml-1">
                  <MDBCol sm="1" style={{marginLeft : "-30px"}}>
                    <MDBCardText></MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>PhoneNumber</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>Birthday</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>District</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="1">
                    <MDBCardText>Province</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-4 ml-1 pt-4 border-top">
                 <MDBCol sm="1">
                    <MDBCardText>1</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2" style={{marginLeft : "-30px"}}>
                    <MDBCardText>Nguyen van a</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>0365663332</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>12/07/2001 </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>120 NVL</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText>Thanh Khe</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="1">
                    <MDBCardText>Da nang</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </div>
    )
  }
  export default Customer