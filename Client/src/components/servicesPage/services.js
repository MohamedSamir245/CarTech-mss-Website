import { useState, useEffect } from "react";

// Components
import ServicesCarousel from "./servicesCarousel";
import AvailableServices from "./availableServices";
import Axios from "axios";

//Styles
import "../../styles/services.scss";

const Services = () => {
  const [servicesList, setServicesList] = useState([
    {
      Service_ID: 0,
      Name: "Change Engine Oil",
      Details: "Chnage your engine oil with any oil type.",
      Image: "../../images/engine-oil.png",
    },
    {
      Service_ID: 1,
      Name: "Change Tyres",
      Details: "Chnage your Tyres with best brands easily",
      Image: "../../images/Tire_Change.png",
    },
  ]);

  const getServicesList = () => {
    Axios.get("http://localhost:3001/getservices").then((response) => {
      setServicesList(response["data"]);
    });
  };

  useEffect(() => {
    getServicesList();
  }, []);

  return (
    <div className="servicesPage">
      {/* <Header user="mmm" /> */}
      {/* <hr /> */}
      <div className="carouselcontainer">
        <ServicesCarousel />
      </div>
      <br />
      <br />

      <div className="servicescontainer">
        <AvailableServices servicesList={servicesList} />
      </div>
      <br />
    </div>
  );
};

export default Services;
