const commentModel = require('../models/CommentModel');

const CommentController = {
  getAllComments: async (req, res) => {
    const request = {
      post_id: req.params.post_id
    }

    const result = await commentModel.getAllComments(request)
    res.status(result.statusCode).send(result);
  },

  addNewComments: async (req, res) => {
    const request = {
      ...req.body,
      user_id: req.params.user_id
    }

    const result = await commentModel.addNewComments(request)
    res.status(result.statusCode).send(result);
  },

  updateComments: async (req, res) => {
    const request = {
      ...req.body,
      user_id: req.params.user_id,
      id: req.params.id
    }

    const result = await commentModel.updateComments(request)
    res.status(result.statusCode).send(result);
  },

  deleteComments: async (req, res) => {
    const request = {
      id: req.params.id,
      user_id: req.params.user_id
    }

    const result = await commentModel.deleteComments(request)
    res.status(result.statusCode).send(result);
  }
}

module.exports = CommentController;