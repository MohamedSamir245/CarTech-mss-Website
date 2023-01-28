import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Axios from "axios";

const AddService = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  const [validForm, setValidForm] = useState(0);

  const containsDigits = (string) => {
    return /\d/.test(string);
  };

  const isNumeric = (num) => {
    return /^-?\d+$/.test(num);
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Form.Group className="mb-3">
        <Form.Label>Service Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the service name"
          onChange={(e) => {
            setName(e.target.value);

            if (e.target.value.length === 0) {
              document.getElementById("name-invalid").style.display = "none";
              setValidForm(validForm & 0b101);
            } else if (isNumeric(e.target.value)) {
              //Invalid
              document.getElementById("name-invalid").style.display = "block";
              setValidForm(validForm & 0b101);
            } else {
              //Valid
              document.getElementById("name-invalid").style.display = "none";
              setValidForm(validForm | 0b010);
            }
          }}
        />
      </Form.Group>
      <div id="name-invalid" style={{ display: "none", color: "red" }}>
        Invalid Service Name
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Service Details</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the service details"
          onChange={(e) => {
            setDetails(e.target.value);

            if (e.target.value.length === 0) {
              document.getElementById("details-invalid").style.display = "none";
              setValidForm(validForm & 0b011);
            } else if (isNumeric(e.target.value)) {
              //Invalid
              document.getElementById("details-invalid").style.display =
                "block";
              setValidForm(validForm & 0b011);
            } else {
              //Valid
              document.getElementById("details-invalid").style.display = "none";
              setValidForm(validForm | 0b100);
            }
          }}
        />
      </Form.Group>
      <div id="details-invalid" style={{ display: "none", color: "red" }}>
        Invalid Maximum Speed
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Service Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the Image URL"
            onChange={(e) => {
              setImage(e.target.value);

              if (e.target.value.length === 0) {
                document.getElementById("image-invalid").style.display = "none";
                setValidForm(validForm & 0b110);
              } else if (isNumeric(e.target.value)) {
                //Invalid
                document.getElementById("image-invalid").style.display =
                  "block";
                setValidForm(validForm & 0b110);
              } else {
                //Valid
                document.getElementById("image-invalid").style.display = "none";
                setValidForm(validForm | 0b001);
              }
            }}
          />
        </Form.Group>
        <div id="image-invalid" style={{ display: "none", color: "red" }}>
          Invalid Image URL
        </div>

        <Button
          variant="primary"
          disabled={validForm !== 0b111}
          onClick={(e) => {
            e.preventDefault();
            Axios.post("http://localhost:3001/admin/addService", {
              details: details,
              image: image,
              name: name,
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

export default AddService;
