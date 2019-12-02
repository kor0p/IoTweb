"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root@iotweb-o7sjg.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
function DB(name, callback) {
    return client.connect(err => {
        if (err) throw err;
        const collection = client.db("iot").collection(name);
        return callback(collection);
    });
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-reqed-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.get('/me', (req, res) => res.send(true));
app.get('/:dbname',
    (req, res) => DB(req.params.dbname,
        db => db.find({}).toArray(
            (err, r) => res.send(r)
        )
    )
);
app.get('/fansAppeals',
    (req, res) => DB('fansAppeals',
        fansAppeals => fansAppeals.find({}).toArray(
            (err, r) => res.send(r)
        )
    )
);

app.post('/news', (req, res) =>
    DB('news', news => news.insertOne(req.body)).then(res.send)
);
app.post('/fansAppeals', (req, res) =>
    DB('fansAppeals', fansAppeals => fansAppeals.insertOne(req.body)).then(res.send)
);

const server = app.listen(port, err => {
    if (err) return console.log('error ¯\\_(ツ)_/¯ :', err);
    console.log('server is listening on ' + port);
});

process.on('SIGINT', () =>
    server.close(err => {
        if (err) throw err;
        client.close().then(
            () => process.exit(0)
        )
    })
);