import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import "../../styles/forum.scss";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

function OrderDetails() {
  const location = useLocation();

  const [orderList, setOrderList] = useState([]);

  function GetAllOrderItemsByOrderNumber() {
    Axios.post("http://localhost:3001/GetAllOrderItemsByOrderNumber", {
      id: location.state.OrderNumber,
    }).then((response) => {
      setOrderList(response.data);
      console.log(response.data);
    });
  }

  let orderList2;
  useEffect(() => {
    GetAllOrderItemsByOrderNumber();
  }, []);

  orderList2 = orderList.map((item) => {
    return (
      <MDBContainer className="py-2" style={{ maxWidth: "6000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="11" lg="9" xl="9">
            <div className="d-flex flex-start mb-4">
              <MDBCard className="w-100">
                <MDBCardBody className="p-4">
                  <div>
                    <p className="large">
                      Car Name: {item.CompanyMark + " "}
                      {item.CarName}
                    </p>{" "}
                    <p className="large">
                      Car Showroom Name: {item.csName + " "}
                    </p>
                    <p className="large">Quantity: {item.Quantity + " "}</p>
                    <p className="large">Color: {item.Color + " "}</p>
                    <p className="large">Total Price: {item.Price + " "}</p>
                    <p className="large">Warranty: {item.Warranty + " "}</p>
                    <div className="d-flex justify-content-between align-items-center"></div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  });
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Order Number:{" " + location.state.OrderNumber}
      </h1>
      {orderList2}
    </div>
  );
}

export default OrderDetails;
