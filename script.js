
/* Получаем информацию с сервера */

function loadData() {
	//get artist name and convert 
	let artistName = document.getElementById("artist-name").value;
	artistName = artistName.replace(/\s/ig, '+');

	//send a query
	var url = "https://itunes.apple.com/search?term=" + artistName;

	var xhr = new XMLHttpRequest();
	  
    xhr.open('GET', url, false);
      
	xhr.send();

	if (xhr.status != 200) {
        // обработать ошибку
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        } else {
		    return xhr.responseText;
		}
		
	
}

/* Делаем список с блоками с информацией */



function showData() {
	var data = loadData();
	var li = document.createElement('li');
	li.className = 'navigation-line';
	li.innerHTML = '<div class="navigation-artist">Artist</div><div class="navigation-track">Track</div><div class="navigation-collection">Collection</div><div class="navigation-genre">Genre</div>';
	list.appendChild(li);
    for (i=0; i<JSON.parse(data).resultCount; i++) {
    	var color = colorGen(i);
    	var trackDuration = millisToMinutes(JSON.parse(data).results[i].trackTimeMillis);
    	var li = document.createElement('li');
    	li.className = 'general-line';
    	li.style = 'background-color:' + color;
    	li.innerHTML =  '<div class="image"><img src="' + JSON.parse(data).results[i].artworkUrl100 
    	+ '"></div><div class="artistName">' + JSON.parse(data).results[i].artistName 
    	+ '</div><div class="trackName">' + JSON.parse(data).results[i].trackName 
    	+ '</div><div class="collectionName">' + JSON.parse(data).results[i].collectionName 
    	+ '</div><div class="genreName">' + JSON.parse(data).results[i].primaryGenreName 
    	+ '</div><div class="additional-info-button"><button class="add-info" style="background-color:' + color 
    	+ '; background-image:url(img/plus.svg)" onclick="additionalInfo(\'add-info\',' + i + ');"></button></div><div class="info" id="' + i 
    	+ '" style="display:none"><span class="headline">' + JSON.parse(data).results[i].artistName + ' - ' + JSON.parse(data).results[i].trackName 
    	+ '</span><img class="note-icon" src="img/note.svg" ><div class="add-info-row" ><div class="add-info-cell"><b>Collection: </b>' + JSON.parse(data).results[i].collectionName 
    	+ '</div><div class="add-info-cell" ><b>Track duration: </b>' + trackDuration 
    	+ '</div></div><div class="add-info-row" ><div class="add-info-cell" ><b>Track Count: </b>' + JSON.parse(data).results[i].trackNumber 
    	+ '</div><div class="add-info-cell" ><b>Track Price: </b>' + JSON.parse(data).results[i].trackPrice + ' ' + JSON.parse(data).results[i].currency 
    	+ '</div></div><div class="add-info-row" ><div class="add-info-cell" ><b>Price: </b>' + JSON.parse(data).results[i].collectionPrice + ' ' + JSON.parse(data).results[i].currency 
    	+ '</div></div></div>' ;
    	list.appendChild(li);
    }
}

/* открываем дополнительную информацию, если надо */

function additionalInfo(className, id) {
    var data = loadData();
    var elements = document.getElementsByClassName(className);
	
    if ( document.getElementById(id).style.display == 'none' ) {
    	
    	for (i=0; i<JSON.parse(data).resultCount; i++) {
		    
		    if (document.getElementById(i).style.display == 'block') 
		        
		        document.getElementById(i).style.display = 'none';
		    	elements[i].style.backgroundImage = 'url("img/plus.svg")';
	    } 
        document.getElementById(id).style.display = 'block';
        elements[id].style.backgroundImage = 'url("img/minus.svg")';
    }
    else {

        document.getElementById(id).style.display = 'none';
        elements[id].style.backgroundImage = 'url("img/plus.svg")';
    }
}

/* генерируем чередующиеся цвета в списке */

function colorGen(i) {
	if (i%2 == 0) return '#F8F8FF';
	else return '#C0C0C0';
}

/* переводим миллисекунды в минуты */

function millisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
