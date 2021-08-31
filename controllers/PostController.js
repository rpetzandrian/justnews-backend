const postModel = require("../models/PostModel");

const PostController = {
  getAllPosts: async (req, res) => {
    const request = {
      ...req.query,
    };
    const result = await postModel.getAllPosts(request);
    res.status(result.statusCode).send(result);
  },

  getPostBySlug: async (req, res) => {
    const request = {
      ...req.params,
      ...req.query,
    };

    const result = await postModel.getPostBySlug(request);
    res.status(result.statusCode).send(result);
  },

  getAllPostsByCategory: async (req, res) => {
    const request = {
      user_id: req.query.user_id || "",
    };

    const result = await postModel.getAllPostsByCategory(request);
    res.status(result.statusCode).send(result);
  },

  addNewPosts: async (req, res) => {
    const slug = `${req.body.title}`.toLowerCase().split(" ").join("-");
    const request = {
      ...req.body,
      slug: slug,
      cover: req.file ? `/uploads/cover/${req.file.filename}` : undefined,
    };
    // if (!req.file) {
    //   return res.status(400).send({
    //     message: "Field can`t empty",
    //     statusCode: 400,
    //   });
    // }

    const result = await postModel.addNewPosts(request);
    res.status(result.statusCode).send(result);
  },

  updatePosts: async (req, res) => {
    const slug = req.body.title.toLowerCase().split(" ").join("-");
    const request = {
      ...req.body,
      slug: slug,
      cover: req.file ? `/uploads/cover/${req.file.filename}` : undefined,
      ...req.params,
    };

    const result = await postModel.updatePosts(request);
    res.status(result.statusCode).send(result);
  },

  deletePosts: async (req, res) => {
    const request = {
      ...req.params,
    };

    const result = await postModel.deletePosts(request);
    res.status(result.statusCode).send(result);
  },

  likes: async (req, res) => {
    const request = {
      post_id: req.params.id,
      user_id: req.params.user_id,
    };

    const result = await postModel.likes(request);
    res.status(result.statusCode).send(result);
  },

  unlikes: async (req, res) => {
    const request = {
      post_id: req.params.id,
      user_id: req.params.user_id,
    };

    const result = await postModel.unlikes(request);
    res.status(result.statusCode).send(result);
  },

  save: async (req, res) => {
    const request = {
      post_id: req.params.id,
      user_id: req.params.user_id,
    };

    const result = await postModel.save(request);
    res.status(result.statusCode).send(result);
  },

  unsave: async (req, res) => {
    const request = {
      post_id: req.params.id,
      user_id: req.params.user_id,
    };

    const result = await postModel.unsave(request);
    res.status(result.statusCode).send(result);
  },

  watchs: async (req, res) => {
    const request = {
      id: req.params.id,
    };

    const result = await postModel.watchs(request);
    res.status(result.statusCode).send(result);
  },
};

module.exports = PostController;
