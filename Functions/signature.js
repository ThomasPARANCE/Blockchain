//transaction = hash de la transaction
//privateKey = private de l'user 
const createSignature = (transaction, privateKey) => {
  let var hashcode = sha256 (sha256 (serializeTransaction(transaction)));
  let var signature = secp256k1.sign(hashcode, privateKey).signature;
}


