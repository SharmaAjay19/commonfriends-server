var fs = require("fs");
var AWS = require('aws-sdk');
//var fbid = "100004039669178";
AWS.config.loadFromPath('./credentials.json');
exports.uploadPicToS3 = function(fbid){
  console.log("Uploading picture to S3");
  var s3bucket = new AWS.S3({params: {Bucket: 'commonfriendsphoto'}});
  s3bucket.createBucket(function() {
    var img = fs.readFileSync('./'+fbid+'.jpg');
    var params = {Key: fbid, Body: img};
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
        fs.unlinkSync('./'+fbid+'.jpg');
      }
    });
  });
};

exports.downloadPicFromS3 = function(fbid){
  var s3bucket = new AWS.S3({params: {Bucket: 'commonfriendsphoto'}});
  console.log("Downloading picture from S3");
  s3bucket.getObject(
    { Key: fbid },
    function (error, data) {
      if (error != null) {
        console.log("Failed to retrieve an object: " + error);
      } else {
        console.log("Loaded " + data.ContentLength + " bytes");
        return data
      }
    }
  );
};