'use strict';

var user = null;
var apiURL = appURL + '/api/user';

ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", apiURL, function(data){
    console.log('data',data);
},{}));