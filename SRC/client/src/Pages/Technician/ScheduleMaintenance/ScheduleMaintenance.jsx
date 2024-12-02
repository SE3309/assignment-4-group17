import "../../Owner/ViewPanels/ViewPanels.css";
import "./ScheduleMaintenance.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

function ScheduleMaintenance({ technicianData, farmData }) {
  const [panels, setPanels] = useState([]);
  const [selectedPanels, setSelectedPanels] = useState([]);
  const [maintenanceType, setMaintenanceType] = useState("cleaning"); // Default maintenance type
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

  // Function to handle maintenanceType change
  function handleMaintenanceTypeChange(e) {
    // Regex to allow only alphabets and spaces (block special characters)
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(e.target.value) && e.target.value.length <= 140) {
      setMaintenanceType(e.target.value); // Update maintenanceType if input is valid
    } else {
      // Display an error message or alert if invalid character is entered
      setMessage(
        "Maintenance type can only contain letters and spaces. (Max 140 characters)"
      );
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
        technicianId: technicianData.id,
        maintenanceType, // Include maintenanceType in the request
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
      <h1>Schedule Maintenance: Farm {farmData.farmID}</h1>
      <p>Select panel(s) to schedule maintenance.</p>
      {message && (
        <div
          className={`message ${
            message.includes("Success") ? "success" : "error"
          }`}
        >
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
      <form className="schedulemaintenance-form" onSubmit={scheduleMaintenance}>
        <div className="schedulemaintenance-form-inputs">
          <label>
            Date:
            <input type="date" name="maintenanceDate" required />
          </label>
          <label>
            Maintenance Type:
            <input
              type="text"
              name="maintenanceType"
              value={maintenanceType} // Bind the state value to input
              onChange={handleMaintenanceTypeChange} // Handle input changes
              required
            />
          </label>
          <button type="submit">Schedule</button>
        </div>
      </form>
    </div>
  );
}

ScheduleMaintenance.propTypes = {
  technicianData: PropTypes.object.isRequired,
  farmData: PropTypes.object.isRequired,
};

export default ScheduleMaintenance;
