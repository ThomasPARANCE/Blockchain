const User = require("./user.js");
const ServiceBDD = require('../Services/serviceBDD.js');


const user = new User();
const service = new ServiceBDD();

async function login(req, res) {
    console.log("Account login !!");
        const { password, pseudo } = req.body;
        if (!pseudo || !password) {
            return res.status(400).json({
                text: "Requête invalide"
            });
        }
        console.log("pseudo: " + pseudo + " Password: " + password);
        user.login(req.body.pseudo, req.body.password, function(result) {
            if(result) {
                console.log("login OK");
                return res.status(200).json({ success: "true", id_user: result.id});
            }else {
                // if the login function returns null send this error message back to the user.
                console.log("login not ok");
                return res.status(401).json({
                    text: "Mot de passe incorrect"
                });
            }
        })
}

async function saveKeys(req, res) {
    console.log("saveKeys1");
    const { public_key, private_key, id_user } = req.body;
    console.log(public_key);
    console.log(private_key);
    console.log(id_user);
    if (!public_key || !private_key || !id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  saveKeys");
        service.saveUserKeys(public_key, private_key, id_user, function(result) {
            console.log("in saveKeys " + result);
            if (result != null) {
                console.log("Stored");
                return res.status(200).json({
                    id_user: id_user,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function getKeys(req, res) {
    console.log("getKeys1");
    const { id_user } = req.body;
    if (!id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  getKeys");
        service.getUserKeys(id_user, function(result) {
            console.log("in getKeys " + result);
            if (result != null) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function addTransaction(req, res) {
    console.log("addTransaction1");
    const { amount, fee, key_from, key_to, private_key, id_user } = req.body;
    console.log(amount);
    console.log(fee);
    console.log(key_from);
    console.log(key_to);
    console.log(private_key);
    console.log(id_user);
    if (!amount || !fee || !key_from || !key_to || !private_key) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  addTransaction");
        return res.status(200).json({
            text: "Stockage réussi",
            signature: "signature"
        });
    }
}

async function publicTransactionNetwkork(req, res) {
    console.log("publicTransactionNetwkork1");
    const { amount, fee, key_from, key_to, private_key, signature } = req.body;
    console.log(amount);
    console.log(fee);
    console.log(key_from);
    console.log(key_to);
    console.log(private_key);
    console.log(signature);
    if (!amount || !fee || !key_from || !key_to || !private_key || !signature) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  publicTransactionNetwkork1");
        var nbr = Math.random() * (1000 - 1) + 1;
        service.publicUserTransactionNetwkork(amount, fee, key_from, key_to, private_key, signature, nbr, function(result) {
            console.log("in publicTransactionNetwkork1 " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    text: "Stockage réussi",
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function joinNetwork(req, res) {
    console.log("joinNetwork1");
    const { id_user } = req.body;
    if (!id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  joinNetwork");
        service.joinUserNetwork(id_user, function(result) {
            console.log("in joinNetwork " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function getTabNetwork(req, res) {
    console.log("getTabNetwork1");
    console.log("Launch  getTabNetwork");
    service.getUserTabNetwork( function(result) {
        console.log("in getTabNetwork " + result);
        if (result != null && result != false) {
            console.log("Stored");
            return res.status(200).json({
                results: result,
                text: "Stockage réussi"
            });
        }
        console.log("not stored" + result);
        return res.status(500).send("Error");
    });
}

async function getBlockToInsertion(req, res) {
    console.log("getBlockToInsertion1");
    const { id_user } = req.body;
    if (!id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  getBlockToInsertion");
        service.getUserBlockBeforeInsertionBlockchain(id_user, function(result) {
            console.log("in getBlockToInsertion " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    idBlock: result[0].id,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function sendToBlockChain(req, res) {
    console.log("sendToBlockChain1");
    const { id_block, id_user } = req.body;
    console.log(id_block);
    console.log(id_user);
    if (!id_block || !id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  sendToBlockChain");
        service.insertUserBlockIntoBlockchain(id_block, id_user, function(result) {
            console.log("in sendToBlockChain " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function getUserBlockchain(req, res) {
    console.log("getUserBlockchain1");
    const { id_user } = req.body;
    if (!id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  getUserBlockchain");
        service.getUserBlockchain(id_user, function(result) {
            console.log("in getUserBlockchain " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function getAllTransactionNetwork(req, res) {
    console.log("getAllTransactionNetwork1");
    const { id_user } = req.body;
    if (!id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  getAllTransactionNetwork");
        service.getUserAllTransactionNetwork(id_user, function(result) {
            console.log("in getAllTransactionNetwork " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function sendMempool(req, res) {
    console.log("sendMempool1");
    const { id } = req.body;
    console.log(id);
    if (!id) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  sendMempool");
        service.sendUserMempool(id, function(result) {
            console.log("in sendMempool " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function getAllTransactionMempool(req, res) {
    console.log("getAllTransactionMempool1");
    const { id_user } = req.body;
    console.log(id_user);
    if (!id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  getAllTransactionMempool");
        service.getUserAllTransactionMempool(id_user, function(result) {
            console.log("in getAllTransactionMempool " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function insertTransactionBlockMine(req, res) {
    console.log("insertTransactionBlockMine1");
    const { id_user, id_transaction } = req.body;
    console.log(id_user);
    console.log(id_transaction);
    if (!id_user || !id_transaction) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  insertTransactionBlockMine");
        service.getUserIdLastBlockForMine(id_user, function(result1) {
            console.log("in insertTransactionBlockMine " + result1);
            if (result1 != null && result1 != false) {
                console.log("Stored");
                if (result1 === "empty") {
                    console.log("getUserIdLastBlock");
                    service.getUserIdLastBlock(id_user, function(result2) {
                        console.log("in getUserIdLastBlock " + result2);
                        if (result2 === "empty") {
                            service.addUserBlockForMine(id_user, 0, function(result3) {
                                console.log("in addUserBlockForMine " + result3);
                                service.getUserIdLastBlock(id_user, function(result4){
                                    console.log("in getUserIdLastBlock " + result4);
                                    service.transactionIntoBlock(id_transaction, result4[0].id, function(result5) {
                                        console.log("in transactionIntoBlock " + result5);
                                        return res.status(200).json({
                                            text: "Stockage réussi"
                                        });
                                    });
                                });
                            });
                        } else {
                            console.log("addUserBlockForMine" + result2[0].block_nbr)
                            service.addUserBlockForMine(id_user, Number(result2[0].block_nbr) + 1, function(result3) {
                                console.log("in addUserBlockForMine " + result3);
                                service.getUserIdLastBlock(id_user, function(result4){
                                    console.log("in getUserIdLastBlock " + result4);
                                    service.transactionIntoBlock(id_transaction, result4[0].id, function(result5) {
                                        console.log("in transactionIntoBlock " + result5);
                                        return res.status(200).json({
                                            text: "Stockage réussi"
                                        });
                                    });
                                });
                            });
                        }
                    });
                } else {
                    service.transactionIntoBlock(id_transaction, result1[0].id, function(result2) {
                        console.log("in transactionIntoBlock " + result2);
                        return res.status(200).json({
                            text: "Stockage réussi"
                        });
                    });
                }
            } else {
                console.log("not stored" + result1);
                return res.status(500).send("Error");
            }
        });
    }
}

async function getBlockMiner(req, res) {
    console.log("getBlockMiner1");
    const { id_user } = req.body;
    console.log(id_user);
    if (!id_user) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  getBlockMiner");
        service.getUserBlockMiner(id_user, function(result) {
            console.log("in getBlockMiner " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    text: "Stockage réussi"
                });
            } else {
                console.log("not stored" + result);
                return res.status(500).send("Error");
            }
        });
    }
}

async function resetBlock(req, res) {
    console.log("resetBlock1");
    const { id_user, id_block } = req.body;
    console.log(id_user);
    console.log(id_block);
    if (!id_user || !id_block) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  resetBlock");
        service.resetUserBlockMiner(id_user, id_block, function(result) {
            console.log("in resetBlock " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    text: "Stockage réussi"
                });
            } else {
                console.log("not stored" + result);
                return res.status(500).send("Error");
            }
        });
    }
}

async function insertPreviousHash(req, res) {
    console.log("insertPreviousHash1");
    const { id_user, block_nbr, id_block } = req.body;
    console.log(id_user);
    console.log(block_nbr);
    console.log(id_block);
    if (!id_user || !block_nbr || !id_block) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  insertPreviousHash");
        if (block_nbr == 1) {
            return res.status(200).json({
                result: "0000000000000000000000000000000000000000000000000000000000000000",
                text: "Stockage réussi"
            });

        } else {
            service.insertUserPreviousHash(id_user, function(result) {
                console.log("in insertPreviousHash " + result);
                if (result != null && result != false) {
                    console.log("Stored");
                    service.insertIntoBlockUserPreviousHash(id_block, result, function(result2) {
                        return res.status(200).json({
                            hash: result,
                            text: "Stockage réussi"
                        });
                    });
                } else {
                    console.log("not stored" + result);
                    return res.status(500).send("Error");
                }
            });
        }
    }
}

async function Mine(req, res) {
    console.log("Mine1");
    const { id_user, id_block } = req.body;
    console.log(id_user);
    console.log(id_block);
    if (!id_user || !id_block) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  Mine");
        service.isMinerActive(function(result) {
            console.log("in Mine " + result);
            if (result == true || result == 1) {
                console.log("Stored");
                service.setMinerWinner(id_user, function(result) {
                    console.log("in setMinerWinner " + result);
                    if (result != null && result != false) {
                        console.log("Stored");
                        service.setBlockHashandNonce("hash", 100, id_block, function(result) {
                            console.log("in sendBlock " + result);
                            if (result != null && result != false) {
                                console.log("Stored");
                                return res.status(200).json({
                                    is_active: true,
                                    hash: "hash",
                                    nonce: 100,
                                    text: "Stockage réussi"
                                });
                            } else {
                                console.log("not stored" + result);
                                return res.status(500).send("Error");
                            }
                        });
                    } else{
                        console.log("not stored" + result);
                        return res.status(500).send("Error");
                    }
                });

            } else {
                return res.status(200).json({
                    is_active: false,
                    text: "Stockage réussi"
                });
            }
        });
    }
}

async function sendBlock(req, res) {
    console.log("sendBlock1");
    const { id_user, id_block } = req.body;
    console.log(id_user);
    console.log(id_block);
    if (!id_user || !id_block) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  sendBlock");
        service.deleteAllTransactionUseless(id_block, function(result) {
            console.log("in sendBlock " + result);
            if (result != null && result != false) {
                service.setAllTransactionOutMiner(id_block, function(result1) {
                    console.log("in setAllTransactionOutMiner " + result1);
                    if (result1 != null && result1 != false) {
                        service.setBlockIsMined(id_block, function(result2) {
                            console.log("in setAllTransactionOutMiner " + result2);
                            if (result2 != null && result2 != false) {
                                service.getBlockById(id_block, function(result3) {
                                    console.log("in getBlockById " + result3);
                                    if (result3 != null && result3 != false) {
                                        service.setBlockMinedAllUser(result3[0].block_nbr, result3[0].nonce, result3[0].prev_hash, result3[0].hash, id_user, function(result4) {
                                            if (result4 != null && result4 != false) {
                                                console.log("Stored");
                                                return res.status(200).json({
                                                    text: "Stockage réussi"
                                                });
                                            } else {
                                                console.log("not stored" + result);
                                                return res.status(500).send("Error");
                                            }
                                        });
                                    } else {
                                        console.log("not stored" + result);
                                        return res.status(500).send("Error");
                                    }
                                });
                            } else {
                                console.log("not stored" + result);
                                return res.status(500).send("Error");
                            }
                        });
                    } else {
                        console.log("not stored" + result);
                        return res.status(500).send("Error");
                    }
                });
            } else {
                console.log("not stored" + result);
                return res.status(500).send("Error");
            }
        });
    }
}

async function addEconomy(req, res) {
    console.log("addEconomy1");
    const { public_key, good, price } = req.body;
    console.log(public_key);
    console.log(good);
    console.log(price);
    if (!public_key || !good || !price) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  addEconomy");
        service.addUserEconomy(public_key, good, price, function(result) {
            console.log("in addEconomy " + result);
            if (result != null && result != false) {
                console.log("Stored");
                return res.status(200).json({
                    results: result,
                    text: "Stockage réussi"
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function getAllEconomy(req, res) {
    console.log("getAllEconomy1");
    console.log("Launch  getAllEconomy");
    service.getAllEconomy(function(result) {
        console.log("in getAllEconomy " + result);
        if (result != null) {
            return res.status(200).json({
                results: result,
                text: "Requete réussi"
            });
        }
        console.log("not stored" + result);
        return res.status(500).send("Error");
    });
}

async function checkBalance(req, res) {
    const {id} = req.body;
    service.checkBalance(id, function(result) {
        if (result == false) {
            console.log("not stored");
            return res.status(500).send("Error");
        } else {
            if (result[0].amount <= result[0].balance) {
                return res.status(200).json({
                    results: true,
                    text: "Requete réussi et assez de balance"
                });   
            } else {
                return res.status(200).json({
                    results: false,
                    text: "Requete réussi mais pas assez de balance"
                });
            }
        }
    });

}
//On exporte nos deux fonctions

exports.login = login;
exports.saveKeys = saveKeys;
exports.getKeys = getKeys;
exports.addTransaction = addTransaction;
exports.publicTransactionNetwkork = publicTransactionNetwkork;
exports.joinNetwork = joinNetwork;
exports.getTabNetwork = getTabNetwork;
exports.getBlockToInsertion = getBlockToInsertion;
exports.getUserBlockchain = getUserBlockchain;
exports.sendToBlockChain = sendToBlockChain;
exports.getAllTransactionNetwork = getAllTransactionNetwork;
exports.sendMempool = sendMempool;
exports.getAllTransactionMempool = getAllTransactionMempool;
exports.insertTransactionBlockMine = insertTransactionBlockMine;
exports.getBlockMiner = getBlockMiner;
exports.resetBlock = resetBlock;
exports.insertPreviousHash = insertPreviousHash;
exports.Mine = Mine;
exports.sendBlock = sendBlock;
exports.addEconomy = addEconomy;
exports.getAllEconomy = getAllEconomy;
exports.checkBalance = checkBalance;
