import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Axios from "axios";

const AddCar = () => {
  const [carName, setCarName] = useState("");
  const [liter, setLiter] = useState("");
  const [seats, setSeats] = useState("");
  const [transmission, setTransmission] = useState("");
  const [carType, setCarType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [year, setYear] = useState("");
  const [mark, setMark] = useState("");
  const [speed, setSpeed] = useState("");

  const containsDigits = (string) => {
    return /\d/.test(string);
  };

  const isNumeric = (num) => {
    return /^-?\d+$/.test(num);
  };

  const [validForm, setValidForm] = useState(0b0);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Car Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Car Name"
            onChange={(e) => {
              setCarName(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("carname-invalid").style.display =
                  "none";
                setValidForm(validForm & 0b1111_1111_0);
              } else if (isNumeric(e.target.value)) {
                //Invalid
                document.getElementById("carname-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b1111_1111_0);
              } else {
                //Valid
                document.getElementById("carname-invalid").style.display =
                  "none";
                setValidForm(validForm | 0b0000_0000_1);
              }
            }}
          />
        </Form.Group>
        <div id="carname-invalid" style={{ display: "none", color: "red" }}>
          Invalid Username
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Liters Per 100KM</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the liters per 100KM"
            onChange={(e) => {
              setLiter(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("liters-invalid").style.display =
                  "none";
                setValidForm(validForm & 0b1111_1110_1);
              } else if (!isNumeric(e.target.value)) {
                //Invalid
                document.getElementById("liters-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b1111_1110_1);
              } else {
                //Valid
                document.getElementById("liters-invalid").style.display =
                  "none";
                setValidForm(validForm | 0b0000_0001_0);
              }
            }}
          />
        </Form.Group>
        <div id="liters-invalid" style={{ display: "none", color: "red" }}>
          Invalid liters per 100KM
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Seats</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the number of seats"
            onChange={(e) => {
              setSeats(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("seats-invalid").style.display = "none";
                setValidForm(validForm & 0b1111_1101_1);
              } else if (!isNumeric(e.target.value)) {
                //Invalid
                document.getElementById("seats-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b1111_1101_1);
              } else {
                //Valid
                document.getElementById("seats-invalid").style.display = "none";
                setValidForm(validForm | 0b0000_0010_0);
              }
            }}
          />
        </Form.Group>
        <div id="seats-invalid" style={{ display: "none", color: "red" }}>
          Invalid number of seats
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Transmission Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the transmission type"
            onChange={(e) => {
              setTransmission(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("transmission-invalid").style.display =
                  "none";
                setValidForm(validForm & 0b1111_1011_1);
              } else if (containsDigits(e.target.value)) {
                //Invalid
                document.getElementById("transmission-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b1111_1011_1);
              } else {
                //Valid
                document.getElementById("transmission-invalid").style.display =
                  "none";
                setValidForm(validForm | 0b0000_0100_0);
              }
            }}
          />
        </Form.Group>
        <div
          id="transmission-invalid"
          style={{ display: "none", color: "red" }}
        >
          Invalid Transmission Type
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Car Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the car type"
            onChange={(e) => {
              setCarType(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("cartype-invalid").style.display =
                  "none";
                setValidForm(validForm & 0b1111_0111_1);
              } else if (containsDigits(e.target.value)) {
                //Invalid
                document.getElementById("cartype-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b1111_0111_1);
              } else {
                //Valid
                document.getElementById("cartype-invalid").style.display =
                  "none";
                setValidForm(validForm | 0b0000_1000_0);
              }
            }}
          />
        </Form.Group>
        <div id="cartype-invalid" style={{ display: "none", color: "red" }}>
          Invalid Car Type
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the fuel type"
            onChange={(e) => {
              setFuelType(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("fueltype-invalid").style.display =
                  "none";
                setValidForm(validForm & 0b1110_1111_1);
              } else if (containsDigits(e.target.value)) {
                //Invalid
                document.getElementById("fueltype-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b1110_1111_1);
              } else {
                //Valid
                document.getElementById("fueltype-invalid").style.display =
                  "none";
                setValidForm(validForm | 0b0001_0000_0);
              }
            }}
          />
        </Form.Group>
        <div id="fueltype-invalid" style={{ display: "none", color: "red" }}>
          Invalid fuel type
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the year"
            onChange={(e) => {
              setYear(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("year-invalid").style.display = "none";
                setValidForm(validForm & 0b1101_1111_1);
              } else if (!isNumeric(e.target.value)) {
                //Invalid
                document.getElementById("year-invalid").style.display = "block";
                setValidForm(validForm & 0b1101_1111_1);
              } else {
                //Valid
                document.getElementById("year-invalid").style.display = "none";
                setValidForm(validForm | 0b0010_0000_0);
              }
            }}
          />
        </Form.Group>
        <div id="year-invalid" style={{ display: "none", color: "red" }}>
          Invalid year
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Company Mark</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the company mark"
            onChange={(e) => {
              setMark(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("mark-invalid").style.display = "none";
                setValidForm(validForm & 0b1011_1111_1);
              } else if (containsDigits(e.target.value)) {
                //Invalid
                document.getElementById("mark-invalid").style.display = "block";
                setValidForm(validForm & 0b1011_1111_1);
              } else {
                //Valid
                document.getElementById("mark-invalid").style.display = "none";
                setValidForm(validForm | 0b0100_0000_0);
              }
            }}
          />
        </Form.Group>
        <div id="mark-invalid" style={{ display: "none", color: "red" }}>
          Invalid company mark
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Maximum Speed</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the maximum speed"
            onChange={(e) => {
              setSpeed(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("speed-invalid").style.display = "none";
                setValidForm(validForm & 0b0111_1111_1);
              } else if (!isNumeric(e.target.value)) {
                //Invalid
                document.getElementById("speed-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b0111_1111_1);
              } else {
                //Valid
                document.getElementById("speed-invalid").style.display = "none";
                setValidForm(validForm | 0b1000_0000_0);
              }
            }}
          />
        </Form.Group>
        <div id="speed-invalid" style={{ display: "none", color: "red" }}>
          Invalid Maximum Speed
        </div>

        <Button
          variant="primary"
          disabled={validForm !== 0b1111_1111_1}
          onClick={(e) => {
            e.preventDefault();
            Axios.post("http://localhost:3001/admin/addCar", {
              carName: carName,
              liter: liter,
              seats: seats,
              transmission: transmission,
              carType: carType,
              fuelType: fuelType,
              year: year,
              mark: mark,
              speed: speed,
            }).then((res) => {
              window.location.reload();
            });
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddCar;
