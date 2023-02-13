const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { generalService } = require("../services");

const companyEmail = "chalknchartsdevelopment@gmail.com";
const API_KEY = "Q2IH6S5fQTOctKD0msupuQ";
const API_SECRET = "W6zLRhS95XD04PlanGPPOynfiFvnfExLMd2M";
const payload = {
  iss: API_KEY,
  exp: new Date().getTime() + 5000,
};

const createMeeting = async (req, res) => {
  //   console.log("user: ", req.authUser);
  const user = req.authUser;
  const { meetingWith, agenda, description, firstName, lastName, startTime } =
    req.body;
  const token = jwt.sign(payload, API_SECRET);
  console.log("zoom token : ", token);
  const options = {
    method: "POST",
    uri: `https://api.zoom.us/v2/users/${companyEmail}/meetings`,
    body: {
      topic: agenda,
      start_time: startTime,
      default_password: false,
      type: 1,
      settings: {
        contact_email: user?.email,
        contact_name: `${user?.firstName} ${user?.middleName} ${user?.lastName}`,
        email_notification: true,
        meeting_invitees: [{ email: companyEmail }, { email: meetingWith }],
        private_meeting: false,
        join_before_host: true,
        registrants_confirmation_email: true,
        registrants_email_notification: true,
      },
    },
    auth: {
      bearer: token,
    },
    header: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true,
  };
  const registrants = [
    {
      first_name: firstName,
      last_name: lastName,
      email: meetingWith,
    },
    {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    },
  ];
  generalService
    .createMeeting(user, req.body, options, registrants)
    .then((meeting) => {
      return res.status(httpStatus.OK).send(meeting);
    })
    .catch((err) => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const getMeetings = async (req, res) => {
  const user = req.authUser;
  const meetings = await generalService.getMeetings(user._id);
  return res.status(httpStatus.OK).send(meetings);
};

module.exports = {
  createMeeting,
  getMeetings,
};
