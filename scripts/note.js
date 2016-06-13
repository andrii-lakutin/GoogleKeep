function Note (data) {	
	this.title   = data.title;
	this.text    = data.text;
	this.color   = data.color;
	this.column  = data.column;
};

Note.prototype.render = function () {
	var note   = document.createElement("div");
	var title  = document.createElement('h2');
	var text   = document.createElement('p');
	var markup = document.querySelectorAll('.sort');

		title.innerHTML = this.title;
		text.innerHTML  = this.text;

		note.classList.add('Note');
		note.classList.add(this.color);
		note.appendChild(title);
		note.appendChild(text);

	markup[this.column].appendChild(note);
};
