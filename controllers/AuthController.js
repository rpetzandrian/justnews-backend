const authModel = require("../models/AuthModel");

const AuthController = {
  register: async (req, res) => {
    const request = {
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    };
    if (!request.email || !request.password || !request.phone) {
      res.status(400).send({
        message: "Field can`t empty",
        statusCode: 400,
      });
      return;
    }
    try {
      const result = await authModel.register(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  login: async (req, res) => {
    if (req.query.provider === "google") {
      const request = { ...req.body };
      try {
        const result = await authModel.authGoogle(request);
        res.status(result.statusCode).send(result);
      } catch (err) {
        res.status(err.statusCode).send(err);
      }
    } else if (req.query.provider === "facebook") {
      const request = { ...req.body };
      try {
        const result = await authModel.authFb(request);
        res.status(result.statusCode).send(result);
      } catch (err) {
        res.status(err.statusCode).send(err);
      }
    } else {
      const request = {
        email: req.body.email,
        password: req.body.password,
      };
      if (!request.email || !request.password) {
        res.status(400).send({
          message: "Field can`t empty",
          statusCode: 400,
        });
        return;
      }
      try {
        const result = await authModel.login(request);
        console.log(result);
        res.status(result.statusCode).send(result);
      } catch (err) {
        console.log(err);
        res.status(err.statusCode).send(err);
      }
    }
  },
};

module.exports = AuthController;
