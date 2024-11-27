import "./UpdateMaintenance.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function UpdateMaintenance({ maintenanceData, setMaintenanceData }) {
  useEffect(() => {
    console.log(maintenanceData);
  }, [maintenanceData]);

  return (
    <div>
      <h1>Update Maintenance: Maintenance {maintenanceData.maintenanceID}</h1>
      <p>{JSON.stringify(maintenanceData)}</p>
      <p>
        This is the data available, need to use it to update the maintenance
        record.
      </p>
    </div>
  );
}

UpdateMaintenance.propTypes = {
  maintenanceData: PropTypes.object.isRequired,
  setMaintenanceData: PropTypes.func.isRequired,
};

export default UpdateMaintenance;
