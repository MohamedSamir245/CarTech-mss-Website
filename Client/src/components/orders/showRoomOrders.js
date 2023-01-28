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

function ShowroomOrders() {
  const location = useLocation();

  const [orderList, setOrderList] = useState([]);

  function GetAllOrdersToShowroom() {
    Axios.post("http://localhost:3001/GetAllOrdersToShowroom", {
      id: location.state.id,
    }).then((response) => {
      setOrderList(response.data);
      console.log(response.data);
    });
  }

  let orderList2;
  useEffect(() => {
    console.log(location.state.id);
    GetAllOrdersToShowroom();
    console.log(orderList);
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
                    <h1>
                      {item.FName + " "}
                      {item.LName}
                    </h1>
                    <h2>Contact: {" " + item.PhoneNumber}</h2>
                    <h5>Date: {" " + item.Date}</h5>
                    <p className="large">
                      Car Name: {item.CompanyMark + " "}
                      {item.carName}
                    </p>{" "}
                    <p className="large">Quantity: {item.Quantity + " "}</p>
                    <p className="large">Color: {item.Color + " "}</p>
                    <p className="large">Warranty: {item.Warranty + " "}</p>
                    {item.isNew ? (
                      <p className="large">State: New</p>
                    ) : (
                      <p className="large">State: Used</p>
                    )}
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
  return orderList2.length > 0 ? (
    <div>{orderList2}</div>
  ) : (
    <div>
      <div className="Noo">You Have No Orders Yet</div>
    </div>
  );
}

export default ShowroomOrders;
