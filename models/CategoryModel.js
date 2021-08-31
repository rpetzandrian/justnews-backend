// const knex = require('../helpers/connection');
const db = require("../helpers/db_connection");
const response = require("../helpers/ResponseFormat");
const {
  success,
  notFound,
  systemError,
  created,
} = require("../helpers/templateResponse");
const { get, add, byId, update, ...rest } = require("../query/CategoryQuery");

const CategoryModel = {
  getAllCategory: (request) => {
    return new Promise((resolve, reject) => {
      db.query(get(), (err, result) => {
        if (!err) {
          if (result.rowCount < 1) {
            return resolve(notFound());
          }
          return resolve(success(result.rows));
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  getCategoryById: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byId(request), (err, result) => {
        if (!err) {
          if (result.rowCount < 1) {
            return resolve(notFound());
          }
          return resolve(success(result.rows[0]));
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  addCategory: (request) => {
    return new Promise((resolve, reject) => {
      db.query(add(request), (err, result) => {
        if (!err) {
          return resolve(created(result.rows[0]));
        } else {
          unlinkImage(request.image);
          return resolve(systemError(err.message));
        }
      });
    });
  },

  updateCategory: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byId(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            return resolve(notFound());
          }
          const updateQuery = update(request, temp.rows[0]);
          db.query(updateQuery, (err) => {
            if (!err) {
              return resolve(success());
            } else {
              unlinkImage(request.image);
              return resolve(systemError());
            }
          });
        } else {
          unlinkImage(request.image);
          return resolve(systemError(err.message));
        }
      });
    });
  },

  deleteCategory: (request) => {
    return new Promise((resolve, reject) => {
      db.query(rest.delete(request), (err) => {
        if (err) {
          return resolve(systemError(err.message));
        }
        return resolve(success());
      });
    });
  },
};

module.exports = CategoryModel;
