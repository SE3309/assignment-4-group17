import "./EnergyProduced.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function EnergyProduced({ farmData }) {
  useEffect(() => {
    console.log(farmData);
  }, [farmData]);

  return (
    <div>
      <h1>Energy Produced: Farm {farmData.farmID}</h1>

      <p>{JSON.stringify(farmData)}</p>
      <p>
        This is the data available, need to use it to get energy produced for
        the farm with options for selecting date range and grouping by
        conditions.
      </p>
    </div>
  );
}

EnergyProduced.propTypes = {
  farmData: PropTypes.object.isRequired,
};

export default EnergyProduced;
