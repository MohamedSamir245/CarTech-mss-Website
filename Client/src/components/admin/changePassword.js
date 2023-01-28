import Form from "react-bootstrap/Form";
import { useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../context/authProvider";

const ChangePassword = ({ userType }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validForm, setValidForm] = useState(0);
  const auth = useAuth();

  const changePassword = async () => {
    await Axios.post("http://localhost:3001/changePassword", {
      userType: userType,
      ID: auth["ID"],
      oldPassword: oldPassword,
      newPassword: newPassword,
    }).then((res) => {
      // Status = 0  =>> The password has been updated successfully!
      // Status = 1  =>> The new password is the same as the old one!
      // Status = 2  =>> The old password is incorrect!

      document.getElementById("changeStatus-invalid").innerHTML =
        res["data"]["msg"];
      document.getElementById("changeStatus-invalid").style.display = "block";
      console.log(res["data"]["status"]);

      if (res["data"]["status"] === 0) {
        document.getElementById("changeStatus-invalid").style.color = "green";
        setNewPassword("");
        setOldPassword("");
        setConfirmNewPassword("");
        setValidForm(0);
      } else if (res["data"]["status"] === 1) {
        document.getElementById("changeStatus-invalid").style.color = "red";
        setNewPassword("");
        setConfirmNewPassword("");
        setValidForm(validForm & 0b001);
      } else if (res["data"]["status"] === 2) {
        document.getElementById("changeStatus-invalid").style.color = "red";
        setOldPassword("");
        setValidForm(validForm & 0b110);
      }
    });
  };

  return (
    <Form>
      <Form.Check
        style={{ margin: "1%" }}
        label={`Show Passwords`}
        onChange={(e) => {
          if (e.target.checked === true) {
            document.getElementById("old-password").type = "text";
            document.getElementById("new-password").type = "text";
            document.getElementById("confirm-password").type = "text";
          } else {
            document.getElementById("old-password").type = "password";
            document.getElementById("new-password").type = "password";
            document.getElementById("confirm-password").type = "password";
          }
        }}
      />
      <Form.Group className="mb-3">
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          type="password"
          id="old-password"
          placeholder="Enter the old password"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);

            if (e.target.value.length === 0) {
              setValidForm(validForm & 0b110);
            } else {
              //Valid
              setValidForm(validForm | 0b001);
            }
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          id="new-password"
          placeholder="Enter the new password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);

            if (e.target.value.length === 0) {
              setValidForm(validForm & 0b101);
              document.getElementById("password-invalid").style.display =
                "none";
            } else if (e.target.value.length < 8) {
              //Invalid
              document.getElementById("password-invalid").style.display =
                "block";
              setValidForm(validForm & 0b101);
            } else {
              //Valid
              document.getElementById("password-invalid").style.display =
                "none";
              setValidForm(validForm | 0b010);
            }
          }}
        />
      </Form.Group>
      <div id="password-invalid" style={{ display: "none", color: "red" }}>
        The Password must be more than 8 characters
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          id="confirm-password"
          placeholder="Confirm the new password"
          value={confirmNewPassword}
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);

            if (e.target.value.length === 0) {
              document.getElementById("confirm-invalid").style.display = "none";
              setValidForm(validForm & 0b011);
            } else if (e.target.value !== newPassword) {
              //Invalid
              document.getElementById("confirm-invalid").style.display =
                "block";
              setValidForm(validForm & 0b011);
            } else {
              //Valid
              document.getElementById("confirm-invalid").style.display = "none";
              setValidForm(validForm | 0b100);
            }
          }}
        />
      </Form.Group>
      <div id="confirm-invalid" style={{ display: "none", color: "red" }}>
        This is not the same as the new password
      </div>

      <Button
        variant="primary"
        disabled={validForm !== 0b111}
        onClick={(e) => {
          e.preventDefault();
          changePassword();
        }}
      >
        Change Password
      </Button>
      <div id="changeStatus-invalid" style={{ display: "none" }}></div>
    </Form>
  );
};

export default ChangePassword;
