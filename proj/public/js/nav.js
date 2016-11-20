var btnAllPolls = document.querySelector('.btnAllPolls');
var btnMyPolls = document.querySelector('.btnMyPolls');
var btnMyVotes = document.querySelector('.btnMyVotes');
var btnNewPoll = document.querySelector('.btnNewPoll');
var navbar = document.querySelector('.navbar');

var tabNewPoll = document.querySelector('.tabNewPoll');
var tabAllPolls = document.querySelector('.tabAllPolls');
var tabMyPolls = document.querySelector('.tabMyPolls');
var tabMyVotes = document.querySelector('.tabMyVotes');

btnAllPolls.addEventListener('click',function(e){
    changeSelect(e.target);
    tabAllPolls.style.display = "block";    
    filterData();
    pollController.updateData();
    console.log(e.target);
    
});
btnMyPolls.addEventListener('click',function(e){
    changeSelect(e.target);
    tabAllPolls.style.display = "block";
    filterData("MYPOLLS");
    pollController.updateData("MYPOLLS");
    console.log(e.target);
    
    
});
btnMyVotes.addEventListener('click',function(e){
    changeSelect(e.target);
    tabAllPolls.style.display = "block";
    console.log(e.target);
});
btnNewPoll.addEventListener('click',function(e){
    changeSelect(e.target);
    tabNewPoll.style.display = "block";
    console.log(e.target);
});


function changeSelect(div, e){
    var selected = navbar.querySelector('.selected');
    selected.className = selected.className.replace(/ selected/,'');
    div.className += ' selected';
    
    var tabs = document.getElementsByClassName('tab');
    console.log(tabs);
    for(var i = 0; i < tabs.length; i++){
        tabs[i].style.display = "none";
    }
    
}

function showUserTabs(){
    document.querySelector('.btnMyPolls').style.display = 'inline-block';
    document.querySelector('.btnMyVotes').style.display = 'inline-block';
}
function hideUserTabs(){
    document.querySelector('.btnMyPolls').style.display = 'none';
    document.querySelector('.btnMyVotes').style.display = 'none';
}

    document.querySelector('.btnAllPolls').style.display = 'inline-block';
    document.querySelector('.btnNewPoll').style.display = 'inline-block';