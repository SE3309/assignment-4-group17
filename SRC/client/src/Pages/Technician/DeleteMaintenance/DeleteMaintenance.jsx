import "./DeleteMaintenance.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState } from "react";

function DeleteMaintenance({
  maintenanceData,
  setMaintenanceData,
  closeModal,
}) {
  const [message, setMessage] = useState("");

  function handleDelete() {
    axios
      .delete(
        `api/technician/deleteMaintenance/${maintenanceData.maintenanceID}`
      )
      .then((res) => {
        setMaintenanceData({
          maintenanceID: maintenanceData.maintenanceID,
          removed: true,
        });
        setMessage("Maintenance deleted successfully");
      })
      .catch((err) => {
        setMessage("Failed to delete maintenance");
      });
  }

  return (
    <div>
      <h1>Delete Maintenance: Maintenance {maintenanceData.maintenanceID}</h1>
      <h2>Are you sure you want to delete this maintenance record?</h2>
      <button onClick={closeModal}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}

DeleteMaintenance.propTypes = {
  maintenanceData: PropTypes.object.isRequired,
  setMaintenanceData: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DeleteMaintenance;
