const express = require("express");
const app = express();

//settings
app.set("port", process.env.PORT || 4000); //Accede a puerto de variable del sistema sino existe accede al 4000

//middlewares
app.use(express.json());

//routes
app.use("/api", require("./src/routers/operations"));

module.exports = app;
