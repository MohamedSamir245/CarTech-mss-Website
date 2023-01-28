import React from "react";
import Axios from "axios";
import { useState } from "react";
import "../../styles/signUp.scss";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function SignUpCustomer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [customersList, setCustomersList] = useState([]);

  function getCustomers() {
    Axios.get("http://localhost:3001/GetCustomers").then((response) => {
      setCustomersList(response.data);
    });
  }
  function al() {
    alert("You Have Registered Successfully");
  }
  function add() {
    if (
      email !== "" &&
      password !== "" &&
      password2 !== "" &&
      phoneNumber !== "" &&
      fname !== "" &&
      lname !== ""
    )
      if (checkBox) {
        if (password === password2) {
          getCustomers();
          let check = 1;
          for (let i = 0; i < customersList.length; i++) {
            if (
              email === customersList[i].Email ||
              phoneNumber === customersList[i].PhoneNumber
            ) {
              check = 0;
            }
          }
          if (check) {
            al();
            Axios.post("http://localhost:3001/AddCustomer", {
              phoneNumber: phoneNumber,
              email: email,
              password: password,
              fname: fname,
              lname: lname,
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
          <h2 className="text-uppercase text-center mb-5">Customer account</h2>
          <MDBInput
            wrapperClass="mb-4"
            label="First Name"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Last Name"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => {
              setLname(e.target.value);
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
            id="form3"
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

          <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I agree all statements in Terms of service"
              onChange={(e) => {
                setCheckBox(!checkBox);
                getCustomers();
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

export default SignUpCustomer;
