const httpStatus = require("http-status");
const { InstitutionModel, ProjectDetails } = require("../models");
const { ObjectId } = require("mongoose").Types;

const getInstitution = async (id, res) => {
  const institution = await InstitutionModel.aggregate([
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      $project: {
        password: 0,
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "institution_id",
        as: "projects",
      },
    },
  ]);
  if (!institution?.[0]) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Institution not found" });
  }
  return institution?.[0];
};

const updateInstitution = async (id, updatedBody, res) => {
  const institution = await InstitutionModel.findById(id);
  if (!institution) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Institution not found" });
  }
  Object.keys(institution._doc).forEach((key) => {
    if (updatedBody[key]) institution[key] = updatedBody[key];
  });
  await institution.save();
  return await getInstitution(id, res);
};

const postProjectDetails = async (body) => {
  return ProjectDetails.create(body);
};

const updateProjectDetails = async (id, updatedBody, res) => {
  const projectDetails = await ProjectDetails.findByIdAndUpdate(
    id,
    updatedBody,
    { new: true }
  );
  if (!projectDetails) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Project details not found" });
  }
  return projectDetails;
};

module.exports = {
  getInstitution,
  updateInstitution,
  postProjectDetails,
  updateProjectDetails,
};
