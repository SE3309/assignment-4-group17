import "./ViewPanels.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function ViewPanels({
  farmData,
  panelData,
  setPanelData,
  openStatusModal,
  openEnergyModal,
}) {
  const [panels, setPanels] = useState([]);

  // Fetch Panels of Farm
  useEffect(() => {
    axios
      .get(`api/owner/farm/${farmData.farmID}/panels`)
      .then((res) => {
        setPanels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [farmData]);

  return (
    <div className="viewpanels">
      <h1>View Panels: Farm {farmData.farmID}</h1>
      <p>Select a panel.</p>
      <div className="viewpanels-grid">
        {/* Map Over All Panels To Create Panel Grid */}
        {panels.map((panel) => (
          <div
            className={`viewpanels-panel ${panel.panelStatus} ${
              panelData.panelID === panel.panelID ? "selected" : ""
            }`}
            key={panel.panelID}
            onClick={() => setPanelData(panel)} // Send Panel Data To Parent
          ></div>
        ))}
      </div>
      <div className="viewpanels-options">
        {/* View Panel Status */}
        <button
          disabled={!Object.hasOwn(panelData, "panelID")}
          onClick={openStatusModal}
        >
          View Panel Status
        </button>
        {/* View Panel Energy Produced */}
        <button
          disabled={!Object.hasOwn(panelData, "panelID")}
          onClick={openEnergyModal}
        >
          View Panel Energy Produced
        </button>
      </div>
    </div>
  );
}

ViewPanels.propTypes = {
  farmData: PropTypes.object.isRequired,
  panelData: PropTypes.object.isRequired,
  setPanelData: PropTypes.func.isRequired,
  openStatusModal: PropTypes.func.isRequired,
  openEnergyModal: PropTypes.func.isRequired,
};

export default ViewPanels;
