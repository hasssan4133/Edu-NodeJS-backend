const httpStatus = require("http-status");
const { User, EducationDetails, ProfessionalDetails } = require("../models");
const { ObjectId } = require("mongoose").Types;

const getInstructors = async (res) => {
  const user = await User.aggregate([
    {
      $project: {
        password: 0,
        recoveryEmail: 0,
      },
    },
    {
      $lookup: {
        from: "educationaldetails",
        localField: "_id",
        foreignField: "user_id",
        as: "educationDetails",
      },
    },
    {
      $lookup: {
        from: "professionaldetails",
        localField: "_id",
        foreignField: "user_id",
        as: "professionalDetails",
      },
    },
  ]);
  if (!user?.[0]) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Instructors not found" });
  }
  return user;
};
const getSpecificInstructor = async (id, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      $project: {
        password: 0,
        recoveryEmail: 0,
      },
    },
    {
      $lookup: {
        from: "educationaldetails",
        localField: "_id",
        foreignField: "user_id",
        as: "educationDetails",
      },
    },
    {
      $lookup: {
        from: "professionaldetails",
        localField: "_id",
        foreignField: "user_id",
        as: "professionalDetails",
      },
    },
  ]);
  if (!user?.[0]) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Instructor not found" });
  }
  return user?.[0];
};

const getUser = async (id, res) => {
  const user = await User.aggregate([
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
        from: "educationaldetails",
        localField: "_id",
        foreignField: "user_id",
        as: "educationDetails",
      },
    },
    {
      $lookup: {
        from: "professionaldetails",
        localField: "_id",
        foreignField: "user_id",
        as: "professionalDetails",
      },
    },
  ]);
  if (!user?.[0]) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "User not found" });
  }
  return user?.[0];
};

const updateUser = async (id, updatedBody, res) => {
  const user = await User.findById(id);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "User not found" });
  }
  Object.keys(user._doc).forEach((key) => {
    if (updatedBody[key]) user[key] = updatedBody[key];
  });
  await user.save();
  return await getUser(id, res);
};

const postEducationDetails = async (body) => {
  return EducationDetails.create(body);
};

const updateEducationDetails = async (id, updatedBody, res) => {
  const educationDetails = await EducationDetails.findByIdAndUpdate(
    id,
    updatedBody,
    { new: true }
  );
  if (!educationDetails) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Education details not found" });
  }
  return educationDetails;
};

const postProfessionalDetails = async (body) => {
  return ProfessionalDetails.create(body);
};

const updateProfessionalDetails = async (id, updatedBody, res) => {
  const professionalDetails = await ProfessionalDetails.findByIdAndUpdate(
    id,
    updatedBody,
    { new: true }
  );
  if (!professionalDetails) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Experience details not found" });
  }
  return professionalDetails;
};

module.exports = {
  getInstructors,
  getSpecificInstructor,
  getUser,
  updateUser,
  postEducationDetails,
  updateEducationDetails,
  postProfessionalDetails,
  updateProfessionalDetails,
};
