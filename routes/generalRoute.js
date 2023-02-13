const express = require("express");
const router = express.Router();
const { authenticate, validate } = require("../middlewares");
const { generalValidation } = require("../validations");
const { generalController } = require("../controllers");

router
  .route("/meeting")
  .post(
    authenticate.verifyAndIdentifyToken,
    validate(generalValidation.createMeeting),
    generalController.createMeeting
  )
  .get(authenticate.verifyAndIdentifyToken, generalController.getMeetings);

module.exports = router;
