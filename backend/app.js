const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const historyFallback = require('connect-history-api-fallback');
const mysql = require('mysql');
const dbConnection = require('./src/database/config/connectionConfig');
const query = require('./src/database/query/rouletteQuery');

const app = express();
const connection = mysql.createConnection(dbConnection);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(logger('dev'));
app.use(historyFallback());

app.route('/').get((req, res) => {
    res.render('index') // index.html render
});

app.route('/rouletteInit')
    .get((req, res) => {
        try {
            let combo = {
                cd: [],
                cd_nm: []
            };
            let codes = [];
            connection.query(query.combo01, (err, rows) => {
                for (let i in rows) {
                    combo.cd.push(rows[i]['cd']);
                    combo.cd_nm.push(rows[i]['cd_nm']);
                }
                res.json(combo);
            });
        } catch (err) {
            res.send(err);
        }
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
