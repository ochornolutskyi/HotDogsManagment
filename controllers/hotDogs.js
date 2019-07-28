var hotDogs = require('../models/hotDogs');

exports.all = function (req, res) {
    hotDogs.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('index', {ar: docs});
    })
}

exports.create = function(req, res){
    var hotDog = {
        name: req.body.name,
        description: req.body.description
    };
    hotDogs.create(hotDog, function (err, result){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
          res.redirect('..');
    })
}
exports.edit = function (req, res) {
    hotDogs.findByID(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var params = {
            formAction: '/update/' + doc._id + '?_method=PUT',
            formTitle: 'Edit Hot Dog', 
            name: doc.name, 
            description: doc.description,
          };
          res.render('edit', { item: params });

    });
}
exports.update = function(req, res){
    hotDogs.update(req.params.id, { $set: { name: req.body.name, description: req.body.description } }, function(err, result){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
          res.redirect('..');
    })
}

exports.delete = function(req, res){
    hotDogs.delete(req.params.id, function (err, result){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
          res.redirect('..');
    })
}