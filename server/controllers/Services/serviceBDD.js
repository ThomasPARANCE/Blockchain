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
        console.log("select save");
        pool.query(`select * from keyUser where id_user = ${id_user}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
                console.log(results);
                console.log(results.length);
                if (results.length == 0) {
                    console.log("insert save");
                    pool.query(`insert into keyUser (public_key, private_key, id_user) values ('${public_key}', '${private_key}', ${id_user})`, (err, results) => {
                        if (err) {
                            callback(false);
                        } else {
                            callback(true);
                        }
                    });
                }
            }
          });
    },

    getUserKeys : function(id_user, callback)
    {
        console.log("getUserKeys");
        console.log(id_user);
        pool.query(`select * from keyUser where id_user = ${id_user} LIMIT 1`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });
    },

    addUserTransaction : function(amount, fee, key_from, key_to, private_key, callback)
    {
        console.log("addUserTransaction");
        pool.query(`insert into transaction (amount, fee, public_key_from, public_key_to, private_key) values (${amount}, ${fee}, '${key_from}', '${key_to}', '${private_key}')`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                pool.query(`select * from transaction order by id desc LIMIT 1`, (err, results) => {
                    if (err) {
                        callback(false);
                    } else {
                        callback(results[0]);
                    }
                });
            }
          });
    },

    publicUserTransactionNetwkork : function(id, callback)
    {
        console.log("publicUserTransactionNetwkork");
        pool.query(`UPDATE transaction set signature = 'signature', is_network=true where id=${id}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    joinUserNetwork : function(id_user, callback)
    {
        console.log("joinUserNetwork");
        pool.query(`UPDATE keyUser set is_network=true, date_join_network=CURRENT_TIMESTAMP where id_user=${id_user}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    getUserTabNetwork : function(callback)
    {
        console.log("getUserTabNetwork");
        pool.query(`select id_user, (SELECT COUNT(*) from block inner join blockchain on block.id_blockchain = blockchain.id inner join users on blockchain.id = users.id_blockchain where users.id = keyUser.id_user) as length_blockchain from keyUser where is_network=true order by date_join_network`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });
    },

    getUserAllTransactionNetwork : function(callback)
    {
        console.log("getUserTabNetwork");
        pool.query(`select * from transaction where is_network=true`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });
    },

    sendUserMempool : function(id, callback)
    {
        console.log("sendUserMempool");
        console.log(id);
        pool.query(`update transaction set is_mempool=true, is_network=false where id=${id}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    getUserAllTransactionMempool : function(callback)
    {
        console.log("getUserTabNetwork");
        pool.query(`select * from transaction where is_mempool=true`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
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