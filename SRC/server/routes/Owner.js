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

    const query = `
      SELECT *
      FROM panel
      WHERE farmID = ${farmid}
      `;

    con.query(query, function (err, result) {
      if (err) throw err;
      if (!result.length) {
        return res.status(204).json({ message: "No panels found" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
