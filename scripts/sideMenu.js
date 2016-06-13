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