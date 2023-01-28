import Form from "react-bootstrap/Form";
import { useState } from "react";
import SignUp from "../signUp/signUp";
import Button from "react-bootstrap/Button";
import Axios from "axios";

const AddAdmin = () => {
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validForm, setValidForm] = useState(0);

  const isNumeric = (num) => {
    return /^-?\d+$/.test(num);
  };

  const containsDigits = (string) => {
    return /\d/.test(string);
  };

  const addAdmin = () => {
    Axios.post("http://localhost:3001/admin/addAdmin", {
      FName: FName,
      LName: LName,
      email: email,
      number: number,
      password: password,
    }).then((res) => {
      document.getElementById("msg-admin").innerHTML = res["data"]["msg"];
      if (res["data"]["status"] === 1) {
        document.getElementById("msg-admin").style.color = "green";
        setFName("");
        setLName("");
        setEmail("");
        setNumber("");
        setPassword("");
        setConfirmPassword("");
        setValidForm(0);
      } else if (res["data"]["status"] === 0) {
        document.getElementById("msg-admin").style.color = "red";
        setEmail("");
        setValidForm(validForm & 0b111_011);
      }
    });
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={FName}
            placeholder="First Name"
            onChange={(e) => {
              setFName(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b111_110);
                document.getElementById("fname-admin-invalid").style.display =
                  "none";
              } else if (isNumeric(e.target.value)) {
                // Invalid
                document.getElementById("fname-admin-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b111_110);
              } else {
                //Valid
                setValidForm(validForm | 0b000_001);
                document.getElementById("fname-admin-invalid").style.display =
                  "none";
              }
            }}
          />
        </Form.Group>
        <div id="fname-admin-invalid" style={{ display: "none", color: "red" }}>
          This is not a valid First Name
        </div>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={LName}
            placeholder="Last Name"
            onChange={(e) => {
              setLName(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b111_101);
                document.getElementById("lname-admin-invalid").style.display =
                  "none";
              } else if (isNumeric(e.target.value)) {
                // Invalid
                document.getElementById("lname-admin-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b111_101);
              } else {
                //Valid
                setValidForm(validForm | 0b000_010);
                document.getElementById("lname-admin-invalid").style.display =
                  "none";
              }
            }}
          />
        </Form.Group>
        <div id="lname-admin-invalid" style={{ display: "none", color: "red" }}>
          This is not a valid Last Name
        </div>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b111_011);
                document.getElementById("email-admin-invalid").style.display =
                  "none";
              } else if (isNumeric(e.target.value)) {
                // Invalid
                document.getElementById("email-admin-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b111_011);
              } else {
                //Valid
                setValidForm(validForm | 0b000_100);
                document.getElementById("email-admin-invalid").style.display =
                  "none";
              }
            }}
          />
        </Form.Group>
        <div id="email-admin-invalid" style={{ display: "none", color: "red" }}>
          This is not a valid Email
        </div>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={number}
            placeholder="Phone Number"
            onChange={(e) => {
              setNumber(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b110_111);
                document.getElementById("number-admin-invalid").style.display =
                  "none";
              } else if (!isNumeric(e.target.value)) {
                // Invalid
                document.getElementById("number-admin-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b110_111);
              } else {
                //Valid
                setValidForm(validForm | 0b001_000);
                document.getElementById("number-admin-invalid").style.display =
                  "none";
              }
            }}
          />
        </Form.Group>
        <div
          id="number-admin-invalid"
          style={{ display: "none", color: "red" }}
        >
          This is not a valid Phone Number
        </div>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b101_111);
                document.getElementById(
                  "password-admin-invalid"
                ).style.display = "none";
              } else if (e.target.value.length < 8) {
                // Invalid
                document.getElementById(
                  "password-admin-invalid"
                ).style.display = "block";
                setValidForm(validForm & 0b101_111);
              } else {
                //Valid
                setValidForm(validForm | 0b010_000);
                document.getElementById(
                  "password-admin-invalid"
                ).style.display = "none";
              }
            }}
          />
        </Form.Group>
        <div
          id="password-admin-invalid"
          style={{ display: "none", color: "red" }}
        >
          The password must be more than 8 characters
        </div>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={confirmPassword}
            placeholder="Repeat the password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b011_111);
                document.getElementById("confirm-admin-invalid").style.display =
                  "none";
              } else if (e.target.value != password) {
                // Invalid
                document.getElementById("confirm-admin-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b011_111);
              } else {
                //Valid
                setValidForm(validForm | 0b100_000);
                document.getElementById("confirm-admin-invalid").style.display =
                  "none";
              }
            }}
          />
        </Form.Group>
        <div
          id="confirm-admin-invalid"
          style={{ display: "none", color: "red" }}
        >
          This is not the same as the password
        </div>

        <Button
          variant="primary"
          disabled={validForm !== 0b111_111}
          onClick={(e) => {
            e.preventDefault();
            addAdmin();
          }}
        >
          Add Admin
        </Button>
        <div id="msg-admin"></div>
      </Form>
    </div>
  );
};

export default AddAdmin;
