import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { TextField, Tabs, Tab } from "@mui/material";
import "../../styles/forum.scss";
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
function al() {
  alert("Please Write Something");
}
function al2() {
  alert("Please Log In First");
}
function al3() {
  alert("You Are Not Allowed To Do This");
}

function Comment() {
  //const { Post_ID } = useParams();
  const location = useLocation();
  React.useEffect(() => {
    console.log(location.state.postID);
  }, []);
  const auth = useAuth();

  const [commentList, setCommentList] = useState([]);
  const [userID, setUserID] = useState(auth.ID);
  const [comment, setComment] = useState("");
  const [com, setCom] = useState("");
  const [date, setDate] = useState("ll");
  const [vehiclesList, setVehiclesList] = useState([]);

  function getVehicles() {
    Axios.get("http://localhost:3001/GetAllVehicles").then((response) => {
      setVehiclesList(response.data);
      //console.log(postList);
    });
  }

  function addComment() {
    if (auth.userType !== undefined) {
      if (auth.userType === "Customer") {
        if (com !== "") {
          Axios.post("http://localhost:3001/AddComment", {
            Reply: com,
            Date: date,
            ReferredCommentID: 0,
            postid: location.state.postID,
            userid: auth.ID,
          }).then((response) => {});
          GetComments();
          GetComments();

          setCommentList([...commentList, commentList]);
        } else {
          al();
        }
      } else {
        al3();
      }
    } else {
      al2();
    }
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
  function GetComments() {
    Axios.post("http://localhost:3001/GetComments", {
      postID: location.state.postID,
    }).then((response) => {
      console.log(response.data);
      setCommentList(response.data);
    });
  }
  useEffect(() => {
    GetComments();
    getTime();
    getVehicles();
  }, []);

  //console.log(commentList);
  let commentList2;
  //console.log(commentList);
  commentList2 = commentList.map((item) => {
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
                    <p className="small">{item.Date}</p>
                    <p className="h5">{item.Reply}</p>
                    <p></p>
                    <div className="d-flex justify-content-between align-items-center">
                      <TextField
                        className="commentInput"
                        id="outlined-multiline-flexible"
                        label="Write your reply here..."
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
                                  Axios.post("http://localhost:3001/AddReply", {
                                    Reply: comment,
                                    Date: "22/12/2022",
                                    ReferredCommentID: item.Comment_id,
                                    postid: item.Post_ID,
                                    userid: auth.ID,
                                  }).then((response) => {});
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
                          Reply
                        </button>
                        <Link
                          to="/Reply"
                          className="one"
                          state={{
                            commentID: item.Comment_id,
                            postId: item.Post_ID,
                            comment: item,
                          }}
                        >
                          Show All Replies
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

  return commentList.length > 0 ? (
    <div>
      <div className="createPost">
        <MDBContainer className="py-2" style={{ maxWidth: "6000px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="11" lg="9" xl="9">
              <div className="d-flex flex-start mb-4">
                <MDBCard className="w-100">
                  <MDBCardBody className="p-4">
                    <div>
                      <MDBTypography tag="h3">
                        {location.state.post.FName} {location.state.post.LName}
                      </MDBTypography>
                      <p className="small">
                        {"Date: " + location.state.post.Date}{" "}
                        {getVehicleNameByID(location.state.post.V_ID)}
                      </p>
                      <p className="h5">{location.state.post.Post}</p>
                      <p></p>

                      <div className="d-flex justify-content-between align-items-center"></div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <TextField
          className="commentInput"
          id="outlined-multiline-flexible"
          label="Write your comment here..."
          multiline
          rows={4}
          onChange={(e) => {
            setCom(e.target.value);
            getTime();
            console.log(date);
          }}
        />
        <br></br>
        <button className="group2" onClick={addComment}>
          Comment
        </button>{" "}
      </div>

      {commentList2}
    </div>
  ) : (
    <div>
      <MDBContainer className="py-2" style={{ maxWidth: "6000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="11" lg="9" xl="9">
            <div className="d-flex flex-start mb-4">
              <MDBCard className="w-100">
                <MDBCardBody className="p-4">
                  <div>
                    <MDBTypography tag="h3">
                      {location.state.post.FName} {location.state.post.LName}
                    </MDBTypography>
                    <p className="small">
                      {"Date: " + location.state.post.Date}{" "}
                      {getVehicleNameByID(location.state.post.V_ID)}
                    </p>
                    <p className="h5">{location.state.post.Post}</p>
                    <p></p>

                    <div className="d-flex justify-content-between align-items-center"></div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="createPost">
        <TextField
          className="commentInput"
          id="outlined-multiline-flexible"
          label="Write your comment here..."
          multiline
          rows={4}
          onChange={(e) => {
            setCom(e.target.value);
            getTime();
            console.log(date);
          }}
        />
        <br></br>
        <button className="group2" onClick={addComment}>
          Comment
        </button>{" "}
      </div>
      <div className="Noo">No Comments Yet</div>
    </div>
  );
}

export default Comment;
