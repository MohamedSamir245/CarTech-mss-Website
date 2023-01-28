//React Components
import { useState, useEffect } from "react";
import Axios from "axios";

// Components
import AvailableServiceCenters from "./availableServiceCenters";

// Images
import InfoImage from "./infoImage";

// Styles
import "../../styles/serviceCenters.scss";

const Servicecenters = () => {


 

  const [sCenterslist, setSCentersList] = useState([
    {
      SC_ID: 0,
      CenterSite: "site",
      WorkingHours: 24,
      Name: "asdklfjl",
      Email: "safd",
      Rating: 3,
      Password: "12345",
    },
    {
      SC_ID: 1,
      CenterSite: "site2",
      WorkingHours: 14,
      Name: "asd222222jl",
      Email: "saf22222222d",
      Rating: 4,
      Password: "123452222222",
    },
  ]);

  const getSCentersList = () => {
    Axios.get("http://localhost:3001/getservicecenters").then((response) => {
      setSCentersList(response["data"]);
    });
  };

  useEffect(() => {
    getSCentersList();
  }, []);

 

  

  return (
    <div className="servicecenters">
      <InfoImage />
      <br />
      <br />

      <div className="servicecenterscontainer">
        <AvailableServiceCenters sCenterslist={sCenterslist} />
      </div>
      <br />
      
    </div>
  );
};

export default Servicecenters;
