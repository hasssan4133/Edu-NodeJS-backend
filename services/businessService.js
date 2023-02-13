const httpStatus = require("http-status");
const { BusinessModel } = require("../models");
const { ObjectId } = require("mongoose").Types;

const getBusiness = async (id, res) => {
  const business = await BusinessModel.aggregate([
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
    // {
    //   $lookup: {
    //     from: "projects",
    //     localField: "_id",
    //     foreignField: "institution_id",
    //     as: "projects",
    //   },
    // },
  ]);
  if (!business?.[0]) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Business not found" });
  }
  return business?.[0];
};

const updateBusiness = async (id, updatedBody, res) => {
  const business = await BusinessModel.findById(id);
  if (!business) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Institution not found" });
  }
  Object.keys(business._doc).forEach((key) => {
    if (updatedBody[key]) business[key] = updatedBody[key];
  });
  await business.save();
  return await getBusiness(id, res);
};

module.exports = {
  getBusiness,
  updateBusiness,
};
