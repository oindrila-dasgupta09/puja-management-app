const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const pujaRoutes = require("./routes/pujaRoutes");
// new modules
const purohitRoutes = require("./routes/purohitRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Puja API Running");
});

app.use("/api/users", userRoutes);
app.use("/api/pujas", pujaRoutes);
app.use("/api/purohits", purohitRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
