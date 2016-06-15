
//Cookies Related Variables and Functions

var numColumns = '';
var numRows;
var searchDefault;
var arrLinks;

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
    numRows = parseInt(getCookie('rows'));
    if(getCookie('rows') == null){
        numRows = 1;
    }
    arrLinks = getCookieLinks();
    if(arrLinks == null){
        arrLinks = [new Array(4)];
        var links;
        for(links in arrLinks[0]){
            links = ['Links',[]];
        }
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

function getCookieLinks() {
    //TODO: Implement Cookie Links
    var linkCookie = getCookie('links');
    if (linkCookie != null) {
        var linkArray = linkCookie.replace('{', '').split('}');
        console.log(linkArray);
    }else{
        return null;
    }
}

/////////////////////////////////////INITIALIZATION FUNCTIONS////////////////////////////////////////////////////////
window.onload = function() {
    getCookies();
    initLayout();
    switch(location.hash){
        case '#settings':
            visibleSettings('visible');
        break;
    }

}

function initLayout(){
    //TODO: Implement Initialization of layout fully
    //TODO: Reimplement via plugin system
    console.log("Search engine: " + searchDefault+"\nColumns: "+numColumns+"\nRows: "+numRows);
    setSearchEngine(searchDefault);
    setCol(numColumns);
    setRow(numRows);

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

////////////////////////////LINK GRID FUNCTIONS/////////////////////////////////////////////////////////////////////////////////////////////////
//TODO: implement modification of titles and links
//TODO: Seperate formatting for each row
//TODO: Decouple into seperate module
function setRow(rows) {
    numRows = rows;
    document.getElementById('row-drop').firstElementChild.innerHTML = rows;
    if (document.getElementsByClassName('row').length > rows){ //Shrink number of Rows
        while(document.getElementsByClassName('row').length > rows){
            document.getElementsByClassName('link-container')[0].removeChild(document.getElementsByClassName('link-container')[0].lastChild)
        }
    }else { //Grow number of rows
        while (document.getElementsByClassName('row').length < rows) {
            var new_row = document.createElement('div');
            new_row.className = 'row';
            while (new_row.children.length < parseInt(document.getElementById('col-drop').firstElementChild.innerHTML)) {
                var new_col = mkColDiv('Links');
                new_row.appendChild(new_col);
            }
            document.getElementsByClassName('link-container')[0].appendChild(new_row)
        }
    }
    resizeCols();
    console.log("New Rows: "+document.getElementsByClassName('row').length);
}

function setCol(cols){
    numColumns = cols;
    document.getElementById('col-drop').firstElementChild.innerHTML = cols;
    // Adds or removes columns from existing rows
    console.log("Number of Cols: "+ document.getElementsByClassName('row')[0].children.length);
    if (document.getElementsByClassName('row')[0].children.length > cols) {
        console.log("Number of Rows: "+ document.getElementsByClassName('row').length);
        for(i = 0; i < document.getElementsByClassName('row').length;i++) {

            while (document.getElementsByClassName('row')[i].children.length > cols) {
                console.log('removed col from '+i);
                document.getElementsByClassName('row')[i].removeChild(document.getElementsByClassName('row')[i].lastChild)
            }
        }
    }else{
        for(i = 0; i < document.getElementsByClassName('row').length;i++) {
            while (document.getElementsByClassName('row')[i].children.length < cols) {
                var new_col = mkColDiv('Links');
                document.getElementsByClassName('row')[i].appendChild(new_col);
            }
        }
    }
    resizeCols();
    console.log("New Cols: "+document.getElementsByClassName('row')[0].children.length);
}

function resizeCols(){
    for(i = 0; i < document.getElementsByClassName('row').length;i++) {
        for(j = 0; j < document.getElementsByClassName('row')[i].children.length;j++) {
            switch (parseInt(document.getElementById('col-drop').firstElementChild.innerHTML)){
                case 1:
                    document.getElementsByClassName('row')[i].children[j].className = 'col-md-12 ';
                    break;
                case 2:
                    document.getElementsByClassName('row')[i].children[j].className = 'col-md-6 ';
                    break;
                case 3:
                    document.getElementsByClassName('row')[i].children[j].className = 'col-md-4 ';
                    break;
                case 4:
                    document.getElementsByClassName('row')[i].children[j].className = 'col-md-3 ';
                    break;
                case 5:
                    document.getElementsByClassName('row')[i].children[j].className = 'col-md-2 ';
                    if(j==0) {
                        document.getElementsByClassName('row')[i].children[j].className += 'col-md-offset-1 ';
                    }
                    break;
                case 6:
                    document.getElementsByClassName('row')[i].children[j].className = 'col-md-2 ';
                    break;

            }
            document.getElementsByClassName('row')[i].children[j].className+='linkarea';

        }
    }
}

function mkColDiv(name){
    var title = document.createElement('h3');
    title.className = 'link-header';
    title.innerHTML = name;
    var link = document.createElement('a');
    link.className = 'link';
    link.href = '#';
    link.innerHTML = "Sample";
    var list = document.createElement('div');
    list.className = 'link-list';
    list.appendChild(link);
    var new_inner = document.createElement('div');
    new_inner.className = 'inner';
    new_inner.appendChild(title);
    new_inner.appendChild(list);
    var new_col = document.createElement('div');
    new_col.appendChild(new_inner);
    return new_col;
}

//////////////////////////////////SETTINGS VISIBILITY////////////////////////////////////////////////////////////////////////////
function visibleSettings(visibility) {
    document.getElementById('settings-overlay').style.visibility = visibility;
    document.getElementById('settings-overlay-bg').style.visibility = visibility;
    openSetting('general-settings');
}

function openSetting(setting){
    document.getElementsByClassName('active-settings-view')[0].style.visibility = 'hidden';
    document.getElementsByClassName('active-settings-view')[0].className = 'inactive-settings-view';
    document.getElementById(setting).style.visibility = 'visible';
    document.getElementById(setting).className='active-settings-view';
    // document.getElementById(setting+'-btn').focus();
}