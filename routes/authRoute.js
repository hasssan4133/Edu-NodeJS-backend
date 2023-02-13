const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares");
const { authValidation } = require("../validations");
const { authController } = require("../controllers");

router.post(
  "/signup",
  validate(authValidation.register),
  authController.register
);
router.post(
  "/signup/institution",
  validate(authValidation.institutionRegister),
  authController.institutionRegister
);
router.post(
  "/signup/business",
  validate(authValidation.businessRegister),
  authController.businessRegister
);
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
