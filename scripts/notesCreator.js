function NotesCreator (data) {	
	this.wrap   = data.wrap;
	this.title  = data.title;
	this.text   = data.text;
	this.colors = data.colors;
	this.btn    = data.btn;
	this.colorsWrap = data.colorsWrap;

	this.state = 'Unactive';

	this.textValue = "";
	this.titleValue = "";
	this.color = 'White';

	this.columnNumber = 0;
};

NotesCreator.prototype._becomeActive = function () {
	this.title.classList.add('title-active');
	this.text.classList.add('text-active');
	this.btn.classList.add('btn-active');

	for (var i = 0; i < this.colors.length; i++) {
		this.colors[i].classList.add('colors-active');
	}	
	this.state = 'Active';
};

NotesCreator.prototype.waitUntilActivation = function () {
	var NotesCreator = this;
	this.text.addEventListener('click', function listenOneTime(){   //По клику на свернутый создатель заметок
		NotesCreator._becomeActive();		//разворачиваем создатель заметок
		NotesCreator._doneButton();			//начинаем ждать кликов по кнопке "Done"
		NotesCreator._colorChoose();		//начинаем ждать кликов для выбора цвета заметки
		NotesCreator.text.removeEventListener('click', listenOneTime);  //когда создатель заметок в активном состоянии - больше не нужно 
																		//ждать кликов для его активации. Убираем EventListener.
	});
};

NotesCreator.prototype._doneButton = function () {		//клик по кнопке Done
	var NotesCreator = this;
	this.btn.addEventListener('click', function (){	
	NotesCreator._collectData();   				    //собираем данные
	var data = NotesCreator._prepareData();			//формируем объект данных
	var note = new Note(data);						//передаем данные, создаем объект "Заметка"
	var isEmpty = NotesCreator._checkIsNoteEmpty.call(NotesCreator, note);  
	if (isEmpty == 'Not Empty') {					//Если хоть одно поле заполнено   
		NotesCreator._sortNotes(); 					//определяем место где заметка будет находится
		db._DBset(note);							//Записываем объекты в DB (LocalStorage)
		note.render();								//Рендерим заметку
	}              					
	});
};

NotesCreator.prototype._collectData = function () {
	this.textValue  = this.text.value;
	this.titleValue = this.title.value;
};

NotesCreator.prototype._checkIsNoteEmpty = function (note) {
	if (this.textValue == "" && this.titleValue == "") {
		alert("You can't leave both fields empty!")
		return 'Empty'
	} else {
		return 'Not Empty'
	}	
};

NotesCreator.prototype._prepareData = function () {

	var data = {
		title  : this.titleValue,
		text   : this.textValue,
		color  : this.color,
		column : this.columnNumber
	}

	return data;
};

NotesCreator.prototype._sortNotes = function () {
	if (this.columnNumber < 4) {
		this.columnNumber++;
	}
	else {
		this.columnNumber = 0;
	}
};

NotesCreator.prototype._colorChoose = function () {
	var NotesCreator = this;
	// Делегирование
	this.colorsWrap.addEventListener('click', function(event){
		var target = event.target;					//Ловим выбранный элемент 
		var colorID = target.className.substr(7,2); //Обрезаем лишние классы
			switch(colorID){

				case 'c1':
					NotesCreator.color = "Ametyst";
				break;

				case 'c2' :
					NotesCreator.color = "PeterRiver";
				break;

				case 'c3' :
					NotesCreator.color = "Emerald";			//Присваиваем главному объекту цвет.
				break;

				case 'c4' :
					NotesCreator.color = "Turquoise";
				break;

				case 'c5' :
					NotesCreator.color = "SunFlower";
				break;

				case 'c6' :
					NotesCreator.color = "Alizarin";
				break;
			}

			if (target.className !== 'colorsWrap') {					  //Проверка чтобы не подсвечивать целую область
																		  //которая использовалась для делегирования.	
				for (var i = 0; i < NotesCreator.colors.length; i++) {
					NotesCreator.colors[i].classList.remove('chosen');    //Убираем подсветку с элементов которые перестали быть выбранными
				}	
		
				target.classList.add('chosen');							  //Подствечиваем выбранный элемент
			}
	});
};

var HTMLelements = {
	wrap   	   : document.querySelector('.notesCreator'),
	title  	   : document.querySelector('#noteTitle'),
	text   	   : document.querySelector('#noteText'),
	btn	   	   : document.querySelector('.done'),
	colors 	   : document.querySelectorAll('.colors'),
	colorsWrap : document.querySelector('.colorsWrap')
};


var notesCreator = new NotesCreator(HTMLelements);
notesCreator.waitUntilActivation();						//Ждем пока активируют создатель заметок

