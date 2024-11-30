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

function EnergyProduced({ farmID, panelIDs }) {
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // Function to format dates to 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extracts only the date part
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
      let farmEnergyData = {};

      // Fetch energy data for each panel in the farm
      await Promise.all(
        panelIDs.map(async (panelID) => {
          const response = await axios.post("api/owner/panel/energyProduced", {
            panelID,
            farmID,
            fromDate: dateRange.fromDate,
            toDate: dateRange.toDate,
          });

          // Aggregate energy data for the farm
          response.data.longitudinalData.forEach((entry) => {
            const date = entry.currentDate;
            const energyProduced = parseFloat(entry.energyProduced);

            if (!farmEnergyData[date]) {
              farmEnergyData[date] = 0;
            }
            farmEnergyData[date] += energyProduced;
          });
        })
      );

      // Transform the aggregated data into a format suitable for the graph
      const formattedData = Object.entries(farmEnergyData).map(
        ([date, totalEnergyProduced]) => ({
          date: formatDate(date),
          totalEnergyProduced,
        })
      );

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
        <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
          <p>{`Date: ${label}`}</p>
          <p>{`Total Energy Produced: ${payload[0].value} Wh`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="energy-produced">
      <h1>Energy Produced for Farm {farmID}</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
      {error && <p className="error">{error}</p>}
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
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
            <Bar dataKey="totalEnergyProduced" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default EnergyProduced;
