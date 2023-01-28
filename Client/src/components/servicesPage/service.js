// React Components
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Components
import Axios from "axios";
import AvailableServiceCenters from "../serviceCenters/availableServiceCenters";

import "../../styles/services.scss";


const Service = () => {
  // get id
  const location = useLocation();
    const [id, setId] = useState(location.state.id);
    
    const [sCenterslist, setSCentersList] = useState([]);

    const getServiceCenters = () => {
        Axios.post("http://localhost:3001/getservicecentersfromsid", {
          Service_ID: id,
        }).then((res) => {
          // console.log(res["data"][0])
          setSCentersList(res["data"]);
        });
    }

     useEffect(() => {
       getServiceCenters();
     }, []);

  return (
    <div className="service">
      {/* <p onClick={()=>{console.log(sCenterslist);}}>tfffffffs</p>
       */}
      <AvailableServiceCenters sCenterslist={sCenterslist} />
    </div>
  );
};

export default Service;
