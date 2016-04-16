var awsup = require('./awss3uploader');
var request  =    require('request');
exports.downloadPicFromFB =  function(fbid){
  console.log("Downloading picture from facebook...");
  var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
      var r = request(uri).pipe(fs.createWriteStream(filename));
      r.on('close', callback);
    });
  };
  download('https://graph.facebook.com/'+fbid+'/picture?width=9999', fbid+'.jpg', function(){
    console.log('Done downloading..');
    awsup.uploadPicToS3(fbid);
  });
}