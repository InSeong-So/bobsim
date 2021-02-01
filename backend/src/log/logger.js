const appRoot = require('app-root-path') // root 경로를 가져오기 위해 사용
const winston = require('winston') // log 파일 작성
require('winston-daily-rotate-file') // log 파일을 일자별로 생성하기 위해 사용
const time = require('../util/time') // 로그파일 제목에 일자를 표시하기 위해 사용

const transport = new (winston.transports.DailyRotateFile)({
    filename: `${appRoot}/logs/application-%DATE%.log`,
    maxsize: 1024,
    datePatten: 'YYYY-MM-DD-HH',
    timestamp: function () {
        return time.formatCurrentDate();
    }
});

const logger = winston.createLogger({
    transports: [
        transport
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message)
    }
}

module.exports = logger