import "./PanelStatus.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function PanelStatus({ panelData }) {
  useEffect(() => {
    console.log(panelData);
  }, [panelData]);

  return (
    <div>
      <h1>Panel Status: Panel {panelData.panelID}</h1>
      <p>{JSON.stringify(panelData)}</p>
      <p>
        This is the data available, need to use it to get most the recent log
        and scheduled maintenance records.
      </p>
    </div>
  );
}

PanelStatus.propTypes = {
  panelData: PropTypes.object.isRequired,
};

export default PanelStatus;
