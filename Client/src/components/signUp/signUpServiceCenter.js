import React from "react";
import "../../styles/signUp.scss";
import { useState, useEffect } from "react";
import Axios from "axios";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function SignUpServiceCenter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [location, setLocation] = useState("");
  const [workingHours, setWorkingHours] = useState(0);
  const [serviceCentersList, setServiceCentersList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);

  function getServiceCenters() {
    Axios.get("http://localhost:3001/GetServiceCenters").then((response) => {
      setServiceCentersList(response.data);
      // console.log(usersList);
      //console.log(usersList);
    });
  }

  function getLocations() {
    Axios.get("http://localhost:3001/GetLocations").then((response) => {
      setLocationsList(response.data);
    });
  }

  useEffect(() => {
    getLocations();
  }, []);

  function add() {
    //console.log({ email, password });
    // console.log(Number("123") + 1);
    if (
      email !== "" &&
      password !== "" &&
      password2 !== "" &&
      phoneNumber !== "" &&
      name !== "" &&
      location !== 0 &&
      workingHours !== 0
    )
      if (checkBox) {
        if (password === password2) {
          getServiceCenters();
          let check = 1;
          for (let i = 0; i < serviceCentersList.length; i++) {
            if (
              email === serviceCentersList[i].Email ||
              phoneNumber === serviceCentersList[i].PhoneNumber
            ) {
              check = 0;
            }
          }
          if (check) {
            Axios.post("http://localhost:3001/AddServiceCenter", {
              phoneNumber: phoneNumber,
              email: email,
              password: password,
              name: name,
              location: location,
              workingHours: workingHours,
            }).then(() => {
              console.log("succes");
            });
          } else {
            alert("This User Already Exists");
          }
        } else {
          alert("the password dont match");
        }
      } else {
        alert("Please accept terms and conditions!!!!!!");
      }
    else {
      alert("Please fill all the boxes");
    }
  }

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/premium-photo/generic-brandless-modern-sport-car_110488-1758.jpg?w=2000)",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">
            Service Center account
          </h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Name"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            size="lg"
            id="form2"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Phone Number"
            size="lg"
            id="form2"
            type="text"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form3"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Repeat your password"
            size="lg"
            id="form4"
            type="password"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Working Hours "
            size="lg"
            id="form1"
            type="number"
            min="0"
            onChange={(e) => {
              setWorkingHours(e.target.value);
            }}
          />
          <div className="comboBoxDiv">
            <select
              className="form-select"
              placeholder="ccc"
              name="condition"
              defaultValue="all"
              onChange={(e) => {
                setLocation(e.target.value);
                console.log(location);
              }}
            >
              <option value="pp" disabled selected>
                Select Location...
              </option>
              {locationsList.map((item) => (
                <option key={item.State} value={item.State}>
                  {item.City + "," + item.State}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I agree all statements in Terms of service"
              onChange={(e) => {
                setCheckBox(!checkBox);
                getServiceCenters();
              }}
            />
          </div>
          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={() => {
              add();
            }}
          >
            Register
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUpServiceCenter;
