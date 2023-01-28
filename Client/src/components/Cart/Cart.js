import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../styles/forum.scss";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Cart() {
  const navigate = useNavigate();
  const [date, setDate] = useState("ll");

  const location = useLocation();
  const [productList, setProductList] = useState(["0"]);
  const [checktList, setCheckList] = useState([]);

  function getTime() {
    var today = new Date(),
      datee =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    setDate(datee);
  }

  function applyCart() {
    GetCartById();
    console.log(productList);
    setCheckList([]);
    if (productList.length !== 0) {
      for (let i = 0; i < productList.length; i++) {
        Axios.post("http://localhost:3001/GetQuantityOfCarFromStock", {
          V_ID: productList[i].V_ID,
          CS_ID: productList[i].CS_ID,
          isNew: productList[i].isNew,
          Color: productList[i].Color,
          Warranty: productList[i].Warranty,
        }).then((response) => {
          console.log(response.data);

          if (response.data.length === 0) {
            checktList.push(i);
          } else {
            if (
              parseInt(response.data[0].Quantity) <
              parseInt(productList[i].Quantity)
            ) {
              checktList.push(i);
            }
          }
        });
      }
      setTimeout(() => {
        if (checktList.length === 0) {
          Axios.post("http://localhost:3001/AddNewOrder", {
            id: location.state.userID,
            date: date,
          }).then((response) => {
            for (let i = 0; i < productList.length; i++) {
              Axios.post("http://localhost:3001/AddOrderItem", {
                id: response.data[0].OrderNumber,
                V_ID: productList[i].V_ID,
                CS_ID: productList[i].CS_ID,
                isNew: productList[i].isNew,
                Color: productList[i].Color,
                Price: productList[i].Quantity * productList[i].Price,
                Warranty: productList[i].Warranty,
                Quantity: productList[i].Quantity,
                csName: productList[i].CS_Name,
              }).then((response) => {});
              Axios.post("http://localhost:3001/DeleteCartItem", {
                V_ID: productList[i].V_ID,
                CS_ID: productList[i].CS_ID,
                isNew: productList[i].isNew,
                Color: productList[i].Color,
                Warranty: productList[i].Warranty,
              }).then((response) => {});
              Axios.post("http://localhost:3001/GetQuantityOfCarFromStock", {
                V_ID: productList[i].V_ID,
                CS_ID: productList[i].CS_ID,
                isNew: productList[i].isNew,
                Color: productList[i].Color,
                Warranty: productList[i].Warranty,
              }).then((response) => {
                //console.log(response.data);
                if (
                  parseInt(response.data[0].Quantity) ===
                  parseInt(productList[i].Quantity)
                ) {
                  Axios.post("http://localhost:3001/DeleteItemFromStock", {
                    V_ID: productList[i].V_ID,
                    CS_ID: productList[i].CS_ID,
                    isNew: productList[i].isNew,
                    Color: productList[i].Color,
                    Warranty: productList[i].Warranty,
                  }).then((response) => {});
                } else {
                  Axios.post("http://localhost:3001/UpdateItemFromStock", {
                    quantity:
                      response.data[0].Quantity - productList[i].Quantity,
                    V_ID: productList[i].V_ID,
                    CS_ID: productList[i].CS_ID,
                    isNew: productList[i].isNew,
                    Color: productList[i].Color,
                    Warranty: productList[i].Warranty,
                  }).then((response) => {});
                }
              });
            }
          });
          setProductList([]);
          alert("Cart Applied");
        } else {
          for (let i = 0; i < checktList.length; i++) {
            Axios.post("http://localhost:3001/GetQuantityOfCarFromStock", {
              V_ID: productList[checktList[i]].V_ID,
              CS_ID: productList[checktList[i]].CS_ID,
              isNew: productList[checktList[i]].isNew,
              Color: productList[checktList[i]].Color,
              Warranty: productList[checktList[i]].Warranty,
            }).then((response) => {
              if (response.data.length > 0) {
                productList[checktList[i]].Quantity = response.data[0].Quantity;
                Axios.post("http://localhost:3001/UpdateCartItem", {
                  quantity: productList[checktList[i]].Quantity,
                  V_ID: productList[checktList[i]].V_ID,
                  CS_ID: productList[checktList[i]].CS_ID,
                  isNew: productList[checktList[i]].isNew,
                  Color: productList[checktList[i]].Color,
                  Warranty: productList[checktList[i]].Warranty,
                }).then((response) => {});
              } else {
                Axios.post("http://localhost:3001/DeleteCartItem", {
                  V_ID: productList[checktList[i]].V_ID,
                  CS_ID: productList[checktList[i]].CS_ID,
                  isNew: productList[checktList[i]].isNew,
                  Color: productList[checktList[i]].Color,
                  Warranty: productList[checktList[i]].Warranty,
                }).then((response) => {
                  GetCartById();
                });
              }
            });
          }
          alert(
            "Cart Can not Be Applied We Updated it to the Current State of Our Stock "
          );
          setProductList(productList);
        }
      }, 20);
    } else {
      alert("Your Cart Is Empty!");
    }
  }

  function GetCartById() {
    // console.log(auth.ID);
    Axios.post("http://localhost:3001/GetCartById", {
      id: location.state.userID,
    }).then((response) => {
      console.log(response.data);
      setProductList(response.data);
    });
  }
  let productList2;

  useEffect(() => {}, [productList2]);

  useEffect(() => {
    GetCartById();
    getTime();
  }, []);

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100" fluid>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                Shopping Cart
              </MDBTypography>
              {/* <div>
                <p className="mb-0">
                  <span className="text-muted">Sort by:</span>
                  <a href="#!" className="text-body">
                    price <i className="fas fa-angle-down mt-1"></i>
                  </a>
                </p>
              </div> */}
            </div>
            {productList.map((item, index) => {
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
                          {item.isNew ? (
                            <span>new</span>
                          ) : (
                            <span>used</span>
                          )}{" "}
                          <span className="text-muted">Color: </span>
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
                            setProductList(
                              productList.filter((i, ind) => {
                                if (ind !== index) {
                                  return i;
                                } else {
                                  if (i["Quantity"] === 1) {
                                    Axios.post(
                                      "http://localhost:3001/DeleteCartItem",
                                      {
                                        V_ID: item.V_ID,
                                        CS_ID: item.CS_ID,
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
                                "http://localhost:3001/UpdateCartItem",
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
                              alert("limit exceeded");
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
                            let check = false;

                            Axios.post(
                              "http://localhost:3001/GetQuantityOfCarFromStock",
                              {
                                V_ID: item.V_ID,
                                CS_ID: item.CS_ID,
                                isNew: item.isNew,
                                Color: item.Color,
                                Warranty: item.Warranty,
                              }
                            ).then((response) => {
                              console.log(response.data);
                              if (
                                parseInt(response.data[0].Quantity) >
                                parseInt(item.Quantity)
                              )
                                check = true;
                            });
                            setTimeout(() => {
                              if (check) {
                                setProductList(
                                  productList.filter((i, ind) => {
                                    if (ind !== index) {
                                      return i;
                                    } else {
                                      i["Quantity"]++;
                                      return i;
                                    }
                                  })
                                );
                                if (item.Quantity > 0) {
                                  Axios.post(
                                    "http://localhost:3001/UpdateCartItem",
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
                              } else {
                                alert("limit exceeded");
                              }
                            }, 10);
                          }}
                        >
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </MDBCol>
                      <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                          {item.Price * item.Quantity}$
                        </MDBTypography>
                      </MDBCol>
                      <MDBCol md="1" lg="1" xl="1" className="text-end">
                        <MDBBtn
                          onClick={() => {
                            setProductList(
                              productList.filter((i, ind) => {
                                if (ind !== index) {
                                  return i;
                                } else {
                                }
                              })
                            );
                            Axios.post("http://localhost:3001/DeleteCartItem", {
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
            <MDBCard>
              <MDBCardBody>
                <MDBBtn
                  className="ms-3"
                  color="warning"
                  block
                  size="lg"
                  onClick={() => {
                    navigate("/Vehicles");
                  }}
                >
                  Continue Shopping
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
            <br></br>
            <MDBCard>
              <MDBCardBody>
                <MDBBtn
                  className="ms-3"
                  color="warning"
                  block
                  size="lg"
                  onClick={() => {
                    applyCart();

                    setTimeout(() => {
                      // console.log(productList);
                      setProductList(
                        productList.filter((i, ind) => {
                          return i;
                        })
                      );
                    }, 10);
                  }}
                >
                  Apply Cart
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
