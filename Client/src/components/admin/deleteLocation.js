import { useState, useEffect } from "react";
import Axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { flushSync } from "react-dom";

const DeleteLocation = () => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesWithStates, setCitiesWithStates] = useState([]);
  const [chosenCity, setChosenCity] = useState("");
  const [chosenState, setChosenState] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/admin/location/getLocations").then(
      (res) => {
        setCities(res.data);
      }
    );

    Axios.get("http://localhost:3001/admin/location/getCitiesWithStates").then(
      (res) => setCitiesWithStates(res.data)
    );
  }, []);

  const deleteState = async () => {
    await Axios.post("http://localhost:3001/admin/location/deleteState", {
      state: chosenState,
    }).then((res) => {
      console.log(res);
    });
  };

  const deleteCity = async () => {
    await Axios.post("http://localhost:3001/admin/location/deleteCity", {
      city: chosenCity,
    });
  };

  return (
    <div>
      <Form>
        {/* <div key={`default-radio`} className="mb-3"> */}
        <Form.Check
          type="radio"
          id={`default-radio`}
          label="Delete City"
          style={{ width: "20%" }}
          onClick={() => {
            setSelectedRadio(0);
            setChosenCity("");
            setChosenState("");
          }}
          checked={selectedRadio === 0}
        />
        <Dropdown style={{ width: "30%" }}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            disabled={selectedRadio !== 0}
          >
            {chosenCity.length === 0 || selectedRadio === 1
              ? "Choose a City"
              : chosenCity}
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

        {/*/////////////////////////////////////////*/}

        <Form.Check
          type="radio"
          label={`Delete State`}
          id={`default-radio`}
          onClick={() => {
            setSelectedRadio(1);
            setChosenCity("");
          }}
          checked={selectedRadio === 1}
        />
        <Dropdown style={{ width: "30%" }}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-city"
            disabled={selectedRadio !== 1}
          >
            {chosenCity.length === 0 || selectedRadio === 0
              ? "Choose a City"
              : chosenCity}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {citiesWithStates.map((city) => {
              return (
                <Dropdown.Item
                  key={city["City"]}
                  onClick={async () => {
                    flushSync(() => {
                      setChosenCity(city["City"]);
                    });

                    console.log(
                      document.getElementById("dropdown-city").innerHTML
                    );

                    await Axios.post(
                      "http://localhost:3001/admin/location/getStates",
                      {
                        city: document.getElementById("dropdown-city")
                          .innerHTML,
                      }
                    ).then((res) => {
                      console.log(res);
                      if (res.data.length !== 0) setStates(res.data);
                    });
                  }}
                >
                  {city["City"]}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        {/*/////////////////////////////////////////*/}

        <Dropdown style={{ width: "30%" }}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            disabled={selectedRadio !== 1 || chosenCity.length === 0}
          >
            {chosenState.length === 0 || selectedRadio === 0
              ? "Choose a State"
              : chosenState}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {states.map((state) => {
              return (
                <Dropdown.Item
                  key={state["State"]}
                  onClick={() => {
                    setChosenState(state["State"]);
                  }}
                >
                  {state["State"]}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          variant="primary"
          onClick={() => {
            if (selectedRadio === 0) deleteCity();
            else deleteState();

            window.location.reload();
          }}
          disabled={
            !(
              (selectedRadio === 0 && chosenCity.length !== 0) ||
              (selectedRadio === 1 &&
                chosenCity.length !== 0 &&
                chosenState.length !== 0)
            )
          }
        >
          Delete Location
        </Button>
      </Form>
    </div>
  );
};

export default DeleteLocation;
