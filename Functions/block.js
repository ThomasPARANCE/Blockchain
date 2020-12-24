global.crypto = require('crypto');


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

async function sha256(block) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(block.index + block.previousHash + block.data + block.nonce);                    

    // hash the message
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

function calculateHash(block) {
  return sha256(block.index + block.previousHash + block.data + 
         block.nonce);
}

const block = new Block(1, "12456754", "data", 1, 1, 1);
console.log(sha256(block));
