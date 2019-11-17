"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

let fansAppeals = [
    {body:'KEK',date:'11.09.01',time:'08:46'},
    {body:'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',date:'09.09.19',time:'12:34'},
    {body:'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',date:'09.09.19',time:'22:22'},
];
let news = [
    {url:'news/6.jpg',title:'Christmas at the Opera: January 8, 2019 Pikkardiyska tertsia will be celebrating in Lviv',body:'On the second day of Christmas, January 8, 2019, "Tertsia" enchants in his native Lviv. Meeting place for the Christmas carol - Lviv Opera. In one evening, the Piccardians will give two concerts "Christmas at the Opera" - at 17:00 and 19:00.'},
    {url:'news/5.jpg',title:'In January, "Piccardians" will take their "Best" to Sumy and Konotop',body:'On January 24, Pikkardiyska tertsia will perform in Sumy - at the Theater. Shchepkina (the concert starts at 19:00, and the following day, January 25, in Konotop - at the IPC (beginning at 19:00). Details - on the Billboards in the News.'},
    {url:'news/4.jpg',title:'The Pikkardiyska tertsia in the IVASYUK Project - to mark the 70th anniversary of Vladimir Ivasyuk',body:'On Monday, March 25, a concert dedicated to the legendary Ukrainian composer will take place at the Lviv Opera.'},
    {url:'news/3.jpg',title:'Tertsia with the Musical Etudes Concert in May in your city!',body:'Concerts of Pikkardiyska tertsia in May will cover the following cities: Vinnytsia, Zhytomyr, Ivano-Frankivsk, Ternopil, Kamianets-Podilskyi, Chervonograd. These will be musical evenings filled with light, kindness, spring, love! They carry all this in their songs piccardians! The schedule and details for each city are in the News.'},
    {url:'news/2.jpg',title:'"Tertsia" meets with concerts in Vienna and Munich',body:'At the end of November - early December, the vocal formation "Pikkardiyska tertsia" will perform in Vienna (November 29) and in Munich (December 1). The details are on the official poster of these tours.'},
    {url:'news/1.jpg',title:'August 25, "Pikkardiyska tertsia" with a solo concert in Odessa',body:'At the time of Ukraine\'s Independence Day, the piccardians will come to Odessa for a solo concert. The performance will take place at the Musical Comedy Theater. Starts at 19:00. Tickets are on sale now - the link in this News.'},
    {title:'KEK',body:'LOL',url:'/images/preview.png'},
];

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

app.get('/me', (req, res) => res.send(true));
app.get('/news', (req, res) => res.send(news));
app.get('/fansAppeals', (req, res) => res.send(fansAppeals));

app.post('/news', (req, res) => {
    news.push(req.body);
    res.status(200)
});
app.post('/fansAppeals', (req, res) => {
    fansAppeals.push(req.body);
    res.status(200)
});

app.listen(port, err => {
    if (err) return console.log('something bad happened', err);
    console.log('server is listening on ' + port)
});