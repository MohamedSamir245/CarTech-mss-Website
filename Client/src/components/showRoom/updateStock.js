import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../styles/forum.scss";
import { TextField, Tabs, Tab } from "@mui/material";
import { useAuth, useUpdateAuth } from "../context/authProvider";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBCard,
  MDBInput,
  MDBCheckbox,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const UpdateStock = () => {
  const [stock, setStock] = useState(["0"]);
  const [carList, setCarList] = useState([]);

  const [carId, setCarId] = useState(0);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [warranty, setWarranty] = useState("");
  const [New, setNew] = useState(1);

  const auth = useAuth();
  const setAuth = useUpdateAuth();
  const location = useLocation();

  const getStock = () => {
    Axios.post("http://localhost:3001/get-showroom-stock", {
      ShowRoomID: location.state.id,
    }).then((response) => {
      console.log("Data", response.data);
      setStock(response.data);
    });
  };

  function getCars() {
    Axios.get("http://localhost:3001/GetAllVehicles", {}).then((response) => {
      //console.log("Data", response.data);
      setCarList(response.data);
    });
  }

  useEffect(() => {
    getStock();
    getCars();
    console.log(location.state.id);
  }, []);

  return (
    <div>
      <div>
        <select
          className="form-select"
          placeholder="ccc"
          name="condition"
          defaultValue="all"
          onChange={(e) => {
            setCarId(e.target.value);
            // console.log(location);
          }}
        >
          <option value="pp" disabled selected>
            Select Car...
          </option>
          {carList.map((item) => (
            <option key={item.V_ID} value={item.V_ID}>
              {item.CompanyMark + "," + item.CarName}
            </option>
          ))}
        </select>
        <br></br>
        <MDBInput
          wrapperClass="mb-4"
          label="Color"
          size="lg"
          id="form1"
          type="text"
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Price "
          size="lg"
          id="form1"
          type="number"
          min="1"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Quantity "
          size="lg"
          id="form1"
          type="number"
          min="1"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Warranty"
          size="lg"
          id="form1"
          type="text"
          onChange={(e) => {
            setWarranty(e.target.value);
          }}
        />
        <MDBCheckbox
          name="flexCheck"
          id="flexCheckDefault"
          label="Check if Used"
          onChange={(e) => {
            setNew(!New);
          }}
        />
        <MDBBtn
          className="mb-4 w-100 gradient-custom-4"
          size="lg"
          onClick={() => {
            if (
              carId !== 0 &&
              color !== "" &&
              price !== 0 &&
              quantity !== 0 &&
              warranty !== ""
            ) {
              Axios.post("http://localhost:3001/AddToStock", {
                V_ID: carId,
                CS_ID: location.state.id,
                isNew: New,
                Color: color,
                Price: price,
                Warranty: warranty,
                Quantity: quantity,
              }).then((response) => {
                getStock();
              });
            } else {
              alert("Please fill all boxes");
            }
          }}
        >
          Add to Stock
        </MDBBtn>
      </div>

      {stock.map((item, index) => {
        return (
          <MDBCard className="rounded-3 mb-4">
            <MDBCardBody className="p-4">
              <MDBRow className="justify-content-between align-items-center">
                <MDBCol md="3" lg="3" xl="3">
                  <p className="lead fw-normal mb-2">
                    {item.CompanyMark} {item.CarName}
                  </p>
                  <p>
                    <span className="text-muted">State: </span>
                    {item.isNew ? <span>new</span> : <span>used</span>}{" "}
                    <span className="text-muted">,Color: </span>
                    {item.Color}
                  </p>
                  <p>Show Room: {item.CS_Name}</p>
                </MDBCol>
                <MDBCol
                  md="3"
                  lg="3"
                  xl="2"
                  className="d-flex align-items-center justify-content-around"
                >
                  <MDBBtn
                    color="link"
                    className="px-2"
                    onClick={() => {
                      console.log(auth.ID);

                      setStock(
                        stock.filter((i, ind) => {
                          if (ind !== index) {
                            return i;
                          } else {
                            if (i["Quantity"] === 1) {
                              Axios.post(
                                "http://localhost:3001/DeleteItemFromStock",
                                {
                                  V_ID: item.V_ID,
                                  CS_ID: location.state.id,
                                  isNew: item.isNew,
                                  Color: item.Color,
                                  Warranty: item.Warranty,
                                }
                              ).then((response) => {});
                            } else {
                              i["Quantity"]--;
                              return i;
                            }
                          }
                        })
                      );
                      if (item.Quantity > -1) {
                        Axios.post(
                          "http://localhost:3001/UpdateItemFromStock",
                          {
                            quantity: item.Quantity,
                            V_ID: item.V_ID,
                            CS_ID: item.CS_ID,
                            isNew: item.isNew,
                            Color: item.Color,
                            Warranty: item.Warranty,
                          }
                        ).then((response) => {});
                      } else {
                        alert("Noooooooooo");
                      }
                    }}
                  >
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>
                  <h1 style={{ margin: "20%" }}> {item.Quantity}</h1>

                  <MDBBtn
                    color="link"
                    className="px-2"
                    onClick={() => {
                      setTimeout(() => {
                        if (true) {
                          setStock(
                            stock.filter((i, ind) => {
                              if (ind !== index) {
                                return i;
                              } else {
                                i["Quantity"]++;
                                return i;
                              }
                            })
                          );

                          Axios.post(
                            "http://localhost:3001/UpdateItemFromStock",
                            {
                              quantity: item.Quantity,
                              V_ID: item.V_ID,
                              CS_ID: item.CS_ID,
                              isNew: item.isNew,
                              Color: item.Color,
                              Warranty: item.Warranty,
                            }
                          ).then((response) => {});
                        }
                      }, 10);
                    }}
                  >
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                  <MDBTypography tag="h5" className="mb-0">
                    {item.Price}$
                  </MDBTypography>
                </MDBCol>
                <MDBCol md="1" lg="1" xl="1" className="text-end">
                  <MDBBtn
                    onClick={() => {
                      setStock(
                        stock.filter((i, ind) => {
                          if (ind !== index) {
                            return i;
                          } else {
                          }
                        })
                      );
                      Axios.post("http://localhost:3001/DeleteItemFromStock", {
                        V_ID: item.V_ID,
                        CS_ID: item.CS_ID,
                        isNew: item.isNew,
                        Color: item.Color,
                        Warranty: item.Warranty,
                      }).then((response) => {});
                    }}
                  >
                    <MDBIcon fas icon="trash text-danger" size="lg" />
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        );
      })}
    </div>
  );
};

export default UpdateStock;
