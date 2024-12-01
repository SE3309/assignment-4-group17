import "./EnergyProduced.css";
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

function EnergyProduced({ farmID }) {
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const total = data.reduce((acc, entry) => acc + entry.dailyEnergy, 0);
  console.log(total);

  const cleanDate = (dateString) => {
    return dateString.split("T")[0]; // Splits the string at "T" and takes the first part
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateRange.fromDate || !dateRange.toDate) {
      setError("Please select both dates.");
      return;
    }
    if (dateRange.fromDate > dateRange.toDate) {
      setError("From date cannot be later than To date.");
      return;
    }

    try {
      const response = await axios.post(`/api/owner/energyProduced/${farmID}`, {
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      });

      // Format the response for the chart
      const formattedData = response.data.map((entry) => ({
        date: cleanDate(entry.date), // Clean the date
        dailyEnergy: parseFloat(entry.dailyEnergy), // Ensure it's a number
      }));

      setData(formattedData);
      setError("");
    } catch (err) {
      setError("Failed to fetch energy data.");
      console.error(err);
    }
  };

  // Custom Tooltip Function
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>{`Date: ${label}`}</p>
          <p>{`Energy Produced: ${payload[0].value} Wh`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="energy-produced">
      <h1>Energy Produced for Farm {farmID}</h1>
      <form className="energy-produced-dateform" onSubmit={handleSubmit}>
        <div className="energy-produced-dateform-dates">
          <label>
            From:
            <input
              type="date"
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
              value={dateRange.toDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, toDate: e.target.value })
              }
            />
          </label>
          <button type="submit">Submit</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {data.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <XAxis dataKey="date">
                <Label value="Date" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label
                  value="Energy Produced (Wh)"
                  angle={-90}
                  position="insideLeft"
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="dailyEnergy" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <h3>Total Energy Produced: {total} Wh</h3>
        </>
      )}
    </div>
  );
}

export default EnergyProduced;
