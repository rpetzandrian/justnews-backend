const { Client, Pool } = require("pg");
require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// const config = {
//   host: DB_HOST,
//   port: DB_PORT,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
// };

// const db = new Client(config);

// db.connect()
//   .then(() => console.log("connected"))
//   .catch((err) => console.error("connection error", err.stack));

// module.exports = db;

const config = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  max: 20,
};

const db = new Pool(config);

module.exports = {
  query: (text, callback) => {
    // db.query(text, callback);
    // db.release();

    // db.connect((err, client, release) => {
    //   if (err) {
    //     return console.error("Error acquiring client", err.stack);
    //   }
    //   client.query(text, callback);
    //   release();
    // });

    (async function () {
      const client = await db.connect();
      client.query(text, callback);
      client.release();
    })();
  },
};
