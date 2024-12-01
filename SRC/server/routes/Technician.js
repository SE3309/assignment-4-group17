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

// POST route to schedule maintenance
router.post("/scheduleMaintenance", async (req, res) => {
  try {
    const { selectedPanels, scheduleDate, technicianId, maintenanceType } = req.body;

    // Get the last maintenance ID
    const getLastIdQuery = `
      SELECT MAX(maintenanceID) as lastId 
      FROM maintenance
    `;

    con.query(getLastIdQuery, function(err, result) {
      if (err) throw err;
      
      const lastId = result[0].lastId || 1500; // Default to 1500 if no records
      let values = selectedPanels
        .map((panel, index) => 
          `(${lastId + index + 1}, ${panel.panelID}, '${scheduleDate}', '${maintenanceType}', 'scheduled', ${technicianId})`
        )
        .join(',');

      const insertQuery = `
        INSERT INTO maintenance 
        (maintenanceID, panelID, scheduleDate, maintenanceType, maintenanceStatus, technicianID)
        VALUES ${values}
      `;

      con.query(insertQuery, function(err, result) {
        if (err) throw err;
        res.status(200).json({ message: "Schedule Maintenance Success!" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/updateMaintenance", async (req, res) => {
  try {
    const { scheduleDate, maintenanceType, maintenanceStatus, maintenanceID } =
      req.body;

    const query = `
    START TRANSACTION;
    UPDATE maintenance
    SET
        scheduleDate = '${scheduleDate}',
        maintenanceType = '${maintenanceType}',
        maintenanceStatus = '${maintenanceStatus}'
    WHERE maintenanceId = ${maintenanceID};
    SELECT *
    FROM maintenance
    WHERE maintenanceId = ${maintenanceID};
    COMMIT;
    `;

    con.query(query, function (err, result) {
      if (err) throw err;
      res.status(200).json(result[2][0]);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteMaintenance/:maintenanceID", async (req, res) => {
  try {
    const { maintenanceID } = req.params;

    const query = `
    DELETE FROM maintenance
    WHERE maintenanceID = ${maintenanceID}
    `;

    con.query(query, function (err, result) {
      if (err) throw err;
      res.status(200).json({ message: "Maintenance deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;