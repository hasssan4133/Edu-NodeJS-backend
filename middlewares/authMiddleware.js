const httpStatus = require("http-status");
let jwt = require("jsonwebtoken");
var userModel = require("../models/userModel");
var institutionModel = require("../models/institutionModel");
var businessModel = require("../models/businessModel");

const verifyAndIdentifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      const accountType = decoded?.accountType;
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          code: "token-invalid",
          message: "Token is not valid",
        });
      } else {
        const model =
          accountType === "Instructor"
            ? userModel
            : accountType === "Institution"
            ? institutionModel
            : accountType === "Business"
            ? businessModel
            : userModel;
        model.findOne({ _id: decoded._id }, function (err, user) {
          if (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          req.authUser = { ...user?._doc, accountType };
          next();
        });
      }
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      code: "token-invalid",
      message: "Auth token is not supplied",
    });
  }
};

const verifyUserToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          code: "token-invalid",
          message: "Token is not valid",
        });
      } else {
        userModel.findOne({ _id: decoded._id }, function (err, user) {
          if (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          req.authUser = user;
          next();
        });
      }
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      code: "token-invalid",
      message: "Auth token is not supplied",
    });
  }
};

const verifyInstituteToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          code: "token-invalid",
          message: "Token is not valid",
        });
      } else {
        institutionModel.findOne({ _id: decoded._id }, function (err, user) {
          if (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          req.authUser = user;
          next();
        });
      }
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      code: "token-invalid",
      message: "Auth token is not supplied",
    });
  }
};

const verifyBusinessToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          code: "token-invalid",
          message: "Token is not valid",
        });
      } else {
        businessModel.findOne({ _id: decoded._id }, function (err, user) {
          if (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              code: "token-invalid",
              message: "Token is not valid",
            });
          }
          req.authUser = user;
          next();
        });
      }
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      code: "token-invalid",
      message: "Auth token is not supplied",
    });
  }
};

module.exports = {
  verifyAndIdentifyToken,
  verifyUserToken,
  verifyInstituteToken,
  verifyBusinessToken,
};
