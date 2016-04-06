"use strict"

var schema = require('../schema/user');
var co = require("co");
var validator = require("validator");
var jmcommon = require('jm-common');
var bluebird = require("bluebird");
var sq = jmcommon.sequence();
sq =bluebird.promisifyAll(sq);

module.exports = function (opts) {
    opts = opts || {};
    opts.modelName = opts.modelName || 'user';
    opts.schema = schema;

    var model = jmcommon.dao(opts);
    model.signup = function (opts) {
        return co(function* () {
            var user = yield model.findUser(opts)
            if (user) {
                throw (new Error('SSO#signup User already exists'), ERROR.FA_USER_EXIST);
                return;
            }else{
                if (opts.uid == undefined) {
                    sq.next
                    var val = yield sq.nextAsync("uid", {})
                    opts.uid = val;
                }
                var user = yield model.create(opts)
                return user;
            };
        })
    };


    model.findUser = function (opts) {
        return co(
            function* (){
                var query = [];
                if (opts.any != undefined) {
                    var any = opts.any;
                    if (validator.isInt(any)) {
                        if (opts.uid == undefined) {
                            opts.uid = any;
                        }
                        opts.mobile = opts.mobile || any;
                    }
                    if (validator.isEmail(any)) {
                        opts.email = opts.email || any;
                    } else {
                        opts.account = opts.account || any;
                    }
                }
                if (opts.uid != undefined) {
                    query.push({
                        uid: opts.uid
                    })
                }
                if (opts.account) {
                    query.push({
                        account: opts.account
                    })
                }
                if (opts.email) {
                    query.push({
                        email: opts.email
                    })
                }
                if (opts.mobile) {
                    query.push({
                        mobile: opts.mobile
                    })
                }
                if (opts.id) {
                    query.push({
                        _id: opts.id
                    })
                }

                if (!query.length) {
                    return;
                }
                console.log(query)

                var user = yield model.findOne({'$or': query});
                return user;
            }
        )
    };

    return model;
};
