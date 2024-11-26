const express = require("express");
const app = express();

app.use(express.json());

const loginRoute = require("./routes/login");
const ownerRoute = require("./routes/owner");
const technicianRoute = require("./routes/technician");

app.use("/login", loginRoute);
app.use("/owner", ownerRoute);
app.use("/technician", technicianRoute);

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
