////////////////////////////LINK GRID FUNCTIONS/////////////////////////////////////////////////////////////////////////////////////////////////
//TODO: implement modification of titles and links
//TODO: Seperate formatting for each row
//TODO: Decouple into seperate module
//TODO: Rewrite with Jquery

var rowGrid;
var searchDefault;
var arrLinks;



////////////////////////////////////////LINK GRID SETTINGS FUNCTIONS////////////////////////


function init_linkgrid(){
    getCookies();
    $("<body>").append("<div class='container link-grid-container'></div>");
    $("#settings-tabs").append("<a href='#settings' id='link-grid-settings-btn' onclick=\"link_grid_settings()\">LINKS</a>");
    var rows = [];
    for(var i=0;i<arrLinks.length;i++){
        rows.push(mkRowDiv(arrLinks[i]));
    }
    $(".link-grid-container").append(rows.join(""));
    resizeCols('m',2);
}

function getCookies(){
    arrLinks = getLinksFromCookies();
    if(arrLinks == null){
        arrLinks = [];
        arrLinks.push(4);

    }

}

function getLinksFromCookies() {
//TODO:Test cookies
    var linkCookie = getCookie('links');
    if (linkCookie != null) {
        arrLinks =[];
        var rowArray = linkCookie.replace('[', '').replace(']','').split('|');
        console.log("Row array: \n"+rowArray);
        var row;
        for (row in rowArray){
            var colArray = row.replace('{','').split('}');
            console.log("Col Array:\n"+colArray)
            var col;
            for (col in colArray){
                if(col.length>0) {
                    var title = col.split(',')[0].split(':')[1];
                    console.log("Column Title: " + title + "\nColumn Links:\n");
                    var link;
                    for (link in col.split(',')[1].split(':')[1].split('<')) {
                        if (link.length > 0) {
                            console.log("Link title: " + link.split('>')[1] + ", Link: " + link.split('>')[1]);
                        }
                    }
                }
            }
        }
        console.log(linkArray);
    }else{
        return null;
    }
}


function link_grid_settings() {
    console.log("Links clicked");
    var rowDivs = [];
    for (var i = 0;i <rowGrid;i++){
        rowDivs.push(mkMiniRowDiv(rowGrid[i]));
    }
    var minigrid = "<div class='container mini-grid-container'>"+rowDivs.join("")+"</div>";
    var content = "<div id='link-grid-settings' class='active-settings-view'>"+
        "<h2>Link Layout</h2>"+
        "Rows:"+
        "<div class='dropdown'>"+
        "<button class='btn btn-default dropdown-toggle' type='button' id='row-drop' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>"+
        "<b>"+numRows+"</b>"+
        "<span class='caret'></span>"+
        "</button>"+
        "<ul class='dropdown-menu' aria-labelledby='row-drop'>"+
        "<li><a href='#' onclick='setRow(1)'>1</a></li>"+
        "<li><a href='#' onclick='setRow(2)'>2</a></li>"+
        "<li><a href='#' onclick='setRow(3)'>3</a></li>"+
        "</ul>"+
        "</div>"+
        "Columns:"+
        "<div class='dropdown'>"+
        "<button class='btn btn-default dropdown-toggle' type='button' id='col-drop' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>"+
        "<b>"+numColumns+"</b>"+
        "<span class='caret'></span>"+
        "</button>"+
        "<ul class='dropdown-menu' aria-labelledby='col-drop'>"+
        "<li><a href='#' onclick='setCol(1)'>1</a></li>"+
        "<li><a href='#' onclick='setCol(2)'>2</a></li>"+
        "<li><a href='#' onclick='setCol(3)'>3</a></li>"+
        "<li><a href='#' onclick='setCol(4)'>4</a></li>"+
        "<li><a href='#' onclick='setCol(5)'>5</a></li>"+
        "<li><a href='#' onclick='setCol(6)'>6</a></li>"+
        "</ul>"+
        "</div>"+
        "</div>";
    $(".active-settings-view").replaceWith(minigrid);
}

function mkMiniRowDiv(cols) {
    var colDivs = [];
    for (var i = 0;i <cols;i++){
        colDivs.push("<div><div class='inner'></div></div>")
    }
    return "<div class='row mini-row'>"+colDivs.join("")+"</div>";
}

function mkRowDiv(cols) {
    var colDivs = [];
    if (cols instanceof Array){

    }else if (typeof cols == 'number') {

        for (var i = 0; i < cols; i++) {
            colDivs.push(mkColDiv("Links",[]));
        }
    }
    return "<div class='row'>"+colDivs.join("")+"</div>";
}

function setRow(rows) {
    numRows = rows;
    document.getElementById('row-drop').firstElementChild.innerHTML = rows;
    var rowDivs = $(".row");
    if (rowDivs.length > rows){ //Shrink number of Rows
        while(rowDivs.length > rows){
            rowDivs.removeChild(rowDivs.lastChild);
        }
    }else { //Grow number of rows
        while (rowDivs.length < rows) {
            var new_row = document.createElement('div');
            new_row.className = 'row';
            var new_cols = [];
            while (new_cols.length < numColumns) {
                var new_col = mkColDiv('Links');
                new_cols.push(new_col);
            }
            rowDivs.append(new_cols.join(""));
            document.getElementsByClassName('link-container')[0].appendChild(new_row)
        }
    }
    resizeCols();
    console.log("New Rows: "+document.getElementsByClassName('row').length);
}

function setRow(row,cols){
    numColumns = cols;
    document.getElementById('col-drop').firstElementChild.innerHTML = cols;
    var rowDivs = $(".row");
    console.log("Number of row divs: "+rowDivs.length);
    // Adds or removes columns from existing rows
    console.log("Number of Cols: "+ rowDivs[0].children.length);
    if (rowDivs[0].children.length > cols) {
        while (rowDivs[0].children > cols) {
            $("div:last-child",rowDivs).remove();
        }
    }else{
        var new_cols = [];
        while (new_cols.length < cols) {
            var new_col = mkColDiv('Links');
            new_cols.push(new_col);
        }
        rowDivs.append(new_cols.join(""));

    }
    resizeCols();
    console.log("New Cols: "+document.getElementsByClassName('row')[0].children.length);
}

function modifyCol() {

}

function resizeCols(size,row){
    //TODO:Rewrite
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







//?///////////////////////////Column Creation and editing///////////////////////////
function mkColDiv(name,links){
    if (links.length ==0) {
        return "<div>" +
            "<div class='inner'>" +
            "<h3 class='name'>" + name + "</h3> " +
            "<div class='link-list'>" +
            "<a href='#'>Sample</a>" +
            "</div>" +
            "</div>" +
            "</div>";
    }
}

function colEditor(row,col){

}