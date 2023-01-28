import { Link } from "react-router-dom";
import "../../styles/signUp.scss";
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBDropdownMenu,
} from "mdb-react-ui-kit";

function SignUp() {
  const isNumeric = (num) => {
    return /^-?\d+$/.test(num);
  };
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
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <h3 className="h3">Select Your Account Type</h3>
          <br></br>
          <Link to="/SignUpCustomer">
            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
              Customer
            </MDBBtn>
          </Link>
          <br></br>
          <Link to="/SignUpCarShowroom">
            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
              Car Showroom
            </MDBBtn>
          </Link>
          <br></br>
          <Link to="/SignUpServiceCenter">
            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
              Service Center
            </MDBBtn>
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
