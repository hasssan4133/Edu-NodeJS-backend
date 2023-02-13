const httpStatus = require("http-status");
const path = require("path");
const fs = require("fs");
const { userService } = require("../services");

const getInstructors = async (req, res) => {
  const instructors = await userService.getInstructors(res);
  return res.status(httpStatus.OK).send(instructors);
};
const getSpecificInstructor = async (req, res) => {
  const instructorId = req.params.instructorId;
  const instructor = await userService.getSpecificInstructor(instructorId, res);
  return res.status(httpStatus.OK).send({ instructor });
};

const getUser = async (req, res) => {
  const user = await userService.getUser(req.authUser._id, res);
  return res
    .status(httpStatus.OK)
    .send({ user: { ...user, accountType: "Instructor" } });
};

const updateUser = async (req, res) => {
  if (!Object.keys(req.body).length)
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid data" });
  const user = await userService.updateUser(req.authUser._id, req.body, res);
  return res.status(httpStatus.OK).send(user);
};

const uploadProfileImage = async (req, res) => {
  if (!req.file)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Image required." });
  const body = {
    image: {
      data: fs.readFileSync(
        path.join(__dirname, "..", "profileImages", req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  };
  const user = await userService.updateUser(req.authUser._id, body, res);
  return res.status(httpStatus.OK).send(user);
};

const postEducationDetails = async (req, res) => {
  const user = req.authUser;
  const body = { ...req.body, user_id: user._id };
  const educationDetails = await userService.postEducationDetails(body);
  return res.status(httpStatus.CREATED).send(educationDetails);
};

const updateEducationDetails = async (req, res) => {
  if (!Object.keys(req.body).length)
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid data" });
  const educationDetailsId = req.params.educationDetailsId;
  const educationDetails = await userService.updateEducationDetails(
    educationDetailsId,
    req.body,
    res
  );
  return res.status(httpStatus.CREATED).send(educationDetails);
};

const postProfessionalDetails = async (req, res) => {
  const user = req.authUser;
  const body = { ...req.body, user_id: user._id };
  const professionalDetails = await userService.postProfessionalDetails(body);
  return res.status(httpStatus.CREATED).send(professionalDetails);
};

const updateProfessionalDetails = async (req, res) => {
  if (!Object.keys(req.body).length)
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid data" });
  const experienceId = req.params.experienceId;
  const experienceDetails = await userService.updateProfessionalDetails(
    experienceId,
    req.body,
    res
  );
  return res.status(httpStatus.CREATED).send(experienceDetails);
};

module.exports = {
  getInstructors,
  getSpecificInstructor,
  getUser,
  updateUser,
  uploadProfileImage,
  postEducationDetails,
  updateEducationDetails,
  postProfessionalDetails,
  updateProfessionalDetails,
};
