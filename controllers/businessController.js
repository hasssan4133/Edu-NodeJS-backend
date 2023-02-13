const httpStatus = require("http-status");
const { businessService } = require("../services");

const getBusiness = async (req, res) => {
  const business = await businessService.getBusiness(req.authUser._id, res);
  return res
    .status(httpStatus.OK)
    .send({ user: { ...business, accountType: "Business" } });
};

const updateBusiness = async (req, res) => {
  if (!Object.keys(req.body).length)
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid data" });
  const business = await businessService.updateBusiness(
    req.authUser._id,
    req.body,
    res
  );
  return res.status(httpStatus.OK).send(business);
};

module.exports = {
  getBusiness,
  updateBusiness,
};
