import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import "../../styles/forum.scss";
import { useAuth, useUpdateAuth } from "../context/authProvider";

import {
  TextField,
  Tabs,
  Tab,
  getListItemTextUtilityClass,
} from "@mui/material";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

function Reply() {
  //const { Post_ID } = useParams();
  const location = useLocation();
  React.useEffect(() => {
    console.log(location.state.commentID);
  }, []);
  const auth = useAuth();

  const [replyList, setReplyList] = useState([]);
  const [com, setCom] = useState("");
  const [userID, setUserID] = useState(auth.ID);
  const [date, setDate] = useState("ll");


 
  function al3() {
    alert("You Are Not Allowed To Do This");
  }
  function getReplies() {
    console.log(location.state);

    Axios.post("http://localhost:3001/GetReplies", {
      commentID: location.state.commentID,
    }).then((response) => {
      console.log(response.data);
      setReplyList(response.data);
    });
  }
  function al() {
    alert("Please Write Something");
  }
  function al3() {
    alert("You Are Not Allowed To Do This");
  }

  function addReply() {
    if (auth.userType !== undefined) {
      if (auth.userType === "Customer") {
        if (com !== "") {
          Axios.post("http://localhost:3001/AddReply", {
            Reply: com,
            Date: date,
            ReferredCommentID: location.state.commentID,
            postid: location.state.postId,
            userid: auth.ID,
          }).then((response) => {});
          getReplies();
          getReplies();

          setReplyList([...replyList, replyList]);
        } else {
          al();
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
    getReplies();
    getTime();
  }, []);

  //console.log(commentList);
  let replyList2;
  //console.log(commentList);
  replyList2 = replyList.map((item) => {
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

                    <div className="d-flex justify-content-between align-items-center"></div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  });

  return replyList2.length > 0 ? (
    <div>
      <MDBContainer className="py-2" style={{ maxWidth: "6000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="11" lg="9" xl="9">
            <div className="d-flex flex-start mb-4">
              <MDBCard className="w-100">
                <MDBCardBody className="p-4">
                  <div>
                    <MDBTypography tag="h3">
                      {location.state.comment.FName}{" "}
                      {location.state.comment.LName}
                    </MDBTypography>
                    <p className="small">{location.state.comment.Date}</p>
                    <p className="h5">{location.state.comment.Reply}</p>
                    <p></p>
                    <div className="d-flex justify-content-between align-items-center"></div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>{" "}
      <div className="createPost">
        <TextField
          className="commentInput"
          id="outlined-multiline-flexible"
          label="Write your reply here..."
          multiline
          rows={4}
          onChange={(e) => {
            setCom(e.target.value);
            getTime();
            console.log(date);
          }}
        />
        <br></br>
        <button className="group2" onClick={addReply}>
          Reply
        </button>{" "}
      </div>
      {replyList2}
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
                      {location.state.comment.FName}{" "}
                      {location.state.comment.LName}
                    </MDBTypography>
                    <p className="small">{location.state.comment.Date}</p>
                    <p className="h5">{location.state.comment.Reply}</p>
                    <p></p>
                    <div className="d-flex justify-content-between align-items-center"></div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>{" "}
      <div className="createPost">
        <TextField
          className="commentInput"
          id="outlined-multiline-flexible"
          label="Write your reply here..."
          multiline
          rows={4}
          onChange={(e) => {
            setCom(e.target.value);
            getTime();
            console.log(date);
          }}
        />
        <br></br>
        <button className="group2" onClick={addReply}>
          Reply
        </button>{" "}
      </div>
      <div className="Noo">No Replies Yet</div>
    </div>
  );
}

export default Reply;
