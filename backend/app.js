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
app.use(cors());

app.route('/').get((req, res) => {
    res.render('index') // index.html render
});

app.route('/rouletteInit')
    .get(async (req, res) => {
        try {
            let combo01 = {
                cd: [],
                cd_nm: []
            };

            let combo02 = {
                cd: [],
                cd_nm : []
            };

            let codes = [];

            await connection.query(query.combo01 + query.combo02, (err, rows) => {
                for (let i in rows[0]) {
                    combo01.cd.push(rows[0][i]['cd']);
                    combo01.cd_nm.push(rows[0][i]['cd_nm']);
                }
                for (let i in rows[1]) {
                    combo02.cd.push(rows[1][i]['category']);
                    combo02.cd_nm.push(rows[1][i]['restaurantNm']);
                }

                codes.push(combo01);
                codes.push(combo02);

                res.json(codes);
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
