var ObjectID = require("mongodb").ObjectID;

var db = require('../db');

exports.all = function (cb) {
    db.get().collection('hotDogsDB').find().toArray(function (err, docs) {
        cb(err, docs);
    })
}

exports.findByID = function (id, cb) {
    db.get().collection("hotDogsDB").findOne({
        _id: ObjectID(id)
    }, function (err, doc) {
        cb(err, doc);
    });
}

exports.create = function (hotDog, cb) {
    db.get().collection("hotDogsDB").insert(hotDog, function (err, result) {
        cb(err, result);
    });
}

exports.update = function (id, newData, cb) {
    db.get().collection("hotDogsDB").updateOne({ _id: ObjectID(id) }, newData, function (err, result) {
        cb(err, result);
    });
}

exports.delete = function (id, cb) {
    db.get().collection("hotDogsDB").deleteOne({ _id: ObjectID(id) }, function (err, result) {
        cb(err, result);
    })
}
