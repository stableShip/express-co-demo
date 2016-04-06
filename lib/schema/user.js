"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
    uid: {type: Number, unique: true},
    account: {type: String, unique: true, sparse: true, index: true},
    email: {type: String, unique: true, sparse: true},
    mobile: {type: String, unique: true, sparse: true},
    passwd: {type: String},
    salt: {type: String},
    nick: {type: String},
    gender: {type: String},
    country: {type: String},
    province: {type: String},
    city: {type: String},
    area: {type: String},
    birthday: {type: Date},
    active: {type: Boolean, default: true},
    crtime: {type: Date},
    ext: Schema.Types.Mixed
});

schema.path('crtime')
    .default(function () {
        return new Date()
    })
    .set(function (v) {
        return v == 'now' ? new Date() : v;
    });

