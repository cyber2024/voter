'use strict';

var user = null;

(function(){
  
    var apiURL = appURL + '/api/user';
    var loginDiv = document.querySelector('#login-div');
    var loginButton = document.querySelector('#login-button');
    var logoutButton = document.querySelector('#logout-button');
    var addPoll = document.querySelector('.add-poll');
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", apiURL, function(data){

        if(data){
            console.log('data',data);
            loginButton.setAttribute('hidden', true);
            logoutButton.removeAttribute('hidden');
            addPoll.removeAttribute('hidden');
            user = {};
            user = JSON.parse(data);
            user.id = user.github.id;
            showUserTabs();
        } else {
            user = {};
            console.log('not logged in');
            loginButton.removeAttribute('hidden');
            logoutButton.setAttribute('hidden', true);
            addPoll.setAttribute('hidden', true);
            user.id = 'IP';
            hideUserTabs();
        }
    },{}));
    
    
  
    
})();
