import CardCS from "./cardCS";
import Axios from "axios";
import { useState, useEffect } from "react";

const ShowRooms = () => {
  const [showRoomsList, setShowRoomsList] = useState([
    {
      CS_ID: 91,
      State: "Test state",
      City: "Test city",
      Name: "Test name",
      Email: "Test@CS.com",
      PhoneNumber: "01pppppppppp",
      Rating: 2,
      WorkingDays: 2,
    },
  ]);

  const [locations, setLocations] = useState([
    { L_ID: 91, City: "Cairo", State: "dist. 1" },
    { L_ID: 92, City: "Alex", State: "dist. 2" },
  ]);

  const [rates, setRates] = useState([0, 1, 2, 3, 4, 5]);

  const [form, setForm] = useState({
    lID: "all",
    rating: 0,
  });

  function getLocations() {
    Axios.get("http://localhost:3001/GetLocations").then((response) => {
      setLocations(response.data);
    });
  }

  const getShowRooms = () => {
    Axios.post("http://localhost:3001/get-showrooms", { form: form }).then(
      (response) => {
        setShowRoomsList(response.data);
      }
    );
  };

  const handleSubmit = (e) => {
    console.log("submit called");
    e.preventDefault();
    e.preventDefault();
    console.log(form);
    getShowRooms();
  };

  useEffect(() => {
    getLocations();
    getShowRooms();
  }, []);

  // useEffect(() => {
  //   getShowRooms();
  // }, [form]);

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <div className="searchform">
            <h3>Search Showrooms</h3>
            <form action="#" method="get" onSubmit={handleSubmit}>
              {/*************************************************************************/}
              {/******************************  Locations  ******************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">Location</label>
                <select
                  className="form-select"
                  name="lId"
                  onChange={(e) => {
                    setForm({ ...form, lID: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {locations.map((place) => (
                    <option key={place.L_ID} value={place.L_ID}>
                      {place.City + " , " + place.State}
                    </option>
                  ))}
                </select>
              </div>
              {/*************************************************************************/}
              {/******************************  Rating  *********************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">Rating (above or equal)</label>
                <select
                  className="form-select"
                  name="rating"
                  onChange={(e) => {
                    setForm({ ...form, rating: e.target.value });
                  }}
                  defaultValue={0}
                >
                  {rates.map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="softright">
                <br />
                <button className="btn btn-secondary btn-lg">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col">
          <ul className="cards">
            {showRoomsList.map((card) => (
              <CardCS key={card.CS_ID} cardData={card} />
            ))}
          </ul>
        </div>
      </div>
      <br className="clear" />
    </div>
  );
};

export default ShowRooms;
