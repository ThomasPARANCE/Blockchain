var crypto = require('crypto');

class Block {
 constructor(nbr, previousHash, data) {
   this.nbr = nbr;
   this.previousHash = previousHash;
   this.data = data;
 }
}

function createHash(nbr_block, prev_hash, data) {
  var block = new Block(nbr_block, prev_hash, data);

  var code = block.previousHash + block.data + block.nbr;
  var hash = crypto.createHash('sha256').update(code).digest('hex');
  console.log("00" + hash);
  return ("00" + hash);
}

createHash(1, "637828", [{amount:"20000.0", fee :"0.0", public_key_from:"04A0A56B3BC036C03AB0CB9D90C6C3A5DA2E948257FC68F30212BA790E881B3FEB8C5A71E5D5D5C668CC20356994A4CF9C6E959BEFF14739C596C20E6658D25999", public_key_to:"041EE3A7D9EC698844DEC22DC2872D6C4750AB5E70343D6F4CCA2BF106526FE38EE938108732BF697A8531630CEB32A615C70EA9E0E359A0A53C9A1E80C8C795A0", signature:"signature"}, {amount:"10000.0", fee :"0.0", public_key_from:"04A0A56B3BC036C03AB0CB9D90C6C3A5DA2E948257FC68F30212BA790E881B3FEB8C5A71E5D5D5C668CC20356994A4CF9C6E959BEFF14739C596C20E6658D25999", public_key_to:"041EE3A7D9EC698844DEC22DC2872D6C4750AB5E70343D6F4CCA2BF106526FE38EE938108732BF697A8531630CEB32A615C70EA9E0E359A0A53C9A1E80C8C795A0", signature:"signature"} ]);

class Transaction {
  constructor(amount, fee, from, to, priv) {
    this.amount = amount;
    this.fee = fee;
    this.from = from;
    this.to = to;
    this.priv = priv;
  }
}

function createSignature(amount, fee, from, to, priv) {
  var transaction = new Transaction(amount, fee, from, to, priv);

  var code = transaction.amount + transaction.fee + transaction.from + transaction.to + transaction.priv;
  var hash = crypto.createHash('sha256').update(code).digest('base64');
  console.log("ME" + hash);
  return ("ME" + hash);
}

createSignature(250, 3, "29f5b78c4674a6df937b23bae77e38a59898192b36e968a1d2a360deae63dfcef175e1a03c45cd", "041EE3A7D9EC698844DEC22DC2872D6C4750AB5E70343D6F4CCA2BF106526FE38EE938108732BF697A8531630CEB32A615C70EA9E0E359A0A53C9A1E80C8C795A0", "11644df438378f0f09f8b8fd");