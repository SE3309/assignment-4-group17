import "./ScheduledMaintenance.css";
import PropTypes from "prop-types";


import axios from "axios";
import { useState, useEffect } from "react";


function ScheduledMaintenance({
  technicianData,
  farmData,
  maintenanceData,
  setMaintenanceData,
  openUpdateModal,
  openDeleteModal,
}) {
  const [scheduledMaintenanceData, setScheduledMaintenanceData] = useState([]);
  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  useEffect(() => {
    axios
      .get(
        `api/technician/farm/${farmData.farmID}/scheduledMaintenance/${technicianData.id}`
      )
      .then((res) => {
        setScheduledMaintenanceData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [farmData, technicianData]);

  useEffect(() => {
    setScheduledMaintenanceData((prevData) => {
      let updatedMaintenanceData = [];
      prevData.forEach((maintenance) => {
        if (maintenance.maintenanceID === maintenanceData.maintenanceID) {
          if (
            !maintenanceData.removed &&
            maintenanceData.maintenanceStatus === "scheduled"
          ) {
            updatedMaintenanceData.push(maintenanceData);
          }
        } else {
          updatedMaintenanceData.push(maintenance);
        }
      });
      return updatedMaintenanceData;
    });
    if (maintenanceData.removed) setMaintenanceData({});
  }, [maintenanceData, setMaintenanceData]);

  return (
    <div className="scheduled-maintenance">
      <h1>Scheduled Maintenance: Farm {farmData.farmID}</h1>
       {scheduledMaintenanceData.length > 0 ? (
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
            {scheduledMaintenanceData.map((maintenance) => (
              <tr
                key={maintenance.maintenanceID}
                style={{
                  backgroundColor:
                    maintenanceData.maintenanceID === maintenance.maintenanceID
                      ? "lightgreen"
                      : "white",
                  cursor: "pointer",
                }}
                onClick={() => setMaintenanceData(maintenance)}
              >
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
       <p>No scheduled maintenance for this farm</p>
      )}
      <button disabled={!Object.hasOwn(maintenanceData, "maintenanceID")}
      onClick={() => openUpdateModal()}>
       Update
      </button>
      <button
       disabled={!Object.hasOwn(maintenanceData, "maintenanceID")}
      onClick={() => openDeleteModal()}>
      Delete
      </button>
    </div>
  );
}

ScheduledMaintenance.propTypes = {
  technicianData: PropTypes.object.isRequired,
  farmData: PropTypes.object.isRequired,
  maintenanceData: PropTypes.object.isRequired,
  setMaintenanceData: PropTypes.func.isRequired,
  openUpdateModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default ScheduledMaintenance;