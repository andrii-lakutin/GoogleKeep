function DB() {
	this.DBIterator = 0;
	this.StorageLength = localStorage.length - 1;
}

DB.prototype._DBset = function (note) {
	this.DBIterator++
	var JSONNote = JSON.stringify(note);
	localStorage.setItem("Note" + this.DBIterator, JSONNote);
	localStorage.setItem("DBIterator", this.DBIterator);
};

DB.prototype.DBload = function () {
	this._markupRepair();
	this.DBIterator = +localStorage.getItem("DBIterator");     
	items = this.DBIterator + 1;//+1 для того чтобы перебор начинался не с 0 а с 1. Потому что у нас нет Note0, отсчет начинается с Note1.
	for (var i = 1; i < items; i++) {						//i = 1 => Note1,Note2,Note3,Note4,Note5
		var note = new Note(JSON.parse(localStorage.getItem("Note" + i)));
			note.render();
	}	
};

DB.prototype._markupRepair = function () {												//Была проблема: при обновлении страницы, несколько
	switch(this.StorageLength % 5){														//заметок уже были на месте, и если создать еще за-
																						//метку то она вставала не после последней, а будто
				case 0:                   												//тех вообще нет, ставала всегда в 1 столбик, как ха-
					notesCreator.columnNumber = 0;										//рактерно для пустой страницы. 
				break;
																						//Придумал решение: Поделить количество заметок в 																			
				case 1 : 																//базе на количество столбцов (5). (деление с остатком)													
					notesCreator.columnNumber = 1;										//И в зависимости от результата определять место.
				break;

				case 2 :
					notesCreator.columnNumber = 2;			
				break;

				case 3 :
					notesCreator.columnNumber = 3;
				break;

				case 4 :
					notesCreator.columnNumber = 4;
				break;
			}
};


var db = new DB();
db.DBload();            
