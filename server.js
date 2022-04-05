require("dotenv").config();
const cors = require("cors");

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();
const views = require("./config/views");
app.use(cors());
views(app);
routes(app);

// dbInitialSetup(); // Crea tablas e inserta datos de prueba.

const { callSupabaseDbToBreakAutoPause } = require("./utils/utils");
const fiveDaysMilisecons = 1000 * 60 * 60 * 24 * 5;
setInterval(callSupabaseDbToBreakAutoPause, fiveDaysMilisecons);

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`)
);
