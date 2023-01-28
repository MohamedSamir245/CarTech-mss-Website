import { useState, useEffect } from "react";
import Axios from "axios";
import Recommendation from "./recommendation";
import ListGroup from "react-bootstrap/ListGroup";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([{}]);

  useEffect(() => {
    const GetRecommendations = async () => {
      await Axios.post("http://localhost:3001/admin/recommendations").then(
        (res) => {
          console.log(res.data);
          setRecommendations(res.data);
        }
      );
    };

    GetRecommendations();
  }, [setRecommendations]);

  const deleteRecommendation = (ID) => {
    console.log(ID);
    setRecommendations(
      recommendations.filter((recmdt) => {
        console.log(recmdt["Recommendation_ID"]);
        return recmdt["Recommendation_ID"] !== ID;
      })
    );
  };

  return (
    <div>
      <ListGroup className="align-items-center">
        {recommendations.map((recmdt) => {
          return (
            <ListGroup.Item key={recmdt["Recommendation_ID"]}>
              <Recommendation
                userName={"kiro"}
                date={recmdt["Date"]}
                recommendation={recmdt["Recommendation"]}
                Recommendation_ID={recmdt["Recommendation_ID"]}
                deleteRecommendation={deleteRecommendation}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Recommendations;
