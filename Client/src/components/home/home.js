//Compenets
import InfoCard from "./infoCard";

//Images
import car from "../../images/home1.png";

// import ServicesImage from "../../images/Services.jpg";
import painting from "../../images/painting.jpg";
import CarRepair from "../../images/CarRepair.jpg";
import CarOil from "../../images/CarOil.jpg";
import CarTire from "../../images/CarTire.jpg";
import NewCar from "../../images/newCar.png";
import CarBattery from "../../images/CarBattery.jpg";
import CarBreak from "../../images/CarBreak.jpg";

//Style Sheets
import "../../styles/home.scss";

const Home = () => {
  const Services = [
    [
      "Painting",
      "With our easy and affordable auto paint packages, there's no better time to get your car looking like new again.",
      painting,
    ],
    [
      "Car Maintenance",
      "Authorized and non authorized maintenance centers in Egypt for all brands and models including phone numbers and addresses.",
      CarRepair,
    ],
    [
      "New Tires",
      "The service provides a value-for-money car tire replacement service, to help our customers to get new car tires and replace their old one.",
      CarTire,
    ],
    [
      "Change Oil",
      "Our certified technicians offer you full oil service that includes free inspection, motor oil change, and oil filter replacement.",
      CarOil,
    ],
    [
      "Change Battery",
      "Our mobile mechanics will replace your car battery with maximum convenience, as fast as possible.",
      CarBattery,
    ],
    [
      "Car Break",
      "Our Service Centers will inspect or replace brake pads or shoes, plus resurface rotors as needed.",
      CarBreak,
    ],
  ];

  return (
    <div className="home">
      <div className="container">
        <img src={car} alt="car" className="carimage" />
        <div className="textblock">
          <h2 className="imagetext">Buy New and Used Cars</h2>
        </div>
      </div>
      <div style={{ alignContent: "center" }}>
        <div className="CardDiv">
          <InfoCard
            title={"New Cars"}
            info={
              "Explore new cars prices, specifications and photos in Egypt 2022. Find out sales showrooms and authorized service centers."
            }
          />
          <InfoCard
            title={"Car Repair"}
            info={
              "We provide full-mobilized car workshop services at the chosen time and location, with experienced technicians, high-quality tools, and competitive prices."
            }
          />
        </div>
      </div>

      <div className="container">
        <div id="homeimage1">
          <img src={NewCar} alt="washingCar" style={{ width: "50%" }} />
        </div>
        <div className="textblock">
          <h2 className="imagetext">Buy New Cars</h2>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <h2>Get Complex Services</h2>
      </div>

      <div style={{ alignContent: "center" }}>
        <div className="CardDiv">
          {Services.map((Service, i) => {
            return (
              <InfoCard
                key={i}
                title={Service[0]}
                info={Service[1]}
                image={Service[2]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
