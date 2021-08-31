// const knex = require('../helpers/connection');
const response = require("../helpers/ResponseFormat");
const fs = require("fs");
const db = require("../helpers/db_connection");
const { add, get, update, byId, ...rest } = require("../query/UserQuery");
const unlinkImage = require("../helpers/unlinkImage");
const {
  notFound,
  success,
  systemError,
  created,
  templateResponse,
} = require("../helpers/templateResponse");

const UserModel = {
  getAllUsers: (request) => {
    return new Promise((resolve, reject) => {
      db.query(get(request), (err, result) => {
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

  getUsersById: (request) => {
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

  addNewUsers: (request) => {
    return new Promise((resolve, reject) => {
      // db.query(add(request).get, (err, count) => {
      //   if (!err) {
      // if (count.rowCount > 0) {
      //   let template = templateResponse(400, "user_exist");
      //   return resolve(template);
      // }
      db.query(add(request).add, (err, result) => {
        if (!err) {
          return resolve(created(result.rows[0]));
        } else {
          unlinkImage(request.photo);
          return resolve(systemError(err.message));
        }
      });
      // } else {
      //   unlinkImage(request.photo);
      //   return resolve(systemError(err.message));
      // }
      // });
    });
  },

  updateUsers: (request) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where id = ${request.id}`, (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            return resolve(notFound());
          }
          db.query(update(request, temp.rows[0]), (err) => {
            if (!err) {
              if (request.photo) {
                unlinkImage(temp.rows[0].photo);
              }
              return resolve(success());
            } else {
              unlinkImage(request.photo);
              return resolve(systemError(err.message));
            }
          });
        } else {
          unlinkImage(request.photo);
          return resolve(systemError(err.message));
        }
      });
    });
  },

  deleteUsers: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byId(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            return resolve(notFound());
          }
          db.query(rest.delete(request), (err) => {
            if (!err) {
              if (temp?.rows[0]?.photo && temp?.rows[0]?.photo != "null") {
                fs.unlinkSync(`public${temp.rows[0].photo}`);
              }
              return resolve(success());
            } else {
              return resolve(systemError(err.message));
            }
          });
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },
};

module.exports = UserModel;
