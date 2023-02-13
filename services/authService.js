const httpStatus = require("http-status");
const { User, InstitutionModel, BusinessModel } = require("../models");

const register = async (userBody, res) => {
  const foundUser = await User.findOne({ email: userBody.email });
  if (foundUser) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Email already taken" });
  }
  return User.create(userBody);
};

const institutionRegister = async (body, res) => {
  const foundInstitute = await InstitutionModel.findOne({ email: body.email });
  if (foundInstitute) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Email already taken" });
  }
  return InstitutionModel.create(body);
};

const businessRegister = async (body, res) => {
  const foundBusiness = await BusinessModel.findOne({ email: body.email });
  if (foundBusiness) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Email already taken" });
  }
  return BusinessModel.create(body);
};

const login = async (userBody, res) => {
  const foundUser =
    userBody.accountType === "Instructor"
      ? await User.findOne({ email: userBody.email })
      : userBody.accountType === "Institution"
      ? await InstitutionModel.findOne({ email: userBody.email })
      : userBody.accountType === "Business"
      ? await BusinessModel.findOne({ email: userBody.email })
      : null;
  if (!foundUser) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "User with this email dont exist" });
  }
  return foundUser;
};

module.exports = {
  register,
  institutionRegister,
  businessRegister,
  login,
};
