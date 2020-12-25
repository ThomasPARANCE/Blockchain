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
    const { amount, fee, key_from, key_to, private_key } = req.body;
    console.log(amount);
    console.log(fee);
    console.log(key_from);
    console.log(key_to);
    console.log(private_key);
    if (!amount || !fee || !key_from || !key_to || !private_key) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  addTransaction");
        service.addUserTransaction(amount, fee, key_from, key_to, private_key, function(result) {
            console.log("in addTransaction " + result);
            if (result != null && result != false) {
                console.log("Stored");
                console.log(result.id);
                return res.status(200).json({
                    text: "Stockage réussi",
                    id: result.id
                });
            }
            console.log("not stored" + result);
            return res.status(500).send("Error");
        });
    }
}

async function publicTransactionNetwkork(req, res) {
    console.log("publicTransactionNetwkork1");
    const { idTransaction } = req.body;
    console.log(idTransaction);
    if (!idTransaction) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        console.log("Launch  publicTransactionNetwkork1");
        service.publicUserTransactionNetwkork(idTransaction, function(result) {
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

async function getAllTransactionNetwork(req, res) {
    console.log("getAllTransactionNetwork1");
    console.log("Launch  getAllTransactionNetwork");
    service.getUserAllTransactionNetwork( function(result) {
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
    console.log("Launch  getAllTransactionMempool");
    service.getUserAllTransactionMempool( function(result) {
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
exports.getAllTransactionNetwork = getAllTransactionNetwork;
exports.sendMempool = sendMempool;
exports.getAllTransactionMempool = getAllTransactionMempool;
exports.addEconomy = addEconomy;
exports.getAllEconomy = getAllEconomy;
exports.checkBalance = checkBalance;
