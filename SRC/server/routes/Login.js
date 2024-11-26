const express = require("express");
const router = express.Router();
const con = require("../db");



router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = `
      SELECT personName AS name, ownerID AS id, 'owner' AS type
      FROM owner
      WHERE username = '${username}' 
        AND userpassword = '${password}'
      UNION ALL
      SELECT personName AS name, technicianID AS id, 'technician' AS type
      FROM technician
      WHERE username = '${username}' 
        AND userpassword = '${password}'
      `;

    con.query(query, function (err, result) {
      if (err) throw err;
      if (!result.length) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
