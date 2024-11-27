import "./DeleteMaintenance.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function DeleteMaintenance({ maintenanceData, setMaintenanceData }) {
  useEffect(() => {
    console.log(maintenanceData);
  }, [maintenanceData]);

  return (
    <div>
      <h1>Delete Maintenance: Maintenance {maintenanceData.maintenanceID}</h1>
      <p>{JSON.stringify(maintenanceData)}</p>
      <p>
        This is the data available, need to use it to delete the maintenance
        record.
      </p>
    </div>
  );
}

DeleteMaintenance.propTypes = {
  maintenanceData: PropTypes.object.isRequired,
  setMaintenanceData: PropTypes.func.isRequired,
};

export default DeleteMaintenance;
