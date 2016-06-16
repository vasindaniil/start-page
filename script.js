
//Cookies Related Variables and Functions



var wlocation;
var background_color;
var background_image;
var font_style;

function getCookies() {
    //TODO: Implement any extra cookie data as more features are added
    wlocation = getCookie('location');
    searchDefault = getCookie('search');
    if (searchDefault == null){
        searchDefault = 'yandex';
    }
    font_style = getCookie('font');
    if (font_style == null){
        font_style = 'arial 16px white'
    }
    background_color = getCookie('background_color');
    if (background_color == null){
        background_color = '#222222'
    }
    background_image = getCookie('background_image');
    numColumns = parseInt(getCookie('columns'));
    if (getCookie('columns')== null){
        numColumns = 4;
    }
    
}

function getCookie (cname){
    var cookArray = document.cookie.split(';');
    var cookie;
    for (cookie in cookArray){
        if (cookie.split('=')[0]==cname){
            return cookie.split('=')[1];
        }
    }
    return null;
}



/////////////////////////////////////INITIALIZATION FUNCTIONS////////////////////////////////////////////////////////
$(document).ready(function() {
    getCookies();
    initLayout();
    switch(location.hash){
        case '#settings':
            visibleSettings('visible');
        break;
    }

});

function initLayout(){
    //TODO: Implement Initialization of layout fully
    //TODO: Reimplement via plugin system
    init_linkgrid();




}
///////////////////////////////////////////SEARCH ENGINE FUNCTIONS/////////////////////////////////////////////////////////////
function setSearchEngine(engine){
    //TODO: Implement Search Engine choosing
}


//////////////////////////////////////////DATETIME WIDGET FUNCTIONS//////////////////////////////////////////////////////////////
function displayTD() {
    var currDate = new Date();

    var hours = currDate.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }

    var minutes = currDate.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var seconds = currDate.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    var clockDiv = document.getElementById('time');
    clockDiv.innerText = hours + ":" + minutes + ":" + seconds;


    var date = currDate.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    var month = currDate.getMonth();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var year = currDate.getFullYear();
    var dateDiv = document.getElementById('date');
    dateDiv.innerText = date + " " + months[month] + " " + year;

}


//////////////////////////////////SETTINGS VISIBILITY////////////////////////////////////////////////////////////////////////////
function visibleSettings(visibility) {
    if(visibility=="visible"){
        $("#settings-overlay").show();
        $("#settings-overlay-bg").show();
    }else if (visibility=='hidden'){
        $("#settings-overlay").hide();
        $("#settings-overlay-bg").hide();
    }
}

function general_settings(){
    var content = "<div id='general-settings' class='active-settings-view'><h2>General Settings</h2></div>";
    $(".active-settings-view").replaceWith(content);
}