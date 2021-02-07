const jwt = require('jsonwebtoken');
const {secretAuthToken} = require('../../../root/enviroment/properties');

let token = (params) => jwt.sign(
    params, // 인증할 데이터
    secretAuthToken.key, // 비밀 키
    {
        expiresIn: secretAuthToken.expiresIn // 유효시간
    });

console.log(secretAuthToken.key);
console.log(token({email:"goflvhxj2547@naver.com"}));