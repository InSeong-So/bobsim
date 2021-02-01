const moment = require('moment');

module.exports = {
    currentDate: moment(),
    stringCurrentDate: moment().format(),
    formatCurrentDate: moment().format('YYYY-MM-DD HH:mm:ss'),
};