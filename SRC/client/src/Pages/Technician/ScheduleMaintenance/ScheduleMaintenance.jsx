import "../../Owner/ViewPanels/ViewPanels.css";
import "./ScheduleMaintenance.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

function ScheduleMaintenance({ technicianData, farmData }) {
  const [panels, setPanels] = useState([]);
  const [selectedPanels, setSelectedPanels] = useState([]);
  const [message, setMessage] = useState("");

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

  function handlePanelClick(panel) {
    if (selectedPanels !== null && selectedPanels.includes(panel)) {
      setSelectedPanels(selectedPanels.filter((p) => p !== panel));
    } else {
      setSelectedPanels([...selectedPanels, panel]);
    }
  }

  async function scheduleMaintenance(e) {
    e.preventDefault();
    
    if (selectedPanels.length === 0) {
      setMessage("Please select at least one panel");
      return;
    }

    const formData = new FormData(e.target);
    const scheduleDate = formData.get("maintenanceDate");

    if (!scheduleDate) {
      setMessage("Please select a date");
      return;
    }

    try {
      const response = await axios.post("api/technician/scheduleMaintenance", {
        selectedPanels,
        scheduleDate,
        technicianId: technicianData.id
      });

      setMessage(response.data.message);
      setSelectedPanels([]); // Clear selections after successful scheduling
      e.target.reset(); // Reset form
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    }
  }

  return (
    <div className="viewpanels">
      <h1>View Panels: Farm {farmData.farmID}</h1>
      <p>
        You can select several panels, need to use the form to schedule
        maintenance for all selected panels.
      </p>
      {message && (
        <div className={`message ${message.includes("Success") ? "success" : "error"}`}>
          {message}
        </div>
      )}
      <div className="viewpanels-grid">
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
          <input type="date" name="maintenanceDate" required />
        </label>
        <label>
          Maintenance Type:
          <input 
            type="text" 
            name="maintenanceType" 
            value="cleaning" 
            disabled 
          />
        </label>
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

ScheduleMaintenance.propTypes = {
  technicianData: PropTypes.object.isRequired,
  farmData: PropTypes.object.isRequired,
};

export default ScheduleMaintenance;

