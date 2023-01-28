//React Components
import Nav from "react-bootstrap/Nav";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Axios from "axios";
import { useState } from "react";
// import Modal from "react-bootstrap/Modal";

//Components
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth, useUpdateAuth } from "./context/authProvider";

//Images
import logo from "../images/Logo.png";
import { AiOutlineSearch } from "react-icons/ai";

//Styles
import "../styles/header.scss";

const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const updateAuth = useUpdateAuth();

  const logOut = () => {
    localStorage.clear();
    updateAuth([]);
    navigate("/");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const current = new Date();
  const [date, setDate] = useState();

  const updatedate = () => {
    setDate(
      `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
    );
  };

  const [userem, setUserEm] = useState("");
  const [userrec, setUserRec] = useState("");

  const handleMakingRecommendation = (userEmail, recommendationtxt, date) => {
    let usid = -1;
    Axios.post("http://localhost:3001/getuseridfromemail", {
      uemail: userEmail,
    }).then((res) => {
      usid = res["data"]["uid"];

      if (usid === -1) {
        setUserEm("");
        document.getElementById("not-registered").style.display = "block";

        setTimeout(() => {
          document.getElementById("not-registered").style.display = "none";
        }, 3000);
        // console.log("wrong email");

        return;
      }
      Axios.post("http://localhost:3001/sendrecommendation", {
        recommendation: recommendationtxt,
        userid: usid,
        date: date,
      }).then(() => {
        console.log("success");
      });
    });
  };

  return (
    <header className="header">
      <div className="topArea">
        <div className="logo">
          <Link title="Find what your car needs" to="/">
            <img src={logo} alt="Car Tech Logo" width={165} height={170} />
          </Link>
        </div>
        <div className="searchArea">
          <input type="text" placeholder="Search Cars" />
          <button className="searchbtn" type="submit">
            <AiOutlineSearch className="searchlogo" />
          </button>
        </div>
        {Object.keys(auth).length === 0 ? (
          <div className="login">
            <span
              className="username"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
            <span
              className="username"
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              Sign Up
            </span>
          </div>
        ) : (
          <div className="login">
            {/* <span className="username">{auth["email"][0]}</span> */}
            <span
              className="username"
              id="user-char"
              onClick={() => {
                navigate(`${auth["userType"]}/profile`);
              }}
            >
              {auth["FName"].length !== 0 && auth["FName"][0].toUpperCase()}
              {auth["LName"].length !== 0 && auth["LName"][0].toUpperCase()}
            </span>
            <span className="username" onClick={logOut}>
              Log Out
            </span>
          </div>
        )}
      </div>
      <div className="bottomArea">
        <nav className="navbar">
          {(() => {
            // console.log(auth["userType"]);
            switch (auth["userType"]) {
              case "Customer":
                return (
                  <div className="navbarlinks">
                    <Link to="/Vehicles">Cars Market</Link>
                    <Link to="/ShowRooms">Car Showrooms</Link>
                    <Link to="/servicecenters">Service Centers</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/Forum">Forum</Link>
                    <Link
                      to="/Cart"
                      state={{
                        userID: auth.ID,
                      }}
                    >
                      Cart
                    </Link>
                    <Link
                      to="/MyOrders"
                      state={{
                        userID: auth.ID,
                      }}
                    >
                      My Orders
                    </Link>

                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="More"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item
                          className="navdropitem"
                          onClick={handleShow}
                        >
                          <span style={{ color: "white" }}>
                            {" "}
                            Send Recommendation{" "}
                          </span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </div>
                );
              case "Admin":
                return (
                  <div className="navbarlinks">
                    <Link to="/admin/requests">Requests</Link>
                    <Link to="/admin/recommendations">Recommendations</Link>
                    <Link to="/admin/locations">Change Locations</Link>
                    <Link to="/Forum">Forum</Link>
                    <Link to="/admin/addCar">Add Car</Link>
                    <Link to="/admin/addService">Add Service</Link>
                    <Link to="/admin/addAdmin">Add Admin</Link>
                  </div>
                );
              case "ServiceCenter":
                return (
                  <div className="navbarlinks">
                    <Link to="/Vehicles">Cars Market</Link>
                    <Link to="/ShowRooms">Car Showrooms</Link>
                    <Link to="/servicecenters">Service Centers</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/Forum">Forum</Link>
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="More"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item
                          className="navdropitem"
                          onClick={() => {
                            updatedate();
                            handleShow();
                          }}
                        >
                          <span style={{ color: "white" }}>
                            Send Recommendation{" "}
                          </span>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="navdropitem"
                          // onClick={handleShowModal}
                          href="/sendrequestsc"
                        >
                          <span style={{ color: "white" }}> Send Request </span>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navdropitem">
                          <Link
                            to={`/servicecenter/getorders/${auth["FName"]}`}
                            state={{ id: auth["ID"] }}
                            style={{ padding: 0 }}
                          >
                            <span style={{ color: "white" }}>
                              Get My Center's Orders
                            </span>
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navdropitem">
                          <Link
                            to={`/servicecenter/addservice/${auth["FName"]}`}
                            state={{ id: auth["ID"] }}
                            style={{ padding: 0 }}
                          >
                            <span style={{ color: "white" }}>Add Service</span>
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navdropitem">
                          <Link
                            to={`/servicecenter/${auth["FName"]}`}
                            state={{ id: auth["ID"] }}
                            style={{ padding: 0 }}
                          >
                            <span style={{ color: "white" }}>
                              Show My Services{console.log(auth)}
                            </span>
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </div>
                );
              case "CarShowroom":
                return (
                  // change here what and add only what you need to appear to showrooms

                  <div className="navbarlinks">
                    <Link to="/Vehicles">Cars Market</Link>
                    <Link to="/ShowRooms">Car Showrooms</Link>
                    <Link to="/servicecenters">Service Centers</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/Forum">Forum</Link>
                    <Link to="/UpdateStock" state={{ id: auth.ID }}>
                      UpdateStock
                    </Link>
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="More"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item
                          className="navdropitem"
                          onClick={handleShow}
                        >
                          <span style={{ color: "white" }}>
                            {" "}
                            Send Recommendation{" "}
                          </span>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="navdropitem"
                          href="/sendrequestcs"
                        >
                          <span style={{ color: "white" }}> Send Request </span>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navdropitem">
                          <span style={{ color: "white" }}>
                            {" "}
                            <Link
                              to="/showShowroomOrders"
                              state={{ id: auth.ID }}
                            >
                              {" "}
                              Show The Orders{" "}
                            </Link>
                          </span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </div>
                );
              default:
                return (
                  <div className="navbarlinks">
                    <Link to="/Vehicles">Cars Market</Link>
                    <Link to="/ShowRooms">Car Showrooms</Link>
                    <Link to="/servicecenters">Service Centers</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/Forum">Forum</Link>

                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="More"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item
                          className="navdropitem"
                          onClick={handleShow}
                        >
                          <span style={{ color: "white" }}>
                            {" "}
                            Send Recommendation{" "}
                          </span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </div>
                );
            }
          })()}
        </nav>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              Send a Recommendation to the Admins
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <input
                  type="email"
                  style={{ width: 365 }}
                  value={userem}
                  placeholder="Enter email"
                  onChange={(e) => {
                    setUserEm(e.target.value);
                  }}
                />

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                  <div
                    className="alert alert-danger"
                    role="alert"
                    id="not-registered"
                    style={{ marginTop: "3%", height: "10%" }}
                  >
                    This email is not registered!
                  </div>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Recommendation</Form.Label>
                <br />
                <input
                  type="text"
                  style={{ width: 365 }}
                  value={userrec}
                  placeholder="your recommendation"
                  onChange={(e) => {
                    setUserRec(e.target.value);
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => {
                  handleMakingRecommendation(userem, userrec, date);
                }}
              >
                Send
              </Button>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </header>
  );
};

export default Header;
