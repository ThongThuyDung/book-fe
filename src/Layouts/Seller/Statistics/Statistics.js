import React,{ useState,useEffect } from 'react';
import {
  MDBCol,
  //MDBInput,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  //MDBTextArea,
} from "mdb-react-ui-kit";
import {
  getAllCategory,
  getAllProduct,
  searchProductByCategory,
} from "../../../APIs/product.api";
import {
  getSaleInforOrderReceived,
  apiUpdateStatus
} from "../../../APIs/order.api";
const Statistic = ({ keyword }) => {
  const [listInforReceived, setListOrderReceived] = useState([]);
  const [listMonth, setListMonth] = useState([]);
  const [typeMonth, setTypeMonth] = useState(0);


  const elemMonth = listMonth?.map((item, index) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    );
  });
  useEffect(() => {
     getSaleInforOrderReceived(setListOrderReceived);
  },[])

  return (
    <div className="p-4 block">
      <div className="d-flex">
        <h4>Statistic</h4>
      </div>
      <MDBCol className="mt-4" style={{marginLeft : "-15px"}}>
          <MDBCard className="mb-4">
            <MDBCardBody>
            <div class="heading d-flex justify-content-between mb-5 mr-4">
                      <p class="result-count mb-0">
                        {" "}
                      </p>
                      <form class="ordering " method="get">
                        <select
                          name="orderby"
                          class="orderby form-control"
                          aria-label="Shop order"
                          onChange={(e) => {
                            setTypeMonth(e.target.value);
                          }}
                        >
                          <option value={0} selected="selected">
                            Tháng
                          </option>
                          {elemMonth}
                        </select>
                      </form>
                    </div>
                    <div class="heading d-flex justify-content-between mb-5 mr-4">
                      <p class="result-count mb-0">
                        {" "}
                      </p>
                      <form class="ordering " method="get">
                        <select
                          name="orderby"
                          class="orderby form-control"
                          aria-label="Shop order"
                          onChange={(e) => {
                            setTypeMonth(e.target.value);
                          }}
                        >
                          <option value={0} selected="selected">
                            Năm
                          </option>
                          {elemMonth}
                        </select>
                      </form>
                    </div>
            <div class="container-fluid" style={{marginLeft : "110px"}}>
              <form class="d-flex w-75">
                  <input
                      type="Filter order"
                      class="form-control rounded"
                      placeholder="Filter order"
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
                  <MDBCardText>Products</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Months</MDBCardText>
                </MDBCol>
                <MDBCol sm="3">
                  <MDBCardText>Số lượng đã bán</MDBCardText>
                </MDBCol>
                {/* <MDBCol sm="3">
                  <MDBCardText>Số lượng còn lại</MDBCardText>
                </MDBCol> */}
                <MDBCol sm="2">
                  <MDBCardText>Doanh thu</MDBCardText>
                </MDBCol>
                {/* <MDBCol sm="1">
                  <MDBCardText>Total</MDBCardText>
                </MDBCol> */}
              </MDBRow>
              {listInforReceived.map((item, index) => (
              <MDBRow className="mt-4 ml-1 pt-4 border-top">
                {/* <MDBCol sm="2">
                  <MDBCardText>{item.dateOrder.slice(0,10)}</MDBCardText>
                </MDBCol> */}
                <MDBCol sm="4">
                {(item?.products).map((product, index) =>(
                  <MDBRow>
                    <MDBCol style={{ width : "40%"}}>
                      <MDBCardText>{product.nameProduct} - SL: {product.numberProduct}</MDBCardText>
                    </MDBCol>
                    {/* <MDBCol >
                      <MDBCardText>{product.typeOrder}</MDBCardText>
                    </MDBCol> */}
                  </MDBRow>
                  ))}
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{item.dateOrder.slice(0,10)}</MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{item.namePersonOrder}</MDBCardText>
                </MDBCol>
                {/* <MDBCol sm="2">
                  <MDBCardText>{item.addressOrder}</MDBCardText>
                </MDBCol> */}
                
                <MDBCol sm="1">
                  <MDBCardText>{item.totalPrice}</MDBCardText>
                </MDBCol>
                {/* <MDBCol sm="1" style={{marginTop : "-5px", marginLeft : "-28px",}}>
                  <button type="button" style={{padding: "2px 12px", fontSize:"15px", borderRadius:30}} class="btn btn-dark " name="edit" disabled="" 
                   onClick={() => updateStatus(item.idOrder)}
                  >Transport</button>
                </MDBCol> */}
              </MDBRow>
               ))}
            </MDBCardBody>
          </MDBCard>
      </MDBCol>
  </div>
  );
    // <div>
    //   <h2>Thống kê doanh thu sản phẩm</h2>
    //   <p>Doanh thu: {revenue}</p>
    // </div>

};

export default Statistic;