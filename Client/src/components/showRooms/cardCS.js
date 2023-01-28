import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardCS = ({ cardData }) => {
  const [image, setImage] = useState(
    "https://media.istockphoto.com/id/850625156/vector/the-building-of-a-car-showroom.jpg?s=612x612&w=0&k=20&c=T8_Jz5BG--cJDcAu_jRm303ybCjZYXUQ6csJOdjypeI="
  );
  const [info, setInfo] = useState({
    city: cardData.City,
    state: cardData.State,
    name: cardData.Name,
    email: cardData.Email,
    phoneNumber: cardData.PhoneNumber,
    reating: cardData.Rating,
    workingDays: cardData.WorkingDays,
    csId: cardData.CS_ID,
  });

  return (
    //style="width: 18rem;"
    <div className="card m-5 border-secondary" style={{ width: "20rem" }}>
      <img src={image} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">
          <span className="card-link">{info.name}</span>
        </h5>
        <p className="card-text"></p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Location: {info.city + " - " + info.state}
        </li>
        <li className="list-group-item">Email: {info.email}</li>
        <li className="list-group-item">Number: {info.phoneNumber}</li>
        <li className="list-group-item">Working Days: {info.workingDays}</li>
        <li className="list-group-item">Rating: {info.reating}</li>
      </ul>
      <div className="card-body text-center">
        <Link to={`/showroom/${info.name}`} state={{ id: info.csId }}>
          <span className="btn btn-primary">view page</span>
        </Link>
      </div>
    </div>
  );
};

export default CardCS;
