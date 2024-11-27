import "./CompletedMaintenance.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function CompletedMaintenance({ technicianData, farmData }) {
  const [completedMaintenanceData, setCompletedMaintenanceData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `api/technician/farm/${farmData.farmID}/completedMaintenance/${technicianData.id}`
      )
      .then((res) => {
        setCompletedMaintenanceData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [farmData, technicianData]);

  return (
    <div>
      <h1>Completed Maintenance: Farm {farmData.farmID}</h1>
      <p>{JSON.stringify(completedMaintenanceData)}</p>
      <p>This is the data returned, need to format it into a table.</p>
    </div>
  );
}

CompletedMaintenance.propTypes = {
  technicianData: PropTypes.object.isRequired,
  farmData: PropTypes.object.isRequired,
};

export default CompletedMaintenance;
