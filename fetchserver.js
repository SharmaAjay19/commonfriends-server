var fetcher = require('./fetchqueries');
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/profile', fetcher.profile);
app.post('/radSearch', fetcher.getlocalpeople);
//app.post('/updateCredentials', fetcher.updateCredentials);

app.listen(3000);
console.log('Listening on port 3000...');