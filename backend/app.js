const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const historyFallback = require('connect-history-api-fallback');
const mysql = require('mysql');
const dbConnection = require('./src/database/config/connectionConfig');
const query = require('./src/database/query/rouletteQuery');
const cors = require('cors');
// npm module
const app = express();
const connection = mysql.createConnection(dbConnection);
// sis module
const {getCurrentAddress} = require("./src/util/axiosModule");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(logger('dev'));
app.use(historyFallback());
app.use(cors());

app.route('/').get((req, res) => {
    res.render('index') // index.html render
});

app.route('/getAddress')
    .post((req, res) => {
        const param = {
            x: req.body.x,
            y: req.body.y
        };

        console.log(param);

        getCurrentAddress(param);
    })

app.route('/rouletteInit')
    .get((req, res) => {
        new Promise((resolve, reject) => {
            try {
                let codes = [];
                connection.query(query.combo02, (err, rows) => {
                    for (let i in rows) {
                        const temp = {
                            category: rows[i]['category'],
                            restaurantNm: rows[i]['restaurantNm']
                        };
                        codes.push(temp);
                    }

                    resolve(res.json(codes));
                });
            } catch (err) {
                reject(res.send(err));
            }
        })
    })


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8226, () => {
    console.log("Server has been started")
})

module.exports = app;
