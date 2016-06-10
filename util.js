var Util = {};

Util.jsonParse = function( obj ) {
    return typeof obj === "string" ? JSON.parse( obj ) : obj;
}

Util.processResponse = function(err, response, jsonBody) {
    //check the error
    if (err) {
        console.log(err);
        var msg = "login failed";
        response.json(msg);
        return false;
    }
    //Check for right status code
    if (response.statusCode !== 200) {
        console.log("invalid response code : " + response.statusCode);
        var msg = "login failed";
        response.json(msg);
        return false;
    }
    //Rest failed
    if (jsonBody.status !== "success") {
        console.log("Rest failed.");
        var msg = "login failed";
        response.json(msg);
        return false;
    }
    return true;
}

module.exports = Util;
