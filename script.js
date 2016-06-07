function visibleSettings(visibility) {
    document.getElementById('settings-overlay').style.visibility = visibility;
    document.getElementById('settings-overlay-bg').style.visibility = visibility;
}

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

    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month  = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
    var year = currDate.getFullYear();
    var dateDiv = document.getElementById('date');
    dateDiv.innerText = date + " " + month + " " + year;

}

function setLayout(rows,cols) {


    // Adds or Removes Rows
    if (document.getElementsByClassName('link-container').children.length > rows){
        while(document.getElementsByClassName('link-container').children.length > rows){
            document.getElementsByClassName('link-container').removeChild(document.getElementsByClassName('link-container').lastChild)
        }
    }else{
        while(document.getElementsByClassName('link-container').children.length < rows){

            var new_row = document.createElement('div');
            new_row.className = 'row';
            document.getElementsByClassName('link-container').appendChild(new_row)
        }
    }
    // Adds or removes columns from existing rows
    if (document.getElementsByClassName('row').children.length > cols) {
        for(i = 0; i < document.getElementsByClassName('link-container').children.length;i++) {
            while (document.getElementsByClassName('link-container').childNodes[i].children.length > cols) {
                document.getElementsByClassName('link-container').childNodes[i].removeChild(document.getElementsByClassName('link-container').childNodes[i].lastChild)
            }
        }
    }else{
        for(i = 0; i < document.getElementsByClassName('link-container').children.length;i++) {
            while (document.getElementsByClassName('link-container').childNodes[i].children.length < cols) {
                var new_inner = document.createElement('div');
                new_inner.className = 'inner';
                var new_col = document.createElement('div');
                new_col.className = 'col-md-2';
                new_col.appendChild(new_inner);
                document.getElementsByClassName('link-container').childNodes[i].appendChild(new_col);
            }
        }
    }

}

