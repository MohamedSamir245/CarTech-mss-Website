import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useAuth } from "../context/authProvider";

const RequestSC = ({ Name, requestData, deleteSCRequest }) => {
  delete requestData["Name"];
  console.log(requestData["Image"]);

  const auth = useAuth();

  const updateSCRequest = async (status) => {
    deleteSCRequest(requestData["Request_ID"]);
    await Axios.post("http://localhost:3001/admin/requests/updateSCRequest", {
      Status: status,
      Admin_ID: auth["ID"],
      Request_ID: requestData["Request_ID"],
    });

    if (status === "Accepted") {
      await Axios.post("http://localhost:3001/admin/addService", {
        name: requestData["ServiceName"],
        image: requestData["Image"],
        details: requestData["Details"],
      });
    }
  };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
          <Card.Img src={requestData["Image"]}></Card.Img>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {Object.keys(requestData).map((key) => {
            if (key !== "Image" && key != "Request_ID")
              return <ListGroup.Item>{requestData[key]}</ListGroup.Item>;
          })}
        </ListGroup>
        <Button
          variant="outline-primary"
          onClick={() => {
            updateSCRequest("Accepted");
          }}
        >
          Accept
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            updateSCRequest("Rejected");
          }}
        >
          Reject
        </Button>
      </Card>
    </div>
  );
};

export default RequestSC;
