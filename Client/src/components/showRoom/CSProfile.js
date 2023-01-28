// React Components
import React, { useState } from "react";

// Components
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChangePassword from "../admin/changePassword";
import UpdateStock from "./updateStock";

const CSProfile = () => {
  const [key, setKey] = useState("Change Password");

  return (
    <div className="scprofile">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Change Password" title="Change Password">
          <ChangePassword userType={"CarShowroom"} />
        </Tab>
        <Tab eventKey="Change Name" title="Change Name">
          {/* <ChangeName userType={"CarShowroom"} /> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default CSProfile;
