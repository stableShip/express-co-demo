"use strict"

var User = require("../lib/service/user");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jmcommon = require('jm-common');

var DB = jmcommon.DB;
var config = require("../configLoader").config;
var dburi = config.db.dbUri;
var db = DB.connect(dburi);


var model = {};
model.user = User({db: db})
module.exports = model;
