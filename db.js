var MongoClient = require('mongodb').MongoClient;

//(всі дані для роботи з баою даних)
var state = {
    //ссилка на нашу базу даних
    db: null
}

exports.connect = function(url, done){
    if (state.db){
        return done();
    }

    MongoClient.connect(url, function(err, db){
        if (err){
            return done(err);
        }
        state.db = db.db('hotDogsDB');
        done();
    })
}

exports.get = function(){
    return state.db;
}