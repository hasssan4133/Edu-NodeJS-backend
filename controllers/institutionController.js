const httpStatus = require("http-status");
const { institutionService } = require("../services");

const getInstitution = async (req, res) => {
  const institution = await institutionService.getInstitution(
    req.authUser._id,
    res
  );
  return res
    .status(httpStatus.OK)
    .send({ user: { ...institution, accountType: "Institution" } });
};

const updateInstitution = async (req, res) => {
  if (!Object.keys(req.body).length)
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid data" });
  const institution = await institutionService.updateInstitution(
    req.authUser._id,
    req.body,
    res
  );
  return res.status(httpStatus.OK).send(institution);
};

const postProjectDetails = async (req, res) => {
  const user = req.authUser;
  const body = { ...req.body, institution_id: user._id };
  const projectDetails = await institutionService.postProjectDetails(body);
  return res.status(httpStatus.CREATED).send(projectDetails);
};

const updateProjectDetails = async (req, res) => {
  if (!Object.keys(req.body).length)
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid data" });
  const projectDetailsId = req.params.projectDetailsId;
  const projectDetails = await institutionService.updateProjectDetails(
    projectDetailsId,
    req.body,
    res
  );
  return res.status(httpStatus.CREATED).send(projectDetails);
};

module.exports = {
  getInstitution,
  updateInstitution,
  postProjectDetails,
  updateProjectDetails,
};
