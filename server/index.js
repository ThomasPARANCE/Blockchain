const cors = require('cors');
const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const mysql = require('mysql');

const app = express();

var pool = mysql.createConnection({
  connectionLimit: 50,
  host: 'bdd.nearmeapp.fr',
  user: 'ThomasP',
  password: 'YMaX3v6rbVHzaI99', // user your mysql password.
  port: 3306,
  multipleStatements: true,
  database: 'blockchainbdd'
});

pool.connect(function(err) {
  console.log("Erreur connection a la BDD");
});

app.use(session({
  secret:'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 60 * 1000 * 30
  }
}));

app.use(cors());

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
  res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

const router = express.Router();
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);


app.get('/test', (req, res) => {
  const { table } = req.query;

  pool.query(`select * from ${table}`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get('/saveKeys', (req, res) => {
  const { public_key, private_key, id_user } = req.query;

  pool.query(`insert into keyUser (public_key, private_key, id_user) values ('${public_key}', '${private_key}', ${id_user})`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get('/addEconomy', (req, res) => {
  const { public_key, service, price } = req.query;

  pool.query(`insert into economy (public_key, service, price) values ('${public_key}', '${service}', ${price})`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});