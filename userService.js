var config = require('./config');
var request = require('request');
var util = require('./util')
var UserService = {};

UserService.login = function(email, password, req, response) {
    request(config.RestURL['development'] + '/users/' + email + '/1', function(err, res, body) {
        var jsonBody = util.jsonParse(body);
        if (!util.processResponse(err, response, jsonBody)) {
            return;
        }
        var count = jsonBody.data.count;
        if (count <= 0) {
            return;
        }
        //authenticate to get the token
        console.log('authenticate');
        var option = {
            url: config.RestURL['development'] + '/auth',
            method: 'POST',
            json: {
                email: email,
                password: password
            }
        }
        request(option, function(err, res, body) {
            var jsonBody = util.jsonParse(body);
            if (!util.processResponse(err, response, jsonBody)) {
                return;
            }
            //store in the session
            req.session.user = {};
            req.session.user.email = jsonBody.data.user.email;
            req.session.user.userId = jsonBody.data.user._id;
            req.session.user.token = jsonBody.data.token;
            response.json(jsonBody.data.user);
        });
    });
}

UserService.logout = function(user, req, response) {
    var option = {
        url: config.RestURL['development'] + '/tokens/' + user.userId,
        method: 'DELETE',
        headers: {
            token: user.token
        }
    }
    request(option, function(err, res, body) {
        var jsonBody = util.jsonParse(body);
        req.session.user = null;
    	response.json( jsonBody.data );
    })
}

module.exports = UserService;
