import { useState, useEffect } from "react";
import "./Compare.css";

import axios from "axios";
import { useState, useEffect } from "react";

function Compare() {
  const [status, setStatus] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [energyTable, setEnergyTable] = useState("");
  const [countTable, setCountTable] = useState("");

  useEffect(function () {
    fetch(`/api/owner/panelCount`)
      .then((res) => res.json())
      .then((data) => {
        setCountTable(
          <table className="table">
            <tr>
              <td>Farm ID</td>
              <td>Number of Panels</td>
            </tr>
            {data.map((entry) => (
              <tr>
                <td>{entry.farmID}</td>
                <td>{entry.numOfPanels}</td>
              </tr>
            ))}
          </table>
        );
      });
  }, []);

  function totalEnergy() {
    fetch(`/api/owner/energyProduced`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fromDate: `${fromDate}`,
        toDate: `${toDate}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEnergyTable(
          <table className="table">
            <tr>
              <td>Farm ID</td>
              <td>Total Energy Produced</td>
            </tr>
            {data.map((entry) => (
              <tr>
                <td>{entry.farmID}</td>
                <td>{entry.totalEnergy}</td>
              </tr>
            ))}
          </table>
        );
      });
  }
  return (
    <div>
      <h1>Compare</h1>
      {countTable}
      <div className="compare-search">
        <p>Date From:</p>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          onChange={(e) => setFromDate(e.target.value)}
        />
        <p>Date To:</p>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          onChange={(e) => setToDate(e.target.value)}
        />
        <button onClick={totalEnergy}>Compare</button>
      </div>
      {status}
      {energyTable}
      <p>
        Need to get energy produced for all farms with options for selecting
        date range.
      </p>
    </div>
  );
}

export default Compare;
