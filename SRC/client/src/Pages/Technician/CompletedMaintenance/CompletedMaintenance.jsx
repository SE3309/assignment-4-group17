import "./CompletedMaintenance.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function CompletedMaintenance({ technicianData, farmData }) {
  const [completedMaintenanceData, setCompletedMaintenanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    console.log("Fetching completed maintenance for:");
    console.log("Farm ID:", farmData.farmID);
    console.log("Technician ID:", technicianData.id);

    axios
      .get(
        `/api/technician/farm/${farmData.farmID}/completedMaintenance/${technicianData.id}`
      )
      .then((res) => {
        console.log("API Response:", res.data);
        setCompletedMaintenanceData(res.data);
        setErrorMessage("");
      })
      .catch((err) => {
        console.error("Error fetching completed maintenance:", err);
        if (err.response?.status === 204) {
          setCompletedMaintenanceData([]);
          setErrorMessage("No completed maintenance records found.");
        } else {
          setErrorMessage("Failed to fetch completed maintenance.");
        }

        console.log(technicianData);
      });
  }, [farmData, technicianData]);

  return (
    <div className="completed-maintenance">
      <h1>Completed Maintenance for Farm {farmData.farmID}</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {completedMaintenanceData.length > 0 ? (
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Maintenance ID</th>
              <th>Panel ID</th>
              <th>Schedule Date</th>
              <th>Maintenance Type</th>
              <th>Status</th>
              <th>Technician ID</th>
            </tr>
          </thead>
          <tbody>
            {completedMaintenanceData.map((maintenance) => (
              <tr key={maintenance.maintenanceID}>
                <td>{maintenance.maintenanceID}</td>
                <td>{maintenance.panelID}</td>
                <td>{formatDate(maintenance.scheduleDate)}</td>
                <td>{maintenance.maintenanceType}</td>
                <td>{maintenance.maintenanceStatus}</td>
                <td>{maintenance.technicianID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !errorMessage && <p>No completed maintenance for this farm</p>
      )}
    </div>
  );
}

CompletedMaintenance.propTypes = {
  technicianData: PropTypes.object.isRequired,
  farmData: PropTypes.object.isRequired,
};

export default CompletedMaintenance;
