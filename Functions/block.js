var crypto = require('crypto');

class Block {
 constructor(nbr, previousHash, data, id_blockchain, is_blockchain, id) {
   this.id = id;
   this.nbr = nbr;
   this.previousHash = previousHash;
   this.data = data;
   this.nonce = 0;
   this.is_blockchain = true;
   this.id_blockchain = id_blockchain;
 }
}

function calculateHash(block) {
  return sha256(block.index + block.previousHash + block.data + 
         block.nonce);
}

var block = new Block(1, "12456754", "data", 1, 1, 1);

var code = block.index + block.previousHash + block.data + block.nonce;
var hash = crypto.createHash('sha256').update(code).digest('hex');
console.log(hash);
