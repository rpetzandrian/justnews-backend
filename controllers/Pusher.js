const pusherModel = require('../models/Pusher')
const PushNotifications = require("@pusher/push-notifications-server");

const beamsClient = new PushNotifications({
  instanceId: "13adc372-e2ea-4d40-809b-cdf471336d3e",
  secretKey: "28115D9DE63550DBBDAFAF577F9238E5B48BC65F03601B824877806B3CF5F372",
});

const Pusher = {
  pushInterest: (req, res) => {
    const payload = req.body
    beamsClient
      .publishToInterests(payload.interest, {
        web: {
          notification: {
            title: payload.title,
            body: payload.body,
            deep_link: payload.link,
          },
        },
      })
      .then((publishResponse) => {
        res.status(200).send(publishResponse)
      })
      .catch((error) => {
        res.status(500).send(error)
      });
  },

  pushToUser: (req, res) => {
    const payload = req.body
    beamsClient
      .publishToUsers(payload.users, {
        web: {
          notification: {
            title: payload.title,
            body: payload.body,
            deep_link: payload.link,
          },
        },
      })
      .then((publishResponse) => {
        res.status(200).send(publishResponse)
      })
      .catch((error) => {
        res.status(500).send(error)
      });
  },

  generateToken: (req, res) => {
    const userId = req.query.user_id
    const beamsToken = beamsClient.generateToken(userId);
    res.send(JSON.stringify(beamsToken));
  }
}

module.exports = Pusher