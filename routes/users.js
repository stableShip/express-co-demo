var express = require('express');
var router = express.Router();
var co = require("co");
var Promise = require("bluebird");
var model = require("../model");
var user = model.user;


router.get('/', function (req, res) {
    co(function* () {
        var account = req.query.account;
        var new_user = yield user.signup({account: account, passwd: 456});
        res.send(new_user);
    }).catch(function (err) {
        console.log(err);
    })
});


module.exports = router;
