import Axios from "axios";
import { useState, useEffect } from "react";
import RequestCS from "./CSRequest";
import RequestSC from "./SCRequest";

const Requests = () => {
  const [CSRequest, setCSRequest] = useState([]);
  const [SCRequest, setSCRequest] = useState([]);

  const deleteSCRequest = (ID) => {
    setSCRequest(
      SCRequest.filter((request) => {
        return request["Request_ID"] !== ID;
      })
    );
  };

  const deleteCSRequest = (ID) => {
    setCSRequest(
      CSRequest.filter((request) => {
        return request["Request_ID"] !== ID;
      })
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/admin/requests/getCSRequests").then(
      (res) => {
        setCSRequest(res.data);
      }
    );

    Axios.get("http://localhost:3001/admin/requests/getSCRequests").then(
      (res) => {
        setSCRequest(res.data);
      }
    );
  }, []);

  return (
    <div style={{ width: "30%", margin: "0 auto", position: "relative" }}>
      {CSRequest.length > 0 ? <h1>Car ShowRooms Requests</h1> : []}
      {CSRequest.map((request) => {
        return (
          <RequestCS
            Name={request["Name"]}
            requestData={request}
            deleteCSRequest={deleteCSRequest}
          />
        );
      })}
      {SCRequest.length > 0 ? <h1>Service Centers Requests</h1> : []}
      {SCRequest.map((request) => {
        return (
          <RequestSC
            Name={request["Name"]}
            requestData={request}
            deleteSCRequest={deleteSCRequest}
          />
        );
      })}
    </div>
  );
};

export default Requests;
