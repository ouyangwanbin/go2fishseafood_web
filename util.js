var Util = {};

Util.jsonParse = function( obj ) {
    return typeof obj === "string" ? JSON.parse( obj ) : obj;
}

Util.processResponse = function( err , response , jsonBody) {
    //check the error
    if (err || response.statusCode !== 200 || jsonBody.status !== "success" ) {
        return false;
    }
    return true;
}

module.exports = Util;
