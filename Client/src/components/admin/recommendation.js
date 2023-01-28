import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import { useAuth } from "../context/authProvider";

const Recommendation = ({
  userName,
  recommendation,
  date,
  Recommendation_ID,
  deleteRecommendation,
}) => {
  const auth = useAuth();

  const updateRecommendation = async (status) => {
    await Axios.post("http://localhost:3001/admin/update-recommendation", {
      Status: status,
      Admin_ID: auth["ID"],
      Recommendation_ID: Recommendation_ID,
    }).then((res) => {
      console.log(res);
      deleteRecommendation(Recommendation_ID);
    });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>{userName}</Card.Header>
      <Card.Body>
        <Card.Text dir="rtl" className="text-center">
          {recommendation}
        </Card.Text>
        <div className="h-20">
          <Button
            variant="success"
            size="w-10"
            onClick={() => {
              updateRecommendation("Accepted");
            }}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              updateRecommendation("Rejected");
            }}
          >
            Reject
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Recommendation;
