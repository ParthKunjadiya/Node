const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    // '@' replace with '%40' in following URL
    MongoClient.connect('mongodb+srv://Parth:%40Parth45%40@cluster0.tajycs5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err)
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;