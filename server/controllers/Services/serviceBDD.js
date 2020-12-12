const pool = require('../../core/pool.js');


function ServiceBDD() { };

ServiceBDD.prototype = {

    getUserIdFromName : function(name = null, callback)
    {
        console.log("getIDFromName");
        let sql = `SELECT id FROM users WHERE pseudo = ?`;
        pool.query(sql, name, function(err, result) {
            if(err) throw err
            if(result.length) {
                callback(result[0].id);
            }else {
                callback(null);
            }
        });
    },

    saveUserKeys : function(public_key, private_key, id_user, callback)
    {
        console.log("saveUserKeys");
        console.log(public_key);
        console.log(private_key);
        console.log(id_user);
        pool.query(`insert into keyUser (public_key, private_key, id_user) values ('${public_key}', '${private_key}', ${id_user})`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    addUserEconomy : function(public_key, good, price, callback)
    {
        console.log("saveUserKeys");
        console.log(public_key);
        console.log(good);
        console.log(price);
        pool.query(`insert into economy (public_key, service, price) values ('${public_key}', '${good}', ${price})`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    getAllEconomy : function(callback)
    {
        console.log("getAllEconomy");
        pool.query(`select * from economy`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });
    }
}


module.exports = ServiceBDD;