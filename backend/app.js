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

app.route('/rouletteInit')
    .post((req, res) => {
        new Promise((resolve, reject) => {
            try {
                const param = {
                    x: req.query.x,
                    y: req.query.y
                };
                getCurrentAddress(param).then((data) => {
                    const regionName = data[0].road_address != null
                        ? data[0].road_address.region_1depth_name + " " + data[0].road_address.region_2depth_name
                        : data[0].address.region_1depth_name + " " + data[0].address.region_2depth_name;
                    let codes = [];
                    connection.query(query.thisRegionRestaurantList, (err, rows) => {
                        if (rows.length > 0) {
                            for (let i in rows) {
                                const temp = {
                                    category: rows[i]['category'],
                                    restaurantNm: rows[i]['restaurantNm']
                                };
                                codes.push(temp);
                            }
                        }

                        resolve(res.json(codes));
                    });
                }).catch(err => {
                    // TODO
                    res.send(err);
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
