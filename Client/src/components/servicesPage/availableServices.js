// import EngineOil from "../../images/engine-oil.png";
// import testimg from"../../images/test-test-test.png"
import { Link } from "react-router-dom";

// Components
import Button from "react-bootstrap/Button";

// Styles
import "../../styles/availableServices.scss";

const AvailableServices = ({ servicesList }) => {
  return (
    <div className="availableservices">
      <h1 style={{ fontWeight: "bold", marginLeft: 50 }}>Available Services</h1>
      <hr
        style={{
          width: 400,
          marginLeft: 50,
          borderWidth: 2,
          borderColor: "gray",
        }}
      />
      <br />
      {servicesList.map((ele) => (
        <div className="serviceCard" key={ele.Service_ID}>
          <div
            className="card flex-row flex-wrap"
            style={{
              marginLeft: 50,
              marginRight: 50,
              background: "transparent",
            }}
          >
            <div className="card-header border-0">
              <img src={ele.Image} alt="" style={{ width: 150, height: 150 }} />
            </div>
            <div className="card-block px-2">
                <h3
                  className="card-title"
                  style={{
                    paddingTop: 30,
                    paddingLeft: 10,
                    fontWeight: "bold",
                    marginBottom: 0,
                    color: "#d01463",
                  }}
                >
                  {ele.Name}
                </h3>
              <p className="card-text" style={{ paddingLeft: 15 }}>
                {ele.Details}
              </p>
              <Button
                style={{ width: 200 }}
              >
                <Link
                  to={`/service/${ele.Name}`}
                  state={{ id: ele.Service_ID }}
                >
                  <span style={{color:'white'}}>Find Service Centers</span>
                </Link>
              </Button>
            </div>

          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AvailableServices;
