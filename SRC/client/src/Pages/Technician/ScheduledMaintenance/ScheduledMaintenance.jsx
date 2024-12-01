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
    <div>
      <h1>Scheduled Maintenance: Farm {farmData.farmID}</h1>
      <p>This is the data returned, need to format it into a table.</p>
      {scheduledMaintenanceData.map((maintenance) => (
        /* temporary design just to test functionality */
        <div
          style={{
            border: "1px solid black",
            margin: "10px",
            cursor: "pointer",
            backgroundColor:
              maintenanceData.maintenanceID === maintenance.maintenanceID
                ? "green"
                : "white",
          }}
          onClick={() => setMaintenanceData(maintenance)}
          key={maintenance.maintenanceID}
        >
          <p>{JSON.stringify(maintenance)}</p>
        </div>
      ))}
      <button
        disabled={!Object.hasOwn(maintenanceData, "maintenanceID")}
        onClick={() => openUpdateModal()}
      >
        Update Selected Maintenance
      </button>
      <button
        disabled={!Object.hasOwn(maintenanceData, "maintenanceID")}
        onClick={() => openDeleteModal()}
      >
        Delete Selected Maintenance
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
