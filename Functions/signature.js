const crypto = require('crypto')
const fs = require('fs')

const getSignatureByInput = (input) => {
  let privatePem = fs.readFileSync('PRIVATE_KEY_FILE_PATH_GOES_HERE')
  let key = privatePem.toString('ascii')
  let sign = crypto.createSign('RSA-SHA256')
  sign.update(input)
  let signature = sign.sign(key, 'hex')

  console.log(signature);
  return signature
}

const getSignatureVerifyResult = (input) => {
        let signatureSignedByPrivateKey = getSignatureByInput(input)

        let pem = fs.readFileSync('PUBLIC_KEY_FILE_PATH_GOES_HERE')
        let publicKey = pem.toString('ascii')
        const verifier = crypto.createVerify('RSA-SHA256')

        verifier.update(input, 'ascii')

        const publicKeyBuf = new Buffer(publicKey, 'ascii')
        const signatureBuf = new Buffer(signatureSignedByPrivateKey, 'hex')
        const result = verifier.verify(publicKeyBuf, signatureBuf)

        console.log(result);
        return result;
}

getSignatureVerifyResult();