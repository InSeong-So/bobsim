const express = require('express');
const router = express.Router();
const roulette = require('../data.json');

router.get('/', function (request, response, next) {
    console.log("진입");
    response.send(roulette);
});

router.get('/:id', function (request, response, next) {
    let id = parseInt(request.param.id, 10);
    console.log("메뉴 표시 id : " + id);
    let menu = roulette.filter(function(menu){
        return menu.id === id;
    });

    console.dir(menu);
    response.send(menu);
});

module.exports = router;