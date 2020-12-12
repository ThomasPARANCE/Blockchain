const account = require('./User/Lib.js');

module.exports = function (app) {
    app.post('/login', account.login);
    app.post('/saveKeys', account.saveKeys);
    app.post('/addEconomy', account.addEconomy);
    app.post('/getAllEconomy', account.getAllEconomy);
}
