var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var session = require('client-sessions');
var port = process.env.PORT || 3000;

function makeString(num) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()|}{';/.,:?<>";

    for (var i = 0; i < num; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.use(session({
    cookieName: 'session',
    secret: makeString(27),
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));


app.use("/", express.static('client'));

app.listen(port);
console.log('Server running on ' + port);