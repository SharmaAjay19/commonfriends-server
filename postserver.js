var poster = require('./postqueries');
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/insert', poster.insertCredentials);
app.post('/updatell', poster.updateLocation);
app.post('/updateuname', poster.updateUsername);
app.post('/updatePic', poster.)
//app.post('/radSearch', fetcher.getlocalpeople);
//app.post('/updateCredentials', fetcher.updateCredentials);

app.listen(3001);
console.log('Listening on port 3001...');