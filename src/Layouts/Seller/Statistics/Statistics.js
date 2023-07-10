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
  apiUpdateStatus,
  StatisticByMonth,
  StatisticByYear,
} from "../../../APIs/order.api";

const Statistic = ({ keyword }) => {
  const [listInforReceived, setListOrderReceived] = useState([]);
  const [listInforReceived1, setListOrderReceived1] = useState([]);
  const [listMonth, setListMonth] = useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [typeMonth, setTypeMonth] = useState(0);
  const [year, setYear] = useState(null);

  const elemMonth = listMonth?.map((item, index) => {
    return (
      <option value={item} key={index}>
        {"Tháng "} {item}
      </option>
    );
  });

  const HandleStatistics = () => {
    if(year == null)
    {
      console.log("Vui lòng nhập năm");
    }
    else 
    {
        if(typeMonth == 0)
        {
          StatisticByYear(year, setListOrderReceived);
        }
        else 
        {
          StatisticByMonth(year, typeMonth, setListOrderReceived);
        }
    }
  }


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
                      <form class="ordering " method="get" style={{
                        display: 'flex',
                        padding: '10px'
                      }}>
                        <input type="text" style={{
                        marginRight:'30px'}}
                          onChange={(e) => {
                            setYear(e.target.value);
                          }}
                          placeholder='Nhập năm muốn thống kê...'/>
                        <select
                          name="orderby"
                          class="orderby form-control"
                          aria-label="Shop order"
                          onChange={(e) => {
                            setTypeMonth(e.target.value);
                          }}
                        >
                          <option value={0} selected={true}>
                            {"Tất cả "}
                          </option>
                          {elemMonth}
                        </select>
                      </form>
                    </div>
                    <div class="heading d-flex justify-content-between mb-5 mr-4">
                      <p class="result-count mb-0">
                        {" "}
                      </p>
                      <button onClick={() => HandleStatistics()}>Thống kê</button>
                      
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
                <MDBCol sm="8">
                  <MDBCardText>Products</MDBCardText>
                </MDBCol>

                <MDBCol sm="4">
                  <MDBCardText>Doanh thu</MDBCardText>
                </MDBCol>
              </MDBRow>
              
              {
                listInforReceived.length > 0 ? listInforReceived?.map((product, index) => {
                  return <MDBRow className="mt-4 ml-1 pt-4 border-top">
                    <MDBCol sm="8">
                      <MDBCardText>{product.productResponse?.name} - SL: {product.quantity}</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="4">
                      <MDBCardText>{product.revenue}</MDBCardText>
                    </MDBCol>
                  </MDBRow>;
                }) : <></>
              }
              
            </MDBCardBody>
          </MDBCard>
      </MDBCol>
  </div>
  );

};

export default Statistic;