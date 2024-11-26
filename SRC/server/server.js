const express = require("express");
const app = express();

// const con = require("./db");
app.use(express.json());

const loginRoute = require("./routes/Login");
const ownerRoute = require("./routes/Owner");
const technicianRoute = require("./routes/Technician");

app.use("/login", loginRoute);
app.use("/owner", ownerRoute);
app.use("/technician", technicianRoute);

// con.query(`SELECT * FROM conditions`, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
