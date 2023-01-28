import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useAuth } from "../context/authProvider";

const RequestCS = ({ Name, requestData, deleteCSRequest }) => {
  const auth = useAuth();

  const updateCSRequest = async (status) => {
    deleteCSRequest(requestData["Request_ID"]);

    await Axios.post("http://localhost:3001/admin/requests/updateCSRequest", {
      Status: status,
      Admin_ID: auth["ID"],
      Request_ID: requestData["Request_ID"],
    });

    console.log(requestData);

    if (status === "Accepted") {
      await Axios.post("http://localhost:3001/admin/addCar", {
        carName: requestData["carName"],
        liter: requestData["LiterPer100KM"],
        seats: requestData["Seats"],
        transmission: requestData["TransmissionType"],
        carType: requestData["CarType"],
        fuelType: requestData["FuelType"],
        year: requestData["carYear"],
        mark: requestData["CompanyMark"],
        speed: requestData["MaximumSpeed"],
      });
    }
  };

  return (
    <div style={{ marginTop: "2%" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {Object.keys(requestData).map((key) => {
            if (key !== "Request_ID" && key != "Name")
              return <ListGroup.Item>{requestData[key]}</ListGroup.Item>;
          })}
        </ListGroup>
        <Button
          variant="outline-primary"
          onClick={() => {
            updateCSRequest("Accepted");
          }}
        >
          Accept
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            updateCSRequest("Rejected");
          }}
        >
          Reject
        </Button>
      </Card>
    </div>
  );
};

export default RequestCS;
