/**
 * Created by ing on 10.02.15.
 */
var express = require('express');
var path = require('path');
var html = require('html');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Angular');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
   console.log("Connection with database succeeded.");
});

var data = db.db;

var ip = process.env.APP_IP || '0.0.0.0';
var port = parseInt(process.env.APP_PORT || '8000');


var app = express();


app.set('views', path.join(__dirname, 'templates'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function(req, res){
   res.render('base');
});

app.get('/geo', function (req, res) {

    data.collection('geo', function (err, collection) {
        collection.find().toArray(function(err, doc){
res.send(doc);
        });
      });

});
/*
app.listen(3000);
*/
app.listen(port,ip, function () {
    console.log('The server is running, ' +
        ' please, open your browser at ',
        port + ip);
});
