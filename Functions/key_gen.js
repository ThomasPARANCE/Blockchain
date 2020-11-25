// -------------- Private Key --------------

var randArr = new Uint8Array(32) //create a typed array of 32 bytes (256 bits)
window.crypto.getRandomValues(randArr) //populate array with cryptographically secure random numbers

var privateKeyBytes = []
for (var i = 0; i < randArr.length; ++i)
  privateKeyBytes[i] = randArr[i]

//hex string of our private key
var privateKeyHex = Crypto.util.bytesToHex(privateKeyBytes).toUpperCase()
console.log(privateKeyHex)

// -------------- Compressed Private Key --------------

var privateKeyBytesCompressed = privateKeyBytes.slice(0) //clone array
privateKeyBytesCompressed.push(0x01)
var privateKeyWIFCompressed = new Bitcoin.Address(privateKeyBytesCompressed)
privateKeyWIFCompressed.version = 0x80
privateKeyWIFCompressed = privateKeyWIFCompressed.toString()

console.log(privateKeyWIFCompressed)

// -------------- Wallet -------------- 

var privateKeyAndVersion = "80" + privateKeyHex
var firstSHA = Crypto.SHA256(Crypto.util.hexToBytes(privateKeyAndVersion))
var secondSHA = Crypto.SHA256(Crypto.util.hexToBytes(firstSHA))
var checksum = secondSHA.substr(0, 8).toUpperCase()
console.log(checksum)

//append checksum to end of the private key and version
var keyWithChecksum = privateKeyAndVersion + checksum
console.log(keyWithChecksum) 

var privateKeyWIF = Bitcoin.Base58.encode(Crypto.util.hexToBytes(keyWithChecksum))
console.log(privateKeyWIF) 

// -------------- Public Key --------------

var curve = getSECCurveByName("secp256k1")
//convert our random array or private key to a Big Integer
var privateKeyBN = BigInteger.fromByteArrayUnsigned(input) 

var curvePt = curve.getG().multiply(privateKeyBN)
var x = curvePt.getX().toBigInteger()
var y = curvePt.getY().toBigInteger()
var publicKeyBytes = integerToBytes(x,32) 
publicKeyBytes = publicKeyBytes.concat(integerToBytes(y,32))
publicKeyBytes.unshift(0x04)
var publicKeyHex = Crypto.util.bytesToHex(publicKeyBytes)

console.log(publicKeyHex)

// -------------- Compressed  Public Key --------------

var publicKeyBytesCompressed = integerToBytes(x,32)
if (y.isEven())
  publicKeyBytesCompressed.unshift(0x02)
else
  publicKeyBytesCompressed.unshift(0x03)

var publicKeyHexCompressed = Crypto.util.bytesToHex(publicKeyBytesCompressed)
console.log(publicKeyHexCompressed)
