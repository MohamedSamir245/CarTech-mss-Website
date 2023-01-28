//React Components
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

// Components
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

// Images
import testimg from "../../images/test-test-test.png";
import "../../styles/serviceCenters.scss";

const AvailableServiceCenters = ({ sCenterslist }) => {
  const [rating, setRating] = useState(0); // initial rating value
  const [hover, setHover] = useState(0);

  const [otherLocations, setOtherLocations] = useState([{}]);

  const handleFindOtherLocations = (sid) => {
    var exsist = 0;
    Axios.post("http://localhost:3001/getLocationsfromSID", {
      SC_ID: sid,
    }).then((res) => {
      exsist = res["data"]["exsist"];
      console.log(exsist);
      if (exsist === 0) {
        setOtherLocations(null);
        return;
      } else {
        const l = res["data"];
        // console.log(l['data'])
        setOtherLocations(l["data"]);
      }
    });
  };
  return (
    <div className="availableservicecenters">
      <h1 style={{ fontWeight: "bold", marginLeft: 50 }}>
        Available Maintenance Centers In Egypt
      </h1>
      <hr
        style={{
          width: 400,
          marginLeft: 50,
          borderWidth: 2,
          borderColor: "gray",
        }}
      />
      <br />
      {sCenterslist.map((ele) => (
        <div className="serviceCard" key={ele.SC_ID}>
          <div
            className="card flex-row flex-wrap"
            style={{
              marginLeft: 50,
              marginRight: 50,
              background: "transparent",
            }}
          >
            <div className="card-header border-0">
              <img src={testimg} alt="" style={{ width: 200, height: 200 }} />
            </div>
            <div className="card-block px-2">
              <Link to={`/servicecenter/${ele.Name}`} state={{ id: ele.SC_ID }}>
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
              </Link>
              <p
                className="card-text"
                style={{ paddingLeft: 15, marginBottom: 0 }}
              >
                {ele.CenterSite}
              </p>

              {["bottom"].map((placement) => (
                <OverlayTrigger
                  trigger="hover"
                  key={"bottom"}
                  placement={"right"}
                  overlay={
                    <Popover id={`popover-positioned-${placement}`}>
                      <Popover.Header as="h3">{`Other Locations`}</Popover.Header>
                      <Popover.Body style={{ paddingTop: 0 }}>
                        {otherLocations.map((elem) => (
                          <div>{`${elem["state"]}, ${elem["city"]}`}</div>
                        ))}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <p
                    className="otherlocations"
                    style={{ paddingLeft: 15, marginBottom: 0 }}
                    onMouseEnter={() => {
                      handleFindOtherLocations(ele.SC_ID);
                    }}
                  >
                    Show Other Locations
                  </p>
                </OverlayTrigger>
              ))}

              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= (hover || rating) ? "on" : "off"}
                      onClick={() => {
                        setRating(index);
                      }}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                      id={ele.SC_ID}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>

              {/* <Button
                variant="secondary"
                style={{ margin: 0, height: 60, marginTop: 10 }}
                onClick={() => {
                  console.log(rating);
                }}
              >
                Rate
              </Button> */}
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AvailableServiceCenters;
