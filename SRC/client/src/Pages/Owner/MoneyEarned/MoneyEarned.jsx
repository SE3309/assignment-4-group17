import React, { useState } from "react";
import axios from "axios";
import "./MoneyEarned.css";

function MoneyEarned({ farmData }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    moneyToGetPaid: 0,
    dailyEarnings: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEarnings = async () => {
    setLoading(true);
    setError("");
    setEarnings({ totalEarnings: 0, moneyToGetPaid: 0, dailyEarnings: [] });

    try {
      const response = await axios.post("/api/owner/moneyEarned", {
        farmID: farmData.farmID,
        fromDate,
        toDate,
      });

      console.log("API Response:", response.data); // Debugging

      if (response.data) {
        setEarnings(response.data);
      } else {
        setEarnings({ totalEarnings: 0, moneyToGetPaid: 0, dailyEarnings: [] });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch earnings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formattedTotalEarnings =
    typeof earnings.totalEarnings === "number"
      ? earnings.totalEarnings.toFixed(2)
      : "0.00";

  return (
    <div className="money-earned">
      <h2>Earnings for Farm {farmData.farmID}</h2>
      <div className="money-earned-dateform">
        <div className="money-earned-dateform-dates">
          <label>
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To Date:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <button
            onClick={fetchEarnings}
            disabled={!fromDate || !toDate || loading}
          >
            {loading ? "Loading..." : "Get Earnings"}
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {earnings && (
        <div className="earnings-results">
          {earnings.totalEarnings === 0 &&
          earnings.dailyEarnings.length === 0 ? (
            <p>No earnings data available for this date range.</p>
          ) : (
            <div>
              <h3>Total Earnings</h3>
              <p>
                <strong>${earnings.totalEarnings}</strong>
              </p>
              <h3>Money to Get Paid</h3>
              <p>
                <strong>${earnings.moneyToGetPaid}</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MoneyEarned;
