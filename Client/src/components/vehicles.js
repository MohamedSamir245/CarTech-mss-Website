// import "./Vechiles.css";

// React Components
import React, { useState, useEffect } from "react";

// Components
import Card from "./card";
import Axios from "axios";

const Vechiles = () => {
  const [form, setForm] = useState({
    // Stock filters
    condition: "all",
    color: "all",
    maxPrice: "",
    warranty: "all",
    // Vehicles filters
    mark: "all",
    tractionType: "all",
    year: "all",
  });

  const [colors, setColors] = useState([
    { color: "red" },
    { color: "green" },
    { color: "black" },
    { color: "white" },
  ]);
  const [marks, setMarks] = useState([
    { CompanyMark: "BMW" },
    { CompanyMark: "Tesla" },
    { CompanyMark: "Kia" },
    { CompanyMark: "Fiat" },
  ]);

  const [warranties, setWarranties] = useState([
    { Warranty: "2 Years" },
    { Warranty: "5 Years" },
    { Warranty: "8 Years" },
  ]);
  const [models, setModels] = useState([
    { caeName: "C200" },
    { carName: "C300" },
    { carName: "C400" },
  ]);

  const [allCars, setAllCars] = useState([
    {
      V_ID: 12,
      CS_ID: 12,
      isNew: 1,
      Color: "red",
      Price: 45213,
      Warranty: "5 Years",
      ImgUrl:
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg?tr=w-375",
      CarName: "C200",
      CompanyMark: "Kia",
      CS_Name: "ALNASR",
    },
  ]);

  const handleSubmit = (e) => {
    console.log("submit called");
    e.preventDefault();
    e.preventDefault();
    console.log(form);
    getCars();
  };

  const getCars = () => {
    console.log("inside getCars");
    Axios.post("http://localhost:3001/get-vehicles", { form: form }).then(
      (response) => {
        setAllCars(response["data"]);
      }
    );
  };

  const getColors = () => {
    Axios.get("http://localhost:3001/get-colors").then((response) => {
      setColors(response["data"]);
    });
  };

  const getMarks = () => {
    Axios.get("http://localhost:3001/get-marks").then((response) => {
      setMarks(response["data"]);
    });
  };

  const getModels = () => {
    Axios.get("http://localhost:3001/get-models").then((response) => {
      setModels(response["data"]);
    });
  };

  const getWarranties = () => {
    Axios.get("http://localhost:3001/get-warranties").then((response) => {
      setWarranties(response["data"]);
    });
  };

  // const getTractionTypes = () => {
  //   Axios.get("http://localhost:3001/get-traction-types").then((response) => {
  //     setTractionTypes(response["data"]);
  //   });
  // };

  function yearsOptions() {
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    let items = [];
    for (let i = currYear; i >= 1886; i--) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  }

  useEffect(() => {
    getColors();
    getMarks();
    getWarranties();
    getCars();
    getModels();
  });

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <div className="searchform ">
            <h3>Search Vehicles</h3>
            <form action="#" method="get" onSubmit={handleSubmit}>
              {/*************************************************************************************/}
              {/*************************************  Max Price  ***********************************/}
              {/*************************************************************************************/}
              <br />

              <div>
                <label htmlFor="">Max Price</label>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name="maxPrice"
                    placeholder="---"
                    defaultValue=""
                    onChange={(e) => {
                      setForm({ ...form, maxPrice: e.target.value });
                    }}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">EGP</span>
                  </div>
                </div>
              </div>
              {/*************************************************************************/}
              {/***************************  Color  *************************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">Color</label>
                <select
                  className="form-select"
                  name="color"
                  onChange={(e) => {
                    setForm({ ...form, color: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {colors.map((color) => (
                    <option key={color.color} value={color.color}>
                      {color.color}
                    </option>
                  ))}
                </select>
              </div>
              {/*************************************************************************/}
              {/***************************  Condition  *********************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">New / Used</label>
                <select
                  className="form-select"
                  name="condition"
                  onChange={(e) => {
                    setForm({ ...form, condition: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>
              {/*************************************************************************/}
              {/***************************  Warranty  **********************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">Warranty</label>
                <select
                  className="form-select"
                  name="warranty"
                  onChange={(e) => {
                    setForm({ ...form, warranty: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {warranties.map((warranty) => (
                    <option key={warranty.Warranty} value={warranty.Warranty}>
                      {warranty.Warranty}
                    </option>
                  ))}
                </select>
              </div>

              <hr />
              {/*************************************************************************/}
              {/***************************  Company Mark  ******************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">Company Mark</label>
                <select
                  className="form-select"
                  name="mark"
                  id=""
                  onChange={(e) => {
                    setForm({ ...form, mark: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {marks.map((mark) => (
                    <option key={mark.CompanyMark} value={mark.CompanyMark}>
                      {mark.CompanyMark}
                    </option>
                  ))}
                </select>
              </div>

              {/*************************************************************************/}
              {/***************************  Car Model   ********************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">CAr Model</label>
                <select
                  className="form-select"
                  name="model"
                  id=""
                  onChange={(e) => {
                    setForm({ ...form, model: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {models.map((model) => (
                    <option key={model.carName} value={model.carName}>
                      {model.carName}
                    </option>
                  ))}
                </select>
              </div>
              {/*************************************************************************/}
              {/***************************  Traction Type  *****************************/}
              {/*************************************************************************/}
              {/* <div>
                <label htmlFor="">Traction Type</label>
                <select
                  className="form-select"
                  name="tractionType"
                  id=""
                  onChange={(e) => {
                    setForm({ ...form, tractionType: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {tractionTypes.map((tractionType) => (
                    <option
                      key={tractionType.TractionType}
                      value={tractionType.TractionType}
                    >
                      {tractionType.TractionType}
                    </option>
                  ))}
                </select>
              </div> */}
              {/*************************************************************************/}
              {/******************************  Year  ***********************************/}
              {/*************************************************************************/}
              <div>
                <label htmlFor="">Year</label>
                <select
                  className="form-select"
                  name="year"
                  id=""
                  onChange={(e) => {
                    setForm({ ...form, year: e.target.value });
                  }}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {yearsOptions()}
                </select>
              </div>
              {/**********************************************************************************/}
              {/******************************  Maximum Speed  ***********************************/}
              {/**********************************************************************************/}
              {/* <br />
              <div>
                <label htmlFor="">Max Speed</label>
                <input
                  type="number"
                  name="maxSpeed"
                  defaultValue={"All"}
                  onChange={(e) => {
                    setForm({ ...form, maxSpeed: e.target.value });
                  }}
                />
              </div> */}
              {/**********************************************************************************/}
              {/*************************************  Speeds  ***********************************/}
              {/**********************************************************************************/}
              {/* <br />
              <div>
                <label htmlFor="">Speeds</label>
                <input
                  type="number"
                  name="speeds"
                  defaultValue={"All"}
                  onChange={(e) => {
                    setForm({ ...form, speeds: e.target.value });
                  }}
                />
              </div> */}

              {/*************************************************************************************/}
              {/*************************************  Submit Button  *******************************/}
              {/*************************************************************************************/}
              <div className="softright">
                <br />
                <button className="btn btn-secondary btn-lg">Search</button>
              </div>
              {/************************************************************************************************************/}
              {/*************************************  FORM END  ***********************************************************/}
              {/************************************************************************************************************/}
            </form>
          </div>
        </div>
        <div className="col">
          <ul className="cards">
            {allCars.map((car) => (
              <Card key={car.V_ID} cardData={car} />
            ))}
          </ul>
        </div>
      </div>

      <br className="clear" />
    </div>
  );
};

export default Vechiles;
