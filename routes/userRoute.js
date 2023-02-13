const express = require("express");
const router = express.Router();
const { authenticate, validate, upload } = require("../middlewares");
const { userValidation } = require("../validations");
const { userController } = require("../controllers");

router.route("/instructors").get(userController.getInstructors);
router
  .route("/instructors/:instructorId")
  .get(userController.getSpecificInstructor);

router
  .route("/")
  .get(authenticate.verifyUserToken, userController.getUser)
  .patch(
    authenticate.verifyUserToken,
    validate(userValidation.updateUser),
    userController.updateUser
  );

router
  .route("/profile-image")
  .post(
    authenticate.verifyUserToken,
    upload.single("file"),
    userController.uploadProfileImage
  );

router
  .route("/education")
  .post(
    authenticate.verifyUserToken,
    validate(userValidation.educationalDetails),
    userController.postEducationDetails
  );

router
  .route("/education/:educationDetailsId")
  .patch(authenticate.verifyUserToken, userController.updateEducationDetails);

router
  .route("/experience")
  .post(
    authenticate.verifyUserToken,
    validate(userValidation.professionalExperience),
    userController.postProfessionalDetails
  );

router
  .route("/experience/:experienceId")
  .patch(
    authenticate.verifyUserToken,
    userController.updateProfessionalDetails
  );

module.exports = router;
