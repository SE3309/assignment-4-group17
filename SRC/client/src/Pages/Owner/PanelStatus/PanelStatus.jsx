import "./PanelStatus.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function PanelStatus({ panelData }) {

  const [panelLogs,setPanelLogs]=useState('')
  const [panelMain,setPanelMain]=useState('')


  useEffect(() => {
    console.log(panelData);
    axios
    .get(`/api/owner/records/${panelData.panelID}`)
    .then((res) => {
      if (res.data) {
        setPanelLogs(
          <table className="table">
            <tr>
              <td>Log ID</td>
              <td>Author</td>
              <td>Message</td>
              <td>Date</td>

            </tr>
            {res.data.map((entry) => (
              <tr>
                <td>{entry.logID}</td>
                <td>{entry.author}</td>
                <td>{entry.message}</td>
                <td>{entry.logDate.split('T')[0]}</td>

              </tr>
            ))}
          </table>
        );
        setPanelMain(
          <table className="table">
            <tr>
              <td>ID</td>
              <td>Schedule Date</td>
              <td>Type</td>
              <td>Status</td>
              <td>Technician</td>

            </tr>
            
            <tr>
              <td>{res.data[0].maintenanceID}</td>
              <td>{res.data[0].scheduleDate.split('T')[0]}</td>
              <td>{res.data[0].maintenanceType}</td>
              <td>{res.data[0].maintenanceStatus}</td>
              <td>{res.data[0].technicianID}</td>


            </tr>
            
          </table>

        )
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, [panelData]);

  return (
    <div>
      <h1>Panel Status: Panel {panelData.panelID}</h1>
      <p>{JSON.stringify(panelData)}</p>
      <p>Past Logs</p>
      {panelLogs}
      <p>Future Maintenance</p>
      {panelMain}
      <p>
        This is the data available, need to use it to get most the recent log
        and scheduled maintenance records.
      </p>
    </div>
  );
}

PanelStatus.propTypes = {
  panelData: PropTypes.object.isRequired,
};

export default PanelStatus;
