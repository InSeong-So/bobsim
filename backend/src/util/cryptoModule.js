const {encrypts} = require("../../../root/enviroment/properties");
const crypto = require('crypto');

const sisEncrypts = password => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, encrypts.getSalt(), encrypts.getLength(), encrypts.getOptions, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString("base64"));
        });
    });
}

// sisEncrypts('테스트완료다 요것들아!!').then((result, err) => {
//     if (err) throw err;
//     console.log("The derived key is : " + result);
// });

module.exports = {sisEncrypts}