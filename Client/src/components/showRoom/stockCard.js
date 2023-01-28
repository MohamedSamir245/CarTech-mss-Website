import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authProvider";
import Axios from "axios";

const StockCard = ({ cardData }) => {
  const [info, setInfo] = useState({
    mark: cardData.CompanyMark,
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
    //style="width: 18rem;"
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

export default StockCard;
