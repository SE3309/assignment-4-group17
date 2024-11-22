const express = require("express");
const app = express();

const con = require('./db')


con.query(`SELECT * FROM conditions`, function (err, result) {
  if (err) throw err;
  console.log(result);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
