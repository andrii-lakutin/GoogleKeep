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

