import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/authProvider";
import Axios from "axios";

const Card = ({ cardData }) => {
  const [info, setInfo] = useState({
    mark: cardData.CompanyMark,
    showroom: cardData.CS_Name,
    model: cardData.CarName,
    id: cardData.V_ID,
    csId: cardData.CS_ID,
    condition: cardData.isNew,
    color: cardData.Color,
    price: cardData.Price,
    warranty: cardData.Warranty,
  });

  const auth = useAuth();

  const addToCart = () => {
    if (auth.ID !== undefined) {
      console.log("Add To Cart called");
      Axios.post("http://localhost:3001/add-car-to-cart", {
        userId: auth.ID,
        carInfo: info,
      }).then((res) => {
        console.log("Data", res.data);
        alert(res.data);
      });
    }
  };

  const getCondition = (condition) => {
    if (condition) return "New";
    else return "Used";
  };

  return (
    <div className="card m-5 border-secondary" style={{ width: "20rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          <span className="card-link">
            <Link
              to={`/vehicle/${info.mark + " " + info.model}`}
              state={{ id: info.id }}
            >
              {info.mark + " " + info.model}
            </Link>
          </span>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <span className="card-link">
            <Link to={`/showroom/${info.showroom}`} state={{ id: info.csId }}>
              {info.showroom}
            </Link>
          </span>
        </h6>
        <p className="card-text"></p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Price: {info.price} EGP</li>
        <li className="list-group-item">Color: {info.color}</li>
        <li className="list-group-item">
          Condition: {getCondition(info.condition)}
        </li>
        <li className="list-group-item">Warranty: {info.warranty}</li>
      </ul>
      <div
        className="card-body text-center btn btn-primary"
        onClick={addToCart}
      >
        Add to Cart
      </div>
    </div>
  );
};

export default Card;
