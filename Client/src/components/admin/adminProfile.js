// React Components
import React, { useState } from "react";

// Components
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChangeName from "./changeName";
import ChangePassword from "./changePassword";

const AdminProfile = () => {
  const [key, setKey] = useState("Change Password");
  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Change Password" title="Change Password">
          <ChangePassword userType={"Admin"} />
        </Tab>
        <Tab eventKey="Change Name" title="Change Name">
          <ChangeName userType={"Admin"} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminProfile;
