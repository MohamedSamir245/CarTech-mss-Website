// React Components
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Components
import Axios from "axios";

const Vechile = () => {
  // get id
  const location = useLocation();
  const [vId, setVId] = useState(location.state.id);

  // const [carModel, setCarModel] = useState(
  //   "NOT FOUND IN DB >>> Hyundai Accent RB 2023 A/T / TINTED GLASS" // TODO:fetch carModel /Not found in DB
  // );

  const [imgName, setImgName] = useState("front-left-side-47.jpg");

  const [specs, setSpecs] = useState({
    carName: "Accent",
    horsePower: 125,
    engineCapacity: 1600,
    originCountry: "Korea",
    literPer100KM: 10,
    seats: 4,
    transmissionType: "Manual",
    carType: "???????????????????",
    numberOfCylinders: 6,
    fuelTankCapacity: 50,
    torqueOfNewton: 40,
    fuelType: "fuel",
    addition: "??????????????????",
    rating: 5,
    year: 2020,
    companyMark: "Hyundai",
    speeds: 5,
    maximumSpeed: 185,
    groundClearance: 127,
    tractionType: "Front Traction",
    acceleration: 12.1,
    width: 15345,
    length: 4370,
    height: 451,
  });

  const label = [
    "Model",
    "Liter Per 100KM",
    "Seats",
    "Transmission Type",
    "Car Type",
    "Fuel Type",
    "Rating",
    "Year",
    "Company Mark",
    "Maximum Speed",
  ];

  const getSpecs = () => {
    Axios.post("http://localhost:3001/get-vehicle-info", { vId: vId }).then(
      (res) => {
        console.log("Data", res.data);
        setSpecs(res.data);
        // setSpecs({
        //   carName: res.data["carName"],
        //   horsePower: res.data["horsePower"],
        //   engineCapacity: res.data["engineCapacity"],
        //   originCountry: res.data["originCountry"],
        //   literPer100KM: res.data["literPer100KM"],
        //   seats: res.data["seats"],
        //   transmissionType: res.data["transmissionType"],
        //   carType: res.data["carType"],
        //   numberOfCylinders: res.data["numberOfCylinders"],
        //   fuelTankCapacity: res.data["fuelTankCapacity"],
        //   torqueOfNewton: res.data["torqueOfNewton"],
        //   fuelType: res.data["fuelType"],
        //   addition: res.data["addition"],
        //   rating: res.data["rating"],
        //   year: res.data["year"],
        //   companyMark: res.data["companyMark"],
        //   speeds: res.data["speeds"],
        //   maximumSpeed: res.data["maximumSpeed"],
        //   groundClearance: res.data["groundClearance"],
        //   tractionType: res.data["tractionType"],
        //   acceleration: res.data["acceleration"],
        //   width: res.data["width"],
        //   length: res.data["length"],
        //   height: res.data["height"],
        // });
      }
    );
  };

  useEffect(() => {
    getSpecs();
  }, []);

  return (
    <div className="m-3">
      <div>
        <div className="mb-3">
          <h2>
            {specs["CompanyMark"] +
              " " +
              specs["CarName"] +
              " " +
              specs["Year"]}
          </h2>
        </div>
        <img
          src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg?tr=w-375"
          alt="Car"
          className="img-fluid rounded mx-auto d-block"
        />
        {/* <button
          className="btn btn-primary btn-lg"
        >
          Check Offers
        </button> */}
      </div>
      <table className="table p-2 table-striped table-hover table-bordered">
        <tbody>
          {Object.values(specs).map((spec, index) => {
            console.log(spec);
            return (
              <tr>
                <th>{label[index]}</th>
                <td>{spec}</td>
              </tr>
            );
          })}
          {/* <tr>
            <th>Model</th>
            <td>{specs.carName}</td>
          </tr>
          <tr>
            <th>Horse Power</th>
            <td>{specs.horsePower}</td>
          </tr>
          <tr>
            <th>Engine Capacity</th>
            <td>{specs.engineCapacity} cc</td>
          </tr>
          <tr>
            <th>Origin Country</th>
            <td>{specs.originCountry}</td>
          </tr>
          <tr>
            <th>Liter Per 100KM</th>
            <td>{specs.literPer100KM}</td>
          </tr>
          <tr>
            <th>Seats</th>
            <td>{specs.seats}</td>
          </tr>
          <tr>
            <th>Transmission Type</th>
            <td>{specs.transmissionType}</td>
          </tr>
          <tr>
            <th>Car Type</th>
            <td>{specs.carType}</td>
          </tr>
          <tr>
            <th>Number Of Cylinders</th>
            <td>{specs.numberOfCylinders}</td>
          </tr>
          <tr>
            <th>Fuel Tank Capacity</th>
            <td>{specs.fuelTankCapacity}</td>
          </tr>
          <tr>
            <th>Torque Of Newton</th>
            <td>{specs.torqueOfNewton}</td>
          </tr>
          <tr>
            <th>Fuel Type</th>
            <td>{specs.fuelType}</td>
          </tr>
          <tr>
            <th>Addition</th>
            <td>{specs.addition}</td>
          </tr>
          <tr>
            <th>Rating</th>
            <td>{specs.rating}</td>
          </tr>
          <tr>
            <th>Year</th>
            <td>{specs.year}</td>
          </tr>
          <tr>
            <th>Company Mark</th>
            <td>{specs.companyMark}</td>
          </tr>
          <tr>
            <th>Speeds</th>
            <td>{specs.speeds}</td>
          </tr>
          <tr>
            <th>Maximum Speed</th>
            <td>{specs.maximumSpeed}</td>
          </tr>
          <tr>
            <th>Ground Clearance</th>
            <td>{specs.groundClearance}</td>
          </tr>
          <tr>
            <th>Traction Type</th>
            <td>{specs.tractionType}</td>
          </tr>
          <tr>
            <th>Acceleration</th>
            <td>{specs.acceleration}</td>
          </tr>
          <tr>
            <th>Width</th>
            <td>{specs.width}</td>
          </tr>
          <tr>
            <th>Length</th>
            <td>{specs.length}</td>
          </tr>
          <tr>
            <th>Height</th>
            <td>{specs.height}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Vechile;
