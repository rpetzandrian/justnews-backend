const { invalidParameter } = require('../helpers/templateResponse');
const categoryModel = require('../models/CategoryModel');

const CategoryContrroller = {
  getAllCategory: async (req, res) => {
    const result = await categoryModel.getAllCategory()
    res.status(result.statusCode).send(result);
  },

  getCategoryById: async (req, res) => {
    const request = {
      id: req.params.id
    }

    if (!req.params.id) {
      let result = invalidParameter()
      return res.status(result.statusCode).send(result);
    }

    const result = await categoryModel.getCategoryById(request)
    res.status(result.statusCode).send(result);
  },

  addCategory: async (req, res) => {
    const request = {
      ...req.body,
      image: req.file ? `/uploads/images/${req.file.filename}` : undefined
    }

    if (!request.category) {
      let result = invalidParameter()
      return res.status(result.statusCode).send(result);
    }

    const result = await categoryModel.addCategory(request)
    res.status(result.statusCode).send(result);
  },

  updateCategory: async (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id
    }

    const result = await categoryModel.updateCategory(request)
    res.status(result.statusCode).send(result);
  },

  deleteCategory: async (req, res) => {
    const request = {
      id: req.params.id
    }

    const result = await categoryModel.deleteCategory(request)
    res.status(result.statusCode).send(result);
  }
}

module.exports = CategoryContrroller;