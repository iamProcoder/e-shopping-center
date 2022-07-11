var CryptoJS = require("crypto-js");

const encrypt = (text) => {
  const crypted = CryptoJS.AES.encrypt(text, process.env.CRYPTOKEY).toString();
  return crypted;
};

const decrypt = (text) => {
  const bytes = CryptoJS.AES.decrypt(text, process.env.CRYPTOKEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

module.exports = {
    encrypt,
    decrypt
}