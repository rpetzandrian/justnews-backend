// const knex = require('../helpers/connection');
const response = require("../helpers/ResponseFormat");
const bcrypt = require("bcrypt");
const db = require("../helpers/db_connection");
require("dotenv").config();
const {
  byEmail,
  register,
  registerGoogle,
  registerFb,
} = require("../query/AuthQuery");
const jwtSignin = require("../helpers/jwtSignin");
const { success, systemError } = require("../helpers/templateResponse");

const AuthModel = {
  register: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byEmail(request), (err, temp) => {
        if (!err) {
          // if (temp.rowCount > 0) {
          //   reject(response('User exist', 400))
          //   return;
          // }
          db.query(register(request), (err) => {
            if (!err) {
              resolve(response("Register Success", 201));
            } else {
              reject(response("Register error", 500));
            }
          });
        } else {
          reject(response("Register error", 500));
        }
      });
    });
  },

  login: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byEmail(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            reject(response("User unregistered", 400));
            return;
          }
          bcrypt.compare(
            request.password,
            temp?.rows[0]?.password,
            (errCompare, resCompare) => {
              if (!errCompare) {
                if (resCompare) {
                  return jwtSignin(
                    {
                      id: temp.rows[0].id,
                      role: temp.rows[0].role,
                    },
                    resolve,
                    reject
                  );
                } else {
                  reject(response("User unregistered", 400));
                }
              } else {
                reject(response("Login error", 500));
              }
            }
          );
        } else {
          console.log(err);
          reject(response("Login error", 500));
        }
      });
    });
  },

  authGoogle: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byEmail(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            reject(response("err", 500));
            return;
          } else {
            if (temp.rows[0].google_id == request.google_id) {
              return jwtSignin(
                {
                  id: temp.rows[0].id,
                  role: temp.rows[0].role,
                },
                resolve,
                reject
              );
            }
          }
        } else {
          reject(response("Login error", 500));
        }
      });
    });
  },

  regGoogle: (request) => {
    return new Promise((resolve, reject) => {
      db.query(registerGoogle(request), (err) => {
        if (!err) {
          return this.authGoogle(request);
        } else {
          reject(response("Register error", 500));
        }
      });
    });
  },

  authFb: (request) => {
    return new Promise((resolve, reject) => {
      db.query(byEmail(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            return this.regGoogle(request);
          } else {
            if (temp.rows[0].fb_id == request.fb_id) {
              return jwtSignin(
                {
                  id: temp.rows[0].id,
                  role: temp.rows[0].role,
                },
                resolve,
                reject
              );
            }
          }
        } else {
          reject(response("Login error", 500));
        }
      });
    });
  },
};

module.exports = AuthModel;
