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
                console.log(results);
                console.log(results.length);
                if (results.length == 0) {
                    console.log("insert save");
                    pool.query(`insert into keyUser (public_key, private_key, id_user, balance) values ('${public_key}', '${private_key}', ${id_user}, 1000)`, (err, results) => {
                        if (err) {
                            callback(false);
                        } else {
                            pool.query(`insert into transaction (amount, fee, public_key_from, public_key_to, signature, id_user) values(10000, 0, 'SYSTEM', '${public_key}', '/', ${id_user})`)
                            callback(true);
                        }
                    });
                } else {
                    callback(results);
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

    publicUserTransactionNetwkork : function(amount, fee, key_from, key_to, private_key, signature, nbr,  callback)
    {
        console.log("publicUserTransactionNetwkork");
        pool.query(`insert into transaction (amount, fee, public_key_from, public_key_to, private_key, signature, is_network, is_mempool, is_in_miner, id_group, id_user) SELECT ${amount}, ${fee}, '${key_from}', '${key_to}', '${private_key}','${signature}', true, false, false, ${nbr}, id from users`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    getUserBlockBeforeInsertionBlockchain : function(id_user, callback)
    {
        console.log("getUserBlockBeforeInsertionBlockchain");
        pool.query(`select block.id, block_nbr, nonce, prev_hash, hash, is_blockchain, id_blockchain, block.id_user, is_mined, transaction.id as idTransaction, amount, fee, public_key_from, public_key_to, signature, is_mempool, id_block, is_network, private_key, is_in_miner, transaction.id_user as id_userTransaction, id_group from block inner join transaction on block.id = transaction.id_block where is_mined = true and block.id_user=${id_user}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });

    },

    insertUserBlockIntoBlockchain : function(id_block, id_user, callback)
    {
        console.log("getUserBlockBeforeInsertionBlockchain");
        pool.query(`update block set block.is_blockchain=true, block.id_blockchain=(select users.id_blockchain from users where users.id=${id_user}) where block.id =${id_block}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });

    },

    getUserBlockchain : function(id_user, callback)
    {
        console.log("getUserBlockchain");
        // pool.query(`SELECT * FROM block INNER JOIN TRANSACTION ON block.id = transaction.id_block INNER JOIN blockchain ON block.id_blockchain = blockchain.id INNER JOIN users ON blockchain.id = users.id_blockchain WHERE users.id = ${id_user}`, (err, results) => {
        // pool.query(`SELECT * from block inner join blockchain on block.id_blockchain = blockchain.id inner join users on blockchain.id = users.id_blockchain inner join transaction on block.id = transaction.id_block where users.id = ${id_user}`, (err, results) => {
        pool.query(`select * from block inner join transaction on block.id = transaction.id_block where block.id_user=${id_user} and is_blockchain = true order by block_nbr`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
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

    getUserAllTransactionNetwork : function(id_user, callback)
    {
        console.log("getUserTabNetwork");
        pool.query(`select * from transaction where is_network=true and id_user=${id_user} and is_mempool=false and is_in_miner=false`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });
    },

    getSignatureById : function(id, callback)
    {
        console.log("getSignatureById");
        pool.query(`select * from transaction where id=${id}`, (err, results) => {
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
        pool.query(`update transaction set is_mempool=true where id=${id}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    getUserAllTransactionMempool : function(id_user, callback)
    {
        console.log("getUserTabNetwork");
        pool.query(`select * from transaction where is_mempool=true and id_user=${id_user} and is_in_miner=false`, (err, results) => {
            if (err) {
                console.log(false);
                callback(false);
            } else {
                console.log(results);
                callback(results);
            }
          });
    },

    getUserIdLastBlock: function(id_user, callback)
    {
        console.log("getUserIdLastBlock");
        pool.query(`select * from block where id_user=${id_user} order by block_nbr desc`, (err, results) => {
            if (err) {
                console.log("ERROR getUserIdLastBlock");
                callback(false);
            } else {
                console.log("getUserIdLastBlock" + results);
                if (results.length == 0)
                    callback("empty");
                callback(results);
            }
          });
    },

    getUserIdLastBlockForMine: function(id_user, callback)
    {
        console.log("getIdLastBlockForMine");
        pool.query(`select * from block where is_blockchain = false and is_mined = false and id_user=${id_user}  order by block_nbr desc`, (err, results) => {
            if (err) {
                console.log("false");
                callback(false);
            } else {
                console.log(results);
                if (results.length == 0)
                    callback("empty");
                else
                    callback(results);
            }
          });
    },

    addUserBlockForMine: function(id_user, block_nbr, callback)
    {
        console.log("addUserBlockForMine");
        pool.query(`insert into block (block_nbr, is_blockchain, is_mined, id_user) values (${block_nbr}, false, false, ${id_user})`, (err, results) => {
            if (err) {
                console.log(false);
                callback(false);
            } else {
                console.log(results);
                callback(results);
            }
          });
    },

    transactionIntoBlock : function(id_transaction, id_block, callback)
    {
        console.log("publicUserTransactionNetwkork");
        pool.query(`UPDATE transaction set id_block = ${id_block}, is_in_miner=true where id=${id_transaction}`, (err, results) => {
            if (err) {
                console.log(false);
                callback(false);
            } else {
                console.log(results);
                callback(true);
            }
          });
    },

    getUserBlockMiner : function(id_user, callback)
    {
        console.log("getUserBlockMiner");
        pool.query(`select * from block inner join transaction on block.id = transaction.id_block where is_blockchain = false and is_mined = false and block.id_user=${id_user} and is_in_miner=true`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });
    },

    resetUserBlockMiner : function(id_user, id_block, callback)
    {
        console.log("resetUserBlockMiner");
        console.log(id_user);
        console.log(id_block);
        pool.query(`UPDATE transaction set is_mempool = true, id_block = NULL where id_block=${id_block} and id_user=${id_user}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });

    },

    insertUserPreviousHash : function(id_user, callback)
    {
        console.log("insertUserPreviousHash");
        pool.query(`select * from block where id_user = ${id_user} order by block_nbr desc LIMIT 1 OFFSET 1;`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results[0].hash);
            }
          });
    },

    insertIntoBlockUserPreviousHash : function(id_block, prev_hash, callback)
    {
        console.log("insertIntoBlockUserPreviousHash");
        pool.query(`update block set prev_hash='${prev_hash}' where id=${id_block}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    isMinerActive : function(callback)
    {
        console.log("isMinerActive");
        pool.query(`select * from miner LIMIT 1;`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                if (results[0].is_active && results[0].id_winner === null)
                    callback(results[0].is_active);
                else
                    callback(false);
            }
          });
    },

    setMinerWinner : function(id_user, callback)
    {
        console.log("setMinerWinner");
        pool.query(`update miner set id_winner=${id_user} where id=1`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    getTransactionInfoForHash : function(id_block, callback)
    {
        console.log("getTransactionInfoForHash");
        pool.query(`select amount,fee, public_key_from, public_key_to, signature from transaction where id_block=${id_block}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });

    },

    setBlockHashandNonce : function(hash, nonce, id_block, callback)
    {
        console.log("setBlockHashandNonce");
        pool.query(`update block set hash='${hash}', nonce=${nonce} where id=${id_block}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    setBlockIsMined : function(id_block, callback)
    {
        console.log("setBlockIsMined");
        pool.query(`update block set is_mined=true where id=${id_block}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    getBlockById : function(id_block, callback)
    {
        console.log("getBlockById");
        pool.query(`select block_nbr,nonce,prev_hash,hash from block where id=${id_block}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results);
            }
          });
    },

    setBlockMinedAllUser : function(block_nbr,nonce,prev_hash,hash, id_user, callback)
    {
        console.log("setBlockMinedAllUser");
        pool.query(`INSERT INTO block(block_nbr,nonce,prev_hash,hash,is_blockchain,is_mined,id_user) SELECT ${block_nbr},${nonce},'${prev_hash}','${hash}',FALSE,TRUE,users.id FROM users WHERE id!=${id_user}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    deleteAllTransactionUseless: function(id_block, callback)
    {
        console.log("deleteAllTransactionUseless");
        pool.query(`DELETE FROM transaction WHERE(id_block!=${id_block} OR id_block IS NULL)AND id_group in(SELECT test FROM(SELECT t2.id_group AS test FROM transaction AS t2 WHERE t2.id_block=${id_block}) as t2) `, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
          });
    },

    setAllTransactionOutMiner : function(id_block, callback)
    {
        console.log("setAllTransactionOutMiner");
        pool.query(`update transaction set is_in_miner=false, id_block=NULL where (id_block != ${id_block} or id_block is NULL)`, (err, results) => {
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
    },

    checkBalance : function(id, callback)
    {
        console.log("checkBalance");
        pool.query(`select amount, balance from transaction inner join keyUser on transaction.public_key_from = keyUser.public_key where transaction.id = ${id}`, (err, results) => {
            if (err) {
                callback(false);
            } else {
                callback(results)
            }
        });
    }
}


module.exports = ServiceBDD;