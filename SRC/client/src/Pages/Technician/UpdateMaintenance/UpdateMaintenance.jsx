import "./UpdateMaintenance.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState } from "react";

function UpdateMaintenance({
  maintenanceData,
  setMaintenanceData,
  closeModal,
}) {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(maintenanceData);

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    axios
      .post("api/technician/updateMaintenance", {
        maintenanceID: data.maintenanceID,
        scheduleDate: new Date(data.scheduleDate).toISOString().slice(0, 10),
        maintenanceType: data.maintenanceType,
        maintenanceStatus: data.maintenanceStatus,
      })
      .then((res) => {
        setMaintenanceData(res.data);
        window.alert("Maintenance updated successfully");
        closeModal();
      })
      .catch((err) => {
        setMessage("Failed to update maintenance");
      });
  }

  return (
    <div>
      <h1>Update Maintenance: Maintenance {maintenanceData.maintenanceID}</h1>
      {data && (
        <>
          <form className="updateMaintenance-form" onSubmit={handleSubmit}>
            <label>
              Scheduled Date
              <input
                required
                type="date"
                value={new Date(data.scheduleDate).toISOString().slice(0, 10)}
                onChange={(e) =>
                  setData({ ...data, scheduleDate: e.target.value })
                }
              />
            </label>
            <label>
              Maintenance Type
              <input
                required
                maxLength={140}
                type="text"
                value={data.maintenanceType}
                onChange={(e) =>
                  setData({ ...data, maintenanceType: e.target.value })
                }
              />
            </label>
            <label>
              Maintenance Status
              <select
                required
                value={data.maintenanceStatus}
                onChange={(e) =>
                  setData({ ...data, maintenanceStatus: e.target.value })
                }
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <button type="submit">Update Maintenance</button>
          </form>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
}

UpdateMaintenance.propTypes = {
  maintenanceData: PropTypes.object.isRequired,
  setMaintenanceData: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UpdateMaintenance;
