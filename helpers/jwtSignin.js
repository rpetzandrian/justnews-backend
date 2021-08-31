const jwt = require("jsonwebtoken");
const { success } = require("./templateResponse");
require("dotenv").config();
module.exports = jwtSignin = ({ id, role }, resolve, reject) => {
  return jwt.sign(
    {
      id: id,
      role: role,
    },
    process.env.JWT_SECRET,
    (errToken, token) => {
      if (!errToken) {
        if (token) {
          resolve(success({ id, role, token }));
        } else {
          reject(systemError());
        }
      } else {
        reject(systemError());
      }
    }
  );
};
