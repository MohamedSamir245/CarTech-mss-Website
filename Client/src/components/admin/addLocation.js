import { useState, useEffect } from "react";
import Axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddLocation = () => {
  const [cities, setCities] = useState([{}]);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [chosenCity, setChosenCity] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/admin/location/getLocations").then(
      (res) => {
        console.log(res.data);
        setCities(res.data);
      }
    );
  }, [setCities]);

  const addLocation = async () => {
    if (newState !== "") {
      if (selectedRadio === 1 && newCity !== "") {
        await Axios.post("http://localhost:3001/admin/location/addCity", {
          city: newCity,
        });
      }

      if (
        (selectedRadio === 0 && chosenCity !== "") ||
        (selectedRadio === 1 && newCity !== "")
      ) {
        await Axios.post("http://localhost:3001/admin/location/addState", {
          city: selectedRadio === 0 ? chosenCity : newCity,
          state: newState,
        });
      }
    }
    window.location.reload();
  };

  return (
    <div>
      <Form>
        {/* <div key={`default-radio`} className="mb-3"> */}
        <Form.Check
          type="radio"
          id={`default-radio`}
          label="Choose City"
          style={{ width: "20%" }}
          onClick={() => {
            setSelectedRadio(0);
          }}
          checked={selectedRadio === 0}
        />
        <Dropdown style={{ width: "30%" }}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            disabled={selectedRadio !== 0}
          >
            {chosenCity.length === 0 ? "Choose a City" : chosenCity}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {cities.map((city) => {
              return (
                <Dropdown.Item
                  key={city["City"]}
                  onClick={() => {
                    setChosenCity(city["City"]);
                  }}
                >
                  {city["City"]}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Check
          type="radio"
          label={`Add State`}
          id={`default-radio`}
          onClick={() => {
            setSelectedRadio(1);
          }}
          checked={selectedRadio === 1}
        />
        <Form.Label style={{ color: "black" }}>New City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the New City"
          style={{ width: "40%" }}
          disabled={selectedRadio === 0}
          value={newCity}
          onChange={(e) => {
            setNewCity(e.target.value);
          }}
        />

        <Form.Label style={{ color: "black", marginTop: "5%" }}>
          New State
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the New State"
          style={{ width: "40%" }}
          value={newState}
          onChange={(e) => {
            setNewState(e.target.value);
          }}
          required
        />
        <Button variant="primary" onClick={addLocation}>
          Add Location
        </Button>
      </Form>
    </div>
  );
};

export default AddLocation;
