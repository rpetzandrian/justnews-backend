const jwt = require('jsonwebtoken');
require('dotenv').config();

const Verify = {
  userwithId: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) {
          if (decoded.id === req.params.user_id || decoded.id === req.query.user_id) {
            next();
          } else {
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
          }
        } else {
          res.status(403).send({
            message: err.message,
            statusCode: 403,
          });
        }
      });
    }
  },

  useroradminVerify: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) {
          if (decoded.role === 'admin') {
            next();
          } else if (decoded.role === 'user' && decoded.id === req.params.user_id) {
            next()
          } else {
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
          }
        } else {
          res.status(403).send({
            message: err.message,
            statusCode: 403,
          });
        }
      });
    }
  },

  adminVerify: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) {
          if (decoded.role === "admin") {
            next();
          } else {
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
          }
        } else {
          res.status(403).send({
            message: err.message,
            statusCode: 403,
          });
        }
      });
    }
  },
}

module.exports = Verify;