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

var enchantCity = {};

enchantCity.rand = function(n) {
	return Math.floor(Math.random() * n);
}

enchantCity.removeItemOfArray = function(array, item) {
	var index = array.indexOf(item);
	if(index >= 0) {
		array.splice(index, 1);
	}
}

enchantCity.getPlayableAudioFileExtension = function() {
	var audio;
	try {
		audio = new Audio("");
		if(audio.canPlayType) {
			var canPlayMp3 = ("" != audio.canPlayType("audio/mpeg"));
			var canPlayOgg = ("" != audio.canPlayType("audio/ogg"));
			if(canPlayMp3) {
				return ".mp3";
			} else if(canPlayOgg) {
				return ".ogg";
			} else {
				throw "The browser doesn't support any audio file formats.";
			}
		} else {
			throw "The browser doesn't have canPlayType method.";
		}
	} catch (e) {
		return "";
	}
	return "";
}

enchantCity.playSound = function(fileName) {
	var core = enchant.Core.instance;
	var sound = core.assets[fileName];
	if(sound) {
		sound.play();
	}
}

enchantCity.createFourWay = function(current, end) {
	var fourWay = [];
	
	var distance = {x: Math.abs(end.x - current.x), y: Math.abs(end.y - current.y)};
	
	var createFourWayX = function() {
		if(end.x > current.x) {
			fourWay.push({x:current.x+1, y:current.y});
			fourWay.push({x:current.x-1, y:current.y});
		} else {
			fourWay.push({x:current.x-1, y:current.y});
			fourWay.push({x:current.x+1, y:current.y});
		}
	};
	
	var createFourWayY = function() {
		if(end.y > current.y) {
			fourWay.push({x:current.x, y:current.y+1});
			fourWay.push({x:current.x, y:current.y-1});
		} else {
			fourWay.push({x:current.x, y:current.y-1});
			fourWay.push({x:current.x, y:current.y+1});
		}
	};
	
	if(distance.x > distance.y) {
		createFourWayX();
		createFourWayY();
	} else {
		createFourWayY();
		createFourWayX();
	}
	
	return fourWay;
}
