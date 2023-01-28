// React Components
import React, { useState } from "react";

// Components
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import ChangeName from "../admin/changeName";
import ChangePassword from "../admin/changePassword";

const SCProfile = () => {
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
          <ChangePassword userType={"ServiceCenter"} />
        </Tab>
        {/* <Tab eventKey="Change Name" title="Change Name">
          <ChangeName userType={"ServiceCenter"} />
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default SCProfile;
