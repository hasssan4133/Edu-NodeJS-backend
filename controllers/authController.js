const httpStatus = require("http-status");
const { authService } = require("../services");
const Hashing = require("../utils/Hashing");

const register = async (req, res) => {
  let body = { ...req.body };
  body.email = String(req.body.email).toLocaleLowerCase().trim();
  body.password = Hashing.hash(req.body.password);
  const user = await authService.register(body, res);
  return res
    .status(httpStatus.CREATED)
    .send({ id: user._id, email: user.email });
};

const institutionRegister = async (req, res) => {
  let body = { ...req.body };
  body.email = String(req.body.email).toLocaleLowerCase().trim();
  body.password = Hashing.hash(req.body.password);
  const institution = await authService.institutionRegister(body, res);
  return res
    .status(httpStatus.CREATED)
    .send({ id: institution._id, email: institution.email });
};

const businessRegister = async (req, res) => {
  let body = { ...req.body };
  body.email = String(req.body.email).toLocaleLowerCase().trim();
  body.password = Hashing.hash(req.body.password);
  const business = await authService.businessRegister(body, res);
  return res
    .status(httpStatus.CREATED)
    .send({ id: business._id, email: business.email });
};

const login = async (req, res) => {
  let body = { ...req.body };
  body.email = String(req.body.email).toLocaleLowerCase().trim();
  const user = await authService.login(body, res);
  if (Hashing.compare(req.body.password, user.password)) {
    const token = user.generateAuthToken();
    return res
      .status(httpStatus.OK)
      .send({ accountType: body.accountType, token });
  } else
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Invalid password" });
};

module.exports = {
  register,
  institutionRegister,
  businessRegister,
  login,
};
