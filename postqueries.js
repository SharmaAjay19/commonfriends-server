var awsup = require('./awss3uploader');
var dwnld = require('./downloadPicture');
var pg = require('pg');
var conString = "pg://commonfriends:commonfriends@userinfo.cch46xts17g4.us-west-2.rds.amazonaws.com:5432/userinfo";

exports.insertCredentials = function(req, res) {
	var client = new pg.Client(conString);
	client.connect();
	var username = req.body.username;
	var dvid = req.body.deviceid;
	var fbid = req.body.fbid;
	var emailid = req.body.emailid;
	var bday = req.body.bday;
	var lastlogin = req.body.ll;
	var lat = req.body.lat;
	var lng = req.body.lng;
	var interests = req.body.interests;
	console.log(fbid);
	var query = client.query("INSERT INTO userprofile values('"
		+ username + "', '"
		+ dvid + "', '"
		+ fbid + "', '"
		+ emailid + "', '"
		+ bday + "', '"
		+ lastlogin + ", "
		+ "ST_GeomFromText('POINT(" + lat + " " + lng + ")', 4326), '"
		+ interests + "');"
		);
	query.on('end', function(result) {
		client.end();
		if (!result) {
			console.log("Error in inserting");
			res.send("Error came!");
		} else {
			console.log("Inserted Successfully");
			dwnld.downloadPicFromFB(fbid);
			res.send("Inserted!");
		}
	});
};

exports.updateUsername = function(req, res) {
	var client = new pg.Client(conString);
	client.connect();
	var fbid = req.body.fbid;
	var usrname = req.body.newname;
	console.log(fbid);
	var query = client.query("UPDATE userprofile SET "
		+"username = '"+usrname+"' "
		+"where fbid='"+fbid+"';");
	query.on('end', function(result) {
		  client.end();
		  if (!result) {
			console.log("Error in updating");
			return res.send("Error came!");
		  } else {
			console.log("Updated Successfully");
			return res.send("Updated!");
		  }
	});
};

exports.updateLocation = function(req, res) {
	var client = new pg.Client(conString);
	client.connect();
	var fbid = req.body.fbid;
	var lat = req.body.lat;
	var lng = req.body.lng;
	var lastlogin = req.body.ll;
	console.log(fbid);
	var query = client.query("UPDATE userprofile SET "
		+"lastlogin = '"+lastlogin+"', "
		+"location=ST_GeomFromText('POINT("+lat+" "+lng+")', 4326) "
		+"where fbid='"+fbid+"';");
	query.on('end', function(result) {
		  client.end();
		  if (!result) {
			console.log("Error in updating");
			return res.send("Error came!");
		  } else {
			console.log("Updated Successfully");
			return res.send("Updated!");
		  }
	});
};

exports.updateInterests = function(req, res) {
	var client = new pg.Client(conString);
	client.connect();
	var fbid = req.body.fbid;
	var interests = req.body.interests;
	console.log(fbid);
	var query = client.query("UPDATE userprofile SET "
		+"interests = '"+interests+"' "
		+"where fbid='"+fbid+"';");
	query.on('end', function(result) {
		  client.end();
		  if (!result) {
			console.log("Error in updating");
			return res.send("Error came!");
		  } else {
			console.log("Updated Successfully");
			return res.send("Updated!");
		  }
	});
};

/*exports.updatePPic = function(req, res) {

}*/