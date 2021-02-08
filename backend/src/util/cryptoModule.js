const {encrypts, secretAuthToken} = require("../../../root/enviroment/properties");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const sisEncrypts = password => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, encrypts.getSalt(), encrypts.getLength(), encrypts.getOptions, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString("base64"));
        });
    });
}

const getHashCode = originCode => {
    return new Promise((resolve, reject) => {
        const hashCode = crypto.createHmac('sha256', secretAuthToken.key).update(originCode).digest('base64');
        console.log("The derived key is : " + hashCode);
    });
}

const getAuthToken = (params) => {
    const decDataObj = params || {email: "test", password: "test"};
    return new Promise((resolve, reject) => {
        jwt.sign(
            decDataObj, // 인증할 데이터
            // secretAuthToken.key, // 비밀 키
            "tttt", // 비밀 키
            {
                expiresIn: secretAuthToken.expiresIn, // 유효시간
                issuer: 'Dinner',
                subject: 'userInfo'
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
    })
}

getAuthToken().then((result, err) => {
    console.log(result);
    if (err) throw err;
});

// sisEncrypts('테스트완료다 요것들아!!').then((result, err) => {
//     if (err) throw err;
//     console.log("The derived key is : " + result);
// });

module.exports = {sisEncrypts}