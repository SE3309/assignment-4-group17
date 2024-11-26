const express = require("express");
const router = express.Router();
const con = require("../db");



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

router.get("/farm/:farmid/panels", async (req, res) => {
  try {
    const { farmid } = req.params;
    console.log(farmid);

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

router.get("/panelCount", async (req, res) => {
  try {
    const query = `
        SELECT farmID,COUNT(1) as numOfPanels
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
router.post("/energyProduced", async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;

    const query = `
        SELECT farmID,SUM(e.energyProduced) as totalEnergy
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
module.exports = router;
