var request = require('request');

request.post(
    'http://localhost:3001/updateuname',
    { form: { fbid: '100004039669178', newname: 'vishalarya'}},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        else {
            console.log("Some error occurred");
        }
    }
);