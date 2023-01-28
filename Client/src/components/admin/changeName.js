import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth, useUpdateAuth } from "../context/authProvider";
import Axios from "axios";

const ChangeName = ({ userType }) => {
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [validForm, setValidForm] = useState("");

  const auth = useAuth();
  const setAuth = useUpdateAuth();

  const changeName = async () => {
    await Axios.post("http://localhost:3001/changeName", {
      ID: auth["ID"],
      FName: FName,
      LName: LName,
      userType: userType,
    }).then((res) => {
      document.getElementById("success-msg").innerHTML = res["data"];
      setAuth({ ...auth, FName: FName, LName: LName });
      localStorage.setItem("FName", FName);
      localStorage.setItem("LName", LName);
      setFName("");
      setLName("");
      setValidForm(0);
    });
  };

  const isNumeric = (num) => {
    return /^-?\d+$/.test(num);
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={FName}
            placeholder="Enter the new first name"
            onChange={(e) => {
              setFName(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b10);
                document.getElementById("fname-invalid").style.display = "none";
              } else if (isNumeric(e.target.value)) {
                // Invalid
                document.getElementById("fname-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b10);
              } else {
                //Valid
                setValidForm(validForm | 0b01);
                document.getElementById("fname-invalid").style.display = "none";
              }
            }}
          />
        </Form.Group>
        <div id="fname-invalid" style={{ display: "none", color: "red" }}>
          This is not a valid First Name
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={LName}
            placeholder="Enter the new Last Name"
            onChange={(e) => {
              setLName(e.target.value);

              if (e.target.value.length === 0) {
                setValidForm(validForm & 0b01);
                document.getElementById("lname-invalid").style.display = "none";
              } else if (isNumeric(e.target.value)) {
                // Invalid
                document.getElementById("lname-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b01);
              } else {
                //Valid
                setValidForm(validForm | 0b10);
                document.getElementById("lname-invalid").style.display = "none";
              }
            }}
          />
        </Form.Group>
        <div id="lname-invalid" style={{ display: "none", color: "red" }}>
          This is not a valid Last Name
        </div>

        <Button
          variant="primary"
          disabled={validForm !== 0b11}
          onClick={(e) => {
            e.preventDefault();
            changeName();
          }}
        >
          Change Name
        </Button>
        <div id="success-msg" style={{ color: "green" }}></div>
      </Form>
    </div>
  );
};

export default ChangeName;
