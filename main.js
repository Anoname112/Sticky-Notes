var d;
var filter;
var add;
var notesdiv;

var notesdata;

function updateNote (index) {
	notesdata[index].title = d.getElementById('notetitle' + index).value;
	notesdata[index].content = d.getElementById('notecontent' + index).value;
	saveToStorage();
}

function resizeNote (index) {
	notesdata[index].height = d.getElementById('notecontent' + index).style.height;
	saveToStorage();
}

function enlargeNote () {
	// resize note to make the vertical scroll invisible
	for (var i = 0; i < notesdata.length; i++) {
		notesdata[i].height = d.getElementById('notecontent' + i).scrollHeight + 2;
	}
	generateNotes();
	saveToStorage();
}	

function deleteNote (index) {
	notesdata.splice(index, 1);
	//if (notesdata.length == 0) addNote();
	generateNotes();
	saveToStorage();
}

function addNote () {
	notesdata.push({
		'title': '',
		'content': '',
		'height': '230'
	});
	generateNotes();
	saveToStorage();
}

function filterNotes () {
	generateNotes();
}

function generateNotes () {
	var string = '';
	for (var i = 0; i < notesdata.length; i++) {
		if (filter.value.length == 0 || notesdata[i].title.includes(filter.value)) {
			string += '<div id="note' + i +  '" class="note">' +
					'<div class="noteupper">' +
						'<input type="text" id="notetitle' + i + '" class="notetitle" placeholder="title.." value="' + notesdata[i].title + '" onkeyup="updateNote(' + i + ')" oninput="updateNote(' + i + ')">' +
						'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="notebutton' + i + '" class="notebutton" onclick="deleteNote(' + i + ')" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16"><path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/><path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/></svg>' +
					'</div>' +
					'<div><textarea id="notecontent' + i + '" class="notecontent" style="height: ' + notesdata[i].height + '" onmouseup="resizeNote(' + i + ')" onkeyup="updateNote(' + i + ')" oninput="updateNote(' + i + ')">' + notesdata[i].content + '</textarea></div>' +
				'</div>';
		}
	}
	notesdiv.innerHTML = string;
}

function loadFromStorage () {
	notesdata = JSON.parse(localStorage.getItem('notesdata'));
	generateNotes();
}

function saveToStorage () {
	localStorage.setItem('notesdata', JSON.stringify(notesdata));
}

window.onload = function () {
	d = document;
	filter = d.getElementById('filter');
	add = d.getElementById('add');
	notesdiv = d.getElementById('notesdiv');
	if (localStorage.length > 0) loadFromStorage();
	else {
		notesdata = [];
		addNote();
	}
	
	filter.focus();
};