const account = require('./User/Lib.js');

module.exports = function (app) {
    app.post('/login', account.login);
    app.post('/saveKeys', account.saveKeys);
    app.post('/getKeys', account.getKeys);
    app.post('/addTransaction', account.addTransaction);
    app.post('/publicTransactionNetwkork', account.publicTransactionNetwkork);
    app.post('/joinNetwork', account.joinNetwork);
    app.post('/getTabNetwork', account.getTabNetwork);
    app.post('/getAllTransactionNetwork', account.getAllTransactionNetwork);
    app.post('/sendMempool', account.sendMempool);
    app.post('/getAllTransactionMempool', account.getAllTransactionMempool);
    app.post('/addEconomy', account.addEconomy);
    app.post('/getAllEconomy', account.getAllEconomy);
}
