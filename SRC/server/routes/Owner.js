const express = require("express");
const router = express.Router();
const con = require("../db");

// GET all farms of a owner
router.get("/farms/:ownerid", async (req, res) => {
  try {
    const { ownerid } = req.params;

    const query = `
      SELECT *
      FROM farm
      WHERE ownerID = ${ownerid}
      `;

    con.query(query, function (err, result) {
      if (err) throw err;
      if (!result.length) {
        return res.status(204).json({ message: "No farms found" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all panels of a farm
router.get("/farm/:farmid/panels", async (req, res) => {
  try {
    const { farmid } = req.params;

    const query = `
      SELECT *
      FROM panel
      WHERE farmID = ${farmid}
      `;

    con.query(query, function (err, result) {
      if (err) throw err;
      if (!result.length) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET panel count of all farms
router.get("/panelCount", async (req, res) => {
  try {
    const query = `
        SELECT farmID, COUNT(1) as numOfPanels
        FROM panel
        GROUP BY farmID
        `;

    con.query(query, function (err, result) {
      if (err) res.status(404).json({ error: err });
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST total energy produced by all farms
router.post("/energyProduced", async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;

    const query = `
        SELECT farmID, SUM(e.energyProduced) as totalEnergy, COUNT(DISTINCT p.panelID) as numOfPanels
        FROM panel p,energyProduced e
        WHERE e.panelID=p.panelID
            AND e.currentDate<='${toDate}'
            AND e.currentDate>='${fromDate}'
        GROUP BY farmID
        `;

    con.query(query, function (err, result) {
      if (err) res.status(404).json({ error: err });

      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all records of a panel
router.get("/records/:panelID", async (req, res) => {
  try {
    const { panelID } = req.params;
    console.log(panelID);

    const query = `
        SELECT *
        FROM logs l, maintenance m
        WHERE l.panelID=m.panelID AND l.panelID='${panelID}'
        ORDER BY logDate DESC
        LIMIT 5
        `;

    con.query(query, function (err, result) {
      if (err) throw err;

      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST gets panel energy produced
router.post("/panel/energyProduced", async (req, res) => {
  try {
    const { panelID, farmID, fromDate, toDate } = req.body;

    const query = `
    SELECT weatherConditions.weatherDescription, SUM(energyProduced.energyProduced) as sumEnergyProduced, AVG(energyProduced.energyProduced) as avgEnergyProduced
    FROM energyProduced
    JOIN weather ON energyProduced.currentDate = weather.currentDate
    JOIN farmWeather ON farmWeather.weatherID = weather.weatherID
    JOIN weatherConditions ON weatherConditions.weatherID = weather.weatherID
    WHERE energyProduced.panelID = ${panelID}
      AND farmWeather.farmID = ${farmID}
      AND energyProduced.currentDate >= '${fromDate}'
      AND energyProduced.currentDate <= '${toDate}'
    GROUP BY weatherConditions.weatherDescription
    `;

    con.query(query, function (err, result) {
      if (err) res.status(404).json({ error: err });

      const query2 = `
      SELECT *
      FROM energyProduced
      JOIN weather ON energyProduced.currentDate = weather.currentDate
      JOIN farmWeather ON farmWeather.weatherID = weather.weatherID
      JOIN weatherConditions ON weatherConditions.weatherID = weather.weatherID
      WHERE energyProduced.panelID = ${panelID}
        AND farmWeather.farmID = ${farmID}
        AND energyProduced.currentDate >= '${fromDate}'
        AND energyProduced.currentDate <= '${toDate}'
      `;
      con.query(query2, function (err, result2) {
        if (err) res.status(404).json({ error: err });
        res
          .status(200)
          .json({ groupedData: result, longitudinalData: result2 });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
