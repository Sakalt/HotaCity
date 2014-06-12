/*
	EnchantCity
	Copyright (C) 2013-2014 http://blog.simtter.com

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

enchantCity.message = {};

enchantCity.message.Parser = function(messageName) {
	this.messageElements = document.getElementsByName(messageName);

	for(var i = 0; i < this.messageElements.length; i++) {
		var messageElement = this.messageElements.item(i);
		messageElement.style.display = "none";
	}
}

enchantCity.message.Parser.prototype.getPages = function(id) {
	var messageElement = null;
	for(var i = 0; i < this.messageElements.length; i++) {
		messageElement = this.messageElements.item(i);
		
		if(messageElement.id==id) {
			break;
		}
	}
	
	if(i >= this.messageElements.length) {
		return null;
	}

	var pages = messageElement.getElementsByTagName("p");
	
	return pages;
}

enchantCity.message.Parser.prototype.getPage = function(id, pageNo) {

	var pages = this.getPages(id);
	if(pages==null) {
		return null;
	}
	
	var page = pages.item(pageNo);
	return page;
}
