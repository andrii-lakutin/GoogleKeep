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


