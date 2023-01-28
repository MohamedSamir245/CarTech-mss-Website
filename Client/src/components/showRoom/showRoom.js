// React Components
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Components
import Axios from "axios";
import StockCard from "./stockCard";

const ShowRoom = () => {
  // get id
  const location = useLocation();
  const [id, setId] = useState(location.state.id);

  const [coveImg, setCoverImg] = useState(
    "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/1p1022060.jpg?itok=WjKMcucq"
  );

  const [info, setInfo] = useState({
    State: "Test state",
    City: "Test city",
    name: "Test name",
    email: "Test@CS.com",
    phoneNumber: "01pppppppppp",
    rating: 2,
    workingDays: 2,
  });

  const [stock, setStock] = useState([
    {
      V_ID: 12,
      CS_ID: 12,
      isNew: 1,
      Color: "red",
      Price: 45213,
      Warranty: "5 Years",
      Img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg?tr=w-375",
      CarName: "C200",
      CompanyMark: "Kia",
    },
    {
      V_ID: 13,
      CS_ID: 12,
      isNew: 1,
      Color: "white",
      Price: 45213,
      Warranty: "5 Years",
      Img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg?tr=w-375",
      CarName: "Model s",
      CompanyMark: "Tesla",
    },
  ]);

  const getInfo = () => {
    Axios.post("http://localhost:3001/get-showroom-info", {
      showRoomID: id,
    }).then((res) => {
      console.log("Data", res.data);
      setInfo({
        state: res.data["state"],
        city: res.data["city"],
        name: res.data["name"],
        email: res.data["email"],
        phoneNumber: res.data["phoneNumber"],
        rating: res.data["rating"],
        workingDays: res.data["workingDays"],
      });
    });
  };

  const getStock = () => {
    Axios.post("http://localhost:3001/get-showroom-stock", {
      ShowRoomID: id,
    }).then((response) => {
      console.log("Data", response.data);
      setStock(response["data"]);
    });
  };

  useEffect(() => {
    getInfo();
    getStock();
  }, []);

  return (
    <div className="m-3">
      <div>
        <div className="mb-3">
          <h2>{info.name}</h2>
        </div>
        <img
          src={coveImg}
          alt="ShowRoom Cover"
          className="img-fluid rounded mx-auto d-block"
        />
        <div className="info">
          <div>Our Location: {info.state + " - " + info.city}</div>
          <div>Contact us: {info.email}</div>
          <div>Call Us: {info.phoneNumber}</div>
          <div>Users Rating: {info.rating}</div>
          <div>Working Days: {info.workingDays}</div>
        </div>
        <hr />
        <div className="market">
          <h3>Our Market</h3>
          {stock.map((car) => (
            <StockCard key={car.V_ID} cardData={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowRoom;
