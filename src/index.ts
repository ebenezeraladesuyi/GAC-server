import express, { Application } from "express";
import dbConfig from "./config/db";
import appConfig from "./app";
import path from "path"

const app: Application = express();
// const app = express();


app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

appConfig(app)
dbConfig()

const PORT = 2021;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
