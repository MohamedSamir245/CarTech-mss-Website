import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../styles/SCOrders.scss"

const SCOrders = () => {
  const location = useLocation();
  const [id, setId] = useState(location.state.id);

  const [orders, serOrders] = useState([]);

  const getReservations = () => {
    Axios.post("http://localhost:3001/getscordersfromid", {
      SC_ID: id,
    }).then((res) => {
      serOrders(res["data"]);
    });
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div className="scorders">
      {orders.map((ele) => (
        <div className="servicecard">
          <h4 style={{ marginLeft: 10, color: "#d01463" }}>
            Reservation Number {ele.Reservation_ID}
          </h4>
          <div className="customername">
            <span>
              <strong>Customer Name: </strong>
              {ele.FName} {ele.LName}
            </span>
            <br />
          </div>
          <div className="customeremail">
            <span>
              <strong>Customer Email: </strong>
              {ele.Email}
            </span>
          </div>
          <div className="customerphonenumber">
            <span>
              <strong>Customer Phone Number: </strong>
              {ele.PhoneNumber}
            </span>
          </div>
          <div className="servicename">
            <span>
              <strong>Ordered Service: </strong>
              {ele.Name}
            </span>
          </div>
          <div className="price">
            <span>
              <strong>Price: </strong>
              {ele.Price}
            </span>
          </div>
          <div className="servicename">
            <span>
              <strong>Order Date: </strong>
              {ele.Date}
            </span>
              </div>
              <br />
          </div>
      ))}
          
          <br />
      </div>
      
  );
};

export default SCOrders;
