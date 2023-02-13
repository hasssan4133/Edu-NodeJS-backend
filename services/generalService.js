const httpStatus = require("http-status");
const request = require("request");
const jwt = require("jsonwebtoken");
const { MeetingModel, User } = require("../models");
const { ObjectId } = require("mongoose").Types;

const companyEmail = "chalknchartsdevelopment@gmail.com";
const API_KEY = "Q2IH6S5fQTOctKD0msupuQ";
const API_SECRET = "W6zLRhS95XD04PlanGPPOynfiFvnfExLMd2M";
const payload = {
  iss: API_KEY,
  exp: new Date().getTime() + 5000,
};

const createMeeting = (user, body, options, registrants) => {
  return new Promise(function (resolve, reject) {
    request(options, async function (error, response, responseBody) {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log("body: ", responseBody);
      const { id, start_url, join_url, topic, timezone, created_at } =
        responseBody;
      const meetingBody = {
        createdBy: user._id,
        meetingWith: body.meetingWith,
        name: `${body.firstName} ${body.lastName}`,
        creatorName:
          user?.accountType === "Institution"
            ? user?.institutionName
            : user?.accountType === "Business"
            ? user?.businessName
            : user?.accountType === "Instructor"
            ? `${user?.firstName} ${user?.middleName} ${user?.lastName}`
            : "",
        meetingId: id,
        topic,
        description: body.description,
        startTime: body.startTime,
        timezone,
        start_url,
        join_url,
        created_at,
      };
      const meeting = await MeetingModel.create(meetingBody);
      resolve(meeting);
      //////// FOR SENDING EMAILS TO PARTICIPANTS /////////
      //   const token = jwt.sign(payload, API_SECRET);
      //   registrants.forEach((registrant) => {
      //     const registrantOptions = {
      //       method: "POST",
      //       uri: `https://api.zoom.us/v2/meetings/${responseBody.id}/registrants`,
      //       body: registrant,
      //       auth: {
      //         bearer: token,
      //       },
      //       header: {
      //         "User-Agent": "Zoom-api-Jwt-Request",
      //         "content-type": "application/json",
      //       },
      //       json: true,
      //     };
      //     request(registrantOptions, function (error, response, responseBody) {
      //       if (error) {
      //         console.log(error);
      //         return error;
      //       }
      //       console.log("body: ", responseBody);
      //     });
      //   });
    });
  });
};

const getMeetings = async (id) => {
  const meetings = await MeetingModel.find({
    $or: [
      { createdBy: ObjectId(id).toString() },
      { meetingWith: ObjectId(id).toString() },
    ],
  });
  return meetings;
};

module.exports = {
  createMeeting,
  getMeetings,
};
