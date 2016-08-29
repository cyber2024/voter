'use strict';

(function(){
    var optionSelector = document.querySelector('#option-selector');
    var customTextBox = document.querySelector('#option-text');
    var customSubmit = document.querySelector('#custom-submit');
    var addNewPoll = document.querySelector('#add-new-poll');
    var newPollName = document.querySelector('#new-poll-name');
    var list = document.querySelector('.list>ul');
    console.log(list);
    var apiUrl = 'https://voter-cyber2024.c9users.io/poll'
    
    function ready(fn){
        if(typeof fn !== 'function'){
            return;
        }
        
        if(document.readyState === 'complete'){
            return fn();
        }
        
        document.addEventListener('DOMContentLoaded', fn, false);
    }
    
    function ajaxRequest (method, url, callback, data){
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                callback(xmlhttp.response);
            }
        };
        
        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(data);
    }
    
    optionSelector.addEventListener('change', function(e){
        var selected = e.target.selectedOptions[0].text;
        if(selected == "I'd like a custom option..."){
            customTextBox.removeAttribute('hidden');
            customSubmit.removeAttribute('hidden');
        } else {
            customTextBox.hidden = 'true';
            customSubmit.hidden = 'true';
        }
    }, false);
    
    addNewPoll.addEventListener('click', function(e){
       if(newPollName.value == ''){
           console.log('do nothing');
       } else {
           var bodydata = {pollName : newPollName.value};
           ready(ajaxRequest('POST', apiUrl, function(data){
               updateList();
           }, JSON.stringify(bodydata)));
       }
    });
    
    function updateList(){
        ready(ajaxRequest('GET', apiUrl, function(data){
            list.innerHTML = '';
            data = JSON.parse(data);
            data.forEach(function(item){
               var li = document.createElement('li');
               li.className = "list-item";
               li.innerHTML = item.name;
               list.appendChild(li);
            });
        }));
    }
    updateList();
    
})();