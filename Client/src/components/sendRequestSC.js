import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
// import { MDBRadio } from "mdb-react-ui-kit";
import Axios from "axios";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";

import "../styles/sendRequests.scss";

const SendRequestSC = () => {
  const [userem, setUserEm] = useState("");
  const [servicename, setServiceName] = useState("");
  const [servicedetails, setServiceDetails] = useState("");

  const handlesubmission = (useremail, servicename, servicedetails) => {
    let scid = -1;

    Axios.post("http://localhost:3001/getscidfromemail", {
      uemail: useremail,
    }).then((res) => {
      scid = res["data"]["uid"];
      if (scid === -1) {
        setUserEm("");
        document.getElementById("not-registered").style.display = "block";
        setTimeout(() => {
          document.getElementById("not-registered").style.display = "none";
        }, 3000);
        // console.log("wrong email");

        return;
        }
        if (servicename === "" || servicedetails === "") {
            console.log("missing inputs")
            return;
        }

        Axios.post("http://localhost:3001/sendrscrequest", {
            userid:scid,
            servicename: servicename,
            servicedetails:servicedetails
        }).then(() => {
          console.log("success");
        });
    });
  };

  return (
    <div className="sendRequestsContainer">
      <h3>Service Center Request</h3>

      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
          style={{ width: 500 }}
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

        <FloatingLabel
          controlId="floatingInput"
          label="Service Name"
          className="mb-3"
          style={{ width: 500 }}
        >
          <Form.Control
            value={servicename}
            type="text"
            placeholder="BMW"
            onChange={(e) => {
              setServiceName(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Service Details">
          <Form.Control
            as="textarea"
            value={servicedetails}
            placeholder="Leave the service details here"
            style={{ height: "100px" }}
            onChange={(e) => {
              setServiceDetails(e.target.value);
            }}
          />
        </FloatingLabel>

        <Button
          variant="primary"
          onClick={() => {
            // console.log(userem);
            // console.log(servicename);
              handlesubmission(
                userem,
                servicename,
                servicedetails,
              );
          }}
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SendRequestSC;
