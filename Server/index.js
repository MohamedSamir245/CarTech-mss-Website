const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("The Server is running on port 3001!!");
});

const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "Vehicles_System",
});

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Generic Functions ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

async function checkPassword(userType, email, password, res) {
  var FName = "";
  var LName = "";
  var correctPassword = 0;
  var ID = -1;

  var query;
  var ID_Attr;

  switch (userType) {
    case "Customer":
      ID_Attr = "Customer_ID";
      break;
    case "Admin":
      ID_Attr = "Admin_ID";
      break;
    case "CarShowroom":
      ID_Attr = "CS_ID";
      break;
    case "ServiceCenter":
      ID_Attr = "SC_ID";
  }

  db.query(
    "select count(*) from " +
      userType +
      " where Email = (?) and Password = (?)",
    [email, password],
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result[0]["count(*)"] === 1) {
          correctPassword = 1;
          // Getting the required data according to the userType
          if (userType === "Customer" || userType === "Admin")
            query =
              "select FName, LName, " +
              ID_Attr +
              " from " +
              userType +
              " where email = (?)";
          else if (userType === "CarShowroom" || userType === "ServiceCenter")
            query =
              "select Name, " +
              ID_Attr +
              " from " +
              userType +
              " where email = (?)";
          db.query(query, [email], (err, result) => {
            if (userType === "Customer" || userType === "Admin") {
              FName = result[0]["FName"];
              LName = result[0]["LName"];
            } else if (
              userType === "CarShowroom" ||
              userType === "ServiceCenter"
            ) {
              FName = result[0]["Name"];
            }

            ID = result[0][ID_Attr];

            res.send({
              emailExist: 1,
              correctPassword: correctPassword,
              userType: userType,
              FName: FName,
              LName: LName,
              ID: ID,
            });
          });
        } else {
          res.send({
            emailExist: 1,
            correctPassword: correctPassword,
            userType: userType,
            FName: FName,
            LName: LName,
            ID: ID,
          });
        }
      }
    }
  );
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Login /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var emailExist = 0;
  var correctPassword = 0;

  // Check if this User is a Customer
  db.query(
    "select count(*) from Customer where Email = (?)",
    [email],
    (err, result) => {
      if (err) console.log(err);
      else {
        emailExist = result[0]["count(*)"];
        console.log(emailExist);

        if (emailExist === 0) {
          // Check if this User is an Admin
          db.query(
            "select count(*) from Admin where Email = (?)",
            [email],
            (err, result) => {
              if (err) console.log(err);
              else {
                emailExist = result[0]["count(*)"];

                console.log(emailExist);
                if (emailExist === 0) {
                  // Check if this User is a CarShowroom
                  db.query(
                    "select count(*) from CarShowroom where Email = (?)",
                    [email],
                    (err, result) => {
                      if (err) console.log(err);
                      else {
                        emailExist = result[0]["count(*)"];
                        console.log(emailExist);

                        if (emailExist === 0) {
                          // Check if this User is a ServiceCenter
                          db.query(
                            "select count(*) from ServiceCenter where Email = (?)",
                            [email],
                            (err, result) => {
                              emailExist = result[0]["count(*)"];
                              console.log(emailExist);

                              if (emailExist === 1) {
                                checkPassword(
                                  "ServiceCenter",
                                  email,
                                  password,
                                  res
                                );
                              } else {
                                res.send({
                                  emailExist: 0,
                                  correctPassword: 0,
                                  userType: 0,
                                });
                              }
                            }
                          );
                        } else {
                          checkPassword("CarShowroom", email, password, res);
                        }
                      }
                    }
                  );
                } else {
                  checkPassword("Admin", email, password, res);
                }
              }
            }
          );
        } else {
          checkPassword("Customer", email, password, res);
        }
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Add Admin //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/addAdmin", (req, res) => {
  const FName = req.body.FName;
  const LName = req.body.LName;
  const email = req.body.email;
  const number = req.body.number;
  const password = req.body.LName;

  db.query(
    "insert ignore into Admin values (null, (?), (?), (?), (?), (?))",
    [number, email, password, FName, LName],
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);
        if (result["affectedRows"] === 1)
          res.send({ msg: "The new admin is added successfully!", status: 1 });
        else {
          res.send({
            msg: "This email already exists as an admin!",
            status: 0,
          });
        }
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Get Recommendations ////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/recommendations", (req, res) => {
  db.query(
    "select * from Recommendation where Status = 'waiting'",
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Get Cities /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/admin/location/getLocations", (req, res) => {
  db.query("select City from City", (err, result) => {
    if (err) console.log(err);
    else {
      // console.log(result);
      res.send(result);
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////// Get Cities that have at least one State ////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/admin/location/getCitiesWithStates", (req, res) => {
  db.query(
    "select City from City as C where ((select count(*) from City, Location where City.City_ID = Location.City_ID and  City.City_ID = C.City_ID) > 0)",
    (err, result) => {
      if (err) console.log(err);
      else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Change Name ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/changeName", (req, res) => {
  const ID = req.body.ID;
  const FName = req.body.FName;
  const LName = req.body.LName;
  const userType = req.body.userType;
  var ID_Attribute = "";

  if (userType === "Admin") {
    ID_Attribute = "Admin_ID";
  } else if (userType === "Customer") {
    ID_Attribute = "Customer_ID";
  }

  db.query(
    "update " +
      userType +
      " set FName = (?), LName = (?) where " +
      ID_Attribute +
      " = (?)",
    [FName, LName, parseInt(ID)],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("The Name is updated successfully!");
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Add City  //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/location/addCity", (req, res) => {
  const city = req.body.city;
  console.log(city);
  db.query("call addCity(?)", [city], (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result[0]);
      res.send(result[0]);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Add State  //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/location/addState", (req, res) => {
  const city = req.body.city;
  const state = req.body.state;
  var City_ID;

  db.query(
    "select City_ID from City where City = (?)",
    [city],
    (err, result) => {
      if (err) console.log(err);
      else {
        City_ID = result[0]["City_ID"];
        db.query(
          "insert ignore into Location values (null, (?) , (?))",
          [state, City_ID],
          (err, result) => {
            if (err) console.log(err);
            else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Get States of a City ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/location/getStates", (req, res) => {
  const city = req.body.city;

  console.log(city);
  db.query(
    "select State from City, Location where City.City_ID = Location.City_ID and City = (?)",
    [city],
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Delete State ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/location/deleteState", (req, res) => {
  const state = req.body.state;

  db.query("call deleteState(?)", [state], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("State deleted Successfully");
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Delete City ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/location/deleteCity", (req, res) => {
  const city = req.body.city;

  db.query("delete from City where City = (?)", [city], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("City deleted Successfully");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Car ShowRooms ///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Update a Recommendation ////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/update-recommendation", (req, res) => {
  //Get Body Data
  const Admin_ID = req.body.Admin_ID;
  const Status = req.body.Status;
  const Recommendation_ID = req.body.Recommendation_ID;

  db.query(
    "call updateRecommendation((?), (?), (?))",
    [Status, Admin_ID, Recommendation_ID],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("Recommendation is Updated Successfully");
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

app.post("/add-car-to-cart", (req, res) => {
  const customerId = req.body.userId;
  const carInfo = req.body.carInfo;

  var stockQuantity = 0;
  var cartQuantity = 0;
  db.query(
    `SELECT count(*) 
    FROM Stock 
    where V_ID=${carInfo.id} and CS_ID=${carInfo.csId} and isNew=${carInfo.condition} and color='${carInfo.color}' and Warranty='${carInfo.warranty}';`,
    // existance in stock
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Car is in stock = ", result[0]["count(*)"]);
        // true1: car exist in stock
        if (result[0]["count(*)"] == 1) {
          db.query(
            `SELECT count(*) 
            FROM CustomerCart 
            where Customer_ID= ${customerId} and V_ID=${carInfo.id} and CS_ID=${carInfo.csId} 
            and isNew=${carInfo.condition} and color='${carInfo.color}' and Warranty='${carInfo.warranty}';`,
            (err, result) => {
              if (err) {
                consle.log(err);
              } else {
                console.log("Car is in cart = ", result[0]["count(*)"]);
                // true2: car exist in cart
                if (result[0]["count(*)"] == 1) {
                  db.query(
                    `SELECT quantity 
                  FROM CustomerCart 
                  where Customer_ID= ${customerId} and V_ID=${carInfo.id} and CS_ID=${carInfo.csId} 
                  and isNew=${carInfo.condition} and color='${carInfo.color}' and Warranty='${carInfo.warranty}';`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(
                          "Customer has this car in cart = ",
                          result[0]["quantity"],
                          "times"
                        );
                        cartQuantity = result[0]["quantity"];
                        // get car quantity in cart
                        db.query(
                          `SELECT quantity 
                        FROM Stock 
                        where V_ID=${carInfo.id} and CS_ID=${carInfo.csId} 
                        and isNew=${carInfo.condition} and color='${carInfo.color}' and Warranty='${carInfo.warranty}';`,
                          (err, result) => {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(
                                "stock has this car = ",
                                result[0]["quantity"],
                                "times"
                              );
                              stockQuantity = result[0]["quantity"];
                              // get car quantity in stock
                              // i can add more car
                              if (stockQuantity > cartQuantity) {
                                db.query(
                                  `update CustomerCart set quantity = ${
                                    cartQuantity + 1
                                  } where Customer_ID= ${customerId} and V_ID=${
                                    carInfo.id
                                  } and CS_ID=${carInfo.csId} 
                                  and isNew=${carInfo.condition} and color='${
                                    carInfo.color
                                  }' and Warranty='${carInfo.warranty}';`,
                                  (err, result) => {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      console.log("Car added to cart");
                                      res.send(
                                        "Car added to your cart, successfuly."
                                      );
                                    }
                                  }
                                );
                              }
                              // i can not add more car
                              else {
                                console.log("Can't add more cars");
                                res.send("You can't add more cars.");
                              }
                            }
                          }
                        );
                      }
                    }
                  );
                }
                // false2: car not exist in cart
                else {
                  db.query(
                    `call addNewCarToCart ((${customerId}), (${carInfo.id}) , (${carInfo.csId}), (${carInfo.condition}), ('${carInfo.color}'), (${carInfo.price}) , ('${carInfo.warranty}'), (1));`,
                    // `insert into customercart (Customer_ID, V_ID, CS_ID, isNew, Color, Price, Warranty,Quantity)
                    // values ((${customerId}), (${carInfo.id}) , (${carInfo.csId}), (${carInfo.condition}), ('${carInfo.color}'), (${carInfo.price}) , ('${carInfo.warranty}'), (1));`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("Car added to cart");
                        res.send("Car added to your cart, successfuly.");
                      }
                    }
                  );
                }
              }
            }
          );
        }
        // false1: car not exist in stock
        else {
          res.send("You can't add more cars.");
        }
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Change Password ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/changePassword", (req, res) => {
  const userType = req.body.userType;
  const ID = req.body.ID;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  var ID_Attribute = "";

  switch (userType) {
    case "Admin":
      ID_Attribute = "Admin_ID";
      break;
    case "Customer":
      ID_Attribute = "Customer_ID";
      break;
    case "CarShowroom":
      ID_Attribute = "CS_ID";
      break;
    case "ServiceCenter":
      ID_Attribute = "SC_ID";
      break;
  }

  db.query(
    "select Count(*) from " +
      userType +
      " where " +
      ID_Attribute +
      "= (?) and Password = (?)",
    [parseInt(ID), oldPassword],
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result[0]["Count(*)"] === 1) {
          db.query(
            "update " +
              userType +
              " set Password = (?) where " +
              ID_Attribute +
              " = (?)",
            [newPassword, parseInt(ID)],
            (err, result) => {
              if (err) console.log(err);
              else {
                if (result["changedRows"] === 1)
                  res.send({
                    msg: "The password has been updated successfully!",
                    status: 0,
                  });
                else {
                  res.send({
                    msg: "The new password is the same as the old one!",
                    status: 1,
                  });
                }
              }
            }
          );
        } else {
          res.send({
            msg: "The old password is incorrect!",
            status: 2,
          });
        }
      }
    }
  );
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Car ShowRooms /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Update a SC_Request ////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
app.post("/admin/requests/updateSCRequest", (req, res) => {
  const Status = req.body.Status;
  const Admin_ID = req.body.Admin_ID;
  const Request_ID = req.body.Request_ID;
  db.query(
    "call updateSCRequest((?), (?), (?))",
    [Status, Admin_ID, Request_ID],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("SC_Request is Updated Successfully");
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Update a CS_Request ////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
app.post("/admin/requests/updateCSRequest", (req, res) => {
  const Status = req.body.Status;
  const Admin_ID = req.body.Admin_ID;
  const Request_ID = req.body.Request_ID;

  db.query(
    "update CSRequest set status = (?), Admin_ID = (?) where Request_ID = (?)",
    [Status, Admin_ID, Request_ID],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("CS_Request is Updated Successfully");
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Get CarShowrooms Requests //////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/admin/requests/getCSRequests", (req, res) => {
  db.query(
    "select carName, LiterPer100KM, Seats, FuelType, CarType, TransmissionType, carYear, CompanyMark, Name, Request_ID, MaximumSpeed from CSRequest, CarShowroom where Provider_ID = CS_ID and Status = 1",
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Get ServiceCenters Requests //////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/admin/requests/getSCRequests", (req, res) => {
  db.query(
    "select ServiceName, Details, Image, Name, Request_ID from SCRequest, ServiceCenter where Provider_ID = SC_ID and Status = 1",
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Add Car ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/addCar", (req, res) => {
  const carName = req.body.carName;
  const liter = req.body.liter;
  const seats = req.body.seats;
  const transmission = req.body.transmission;

  const carType = req.body.carType;
  const fuelType = req.body.fuelType;
  const year = req.body.year;
  const mark = req.body.mark;

  const speed = req.body.speed;

  db.query(
    "insert into Vehicle (CarName, LiterPer100KM, Seats, TransmissionType, CarType, FuelType, Year, CompanyMark, MaximumSpeed) values ((?), (?) , (?), (?), (?), (?) , (?), (?), (?))",
    [carName, liter, seats, transmission, carType, fuelType, year, mark, speed],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Add Service ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/admin/addService", (req, res) => {
  const name = req.body.name;
  const details = req.body.details;
  const image = req.body.image;

  db.query(
    "insert ignore into Service (Name, Details, Image) values ((?), (?) , (?))",
    [name, details, image],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get ShowRooms //////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// Will have ERROR In Future Due to Bad SQl
app.post("/get-showrooms", (req, res) => {
  const form = req.body.form;
  var filter = {
    location: "",
  };
  if (form.lID != "all") filter.location = `and carshowroom.LID = ${form.lID}`;
  db.query(
    `Select CarShowroom.*, Location.State ,City.City 
    from Carshowroom,Location,City 
    where Location.L_ID=CarShowroom.LID And City.City_ID=Location.City_ID And CarShowroom.Rating >= ${form.rating} ${filter.location};`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get ShowRoom page data //////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get ShowRoom Info ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/get-showroom-info", (req, res) => {
  const csId = req.body.showRoomID;

  var info = {
    name: 0,
    email: 0,
    phoneNumber: 0,
    rating: 0,
    workingDays: 0,
    state: "Test state",
    city: "Test city",
  };

  db.query(
    `Select CarShowroom.*, Location.State ,City.City 
    from CarShowroom,Location,City 
    where Location.L_ID=CarShowroom.LID And City.City_ID=Location.City_ID and CS_ID = ${csId};`,
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result[0]);
        info.name = result[0]["Name"];
        info.email = result[0]["Email"];
        info.phoneNumber = result[0]["PhoneNumber"];
        info.rating = result[0]["Rating"];
        info.workingDays = result[0]["WorkingDays"];
        info.state = result[0]["State"];
        info.city = result[0]["City"];
        res.send({
          name: info.name,
          email: info.email,
          phoneNumber: info.phoneNumber,
          rating: info.rating,
          workingDays: info.workingDays,
          state: info.state,
          city: info.city,
        });
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get ShowRoom Stock ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/get-showroom-stock", (req, res) => {
  const csId = req.body.ShowRoomID;
  db.query(
    `SELECT Stock.*,Vehicle.CarName,Vehicle.CompanyMark 
    FROM Stock, Vehicle 
    where Stock.CS_ID=${csId} and Vehicle.V_ID=Stock.V_ID;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Cars Market ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get stock colors ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/get-colors", (req, res) => {
  db.query("Select distinct color from Stock", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get Cars marks ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/get-marks", (req, res) => {
  db.query("Select distinct CompanyMark from Vehicle", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get Cars models ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/get-models", (req, res) => {
  db.query("Select distinct carName from Vehicle", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get stock Warranties ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get("/get-warranties", (req, res) => {
  db.query("Select distinct Warranty from Stock", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get stock Cars /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/get-vehicles", (req, res) => {
  const form = req.body.form;
  var filter = {
    condition: "",
    color: "",
    maxPrice: "",
    warranty: "",
    mark: "",
    tractionType: "",
    year: "",
  };
  if (form.condition != "all")
    filter.condition = `and Stock.isNew=${form.condition == "New"}`;
  if (form.color != "all") filter.color = `and stock.color='${form.color}'`;
  if (form.maxPrice != "") {
    filter.maxPrice = `and Stock.Price <= ${form.maxPrice}`;
  }
  if (form.warranty != "all")
    filter.warranty = `and Stock.warranty='${form.warranty}'`;
  if (form.mark != "all")
    filter.mark = `and Vehicle.CompanyMark='${form.mark}'`;
  if (form.tractionType != "all")
    filter.tractionType = `and Vehicle.TractionType='${form.tractionType}'`;
  if (form.year != "all") filter.year = `and vehicle.Year=${form.year}`;
  db.query(
    `SELECT Stock.*,Vehicle.CarName,Vehicle.CompanyMark,CarShowroom.Name as CS_Name 
    FROM Stock, Vehicle,CarShowroom 
    where Vehicle.V_ID=Stock.V_ID And CarShowroom.CS_ID=Stock.CS_ID ${filter.condition} ${filter.color} ${filter.maxPrice} ${filter.warranty} ${filter.mark} ${filter.tractionType} ${filter.year};`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// get Vehicle page data //////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.post("/get-vehicle-info", (req, res) => {
  const vId = req.body.vId;

  db.query(
    "SELECT CarName, LiterPer100KM, Seats, TransmissionType, CarType, FuelType, Rating, Year, CompanyMark, MaximumSpeed FROM Vehicle where V_ID = (?);",
    [vId],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result[0]);
      }
    }
  );
});

app.get("/getservices", (req, res) => {
  db.query("Select * from Service", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/getservicesexcept", (req, res) => {
  const SC_ID = req.body.SC_ID;
  db.query(
    "select * from Service where Service_ID not in (select service_id from ServiceCenter_Services where SC_ID =(?))",
    [SC_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getservicecenters", (req, res) => {
  db.query("Select * from ServiceCenter", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/getservicecenterinfo", (req, res) => {
  const SC_ID = req.body.SC_ID;
  db.query(
    "select CenterSite,WorkingHours,Name,Rating,PhoneNumber from ServiceCenter where SC_ID=(?)",
    [SC_ID],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    }
  );
});

app.post("/getscordersfromid", (req, res) => {
  const SC_ID = req.body.SC_ID;
  db.query(
    "select c.FName,c.LName,c.Email,c.PhoneNumber,s.Name,sr.Price,sr.Date ,sr.Reservation_ID from Service_Reservation as sr,Service as s,Customer as c where c.Customer_ID=sr.Customer_ID and sr.Service_ID =S.Service_ID and SC_ID=(?)",
    [SC_ID],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    }
  );
});

app.post("/getservicesfromscid", (req, res) => {
  const SC_ID = req.body.SC_ID;
  db.query(
    "select s.Service_ID,s.Name,s.Details,s.Image,scs.Price from service as s,ServiceCenter_Services as scs where s.Service_ID=scs.Service_ID and scs.SC_ID=(?);",
    [SC_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getservicecentersfromsid", (req, res) => {
  const Service_ID = req.body.Service_ID;
  db.query(
    "select s.SC_ID,s.CenterSite,s.WorkingHours,s.Name,s.Rating,s.PhoneNumber from ServiceCenter as s,ServicecCenter_Services as scs where s.SC_ID=scs.SC_ID and scs.Service_ID=(?);",
    [Service_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getuseridfromemail", (req, res) => {
  const uemail = req.body.uemail;
  var uid = -1;
  var exist = 0;

  db.query(
    "select count(*) from Customer where Email = (?)",
    [uemail],
    (err, result) => {
      if (err) console.log(err);
      else {
        exist = result[0]["count(*)"];

        if (exist === 1) {
          db.query(
            "select Customer_ID from Customer where Email=?;",
            [uemail],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                uid = result[0]["Customer_ID"];
                res.send({ uid: uid });
              }
            }
          );
        } else {
          db.query(
            "select count(*) from CarShowroom where Email = (?)",
            [uemail],
            (err, result) => {
              if (err) console.log(err);
              else {
                exist = result[0]["count(*)"];

                if (exist === 1) {
                  db.query(
                    "select CS_ID from CarShowroom where Email=?;",
                    [uemail],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        uid = result[0]["CS_ID"];
                        res.send({ uid: uid });
                      }
                    }
                  );
                } else {
                  db.query(
                    "select count(*) from ServiceCenter where Email = (?)",
                    [uemail],
                    (err, result) => {
                      if (err) console.log(err);
                      else {
                        exist = result[0]["count(*)"];

                        if (exist === 1) {
                          db.query(
                            "select SC_ID from ServiceCenter where Email=?;",
                            [uemail],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                uid = result[0]["SC_ID"];
                                res.send({ uid: uid });
                              }
                            }
                          );
                        } else {
                          res.send({
                            uid: -1,
                          });
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
});

app.post("/getcustomeridfromemail", (req, res) => {
  const uemail = req.body.uemail;
  var uid = -1;
  var exist = 0;

  db.query(
    "select count(*) from Customer where Email = (?)",
    [uemail],
    (err, result) => {
      if (err) console.log(err);
      else {
        exist = result[0]["count(*)"];

        if (exist === 1) {
          db.query(
            "select Customer_ID from Customer where Email=?;",
            [uemail],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                uid = result[0]["Customer_ID"];
                res.send({ uid: uid });
              }
            }
          );
        } else {
          res.send({ uid: -1 });
        }
      }
    }
  );
});

app.post("/getcsidfromemail", (req, res) => {
  const uemail = req.body.uemail;
  var uid = -1;
  var exist = 0;

  db.query(
    "select count(*) from CarShowroom where Email = (?)",
    [uemail],
    (err, result) => {
      if (err) console.log(err);
      else {
        exist = result[0]["count(*)"];

        if (exist === 1) {
          db.query(
            "select CS_ID from CarShowroom where Email=?;",
            [uemail],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                uid = result[0]["CS_ID"];
                res.send({ uid: uid });
              }
            }
          );
        } else {
          res.send({ uid: -1 });
        }
      }
    }
  );
});

app.post("/getscidfromemail", (req, res) => {
  const uemail = req.body.uemail;
  var uid = -1;
  var exist = 0;

  db.query(
    "select count(*) from ServiceCenter where Email = (?)",
    [uemail],
    (err, result) => {
      if (err) console.log(err);
      else {
        exist = result[0]["count(*)"];

        if (exist === 1) {
          db.query(
            "select SC_ID from ServiceCenter where Email=?;",
            [uemail],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                uid = result[0]["SC_ID"];
                res.send({ uid: uid });
              }
            }
          );
        } else {
          res.send({ uid: -1 });
        }
      }
    }
  );
});

app.post("/getLocationsfromSID", (req, res) => {
  const SC_ID = req.body.SC_ID;
  console.log(SC_ID);
  var exsist = 0;

  db.query(
    "select count(*) from ServiceCenter_Location where SC_ID = (?)",
    [SC_ID],
    (err, result) => {
      if (err) console.log(err);
      else {
        exsist = result[0]["count(*)"];

        if (exsist !== 0) {
          db.query(
            "select c.city,l.state from City as c,Location as l,ServiceCenter_Location as sl,ServiceCenter as sc where c.City_ID=l.City_ID and sl.LID=l.L_ID and sc.SC_ID=sl.SC_ID and sc.SC_ID=?",
            [SC_ID],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send({ exsist: exsist, data: result });
              }
            }
          );
        } else {
          res.send({
            exsist: exsist,
          });
        }
      }
    }
  );
});

app.post("/sendrcsrequest", (req, res) => {
  const carname = req.body.carname;
  const userid = req.body.userid;
  const fueltype = req.body.fueltype;
  const cartype = req.body.cartype;
  const transmissiontype = req.body.transmissiontype;
  const caryear = req.body.caryear;
  const companymark = req.body.companymark;

  db.query(
    "call sendrcsrequest(?,?,?,?,?,?,?);",
    [
      carname,
      userid,
      fueltype,
      cartype,
      transmissiontype,
      caryear,
      companymark,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Inserted, a7la mesa2 3lek mn el back end");
        res.send("Inserted Successfully");
      }
    }
  );
});

app.post("/reserve-service", (req, res) => {
  const SC_ID = req.body.SC_ID;
  const Service_ID = req.body.Service_ID;
  const Customer_ID = req.body.Customer_ID;
  const Price = req.body.Price;
  const Date = req.body.Date;

  db.query(
    "call reserve_service(?,?,?,?,?);",
    [SC_ID, Service_ID, Customer_ID, Price, Date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Inserted Successfully");
      }
    }
  );
});

app.post("/addServicetoSC", (req, res) => {
  const SC_ID = req.body.SC_ID;
  const Service_ID = req.body.Service_ID;
  const Price = req.body.Price;
  db.query(
    "call addServicetoSC(?,?,?);",
    [SC_ID, Service_ID, Price],
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("Inserted Successfully");
      }
    }
  );
});

app.post("/sendrscrequest", (req, res) => {
  const servicename = req.body.servicename;
  const userid = req.body.userid;
  const servicedetails = req.body.servicedetails;

  db.query(
    "insert into SCRequest values ('Waiting',?,null,?,null,?,null);",
    [userid, servicedetails, servicename],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("inserted");
        res.send("Inserted Successfully");
      }
    }
  );
});

app.post("/sendrecommendation", (req, res) => {
  const recommendation = req.body.recommendation;
  const userid = req.body.userid;
  const date = req.body.date;

  db.query(
    "call sendrecommendation(?,?,?);",
    [recommendation, userid, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Inserted, a7la mesa2 3lek mn el back end");
        res.send("Inserted Successfully");
      }
    }
  );
});

app.get("/GetCustomers", (req, res) => {
  db.query("SELECT * FROM Customer", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/GetCarShowrooms", (req, res) => {
  db.query("SELECT * FROM CarShowroom ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/GetServiceCenters", (req, res) => {
  db.query("SELECT * FROM ServiceCenter ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/GetLocations", (req, res) => {
  db.query(
    "SELECT l.L_ID , l.State,c.City FROM Location as l , City as c where l.City_ID=c.City_ID ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/AddCarShowroom", (req, res) => {
  console.log(req.body);
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const location = req.body.location;
  const workingDays = req.body.workingDays;

  db.query(
    "insert into CarShowroom  (PhoneNumber,Email,Password,Name,WorkingDays,LID) VALUES (?,?,?,?,?,?)",
    [phoneNumber, email, password, name, workingDays, location],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.post("/AddServiceCenter", (req, res) => {
  console.log(req.body);
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const location = req.body.location;
  const workingHours = req.body.workingHours;

  db.query(
    "insert into ServiceCenter  (PhoneNumber,Email,Password,Name,WorkingHours,CenterSite) VALUES (?,?,?,?,?,?)",
    [phoneNumber, email, password, name, workingHours, location],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.post("/AddCustomer", (req, res) => {
  console.log(req.body);
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  db.query(
    `call addCustomer (('${phoneNumber}'), ('${email}') , ('${password}'), ('${fname}'), ('${lname}'))`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.get("/GetPosts", (req, res) => {
  db.query(
    "select p.Post_ID ,p.Customer_ID,p.V_ID,p.Date,p.Post,u.FName,u.LName from Post as p,Customer as u where p.Customer_ID=u.Customer_ID",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/GetPostById", (req, res) => {
  const postID = req.body.postID;
  db.query(
    "select p.Post_ID ,p.Customer_ID,p.V_ID,p.Date,p.Post,u.FName,u.LName from Post as p,Customer as u where p.Customer_ID=u.Customer_ID and p.Post_ID = " +
      postID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/GetPostByCustomerId", (req, res) => {
  const customerID = req.body.customerID;
  db.query(
    "select p.Post_ID ,p.Customer_ID,p.V_ID,p.Date,p.Post,u.FName,u.LName from Post as p,Customer as u where p.Customer_ID=u.Customer_ID and p.Customer_ID = " +
      customerID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/GetPostsById", (req, res) => {
  const ID = req.body.ID;
  db.query(
    "select p.Post_ID ,p.Customer_ID,p.V_ID,p.Date,p.Post,u.FName,u.LName from Post as p,Customer as u where p.Customer_ID=u.Customer_ID and p.Post_ID = " +
      ID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/GetComments", (req, res) => {
  const postid = req.body.postID;

  db.query(
    "select c.Comment_id,c.Reply,c.Date,c.ReferredComment_ID ,c.Post_ID,c.Customer_ID,u.FName,u.LName from Comment as c , Customer as u where c.Post_ID = " +
      postid +
      " and c.Customer_ID =u.Customer_ID and c.ReferredComment_ID IS NULL",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/GetCommentById", (req, res) => {
  const postid = req.body.postID;
  const commentID = req.body.commentID;

  db.query(
    "select c.Comment_id,c.Reply,c.Date,c.ReferredComment_ID ,c.Post_ID,c.Customer_ID,u.FName,u.LName from Comment as c , Customer as u where c.Post_ID = " +
      postid +
      " and c.Customer_ID =u.Customer_ID and c.ReferredComment_ID IS NULL and c.Comment_id = " +
      commentID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/GetReplies", (req, res) => {
  const commentID = req.body.commentID;

  db.query(
    "select c.Comment_id,c.Reply,c.Date,c.ReferredComment_ID ,c.Post_ID,c.Customer_ID,u.FName,u.LName from Comment as c , Customer as u where c.ReferredComment_ID = " +
      commentID +
      " and c.Customer_ID = u.Customer_ID",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/AddPost", (req, res) => {
  console.log(req.body);
  const userID = req.body.userID;
  const VID = req.body.VID;
  const date = req.body.date;
  const post = req.body.post;

  db.query(
    "INSERT INTO Post (Customer_ID, V_ID, Date,Post) VALUES (?,?,?,?)",
    [userID, VID, date, post],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.post("/AddPostNull", (req, res) => {
  console.log(req.body);
  const userID = req.body.userID;
  const date = req.body.date;
  const post = req.body.post;

  db.query(
    "INSERT INTO Post (Customer_ID, Date,Post) VALUES (?,?,?)",
    [userID, date, post],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.post("/AddComment", (req, res) => {
  console.log(req.body);
  const Reply = req.body.Reply;
  const Date = req.body.Date;
  const ReferredCommentID = req.body.ReferredCommentID;
  const postid = req.body.postid;
  const userid = req.body.userid;

  db.query(
    "INSERT INTO Comment (Reply, Date, Post_ID,Customer_ID) VALUES (?,?,?,?)",
    [Reply, Date, postid, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.post("/AddReply", (req, res) => {
  console.log(req.body);
  const Reply = req.body.Reply;
  const Date = req.body.Date;
  const ReferredCommentID = req.body.ReferredCommentID;
  const postid = req.body.postid;
  const userid = req.body.userid;

  db.query(
    "INSERT INTO Comment (Reply, Date, ReferredComment_ID,Post_ID,Customer_ID) VALUES (?,?,?,?,?)",
    [Reply, Date, ReferredCommentID, postid, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.get("/GetAllVehicles", (req, res) => {
  db.query(
    "select distinct V_ID ,CarName,CompanyMark  from Vehicle",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/GetVehicleNameByID", (req, res) => {
  const id = req.body.id;
  db.query("select CarName from Vehicle where V_ID =" + id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.post("/GetCustomerDataaById", (req, res) => {
  const id = req.body.id;
  db.query(
    "select FName , LName from Customer where Customer_ID =" + id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.get("/GetAllCustomersId", (req, res) => {
  db.query("select Customer_ID from Customer", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

app.post("/GetCartById", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT CustomerCart.*,Vehicle.CarName, Vehicle.CompanyMark,CarShowroom.Name as CS_Name FROM CustomerCart, Vehicle,CarShowroom where Vehicle.V_ID=CustomerCart.V_ID And CarShowroom.CS_ID=CustomerCart.CS_ID and CustomerCart.Customer_ID=" +
      id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/UpdateCartItem", (req, res) => {
  const quantity = req.body.quantity;
  const V_ID = req.body.V_ID;
  const CS_ID = req.body.CS_ID;
  const isNew = req.body.isNew;
  const Color = req.body.Color;
  const Warranty = req.body.Warranty;

  db.query(
    "update CustomerCart set Quantity=" +
      quantity +
      " where CustomerCart.V_ID = " +
      V_ID +
      " and CustomerCart.CS_ID= " +
      CS_ID +
      " and CustomerCart.isNew= " +
      isNew +
      " and CustomerCart.Color= '" +
      Color +
      "' and CustomerCart.Warranty= '" +
      Warranty +
      "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/DeleteCartItem", (req, res) => {
  const V_ID = req.body.V_ID;
  const CS_ID = req.body.CS_ID;
  const isNew = req.body.isNew;
  const Color = req.body.Color;
  const Warranty = req.body.Warranty;

  db.query(
    "delete from CustomerCart where CustomerCart.V_ID = " +
      V_ID +
      " and CustomerCart.CS_ID= " +
      CS_ID +
      " and CustomerCart.isNew= " +
      isNew +
      " and CustomerCart.Color= '" +
      Color +
      "' and CustomerCart.Warranty= '" +
      Warranty +
      "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/GetQuantityOfCarFromStock", (req, res) => {
  const V_ID = req.body.V_ID;
  const CS_ID = req.body.CS_ID;
  const isNew = req.body.isNew;
  const Color = req.body.Color;
  const Warranty = req.body.Warranty;

  db.query(
    "select Quantity from Stock where Stock.V_ID = " +
      V_ID +
      " and Stock.CS_ID= " +
      CS_ID +
      " and Stock.isNew= " +
      isNew +
      " and Stock.Color= '" +
      Color +
      "' and Stock.Warranty= '" +
      Warranty +
      "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/AddNewOrder", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const date = req.body.date;

  db.query(
    "insert into CustomerOrder (Customer_ID,Date) VALUES (?,?)",
    [id, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        db.query(
          "SELECT OrderNumber FROM CustomerOrder ORDER BY OrderNumber DESC LIMIT 1;",
          (err2, result2) => {
            if (err2) {
              console.log(err2);
            } else {
              res.send(result2);
              console.log(result2);
            }
          }
        );
      }
    }
  );
});

// app.get("/GetLastOrder", (req, res) => {
//   db.query(
//     "SELECT OrderNumber FROM CustomerOrder ORDER BY OrderNumber DESC LIMIT 1;",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//         console.log(result);
//       }
//     }
//   );
// });

app.post("/AddOrderItem", (req, res) => {
  const id = req.body.id;
  const V_ID = req.body.V_ID;
  const CS_ID = req.body.CS_ID;
  const isNew = req.body.isNew;
  const Color = req.body.Color;
  const Price = req.body.Price;
  const Warranty = req.body.Warranty;
  const Quantity = req.body.Quantity;
  const csName = req.body.csName;

  db.query(
    "insert into OrderItems (OrderId , V_ID ,CS_ID ,isNew ,Color ,Price ,Warranty ,Quantity ,csName ) VALUES (?,?,?,?,?,?,?,?,?)",
    [id, V_ID, CS_ID, isNew, Color, Price, Warranty, Quantity, csName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/AddToStock", (req, res) => {
  const V_ID = req.body.V_ID;
  const CS_ID = req.body.CS_ID;
  const isNew = req.body.isNew;
  const Color = req.body.Color;
  const Price = req.body.Price;
  const Warranty = req.body.Warranty;
  const Quantity = req.body.Quantity;

  db.query(
    "insert into stock ( V_ID ,CS_ID ,isNew ,Color ,Price ,Warranty ,Quantity ) VALUES (?,?,?,?,?,?,?)",
    [V_ID, CS_ID, isNew, Color, Price, Warranty, Quantity],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/UpdateItemFromStock", (req, res) => {
  const quantity = req.body.quantity;
  const V_ID = req.body.V_ID;
  const CS_ID = req.body.CS_ID;
  const isNew = req.body.isNew;
  const Color = req.body.Color;
  const Warranty = req.body.Warranty;

  db.query(
    "update Stock set Quantity=" +
      quantity +
      " where Stock.V_ID = " +
      V_ID +
      " and Stock.CS_ID= " +
      CS_ID +
      " and Stock.isNew= " +
      isNew +
      " and Stock.Color= '" +
      Color +
      "' and Stock.Warranty= '" +
      Warranty +
      "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/DeleteItemFromStock", (req, res) => {
  const V_ID = req.body.V_ID;
  const CS_ID = req.body.CS_ID;
  const isNew = req.body.isNew;
  const Color = req.body.Color;
  const Warranty = req.body.Warranty;

  db.query(
    "delete from Stock where Stock.V_ID = " +
      V_ID +
      " and Stock.CS_ID= " +
      CS_ID +
      " and Stock.isNew= " +
      isNew +
      " and Stock.Color= '" +
      Color +
      "' and Stock.Warranty= '" +
      Warranty +
      "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/GetAllOrdersById", (req, res) => {
  const id = req.body.id;
  db.query(
    "select CustomerOrder.OrderNumber , CustomerOrder.Date from CustomerOrder where CustomerOrder.Customer_ID = " +
      id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/GetAllOrderItemsByOrderNumber", (req, res) => {
  const id = req.body.id;
  db.query(
    "select OrderItems.* ,CarName , CompanyMark from OrderItems ,Vehicle where OrderItems.V_ID = Vehicle.V_ID and OrderItems.OrderId = " +
      id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/GetAllOrdersToShowroom", (req, res) => {
  const id = req.body.id;
  db.query(
    "select OrderItems.isNew ,OrderItems.Color,OrderItems.Warranty,OrderItems.Quantity , Customer.FName,Customer.LName,Customer.PhoneNumber,CustomerOrder.Date , Vehicle.carName,Vehicle.CompanyMark from OrderItems,CustomerOrder,Customer,Vehicle where CustomerOrder.Customer_ID=Customer.Customer_ID and CustomerOrder.OrderNumber=OrderItems.OrderId and Vehicle.V_ID=OrderItems.V_ID and OrderItems.CS_ID=  " +
      id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});
