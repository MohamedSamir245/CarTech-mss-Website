import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../../styles/forum.scss";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

function MyOrders() {
  const location = useLocation();

  const [orderList, setOrderList] = useState([]);
  const [orderList3, setOrderList3] = useState([]);

  const [fname, setFname] = useState("kiko");
  const [lname, setLname] = useState("");

  function GetCustomerDataaById() {
    Axios.post("http://localhost:3001/GetCustomerDataaById", {
      id: location.state.userID,
    }).then((response) => {
      setFname(response.data[0].FName);
      setLname(response.data[0].LName);
    });
  }

  function GetAllOrdersById() {
    Axios.post("http://localhost:3001/GetAllOrdersById", {
      id: location.state.userID,
    }).then((response) => {
      setOrderList(response.data);
    });
  }

  let orderList2;
  useEffect(() => {
    GetCustomerDataaById();
    GetAllOrdersById();
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
                    <MDBTypography tag="h3">
                      Order Number:{" " + item.OrderNumber}
                    </MDBTypography>
                    <p className="small">Date : {item.Date}</p>
                    <Link
                      to="/OrderDetails"
                      className="one"
                      state={{
                        OrderNumber: item.OrderNumber,
                      }}
                    >
                      <MDBBtn>Show Order Details</MDBBtn>
                    </Link>
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
    <div>
      {" "}
      <div style={{ textAlign: "center", fontSize: "40px" }}>
        {fname + " "}
        {lname} Orders
      </div>
      <br></br>
      {orderList2}
    </div>
  ) : (
    <div>
      <div>
        {fname + " "}
        {lname} Orders
      </div>
      <br></br>
      <div className="Noo">You Have No Orders Yet</div>
    </div>
  );
}

export default MyOrders;
