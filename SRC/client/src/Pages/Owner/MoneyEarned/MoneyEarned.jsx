import "./MoneyEarned.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function MoneyEarned({ farmData }) {
  useEffect(() => {
    console.log(farmData);
  }, [farmData]);

  return (
    <div>
      <h1>Money Earned: Farm {farmData.farmID}</h1>
      <p>{JSON.stringify(farmData)}</p>
      <p>
        This is the data available, need to use it to get money earned for the
        farm with options for selecting date range.
      </p>
    </div>
  );
}

MoneyEarned.propTypes = {
  farmData: PropTypes.object.isRequired,
};

export default MoneyEarned;
