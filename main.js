function Header(state) {	
	this.menuTrigger = state.menu;
	this.viewTrigger = state.view;
};

Header.prototype._toggleMenu = function () {
	
	var menu = document.querySelector('.sideMenu');

	if (this.menuTrigger == 'disable') {
		menu.classList.add('showMenu');
		this.menuTrigger = 'enable';
	} 
	else if (this.menuTrigger == 'enable') {
		menu.classList.remove('showMenu');
		this.menuTrigger = 'disable';
	}
				
};

Header.prototype._toggleView = function () {
		
	var view = document.querySelector('#view'),
	markup   = document.querySelectorAll('.sort');

	if (this.viewTrigger == 'grid') {	
		view.classList.remove('view-list');
		view.classList.add('view-grid');
		this.viewTrigger = 'list';

		for (var i = 0; i < markup.length; i++) {
		markup[i].classList.remove('grid');
		}

		for (var i = 0; i < markup.length; i++) {
		markup[i].classList.add('list');
		}
	} 
	else if (this.viewTrigger == 'list') {
		view.classList.remove('view-grid');
		view.classList.add('view-list');
		this.viewTrigger = 'grid';

		for (var i = 0; i < markup.length; i++) {
		markup[i].classList.remove('list');
		}

		for (var i = 0; i < markup.length; i++) {
		markup[i].classList.add('grid');
		}
	}
				
};

Header.prototype.listenClicks = function () {

	var menuIcon = document.querySelector('#menu'),
		menuView = document.querySelector('#view'),
		Header = this;

	menuIcon.addEventListener('click', function(){
		Header._toggleMenu();
	});

	menuView.addEventListener('click', function(){
		Header._toggleView();
	});
			
};

var state = {
	menu : 'disable',
	view : 'grid'
};

var header = new Header(state);
header.listenClicks();



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

function NotesArea (htmlObj) {	
	this.htmlObj = htmlObj;
};

NotesArea.prototype.popUp = function () {
	// Делегирование
	var allNotes = this.htmlObj;
	allNotes.addEventListener('click', function(event){
		var target = event.target;
		// цикл двигается вверх от target к родителям до allNotes
  		while (target != allNotes) {
    		if (target.classList.contains('Note')) {
     		// нашли элемент, который нас интересует!
     		if (target.classList.contains('popUp')) {
     			target.classList.remove('popUp');
     			target.scrollIntoView(false);					//проскроллить обратно к объекту, false - скролл до нижней границы объекта
     			document.body.style.overflow = "";				//разрешение прокрутки
     		} else {
     			target.classList.add('popUp');
     			target.scrollIntoView(false);
     			document.body.style.overflow = "hidden";		//запрет прокрутки
     		}
			return;
    		}
   		 target = target.parentNode;
  		}
	});
};

var htmlObj = document.querySelector('.stickersArea');  //Наша зона с заметками

var area = new NotesArea(htmlObj);
	area.popUp();										//Ждать клики для popUp


function Menu (html) {	
	this.menu         = html.menu;
	this.delAllButton = html.delAllButton;
};

Menu.prototype.deleteAll = function () {
	this.delAllButton.onclick = function () {
		localStorage.clear();
		location.reload();
	}
};


var html = {
	menu 		 : document.querySelector('.sideMenu'),
	delAllButton : document.querySelector('.cleanAll')
} 

var menu = new Menu(html);
menu.deleteAll();