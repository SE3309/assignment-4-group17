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
    axios.get(`/api/owner/panelCount`).then((res) => {
      if (res.data)
        setCountTable(
          <table className="table">
            <tr>
              <td>Farm ID</td>
              <td>Number of Panels</td>
            </tr>
            {res.data.map((entry) => (
              <tr key={entry.farmID}>
                <td>{entry.farmID}</td>
                <td>{entry.numOfPanels}</td>
              </tr>
            ))}
          </table>
        );
        
    });
  }, []);

  function totalEnergy() {
    axios
      .post(`/api/owner/energyProduced`, {
        fromDate: `${fromDate}`,
        toDate: `${toDate}`,
      })
      .then((res) => {
        if (res.data)
          setCountTable(
            <table className="table">
              <tr>
                <td>Farm ID</td>
                <td>Number of Panels</td>
                <td>Total Energy Produced</td>
              </tr>
              {res.data.map((entry) => (
                <tr key={entry.farmID}>
                  <td>{entry.farmID}</td>
                  <td>{entry.numOfPanels}</td>
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
      
      
    </div>
  );
}

export default Compare;
