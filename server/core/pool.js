const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
// const pool = mysql.createPool({
//     connectionLimit: 50,
//     host: 'db',
//     user: 'test', // use your mysql username.
//     password: 'secret', // user your mysql password.
//     port: 3306,
//     database: 'area'
// });

var pool = mysql.createPool({
  connectionLimit: 50,
  host: 'bdd.nearmeapp.fr',
  user: 'ThomasP',
  password: 'YMaX3v6rbVHzaI99', // user your mysql password.
  port: 3306,
  multipleStatements: true,
  database: 'blockchainbdd'
});

var connectWithRetry = function() {
    return pool.getConnection((err, connection) => {
        if(err) {
            console.error("Something went wrong connecting to the database ...");
            console.log(err);
            setTimeout(connectWithRetry, 3000);
        }
        if(connection) {
            console.log("Connection etablish");
            connection.release();
        }
    });
}
connectWithRetry();

pool.query = util.promisify(pool.query);

module.exports = pool;
