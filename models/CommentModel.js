// const knex = require('../helpers/connection');
const db = require('../helpers/db_connection');
const response = require('../helpers/ResponseFormat');
const { notFound, success, systemError, created, invalidParameter } = require('../helpers/templateResponse');
const { get, add, update, ...rest } = require('../query/CommentQuery');

const CommentModel = {
  getAllComments: (request) => {
    return new Promise((resolve, reject) => {
      db.query(get(request), (err, result) => {
        if (!err) {
          if (result.rowCount < 1) {
            return resolve(notFound())
          }
          return resolve(success(result.rows))
        } else {
          return resolve(systemError(err.message))
        }
      })
    })
  },

  addNewComments: (request) => {
    return new Promise((resolve, reject) => {
      db.query(add(request), err => {
        if (!err) {
          return resolve(created())
        } else {
          return resolve(systemError(err.message))
        }
      })
    })
  },

  updateComments: (request) => {
    return new Promise((resolve, reject) => {
      db.query(get(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            return resolve(notFound())
          }
          if (temp.rows[0].user_id === request.user_id) {
            db.query(update(request), err => {
              if (!err) {
                return resolve(success())
              } else {
                return resolve(systemError(err.message))
              }
            })
          } else {
            return resolve(invalidParameter())
          }
        } else {
          return resolve(systemError(err.message))
        }
      })
    })
  },

  deleteComments: (request) => {
    return new Promise((resolve, reject) => {
      db.query(get(request), (err, temp) => {
        if (!err) {
          if (temp.rowCount < 1) {
            return resolve(notFound())
          }
          if (temp.rows[0].user_id === request.user_id) {
            db.query(rest.delete(request), err => {
              if (!err) {
                return resolve(success())
              } else {
                return resolve(systemError(err.message))
              }
            })
          } else {
            return resolve(invalidParameter())
          }
        } else {
          return resolve(systemError(err.message))
        }
      })
    })
  }
}

module.exports = CommentModel;