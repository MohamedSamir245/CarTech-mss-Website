//Components
import Carousel from "react-bootstrap/Carousel";

// Images
import RepairCar from "../../images/CarRepair.jpg";
import PaintCar from "../../images/painting.jpg";
import ChangeOil from "../../images/CarOil.jpg";

// Styles
import "../../styles/servicesCarousel.scss";

const servicesCarousel = () => {
  return (
    <div
      className="sevicesCarousel"
      style={{
        margin: "auto",
        marginTop: 4,
      }}
    >
      <Carousel
        interval={4000}
        fade
        style={{ display: "flex" }}
        className="carousel"
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={RepairCar}
            alt="Repairng a Car"
            style={{ height: 490, borderRadius: 7 }}
          />
          <Carousel.Caption>
            <h3
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Repair Your Car
            </h3>
            <p style={{ color: "#fff" }}>
              You can find many service centeres where you can fix your car.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={PaintCar}
            alt="Painting a Car"
            style={{ height: 490, borderRadius: 7 }}
          />
          <Carousel.Caption>
            <h3 style={{ color: "#fff", fontWeight: "bold" }}>
              Paint Your Car
            </h3>
            {/* <p style={{ color: "#fff" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={ChangeOil}
            alt="Changing Oil"
            style={{ height: 490, borderRadius: 7 }}
          />
          <Carousel.Caption>
            <h3 style={{ color: "#fff", fontWeight: "bold" }}>Change Oil</h3>
            {/* <p style={{ color: "#fff" }}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default servicesCarousel;
