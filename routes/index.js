const generalRoutes = require("./generalRoute");
const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const institutionRoutes = require("./institutionRoute");
const businessRoutes = require("./businessRoute");

module.exports = function (app) {
  app.use("/general", generalRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/institution", institutionRoutes);
  app.use("/business", businessRoutes);
};
