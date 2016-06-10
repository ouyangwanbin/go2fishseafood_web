var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var session = require('client-sessions');
var port = process.env.PORT || 3000;
var userService = require('./userService');


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

app.use(router);
app.use("/", express.static('client'));

router.post("/login", function(req, res) {
    var userEmail = req.body.userEmail;
    var password = req.body.password;
    userService.login(userEmail, password, req, res);
});

router.get("/getUser", function(req, res) {
    res.json( req.session.user );
});

router.get("/logout", function(req, res) {
    var user = req.session.user;
    if( user ){
        userService.logout(user, req, res);
    }
});


app.listen(port);
console.log('Server running on ' + port);
