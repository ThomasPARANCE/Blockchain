var crypto = require("crypto");
var eccrypto = require("eccrypto");

// A new random 32-byte private key.
var privateKey = Buffer.from('2fd7cab0970c692b4151d77a6aeebcae2a3284556cbfc6f182c571eccfc2424f', 'hex')
// Corresponding uncompressed (65-byte) public key.
var publicKey = eccrypto.getPublic(privateKey);

var buf = Buffer.from('05de69f5d37f41340eed3230f03d2394dde5e497738a76f027b7d962a0cbdf39', 'hex')
// Always hash you message to sign!
var msg = crypto.createHash("sha256").update(buf).digest();

eccrypto.sign(privateKey, buf).then(function(sig) {
  console.log("Signature in DER format (hex):", sig.toString('hex'))
  eccrypto.verify(publicKey, buf, sig).then(function() {
    console.log("Signature is OK");
  }).catch(function() {
    console.log("Signature is BAD");
  });
});
