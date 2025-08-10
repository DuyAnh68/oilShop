const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config/config");
const routes = require("./routes");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.default.NOT_FOUND, "Not found"));
});

module.exports = app;
