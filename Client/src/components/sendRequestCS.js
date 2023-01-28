import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MDBRadio } from "mdb-react-ui-kit";
import Axios from "axios";
import Button from "react-bootstrap/Button";

import { useState,useEffect } from "react";

import "../styles/sendRequests.scss"

const SendRequestCS = () => {
 


  const years=[...Array(40).keys()].map(i=>i+1990);


  const [userem, setUserEm] = useState("")
  const [carname, setCarName] = useState("")
  const [fueltype, setFuelType] = useState("")
  const [cartype, setCarType] = useState("")
  const [transmissiontype, setTransmissionType] = useState("");
  const [caryear, setCarYear] = useState(null);
  const [companymark,setCompanyMark]=useState("")


  
  const handlesubmission = (useremail, carname, fueltype, cartype, transmissiontype, caryear, companymark) => {
    let csid = -1;

    Axios.post("http://localhost:3001/getcsidfromemail", {
      uemail: useremail,
    }).then((res) => {
      csid = res["data"]["uid"];

      if (csid === -1)
      {
        setUserEm("");
        document.getElementById("not-registered").style.display = "block";
        setTimeout(() => {
          document.getElementById("not-registered").style.display = "none";
        }, 3000);
        // console.log("wrong email");

        return;
      }
      if (carname === "" || fueltype === "" || cartype === "" || transmissiontype === "" || caryear === null || companymark === "") {
        console.log(carname,fueltype,cartype,transmissiontype,caryear,companymark)
        console.log("missing inputs");
        return;
      }
      Axios.post("http://localhost:3001/sendrcsrequest", {
        carname: carname,
        userid: csid,
        fueltype: fueltype,
        cartype: cartype,
        transmissiontype: transmissiontype,
        caryear: caryear,
        companymark: companymark,
      }).then(() => {
        console.log("success");
      });

      
    });
   };
  
  return (
    <div className="sendRequestsContainer">
      <div className="inputs">
        <h3>Car Show Room Request</h3>
        {/* <form action="#" method="get" onSubmit={handlesubmission}></form> */}
      </div>
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
          label="Car Name"
          className="mb-3"
          style={{ width: 500 }}
        >
          <Form.Control
            value={carname}
            type="text"
            placeholder="BMW"
            onChange={(e) => {
              setCarName(e.target.value);
            }}
          />
        </FloatingLabel>

        <div
          className="fueltype"
          style={{ paddingLeft: 20, paddingBottom: 20 }}
        >
          <h6>Fuel Type</h6>
          <Form>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="92"
              inline
              onChange={() => {
                setFuelType("92");
              }}
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="95"
              inline
              onChange={() => {
                setFuelType("95");
              }}
              // defaultChecked
            />
          </Form>
        </div>

        <div className="cartype" style={{ paddingLeft: 20, paddingBottom: 20 }}>
          <h6>Car Type</h6>
          <Form>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="Sedan"
              inline
              onChange={() => {
                setCarType("Sedan");
              }}
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Hatchback"
              inline
              onChange={() => {
                setFuelType("Hatchback");
              }}
              // defaultChecked
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="Coupe"
              inline
              onChange={() => {
                setCarType("Coupe");
              }}
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="4X4"
              inline
              onChange={() => {
                setCarType("4X4");
              }}
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="Minivan"
              inline
              onChange={() => {
                setCarType("Minivan");
              }}
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="SUV"
              inline
              onChange={() => {
                setCarType("SUV");
              }}
            />
          </Form>
        </div>

        <div
          className="transmissiontype"
          style={{ paddingLeft: 20, paddingBottom: 20 }}
        >
          <h6>Transmission Type</h6>
          <Form>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="Manual"
              inline
              onChange={() => {
                setTransmissionType("Manual");
              }}
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Automatic"
              inline
              onChange={() => {
                setTransmissionType("Automatic");
              }}
              // defaultChecked
            />
          </Form>
        </div>

        <div className="cartype" style={{ paddingLeft: 20, paddingBottom: 20 }}>
          <h6>Car year</h6>
          {/* <input
            type="number"
            name="Car Year"
            onChange={(e) => {
              setCarYear(e.target.value);
            }}
          /> */}

          <select
            onChange={(e) => {
              setCarYear(e.target.value);
            }}
          >
            {years.map((year, index) => {
              return (
                <option key={`year${index}`} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <FloatingLabel
          controlId="floatingInput"
          label="Company Mark"
          className="mb-3"
        >
          <Form.Control
            value={companymark}
            type="text"
            placeholder="CompanyMark"
            onChange={(e) => {
              setCompanyMark(e.target.value);
            }}
          />
        </FloatingLabel>

        <Button
          variant="primary"
          onClick={() => {
            // console.log(userem);
            // console.log(userrec);
            handlesubmission(
              userem,
              carname,
              fueltype,
              cartype,
              transmissiontype,
              caryear,
              companymark
            );
          }}
        >
          Send
        </Button>

        {/* <div key={`default-radio`} className="mb-3">
          <h6>Fuel Type</h6>
          <Form.Check
            type="radio"
            id={`default-radio`}
            label={`default radio`}
          />
          <Form.Check
            type="radio"
            id={`default-radio`}
            label={`default radio`}
          />
        </div> */}
      </Form>
    </div>
  );
};

export default SendRequestCS;
