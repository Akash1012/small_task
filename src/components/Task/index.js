import React, { useState, useEffect } from "react";
import EnhancedTable from "./Table";

import "./styles.css";
import Header from "./Header";

const TripDashBoard = () => {
  return (
    <>
      <div
        style={{
          margin: "20px",
        }}
      >
        <EnhancedTable />
      </div>
    </>
  );
};

export default TripDashBoard;
