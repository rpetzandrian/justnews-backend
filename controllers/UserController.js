const userModel = require("../models/UserModel");

const UserController = {
  getAllUsers: async (req, res) => {
    const request = {
      limit: req.query.limit,
      page: req.query.page,
    };
    const result = await userModel.getAllUsers(request);
    res.status(result.statusCode).send(result);
  },

  getUsersById: async (req, res) => {
    const request = {
      id: req.params.user_id,
    };

    const result = await userModel.getUsersById(request);
    res.status(result.statusCode).send(result);
  },

  addUsers: async (req, res) => {
    const request = {
      ...req.body,
      photo: req.file ? `/uploads/photo/${req.file.filename}` : undefined,
    };
    if (!request.email || !request.password) {
      return res.status(400).send({
        message: "Field can`t empty",
        statusCode: 400,
      });
    }

    const result = await userModel.addNewUsers(request);
    res.status(result.statusCode).send(result);
  },

  updateUsers: async (req, res) => {
    const request = {
      ...req.body,
      photo: req.file ? `/uploads/photo/${req.file.filename}` : undefined,
      id: req.params.user_id,
    };

    const result = await userModel.updateUsers(request);
    res.status(result.statusCode).send(result);
  },

  deleteUsers: async (req, res) => {
    const request = {
      id: req.params.user_id,
    };

    const result = await userModel.deleteUsers(request);
    res.status(result.statusCode).send(result);
  },
};

module.exports = UserController;
