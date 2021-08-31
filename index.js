require("newrelic");
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
// const zlib = require('zlib')
// const cookieSession = require('cookie-session')
const port = process.env.PORT || 5000;
app.use(express.static("public"));
let whitelist = [
  "http://localhost:3000",
  "http://localhost:8001",
  "http://34.232.17.16:8001",
  "http://justnews-app.mooo.com",
  "https://justnews-app.mooo.com",
  "http://justnews.rpetz.my.id",
  "https://justnews.rpetz.my.id",
];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(
  compression({
    level: 6,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// const isLoggedIn = (req, res, next) => {
//   console.log(req, 'terstt')
//   if (req) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./routes");
routes(app, "/justnews/api/v1");

app.get("/", (req, res) => {
  res.send({
    page: "Welcome to Justnews API!",
  });
});

app.get("*", (req, res) => {
  res.send({
    page: "Not found!",
  });
});

app.listen(port, () => {
  console.log(
    `app listening at http://${process.env.HOST || "localhost"}:${port}`
  );
  // console.log(process.env)
});
