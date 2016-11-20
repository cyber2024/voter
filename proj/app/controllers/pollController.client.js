'use strict';
    
    var optionSelector = document.querySelector('#option-selector');
    var customTextBox = document.querySelector('#option-text');
    var customSubmit = document.querySelector('#custom-submit');
    var addNewPoll = document.querySelector('#add-new-poll');
    var newPollName = document.querySelector('#new-poll-name');
    var list = document.querySelector('.list>ul');
    var apiUrl = 'https://rusty-voter.herokuapp.com/poll'
    var selected = '';
    var pollOptionSelect = '';
    var detailView = document.querySelector('.detail-view');
    var btnVote = document.querySelector('#vote-button');
    var dchart = document.querySelector('#donutchart');
    var rawdata, filteredData;
    var pollOption1 = document.querySelector('#new-poll-option1');
    var pollOption2 = document.querySelector('#new-poll-option2');


    btnVote.addEventListener('click', function(e){
            if(pollOptionSelect == "I'd like a custom option..."){
                pollOptionSelect = customTextBox.value;
                console.log('selected custom option', pollOptionSelect);
            } else {
    
            }
            console.log("clicked vote");
            ajaxFunctions.ready(ajaxFunctions.ajaxRequest('PUT', apiUrl, function(data){
                console.log('putting ',data);
                updateList();
            },JSON.stringify({
                pollId: selected.getAttribute("_id"),
                pollOptionName: pollOptionSelect
            })));
        });
        
        optionSelector.addEventListener('change', function(e){
            console.log(e.target.selectedIndex);
            pollOptionSelect = e.target.options[e.target.selectedIndex].value;
            btnVote.removeAttribute("disabled");
            btnVote.className = '';
            btnVote.setAttribute("style","display:inline-block;");
            if(pollOptionSelect == "I'd like a custom option..."){
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
               var bodydata = {pollName : newPollName.value, pollAuthor : user.id, option1: pollOption1.value, option2: pollOption2.value};
               ajaxFunctions.ready(
                   ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
                       pollController.updateData();
                   }, JSON.stringify(bodydata)));
           }
    });
    
var pollController = {
     updateData: function(listFilter){
        ajaxFunctions.ready(
            ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
                console.log('received data...',data);
                list.innerHTML = '';
                rawdata = JSON.parse(data);
                filterData(listFilter);
            }));
    },
    

};

function filterData(listFilter){
        console.log('filtering list...',listFilter, rawdata,  user);
        if(listFilter == "MYPOLLS"){
            filteredData = rawdata.filter(function(item){
                return item.author == user.github.id;
            });
        } else {
            filteredData = rawdata;
        }
        loadList();
}

function loadList(){
        console.log('Loading list...',filteredData);
        list.innerHTML= '';
    filteredData.forEach(function(item){
                           var li = document.createElement('li');
                           li.className = "list-item";
                           li.style.position= 'relative';
                           var pollTitle = document.createElement('span');
                           pollTitle.textContent = item.name;
                           pollTitle.style.margin = '20px';
                           li.appendChild(pollTitle);
                           if(user && user.id && user.id == item.author){
                                var btnDelete = document.createElement('span');
                                btnDelete.textContent = 'x';
                                btnDelete.style.marginLeft = '5px';
                                btnDelete.style.marginRight = '5px';
                                btnDelete.style.color = 'red';
                                btnDelete.style.position = 'absolute';
                                btnDelete.style.right = '0';
                                btnDelete.addEventListener('click', function(e){
                                    var data = {_id: item._id};
                                    ajaxFunctions.ready(
                                        ajaxFunctions.ajaxRequest('DELETE', apiUrl, function(data){
                                            console.log(data);
                                            pollController.updateData();
                                    }, JSON.stringify({"_id":item._id})));
                                });
                                li.appendChild(btnDelete);
                           }
                           
                           li.setAttribute("_id", item._id);
                           
                           li.addEventListener('click',function(e){
         
                               var data = new google.visualization.DataTable();
                               data.addColumn('string','Option');
                               data.addColumn('number','Votes');
        
                                var options = {
                                  title: item.name,
                                  pieHole: 0.2,
                                  backgroundColor:"transparent"
                                };
                               optionSelector.innerHTML = "";
                               if(selected != ''){
                                    selected.className = selected.className.replace(' selected', '');
                                }
                                console.log(e.target);
                                selected = li;
                                selected.className = selected.className + ' selected';
                                detailView.removeAttribute('hidden');
                                var opt = document.createElement('option');
                                opt.innerHTML = "Choose an Option";
                                opt.setAttribute('disabled', "");
                                opt.setAttribute('selected', "");
                                opt.setAttribute('hidden', "");
                                optionSelector.appendChild(opt);
                                var rows = [];
                                for(var i = 0; i < item.options.length; i++){
                                var opt = document.createElement('option');
                                    opt.innerHTML = item.options[i];
                                    opt.value = item.options[i];
                                    optionSelector.appendChild(opt);
                                    var voteSum = item.votes.filter(function(el){
                                       return el.vote == i; 
                                    });
                                    console.log('item option['+i+']='+item.options[i]);
                                    console.log('votesum='+voteSum.length);
                                    rows.push([item.options[i], voteSum.length]);
                                    
                                    
                                }
                                console.log(rows);
                                data.addRows(rows);
                                var opt = document.createElement('option');
                                opt.innerHTML = "I'd like a custom option..."
                                opt.value = "I'd like a custom option...";
                                optionSelector.appendChild(opt);
                                
                                MyChart.drawChart(dchart, data,options);
                                    
                           });
                           list.appendChild(li);
                });
}

pollController.updateData();
