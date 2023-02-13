const express = require("express");
const router = express.Router();
const { authenticate, validate } = require("../middlewares");
const { institutionValidation } = require("../validations");
const { businessController } = require("../controllers");

router
  .route("/")
  .get(authenticate.verifyBusinessToken, businessController.getBusiness);
// .patch(
//   authenticate.verifyUserToken,
//   validate(institutionValidation.projectDetails),
//   userController.updateUser
// );

module.exports = router;
