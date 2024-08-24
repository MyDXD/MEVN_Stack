var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

require("dotenv").config();
require("./db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRoutes = require("./routes/authRoutes");
var productRoutes = require("./routes/products");
var orderRoutes = require("./routes/order");
var approveRoutes = require("./routes/approve");

var app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/", authRoutes); // login , register
app.use("/api/v1/", approveRoutes); // approveRoutes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRoutes); // นำเข้า route สำหรับสินค้า
app.use("/api/v1/", orderRoutes); // นำเข้า route orders

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
