const express= require('express')
const router= express.Router()
const con = require("../db");

router.get("/farms/:userid", async (req, res) => {
    try {
      const { userid } = req.params;
  
      const query = `
      SELECT *
      FROM farms
      WHERE ownerID = ${userid}
      `;
  
      con.query(query, function (err, result) {
        if (err) throw err;
        if (!result.length) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }
        res.status(200).json(result[0]);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;