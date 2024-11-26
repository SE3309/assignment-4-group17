const express = require("express");
const app = express();

const con = require("./db");

// con.query(`SELECT * FROM conditions`, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });

app.use(express.json());

app.post("/login", async (req, res) => {
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/farms/:userid", async (req, res) => {
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

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
