const notifModel = require('../models/NotifModel');

const NotifController = {
  getNotif: async (req, res) => {
    const request = { user_id: req.params.user_id, read: req.query.read }

    const result = await notifModel.getNotif(request)
    res.status(result.statusCode).send(result);
  },

  readNotif: async (req, res) => {
    const request = { user_id: req.params.user_id }

    const result = await notifModel.readNotif(request)
    res.status(result.statusCode).send(result);
  },

  pushNotif: async (req, res) => {
    const request = { ...req.body }

    const result = await notifModel.pushNotif(request)
    res.status(result.statusCode).send(result);
  },

  deleteNotif: async (req, res) => {
    const request = { ...req.body }

    const result = await notifModel.deleteNotif(request)
    res.status(result.statusCode).send(result);
  },
};

module.exports = NotifController