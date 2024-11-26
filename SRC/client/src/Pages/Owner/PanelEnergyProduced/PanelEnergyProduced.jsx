import "./PanelEnergyProduced.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function PanelEnergyProduced({ panelData }) {
  useEffect(() => {
    console.log(panelData);
  }, [panelData]);

  return (
    <div>
      <h1>Energy Produced: Panel {panelData.panelID}</h1>
      <p>{JSON.stringify(panelData)}</p>
      <p>
        This is the data available, need to use it to get energy produced for
        the panel with options for selecting date range and grouping by
        conditions.
      </p>
    </div>
  );
}

PanelEnergyProduced.propTypes = {
  panelData: PropTypes.object.isRequired,
};

export default PanelEnergyProduced;
