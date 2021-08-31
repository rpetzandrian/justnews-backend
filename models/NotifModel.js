// const knex = require('../helpers/connection');
const db = require("../helpers/db_connection");
const response = require("../helpers/ResponseFormat");
const {
  add,
  unreadNotif,
  get,
  update,
  ...rest
} = require("../query/NotifQuery");
const {
  notFound,
  success,
  systemError,
  created,
} = require("../helpers/templateResponse");

const NotifModel = {
  getNotif: (request) => {
    return new Promise((resolve, reject) => {
      db.query(unreadNotif(request), (err, count) => {
        if (!err) {
          db.query(get(request), (err, result) => {
            if (!err) {
              if (result.rowCount < 1) {
                return resolve(notFound());
              }
              return resolve(
                success({ notif: result.rows, unreadNotif: count.rowCount })
              );
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

  readNotif: (request) => {
    return new Promise((resolve, reject) => {
      db.query(update(request), (err) => {
        if (!err) {
          return resolve(success());
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  pushNotif: (request) => {
    return new Promise((resolve, reject) => {
      db.query(add(request), (err) => {
        if (!err) {
          return resolve(created());
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },

  deleteNotif: (request) => {
    return new Promise((resolve, reject) => {
      db.query(rest.delete(request), (err) => {
        if (!err) {
          return resolve(success());
        } else {
          return resolve(systemError(err.message));
        }
      });
    });
  },
};

module.exports = NotifModel;
