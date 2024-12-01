import "./PanelEnergyProduced.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PanelEnergyProduced({ panelData }) {
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [groupedData, setGroupedData] = useState(null);
  const [longitudinalData, setLongitudinalData] = useState(null);
  const [selectedConditon, setSelectedCondition] = useState("-");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!dateRange.fromDate || !dateRange.toDate) {
      return;
    }
    if (dateRange.fromDate > dateRange.toDate) {
      setError("From date cannot be greater than to date");
      return;
    }

    axios
      .post("api/owner/panel/energyProduced", {
        panelID: panelData.panelID,
        farmID: panelData.farmID,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
      .then((res) => {
        if (res.status === 204) {
          setError("No data found for the given date range");
          setGroupedData(null);
          setLongitudinalData(null);
          return;
        }
        setGroupedData(
          res.data.groupedData.map((data) => {
            return {
              ...data,
              weatherDescription:
                data.weatherDescription.charAt(0).toUpperCase() +
                data.weatherDescription.slice(1),
            };
          })
        );

        setLongitudinalData(
          res.data.longitudinalData.map((data) => {
            return {
              ...data,
              currentDate: new Date(data.currentDate).toLocaleDateString(),
              weatherDescription:
                data.weatherDescription.charAt(0).toUpperCase() +
                data.weatherDescription.slice(1),
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="panelenergyproduced">
      <h1>Energy Produced: Panel {panelData.panelID}</h1>
      <form className="panelenergyproduced-dateform" onSubmit={handleSubmit}>
        <h3>Select your date range:</h3>
        <div className="panelenergyproduced-dateform-dates">
          <label>
            From:
            <input
              type="date"
              required
              value={dateRange.fromDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, fromDate: e.target.value })
              }
            />
          </label>
          <label>
            To:
            <input
              type="date"
              required
              value={dateRange.toDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, toDate: e.target.value })
              }
            />
          </label>
          <button type="submit">Submit</button>
        </div>
        {error && <p className="panelenergyproduced-error">{error}</p>}
      </form>

      {longitudinalData && groupedData && (
        <>
          <div className="panelenergyproduced-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                height={600}
                width={300}
                data={longitudinalData}
                margin={{ bottom: 10 }}
              >
                <Bar dataKey="energyProduced">
                  {longitudinalData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.weatherDescription === selectedConditon ||
                        selectedConditon === "-"
                          ? "purple"
                          : "lightgray"
                      }
                    />
                  ))}
                </Bar>
                <XAxis dataKey="currentDate">
                  <Label
                    value="Date"
                    offset={-10}
                    position="insideBottom"
                    style={{ textAnchor: "middle" }}
                  />
                </XAxis>
                <YAxis>
                  <Label
                    value="Energy Produced (Wh)"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip content={<CustomToolTip />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="panelenergyproduced-results">
            <div className="panelenergyproduced-results-group">
              <h3>Summary Results</h3>
              <p>
                Total Energy Produced:{" "}
                {groupedData
                  .reduce(
                    (prev, curr) => prev + parseFloat(curr.sumEnergyProduced),
                    0
                  )
                  .toFixed(2)}{" "}
                Wh
              </p>
              <p>
                Average Energy Produced:{" "}
                {(
                  groupedData.reduce(
                    (prev, curr) => prev + parseFloat(curr.sumEnergyProduced),
                    0
                  ) / longitudinalData.length
                ).toFixed(2)}{" "}
                Wh
              </p>
            </div>

            <div className="panelenergyproduced-results-group">
              <div className="panelenergyproduced-results-group-conditiontitle">
                <h3>Weather Condition Results</h3>
                <select onChange={(e) => setSelectedCondition(e.target.value)}>
                  <option value="-">-</option>
                  {groupedData.map((data) => (
                    <option
                      value={data.weatherDescription}
                      key={data.weatherDescription}
                    >
                      {data.weatherDescription}
                    </option>
                  ))}
                </select>
              </div>

              {selectedConditon !== "-" && (
                <>
                  <p>
                    Total Energy Produced:{" "}
                    {parseFloat(
                      groupedData.find(
                        (data) => data.weatherDescription === selectedConditon
                      ).sumEnergyProduced
                    ).toFixed(2)}{" "}
                    Wh
                  </p>
                  <p>
                    Average Energy Produced:{" "}
                    {parseFloat(
                      groupedData.find(
                        (data) => data.weatherDescription === selectedConditon
                      ).avgEnergyProduced
                    ).toFixed(2)}{" "}
                    Wh
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

PanelEnergyProduced.propTypes = {
  panelData: PropTypes.object.isRequired,
};

function CustomToolTip({ active, payload }) {
  if (payload && payload[0] && active) {
    return (
      <div className="custom-tooltip">
        <p>{`Date: ${payload[0].payload.currentDate}`}</p>
        <p>{`Energy Produced: ${payload[0].payload.energyProduced} Wh`}</p>
        <p>{`Avg Temperature: ${payload[0].payload.averageTemperature}°C`}</p>
        <p>{`Weather: ${payload[0].payload.weatherDescription}`}</p>
      </div>
    );
  }
  return null;
}

CustomToolTip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

export default PanelEnergyProduced;
