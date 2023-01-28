// React Components
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// Components
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "../../styles/serviceCenters.scss";

const ServiceCenter = () => {
  // get id
  const location = useLocation();
  const [id, setId] = useState(location.state.id);

  const [userem, setUserEm] = useState();

  const [phonenumber, SetPhoneNumber] = useState("");
  const [servicesList, setServicesList] = useState([]);

  const [showmodal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const [servicereservation, setServiceReservation] = useState();
  const [serviceprice, setServicePrice] = useState();
  const [servicename, setServiceName] = useState();

  const current = new Date();
  const [date, setDate] = useState();

  const [info, setInfo] = useState({
    CenterSite: "CenterSite",
    WorkingHours: "WorkingHours",
    Name: "Name",
    Rating: "Rating",
    PhoneNumber: "PhoneNumber",
  });

  const copy = async () => {
    await navigator.clipboard.writeText(phonenumber);
    alert("Phone number copied to clipboard");
    console.log(servicesList);
  };

  const getInfo = () => {
    // console.log(id)
    Axios.post("http://localhost:3001/getservicecenterinfo", {
      SC_ID: id,
    }).then((res) => {
      // console.log(res["data"][0])
      setInfo(res["data"][0]);
      SetPhoneNumber(res["data"][0]["PhoneNumber"]);
    });
  };

  const getAvialServices = () => {
    Axios.post("http://localhost:3001/getservicesfromscid", {
      SC_ID: id,
    }).then((res) => {
      setServicesList(res["data"]);
    });
  };

  const updatedate = () => {
    setDate(
      `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
    );
  };
  useEffect(() => {
    getInfo();
    getAvialServices();
    updatedate();
  }, []);

  const handlereservation = (uemail) => {
    let uid = -1;
    Axios.post("http://localhost:3001/getcustomeridfromemail", {
      uemail: uemail,
    }).then((res) => {
      uid = res["data"]["uid"];
      if (uid === -1) {
        setUserEm("");
        document.getElementById("not-registered").style.display = "block";//not working 
        setTimeout(() => {
          document.getElementById("not-registered").style.display = "none";
        }, 3000);

        return;
      }
      console.log(uid);
      Axios.post("http://localhost:3001/reserve-service", {
        SC_ID: id,
        Service_ID: servicereservation,
        Customer_ID: uid,
        Price: serviceprice,
        Date: date,
      }).then(() => {
        console.log("success");
        alert("Reserved Successfully")//this implmentation needs change
        setTimeout(() => {
          handleCloseModal();
        }, 1000);

      });
    });
  };

  return (
    <div className="servicecenter">
      <div className="ServiceCenterContainer">
        <h1>{info.Name}</h1>
        <div className="infocontainer">
          <h3>Service Center Informations</h3>
          <div className="mainbranch" style={{ display: "flex" }}>
            <strong style={{ paddingLeft: 0 }}>Main Branch Address: </strong>
            <span style={{ paddingLeft: 0, marginLeft: 5 }}>
              {info.CenterSite}
            </span>
          </div>

          <div className="workinghours">
            <strong style={{ paddingLeft: 0 }}>Working Hours: </strong>
            <span style={{ paddingLeft: 0, marginLeft: 5 }}>
              {info.WorkingHours}
            </span>
          </div>

          <div className="rating">
            <strong style={{ paddingLeft: 0 }}>Rating: </strong>
            <span style={{ paddingLeft: 0, marginLeft: 5 }}>{info.Rating}</span>
          </div>
          <div
            className="phone"
            style={{
              display: "flex",
              padding: 0,
              marginBottom: 7,
              marginTop: 7,
            }}
          >
            <strong>Phone Number</strong>
            <Button
              style={{
                margin: 0,
                marginLeft: 10,
                height: 25,
                width: "auto",
                paddingTop: 2,
                paddingBottom: 2,
                background: "#d01463",
              }}
              onClick={copy}
            >
              {info.PhoneNumber}
            </Button>
          </div>
        </div>
        <br />
      </div>
      <br />
      <br />
      <div className="ServiceCenterContainer">
        <h1 style={{ fontWeight: "bold", marginLeft: 50 }}>
          Available Services
        </h1>
        <hr
          style={{
            width: 400,
            marginLeft: 50,
            borderWidth: 2,
            borderColor: "gray",
          }}
        />
        <br />

        {servicesList.map((ele) => (
          <div className="serviceCard" key={ele.Service_ID}>
            <div
              className="card flex-row flex-wrap"
              style={{
                marginLeft: 50,
                marginRight: 50,
                background: "transparent",
              }}
            >
              <div className="card-header border-0">
                <img
                  src={ele.Image}
                  alt=""
                  style={{ width: 150, height: 150 }}
                />
              </div>
              <div className="card-block px-2">
                <h3
                  className="card-title"
                  style={{
                    paddingTop: 30,
                    paddingLeft: 10,
                    fontWeight: "bold",
                    marginBottom: 0,
                    color: "#d01463",
                  }}
                >
                  {ele.Name}
                </h3>
                <p
                  className="card-text"
                  style={{ paddingLeft: 15, marginBottom: 0 }}
                >
                  {ele.Details}
                </p>
                <p
                  className="card-text"
                  style={{ paddingLeft: 15, marginBottom: 0 }}
                >
                  <strong style={{ fontSize: 20 }}>{ele.Price} EGP</strong>
                </p>
                <Button style={{ width: 200 }}>
                  <Link
                    to={`/service/${ele.Name}`}
                    state={{ id: ele.Service_ID }}
                  >
                    <span style={{ color: "white" }}>Find Service Centers</span>
                  </Link>
                </Button>
                {/* {(() => {
                  switch (auth["userType"]) {
                    
                  }
                })()} */}
                {<Button
                  style={{ marginLeft: 20, width: 100 }}
                  onClick={() => {
                    setServiceReservation(ele.Service_ID);
                    setServicePrice(ele.Price);
                    setServiceName(ele.Name);
                    handleShowModal();
                  }}
                >
                  <span style={{ color: "white" }}>Reserve</span>
                </Button>}
              </div>
              {/* <div className="w-100"></div> */}
              {/* <div className="card-footer w-100 text-muted">FOOTER</div> */}
            </div>
            <br />
            <Modal
              show={showmodal}
              onHide={handleCloseModal}
              style={{ position: "fixed", zIndex: 1050 }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Continue Reservation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                    style={{ width: 470 }}
                  >
                    <Form.Control
                      value={userem}
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setUserEm(e.target.value);
                      }}
                    />
                    <div
                      className="alert alert-danger"
                      role="alert"
                      id="not-registered"
                      style={{ marginTop: "3%", height: "10%" }}
                    >
                      This email is not registered!
                    </div>
                  </FloatingLabel>
                </Form>
                <span>
                  <strong>Service Center:</strong> {info.Name}
                </span>
                <br />
                <span>
                  <strong>Service:</strong> {servicename}
                </span>
                <br />
                <span>
                  <strong>Price:</strong> {serviceprice}
                </span>
                <br />
                <span>
                  <strong>Date: </strong>
                  {date}
                </span>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handlereservation(userem);
                  }}
                >
                  Confirm Reservation
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default ServiceCenter;
