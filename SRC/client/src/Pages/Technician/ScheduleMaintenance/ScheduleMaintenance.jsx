import "../../Owner/ViewPanels/ViewPanels.css";
import "./ScheduleMaintenance.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function ScheduleMaintenance({ technicianData, farmData }) {
  const [panels, setPanels] = useState([]);
  const [selectedPanels, setSelectedPanels] = useState([]);

  // Fetch Panels of Farm
  useEffect(() => {
    console.log(farmData);
    axios
      .get(`api/owner/farm/${farmData.farmID}/panels`)
      .then((res) => {
        setPanels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [farmData]);

  function handlePanelClick(panel) {
    if (selectedPanels !== null && selectedPanels.includes(panel)) {
      setSelectedPanels(selectedPanels.filter((p) => p !== panel));
    } else {
      setSelectedPanels([...selectedPanels, panel]);
    }
  }

  function scheduleMaintenance(e) {
    e.preventDefault();
    console.log(selectedPanels);
  }

  return (
    <div className="viewpanels">
      <h1>View Panels: Farm {farmData.farmID}</h1>
      <p>
        You can select several panels, need to use the form to schedule
        maintenance for all selected panels.
      </p>
      <div className="viewpanels-grid">
        {/* Map Over All Panels To Create Panel Grid */}
        {panels.map((panel) => (
          <div
            className={`viewpanels-panel ${panel.panelStatus} ${
              selectedPanels.includes(panel) ? "selected" : ""
            }`}
            key={panel.panelID}
            onClick={() => handlePanelClick(panel)}
          ></div>
        ))}
      </div>
      <form onSubmit={scheduleMaintenance}>
        <label>
          Date:
          <input type="date" name="maintenanceDate" />
        </label>
        <label>
          Maintenance Type:
          <input type="text" name="maintenanceType" />
        </label>
        <button>Schedule</button>
      </form>
    </div>
  );
}

ScheduleMaintenance.propTypes = {
  technicianData: PropTypes.object.isRequired,
  farmData: PropTypes.object.isRequired,
};

export default ScheduleMaintenance;
