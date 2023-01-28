// React Components
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/index.scss";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

// Compenents
import Home from "./home/home";
import Login from "./login";
import ServicesPage from "./servicesPage/services";
import Vechiles from "./vehicles";
import Vechile from "./vehicle";
import Showrooms from "./showRooms/showRooms";
import Showroom from "./showRoom/showRoom";
import Header from "./header";
import Servicecenters from "./serviceCenters/serviceCenters";
import Recommendations from "./admin/recommendations";
import SendRequestCS from "./sendRequestCS";
import Locations from "./admin/locations";
import SignUp from "./signUp/signUp";
import SignUpCustomer from "./signUp/signUpCustomer";
import SignUpCarShowroom from "./signUp/signUpCarShowroom";
import SignUpServiceCenter from "./signUp/signUpServiceCenter";
import { AuthContext, AuthUpdateContext } from "./context/authProvider";
import Requests from "./admin/requests";
import SendRequestSC from "./sendRequestSC";
import Fourm from "./forum/FourmItem";
import Comment from "./forum/comment";
import Reply from "./forum/reply";
import MyPosts from "./forum/showAllMyPosts";
import AddCar from "./admin/addCar";
import AddService from "./admin/addService";
import ServiceCenter from "./serviceCenters/serviceCenter";
import Service from "./servicesPage/service";
import Cart from "./Cart/Cart";
import AdminProfile from "./admin/adminProfile";
import SCOrders from "./serviceCenters/SCOrders";
import SCProfile from "./serviceCenters/SCProfile";
import CSProfile from "./showRoom/CSProfile";
import AddAdmin from "./admin/addAdmin";
import AddSCService from "./serviceCenters/addService";
import MyOrders from "./orders/myOrders";
import OrderDetails from "./orders/orderDetails";
import Footer from "./footer";
import ShowroomOrders from "./orders/showRoomOrders";
import UpdateStock from "./showRoom/updateStock";

const App = () => {
  const [auth, setAuth] = useState({});

  const updateAuth = (newAuth) => {
    setAuth(newAuth);
  };

  useEffect(() => {
    const ls = { ...localStorage };

    console.log(ls);
    if (Object.keys(ls).length !== 0) {
      setAuth(ls);
    }
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <AuthUpdateContext.Provider value={updateAuth}>
          <AuthContext.Provider value={auth}>
            <div className="App">
              <Header />
              <div className="Content">
                <Routes>
                  <Route index exact path="/" element={<Home />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                  <Route
                    exact
                    path="/Services"
                    element={<ServicesPage />}
                  ></Route>
                  <Route
                    exact
                    path="/admin/recommendations"
                    element={<Recommendations />}
                  ></Route>
                  <Route exact path="/Vehicles" element={<Vechiles />}></Route>
                  <Route
                    exact
                    path="/vehicle/:model"
                    element={<Vechile />}
                  ></Route>
                  <Route
                    exact
                    path="/showrooms"
                    element={<Showrooms />}
                  ></Route>
                  <Route
                    exact
                    path="/showroom/:name"
                    element={<Showroom />}
                  ></Route>
                  <Route
                    exact
                    path="/servicecenters"
                    element={<Servicecenters />}
                  ></Route>
                  <Route
                    exact
                    path="/servicecenter/:name"
                    element={<ServiceCenter />}
                  ></Route>
                  <Route
                    exact
                    path="/servicecenter/getorders/:name"
                    element={<SCOrders />}
                  ></Route>
                  <Route
                    exact
                    path="/ServiceCenter/addservice/:name"
                    element={<AddSCService />}
                  ></Route>
                  <Route
                    exact
                    path="service/:name"
                    element={<Service />}
                  ></Route>
                  <Route
                    exact
                    path="/SendRequestcs"
                    element={<SendRequestCS />}
                  ></Route>
                  <Route
                    exact
                    path="/SendRequestsc"
                    element={<SendRequestSC />}
                  ></Route>
                  <Route
                    exact
                    path="/admin/locations"
                    element={<Locations />}
                  ></Route>
                  <Route exact path="/SignUp" element={<SignUp />}></Route>
                  <Route
                    exact
                    path="/SignUpCustomer"
                    element={<SignUpCustomer />}
                  ></Route>
                  <Route
                    exact
                    path="/SignUpCarShowroom"
                    element={<SignUpCarShowroom />}
                  ></Route>
                  <Route
                    exact
                    path="/SignUpServiceCenter"
                    element={<SignUpServiceCenter />}
                  ></Route>
                  <Route
                    exact
                    path="/admin/requests"
                    element={<Requests />}
                  ></Route>
                  <Route exact path="/Forum" element={<Fourm />}></Route>
                  <Route exact path="/Comment" element={<Comment />}></Route>
                  <Route exact path="/Reply" element={<Reply />}></Route>
                  <Route exact path="/MyPosts" element={<MyPosts />}></Route>
                  <Route
                    exact
                    path="/showShowroomOrders"
                    element={<ShowroomOrders />}
                  ></Route>

                  <Route
                    exact
                    path="/admin/addCar"
                    element={<AddCar />}
                  ></Route>
                  <Route
                    exact
                    path="/admin/addService"
                    element={<AddService />}
                  ></Route>
                  <Route exact path="/Cart" element={<Cart />}></Route>
                  <Route exact path="/MyOrders" element={<MyOrders />}></Route>
                  <Route
                    exact
                    path="/OrderDetails"
                    element={<OrderDetails />}
                  ></Route>

                  <Route
                    exact
                    path="/admin/profile"
                    element={<AdminProfile />}
                  ></Route>
                  <Route
                    exact
                    path="/ServiceCenter/profile"
                    element={<SCProfile />}
                  ></Route>
                  <Route
                    exact
                    path="/CarShowroom/profile"
                    element={<CSProfile />}
                  ></Route>
                  <Route
                    exact
                    path="/admin/addAdmin"
                    element={<AddAdmin />}
                  ></Route>
                  <Route
                    exact
                    path="/UpdateStock"
                    element={<UpdateStock />}
                  ></Route>
                </Routes>
              </div>
              <Footer />
            </div>
          </AuthContext.Provider>
        </AuthUpdateContext.Provider>
      </Router>
    </React.StrictMode>
  );
};

export default App;
