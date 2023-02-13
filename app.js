require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 5000;
var cors = require("cors");
var app = express();

//DB Connection

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "chalkncharts",
  })
  .catch((err) => {
    console.log("Mongoose Connection error: ", err);
  });

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));
app.get("/", function (req, res) {
  res.send("Welcome to Chalk n Charts server.");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
require("./routes")(app);

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

app.listen(PORT, () => {
  console.log(
    `Server is listening on PORT:${PORT} at ${new Date().toISOString()}`
  );
});

module.exports = app;
