import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../styles/addscservice.scss";

// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const AddService = () => {
  const location = useLocation();
  const [id, setId] = useState(location.state.id);

  const [servicesList, setServicesList] = useState([]);

  const [service_id, setServiceID] = useState();
  const [price, setPrice] = useState();

  const [showmodal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

    const handleaddition = (scid, serviceid, price) => {
    if (scid === "" || serviceid === "" || price === "") {
        console.log("missing inputs");
        return;
    }
    Axios.post("http://localhost:3001/addServicetoSC", {
      SC_ID: scid,
      Service_ID: serviceid,
      Price: price,
    }).then(() => {
      console.log("success");
    });
    getServicesList();
    handleCloseModal();
  };

  const getServicesList = () => {
    Axios.post("http://localhost:3001/getservicesexcept", { SC_ID: id }).then(
      (res) => {
        setServicesList(res["data"]);
      }
    );
  };

  useEffect(() => {
    getServicesList();
  }, []);

  return (
    <div className="addservice">
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
              <img src={ele.Image} alt="" style={{ width: 150, height: 150 }} />
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
              <p className="card-text" style={{ paddingLeft: 15 }}>
                {ele.Details}
              </p>
              <Button
                style={{ width: 70 }}
                onClick={() => {
                  setServiceID(ele.Service_ID);
                  handleShowModal();
                }}
              >
                Add
              </Button>
              <Modal
                show={showmodal}
                onHide={handleCloseModal}
                style={{ position: "fixed", zIndex: 1050 }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Addition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Price"
                      className="mb-3"
                      style={{ width: 470 }}
                    >
                      <Form.Control
                        value={price}
                        type="number"
                        placeholder="Enter your price"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleaddition(id, service_id, price);
                    }}
                  >
                    Confirm Addition
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            {/* <div className="w-100"></div> */}
            {/* <div className="card-footer w-100 text-muted">FOOTER</div> */}
          </div>
          <br />
        </div>
      ))}
      {/* <Button
        onClick={() => {
          console.log(servicesList);
        }}
      ></Button> */}
    </div>
  );
};

export default AddService;
