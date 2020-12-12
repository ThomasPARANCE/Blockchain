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
            if (result != null && result != false) {
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
//On exporte nos deux fonctions

exports.login = login;
exports.saveKeys = saveKeys;
exports.addEconomy = addEconomy;
exports.getAllEconomy = getAllEconomy;
