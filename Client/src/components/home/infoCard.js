import Card from "react-bootstrap/Card";

function InfoCard({ title, info, image }) {
  return (
    <Card
      style={{
        width: "18rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{info}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
