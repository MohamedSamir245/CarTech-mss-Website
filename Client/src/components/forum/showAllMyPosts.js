import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../styles/forum.scss";
import { TextField, Tabs, Tab } from "@mui/material";
import { useAuth, useUpdateAuth } from "../context/authProvider";
import { Link, useParams, useLocation } from "react-router-dom";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function MyPosts() {
  const auth = useAuth();
  const location = useLocation();
  const [postList, setPostList] = useState([]);
  const [userID, setUserID] = useState(0);
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [VID, SetVID] = useState(0);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [date, setDate] = useState("ll");
  const [y, setY] = useState("6");
  const [postID, setPostID] = useState(0);
  const [fname, setFname] = useState("kiko");
  const [lname, setLname] = useState("");

  function al() {
    alert("Please Write Something");
  }
  

  function getPosts() {
    Axios.get("http://localhost:3001/GetPosts").then((response) => {
      setPostList(response.data);
      setTimeout(() => {
        console.log(auth);
      }, 5000);
    });
    console.log(postList);
  }

  function getVehicles() {
    Axios.get("http://localhost:3001/GetAllVehicles").then((response) => {
      setVehiclesList(response.data);
      //console.log(postList);
    });
  }
  function GetCustomerDataaById() {
    Axios.post("http://localhost:3001/GetCustomerDataaById", {
      id: location.state.userID,
    }).then((response) => {
      setFname(response.data[0].FName);
      setLname(response.data[0].LName);

      //console.log(postList);
    });
  }
  function GetPostByCustomerId() {
    // console.log(auth.ID);

    Axios.post("http://localhost:3001/GetPostByCustomerId", {
      customerID: location.state.userID,
    }).then((response) => {
      console.log(location.state.userID);

      setPostList(response.data);
      console.log(response.data);
      //console.log(postList);
    });
    console.log(postList);
  }

  function getVehicleNameByID(x) {
    console.log(x);
    console.log(vehiclesList);
    if (x) {
      for (let i = 0; i < vehiclesList.length; i++) {
        if (vehiclesList[i].V_ID === x)
          return (
            " _ _ _ _ _ _ _ _ _ _ The Car Type is " + vehiclesList[i].CarName
          );
      }
    } else {
      return " _ _ _ _ _ _ _ _ _ _ The Car Type is Not Specified";
    }
  }

  function addPost() {
    if (post !== "") {
      Axios.post("http://localhost:3001/AddPost", {
        userID: auth.ID,
        VID: VID,
        date: date,
        post: post,
      }).then((response) => {});
      GetPostByCustomerId();
      GetPostByCustomerId();
    } else {
      alert("Please Write Something");
    }
  }
  function addPostNull() {
    if (post !== "") {
      Axios.post("http://localhost:3001/AddPostNull", {
        userID: auth.ID,
        date: date,
        post: post,
      }).then((response) => {});
      GetPostByCustomerId();
      GetPostByCustomerId();
    } else {
      alert("Please Write Something");
    }
  }
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

  useEffect(() => {
    getTime();
    GetPostByCustomerId();
    GetCustomerDataaById();
    getVehicles();
  }, []);

  function addComment() {
    console.log(postID);
    Axios.post("http://localhost:3001/AddComment", {
      Reply: comment,
      Date: date,
      ReferredCommentID: 0,
      postid: postID,
      userid: userID,
    }).then((response) => {});
  }

  let postList2;

  console.log(postList);
  postList2 = postList.map((item) => {
    return (
      <MDBContainer className="py-2" style={{ maxWidth: "6000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="11" lg="9" xl="9">
            <div className="d-flex flex-start mb-4">
              <MDBCard className="w-100">
                <MDBCardBody className="p-4">
                  <div>
                    <MDBTypography tag="h3">
                      {item.FName} {item.LName}
                    </MDBTypography>
                    <p className="small">
                      {"Date: " + item.Date} {getVehicleNameByID(item.V_ID)}
                    </p>
                    <p className="h5">{item.Post}</p>
                    <p></p>

                    <div className="d-flex justify-content-between align-items-center">
                      <TextField
                        className="commentInput"
                        id="outlined-multiline-flexible"
                        label="Write your comment here..."
                        multiline
                        maxRows={2}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                      <div className="comment">
                        <button
                          className="one"
                          onClick={() => {
                            if (comment !== "") {
                              Axios.post("http://localhost:3001/AddComment", {
                                Reply: comment,
                                Date: date,
                                ReferredCommentID: 0,
                                postid: item.Post_ID,
                                userid: auth.ID,
                              }).then((response) => {});
                            } else {
                              al();
                            }
                          }}
                        >
                          Comment
                        </button>
                        <Link
                          to="/Comment"
                          className="one"
                          state={{ postID: item.Post_ID, post: item }}
                        >
                          Show All Comments
                        </Link>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  });

  if (postList.length > 1) {
    return (
      <div>
        <div className="createPost">
          <TextField
            className="commentInput"
            id="outlined-multiline-flexible"
            label="Write your post here..."
            multiline
            rows={4}
            onChange={(e) => {
              getTime();
              console.log(date);
              setPost(e.target.value);
            }}
          />
          <br></br>
          <div className="hi">
            <select
              className="form-select"
              placeholder="ccc"
              name="condition"
              defaultValue="all"
              onChange={(e) => {
                SetVID(e.target.value);
              }}
            >
              <option value="pp" disabled selected>
                Select Referred Vehicle...
              </option>
              {vehiclesList.map((item) => (
                <option key={item.V_ID} value={item.V_ID}>
                  {item.CarName}
                </option>
              ))}
            </select>
            <Link to="/Forum" className="group2">
              Return to The Main Forum
            </Link>
            <button className="group2" onClick={VID ? addPost : addPostNull}>
              Post
            </button>
          </div>

          <h1 className="Posts">
            {fname} {lname} Posts{" "}
          </h1>
        </div>
        {postList2}
      </div>
    );
  } else {
    return (
      <div>
        <div className="createPost">
          <TextField
            className="commentInput"
            id="outlined-multiline-flexible"
            label="Write your post here..."
            multiline
            rows={4}
            onChange={(e) => {
              setPost(e.target.value);
              getTime();
              console.log(date);
            }}
          />
          <br></br>
          <div className="hi">
            <select
              className="form-select"
              placeholder="ccc"
              name="condition"
              defaultValue="all"
              onChange={(e) => {
                SetVID(e.target.value);
              }}
            >
              <option value="pp" disabled selected>
                Select Referred Vehicle...
              </option>
              {vehiclesList.map((item) => (
                <option key={item.V_ID} value={item.V_ID}>
                  {item.CarName}
                </option>
              ))}
            </select>
            <Link to="/Forum" className="group2">
              Return to The Main Forum
            </Link>
            <button className="group2" onClick={addPost}>
              Post
            </button>
          </div>

          <h1 className="Posts">All Your Posts </h1>
        </div>
        <div className="Noo">You Haven't Posted Yet</div>
      </div>
    );
  }
}
