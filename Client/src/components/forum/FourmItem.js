import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/forum.scss";
import { TextField, Tabs, Tab, checkboxClasses } from "@mui/material";
import { useAuth, useUpdateAuth } from "../context/authProvider";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Fourm() {
  const auth = useAuth();

  const [postList, setPostList] = useState([]);
  const [userID, setUserID] = useState(auth.ID);
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [VID, SetVID] = useState(0);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [date, setDate] = useState("ll");
  const [y, setY] = useState("6");
  const [postID, setPostID] = useState(0);

  function al() {
    alert("Please Write Something");
  }
  function al2() {
    alert("Please Log In First");
  }
  function al3() {
    alert("You Are Not Allowed To Do This");
  }
  function getPosts() {
    Axios.get("http://localhost:3001/GetPosts").then((response) => {
      setPostList(response.data);
      //console.log(postList);
    });
  }

  function getVehicles() {
    Axios.get("http://localhost:3001/GetAllVehicles").then((response) => {
      setVehiclesList(response.data);
      //console.log(postList);
    });
  }

  function getVehicleNameByID(x) {
    console.log(x);
    console.log(vehiclesList);
    if (x) {
      for (let i = 0; i < vehiclesList.length; i++) {
        if (vehiclesList[i].V_ID === x)
          return (
            " _ _ _ _ _ _ _ _ _ _ The Car Type is " +
            vehiclesList[i].CarName +
            "," +
            vehiclesList[i].CompanyMark
          );
      }
    } else {
      return " _ _ _ _ _ _ _ _ _ _ The Car Type is Not Specified";
    }
  }
  function addPost() {
    if (auth.userType !== undefined) {
      if (auth.userType === "Customer") {
        if (post !== "") {
          Axios.post("http://localhost:3001/AddPost", {
            userID: auth.ID,
            VID: VID,
            date: date,
            post: post,
          }).then((response) => {});
          getPosts();
          getPosts();
          // setPostList([...postList, postList]);
        } else {
          alert("Please Write Something");
        }
      } else {
        al3();
      }
    } else {
      alert("Please Log In First");
    }
  }
  function addPostNull() {
    if (auth.userType !== undefined) {
      if (auth.userType === "Customer") {
        if (post !== "") {
          Axios.post("http://localhost:3001/AddPostNull", {
            userID: auth.ID,
            date: date,
            post: post,
          }).then((response) => {});
          getPosts();
          getPosts();
          //setPostList([...postList, postList]);
        } else {
          alert("Please Write Something");
        }
      } else {
        al3();
      }
    } else {
      alert("Please Log In First");
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
    getVehicles();
    getTime();
    console.log(auth);
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
  // function showAllComments() {
  //   <Route exact path="/SignUp" component={SignUp} />;
  // }

  useEffect(() => {
    getPosts();
  }, []);

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
                            if (auth.userType !== undefined) {
                              if (auth.userType === "Customer") {
                                if (comment !== "") {
                                  Axios.post(
                                    "http://localhost:3001/AddComment",
                                    {
                                      Reply: comment,
                                      Date: date,
                                      ReferredCommentID: 0,
                                      postid: item.Post_ID,
                                      userid: auth.ID,
                                    }
                                  ).then((response) => {});
                                } else {
                                  al();
                                }
                              } else {
                                al3();
                              }
                            } else {
                              al2();
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

  return postList.length > 1 ? (
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
            console.log(auth.userType);

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
            style={
              auth.userType === undefined || auth.userType !== "Customer"
                ? { pointerEvents: "none" }
                : null
            }
            onChange={(e) => {
              SetVID(e.target.value);
            }}
          >
            <option value="pp" disabled selected>
              Select Referred Vehicle...
            </option>
            {vehiclesList.map((item) => (
              <option key={item.V_ID} value={item.V_ID}>
                {item.CarName + ","}
                {item.CompanyMark}
              </option>
            ))}
          </select>
          <Link
            to="/MyPosts"
            className="group2"
            state={{ userID: auth.ID }}
            style={
              auth.userType === undefined || auth.userType !== "Customer"
                ? { pointerEvents: "none" }
                : null
            }
          >
            Show All My Posts
          </Link>
          <button className="group2" onClick={VID ? addPost : addPostNull}>
            Post
          </button>
        </div>

        <h1 className="Posts">All Posts </h1>
      </div>
      {postList2}
    </div>
  ) : (
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
                {item.CarName + ","}
                {item.CompanyMark}
              </option>
            ))}
          </select>
          <Link to="/MyPosts" className="group2">
            Show All My Posts
          </Link>
          <button className="group2" onClick={addPost}>
            Post
          </button>
        </div>

        <h1 className="Posts">All Posts </h1>
      </div>
      <div className="Noo">No Posts Yet</div>
    </div>
  );
}
