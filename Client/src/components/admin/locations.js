// React Components
import React, { useState } from "react";

// Components
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AddLocation from "./addLocation";
import DeleteLocation from "./deleteLocation";

function Locations() {
  const [key, setKey] = useState("Add Location");

  return (
    <div style={{ margin: "0 auto", width: "70%" }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Add Location" title="Add Location">
          <AddLocation />
        </Tab>
        <Tab eventKey="Delete Location" title="Delete Location">
          <DeleteLocation />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Locations;
