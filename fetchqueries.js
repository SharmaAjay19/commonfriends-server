var pg = require('pg');
var conString = "pg://commonfriends:commonfriends@userinfo.cch46xts17g4.us-west-2.rds.amazonaws.com:5432/userinfo";
var fs = require("fs");
var AWS = require('aws-sdk');
//var fbid = "100004039669178";
AWS.config.loadFromPath('./credentials.json');

exports.profile = function(req, res) {
	var client = new pg.Client(conString);
	client.connect();
	var fbid = req.body.fbid;
	console.log("Query made for fbid " + fbid);
	var query = client.query("SELECT "
		+ "username, "
		+ "deviceid, "
		+ "fbid, "
		+ "emailid, "
		+ "bday, "
		+ "lastlogin, "
		+ "ST_AsText(location) as loc, "
		+ "interests "
		+ "from userprofile where "
		+ "fbid='"+fbid+"';");
	query.on('row', function(row, result) {
		result.addRow(row);
	});
	query.on('end', function(result){
        res.setHeader('Content-Type', 'application/json');
        var output = JSON.stringify(result.rows, null, "  ");
        var s3bucket = new AWS.S3({params: {Bucket: 'commonfriendsphoto'}});
        console.log("Downloading picture from S3");
        s3bucket.getObject(
          { Key: fbid },
          function (error, data) {
            if (error != null) {
              console.log("Failed to retrieve an object: " + error);
            } else {
              console.log("Loaded " + data.ContentLength + " bytes");
              var jsonarr = JSON.parse(output);
              jsonarr.push({ppic: data});
              output = JSON.stringify(jsonarr);
              return res.send(output);
	          client.end();
            }
          });
    });
};

exports.getlocalpeople = function(req, res) {
	var client = new pg.Client(conString);
	client.connect();
	var radius = req.body.radius;
	console.log("Radius = " + radius);
	var centre = "ST_GeomFromText('POINT("+req.body.lat+" "+req.body.lng+")', 4326)";
	console.log("Query made for radius " + radius);
	var query = client.query("SELECT "
		+ "username, "
		+ "deviceid, "
		+ "fbid, "
		+ "emailid, "
		+ "bday, "
		+ "lastlogin, "
		+ "ST_AsText(location) as loc, "
		+ "interests "
		+ "from userprofile where "
		+ "round(CAST(ST_Distance_Sphere("
		+ centre
		+ ", location) As Numeric), 2)<"
		+ radius);
	query.on('row', function(row, result) {
		result.addRow(row);
	});
	query.on('end', function(result){
        res.setHeader('Content-Type', 'application/json');
        var output = JSON.stringify(result.rows, null, "  ");
        return res.send(output);
	    client.end();
	});
};