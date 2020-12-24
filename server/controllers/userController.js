const account = require('./User/Lib.js');

module.exports = function (app) {
    app.post('/login', account.login);
    app.post('/saveKeys', account.saveKeys);
    app.post('/getKeys', account.getKeys);
    app.post('/addTransaction', account.addTransaction);
    app.post('/publicTransactionNetwkork', account.publicTransactionNetwkork);
    app.post('/joinNetwork', account.joinNetwork);
    app.post('/getTabNetwork', account.getTabNetwork);
    app.post('/getBlockToInsertion', account.getBlockToInsertion);
    app.post('/getUserBlockchain', account.getUserBlockchain);
    app.post('/sendToBlockChain', account.sendToBlockChain);
    app.post('/getAllTransactionNetwork', account.getAllTransactionNetwork);
    app.post('/sendMempool', account.sendMempool);
    app.post('/getAllTransactionMempool', account.getAllTransactionMempool);
    app.post('/insertTransactionBlockMine', account.insertTransactionBlockMine);
    app.post('/getBlockMiner', account.getBlockMiner);
    app.post('/resetBlock', account.resetBlock);
    app.post('/insertPreviousHash', account.insertPreviousHash);
    app.post('/Mine', account.Mine);
    app.post('/sendBlock', account.sendBlock);
    app.post('/addEconomy', account.addEconomy);
    app.post('/getAllEconomy', account.getAllEconomy);
}
