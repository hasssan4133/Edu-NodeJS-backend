const express = require("express");
const router = express.Router();
const { authenticate, validate } = require("../middlewares");
const { institutionValidation } = require("../validations");
const { institutionController } = require("../controllers");

router
  .route("/")
  .get(authenticate.verifyInstituteToken, institutionController.getInstitution);
// .patch(
//   authenticate.verifyUserToken,
//   validate(institutionValidation.projectDetails),
//   userController.updateUser
// );

router
  .route("/project")
  .post(
    authenticate.verifyInstituteToken,
    validate(institutionValidation.projectDetails),
    institutionController.postProjectDetails
  );

router
  .route("/project/:projectDetailsId")
  .patch(
    authenticate.verifyInstituteToken,
    institutionController.updateProjectDetails
  );

module.exports = router;
