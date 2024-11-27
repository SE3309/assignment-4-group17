const express = require("express");
const router = express.Router();
const con = require("../db");

// GET all farms
router.get("/farms", async (req, res) => {
  try {
    const query = `
        SELECT *
        FROM farm
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

// GET completed maintenance of a farm for a technician
router.get(
  "/farm/:farmid/completedMaintenance/:technicianid",
  async (req, res) => {
    try {
      const { farmid, technicianid } = req.params;

      const query = `
      SELECT m.*
      FROM maintenance m, panel p
      WHERE m.panelID = p.panelID
      AND p.farmID = ${farmid}
      AND technicianID = ${technicianid}
      AND maintenanceStatus = 'completed'
      `;

      con.query(query, function (err, result) {
        if (err) throw err;
        if (!result.length) {
          return res
            .status(204)
            .json({ message: "No completed maintenance found" });
        }
        res.status(200).json(result);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// GET scheduled maintenance of a farm for a technician
router.get(
  "/farm/:farmid/scheduledMaintenance/:technicianid",
  async (req, res) => {
    try {
      const { farmid, technicianid } = req.params;

      const query = `
        SELECT m.*
        FROM maintenance m, panel p
        WHERE m.panelID = p.panelID
        AND p.farmID = ${farmid}
        AND technicianID = ${technicianid}
        AND maintenanceStatus = 'scheduled'
        `;

      con.query(query, function (err, result) {
        if (err) throw err;
        if (!result.length) {
          return res
            .status(204)
            .json({ message: "No scheduled maintenance found" });
        }
        res.status(200).json(result);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
