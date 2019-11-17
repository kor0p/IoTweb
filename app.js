const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

var fansAppeals = [];
var news = [];

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-reqed-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('v:1.0.0'));
app.get('/me', (req, res) => res.send(true));
app.get('/news', (req, res) => res.send(news));
app.get('/appeal', (req, res) => res.send(fansAppeals));

app.post('/appeal', (req, res) => {
    fansAppeals.push(req.body);
    res.status(200)
});

app.post('/news', (req, res) => {
    news.push(req.body);
    res.status(200)
});

app.listen(port, err => {
    if (err) return console.log('something bad happened', err);
    console.log('server is listening on ' + port)
});