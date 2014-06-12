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

enchantCity.main = {
	sceneWidth: 320,
	sceneHeight: 320,

	fps: 12,

	tileWidth: 16,
	tileHeight: 16,

	images: {
		"castle": "castle.png",
		"town": "town.png",
		"dungeon": "dungeon.png",
		"road": "road.png",
		"worker": "worker.png",
		"shopper": "shopper.png",
		"student": ["student0.png", "student1.png"],
		"monster": "monster.png",
		"map": "map0.gif",
		"cursor": "cursor.png",
		"population": "population.png",
		"cash": "cash.png",
		"death": "death.png",
		"enchantGirl": "enchantGirl.png",
		"iconMenuBgHighlight": "iconMenuBgHighlight.png",
		"play": "play.png",
		"pause": "pause.png",
		"heal": "heal.png",
		"cantHeal": "cantHeal.png"},

	sprites: {
		"destroy": "effect0.png",
		"liquidate": "effect1.png"},

	ses: {
		"deploy": 'se_maoudamashii_battle15',
		"destroy": 'se_maoudamashii_explosion03',
		"ng": 'se_maoudamashii_onepoint14',
		"attack": 'se_maoudamashii_battle03',
		"liquidate": 'se_maoudamashii_element_thunder04',
		"injured": 'se_maoudamashii_voice_monster03',
		"heal": 'se_maoudamashii_system46'},

	bgm: {
		"daytime": ["bgm_maoudamashii_symphony02", "game_maoudamashii_4_field09", "game_maoudamashii_4_field11"],
		"nighttime": ["game_maoudamashii_6_dangeon17", "game_maoudamashii_6_dangeon23"],
		"christmas": ["song_cover_xmas07_mio_st_party_night"],
		"verde": ["game_maoudamashii_5_village03b"]},

	get preloadList() {
		var list = [];

		for(var key in this.images) {
			if(this.images[key] instanceof Array) {
				for(var i = 0; i < this.images[key].length; i++) {
					list.push(this.images[key][i]);
				}
			} else {
				list.push(this.images[key]);
			}
		} 

		for(var key in this.sprites) {
			list.push(this.sprites[key]);
		} 

		return list;
	},

	get soundList() {
		var list = [];

		for(var key in enchantCity.widget.ses) {
			list.push(enchantCity.widget.ses[key]);
		} 

		for(var key in this.ses) {
			list.push(this.ses[key]);
		} 

		return list;
	},

	tileNumbers: {
		"cursor": -2,
		"destroy": -1,
		"castle": 369,
		"town": 370,
		"dungeon": 371,
		"road": 175,
		"highway": 311},

	buttonNames: {
		"cursor": "",
		"destroy": "壊",
		"castle": "商",
		"town": "住",
		"dungeon": "工",
		"road": "道",
		"bgm": "BGM",
		"region":"区",
		"end":"終"},

	mapTypes: {
		"sea": 0,
		"grass": 1,
		"flagstone": 2,
		"desert": 3,
		"marblestone": 4,
		"forest": 5,
		"rock": 6,
		"hole": 7},

	startDate: new Date(2000, 11, 1, 6, 0),
	date: new Date(),
	isProgressingTime: true,
	time: "daytime",
	secondsPerFrame: 60,
	cash: 50,
	get population() {
		var n = this.avatars["workers"].length + 
				this.avatars["shoppers"].length + 
				 this.avatars["students"].length;
		return n;
	},
	medicalExpense: 2,

	buildings: {
		"castles": [],
		"towns": [],
		"dungeons": [],
		"highways": []},

	avatars: {
		"workers": [],
		"shoppers": [],
		"students": [],
		"monsters": []},

	infinity: -1,
	
	isRedraw: false,
	isPlayChristmasSong: false,
	
	isPlayingTutorial: false,
	doneIntroduction: false,
	
	canChangeBgmPlayer: true,
	
	limitNodeCount: 10};

enchantCity.widget.ses["touchstart"] = 'se_maoudamashii_se_pc03';

enchantCity.main.date.setTime(enchantCity.main.startDate.getTime());
enchantCity.main.progressibleTime = enchantCity.main.startDate.getTime();

enchantCity.main.bgmPlayerName = enchantCity.main.time;

enchantCity.main.tileNumber = enchantCity.main.tileNumbers["cursor"];
enchantCity.main.mapTileNumber = enchantCity.main.tileNumbers["cursor"];

enchantCity.main.roadTiles = [
	enchantCity.main.tileNumbers["road"], 
	enchantCity.main.tileNumbers["highway"]];

enchantCity.main.buildingsNameToTileNumber = {
	"castles": enchantCity.main.tileNumbers["castle"],
	"towns": enchantCity.main.tileNumbers["town"],
	"dungeons": enchantCity.main.tileNumbers["dungeon"]};

enchantCity.main.tileNumberToBuildingsName = {};
enchantCity.main.initilazeTileNumberToBuildingsName = function() {
	this.tileNumberToBuildingsName[this.tileNumbers["town"]] = "towns";
	this.tileNumberToBuildingsName[this.tileNumbers["castle"]] = "castles";
	this.tileNumberToBuildingsName[this.tileNumbers["dungeon"]] = "dungeons";
};
enchantCity.main.initilazeTileNumberToBuildingsName();
delete enchantCity.main.initilazeTileNumberToBuildingsName;

enchantCity.main.tileNumberToDeployCost = {};
enchantCity.main.initilazeTileNumberToDeployCost = function() {
	this.tileNumberToDeployCost[this.tileNumbers["road"]] = 2;
	this.tileNumberToDeployCost[this.tileNumbers["town"]] = 5;
	this.tileNumberToDeployCost[this.tileNumbers["castle"]] = 10;
	this.tileNumberToDeployCost[this.tileNumbers["dungeon"]] = 10;
};
enchantCity.main.initilazeTileNumberToDeployCost();
delete enchantCity.main.initilazeTileNumberToDeployCost;

enchantCity.main.secondToGameSecond = function(second) {
	var gameSecond = second/this.secondsPerFrame;
	return gameSecond;
};

enchantCity.main.secondLimits = {
	"sunset": enchantCity.main.secondToGameSecond(3600),
};

enchantCity.main.secondToGameTime = function(second) {
	var gameTime = this.secondToGameSecond(second)*1000/this.fps;
	return gameTime;
};

enchantCity.main.timeLimits = {
	"absorbLandCost": 12 * 60 * enchantCity.main.secondsPerFrame * 1000,
	"createMonster": 30 * enchantCity.main.secondsPerFrame * 1000,
	"buyFood": 15 * enchantCity.main.secondsPerFrame * 1000,
	"goToShopping": 15 * enchantCity.main.secondsPerFrame * 1000,
	"searchRouteToMonster": 0 * enchantCity.main.secondsPerFrame * 1000};

enchantCity.main.doneIntroduction = false;
enchantCity.main.isPlayNextTutorial = false;
enchantCity.main.tutorialOldPage = {};

enchantCity.main.createFiveWays = function(_x, _y) {
	var fiveWays = [
		{x:_x, y:_y},
		{x:_x, y:_y-1},
		{x:_x, y:_y+1},
		{x:_x-1, y:_y},
		{x:_x+1, y:_y}];
	
	return fiveWays;
};

enchantCity.main.secondToFrame = function(sec) {
	return this.fps*sec;
};

enchantCity.main.addChild = function(child) {
	var core = enchant.Core.instance;
	var index = core.rootScene.childNodes.indexOf(child);
	if(index==-1) {
		core.rootScene.insertBefore(child, enchantCity.main.sunsetEntity);
	}
};

enchantCity.main.TileSprite = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, spriteName) {
		enchant.Sprite.call(this, enchantCity.main.tileWidth, enchantCity.main.tileHeight);
		this.x = x;
		this.y = y;
		this.freme = 0;
		var core = enchant.Core.instance;
		this.image = core.assets[enchantCity.main.sprites[spriteName]];
		this.frameLength = (this.image.height/this.height)*(this.image.width/this.width);
		this.addEventListener("enterframe", function() {
			this.frame = this.age/4;
			if(this.frame>=this.frameLength) {
				if(this.parentNode) {
					this.parentNode.removeChild(this);
				}
			}
		});
	}
});
		
enchantCity.main.playSpriteAndSound = function(mapX, mapY, effectName) {
	var tileSprite = new this.TileSprite(mapX*this.tileWidth, mapY*this.tileHeight, effectName);
	this.addChild(tileSprite);
	enchantCity.playSound(this.ses[effectName]);
}

enchantCity.main.playSpriteAndSoundOnAvatar = function(avatar, effectName) {
	var tileSprite = new this.TileSprite(0, 0, effectName);
	avatar.addChild(tileSprite);
	enchantCity.playSound(this.ses[effectName]);
}

enchantCity.main.PausingSprite = enchant.Class.create(enchantCity.widget.BlinkingSprite, {
	initialize: function(building) {
		var x = building.mapX * enchantCity.main.tileWidth;
		var y = building.mapY * enchantCity.main.tileHeight;
		enchantCity.widget.BlinkingSprite.call(this, x, y, enchantCity.main.tileWidth, enchantCity.main.tileHeight, 'rgba(255, 0, 0, 0.8)', enchantCity.main.images["pause"]);
		this.addEventListener("touchstart", function(e) {
			enchantCity.main.touchTile(e.x, e.y);
		});
	}
});

enchantCity.main.InjuredSprite = enchant.Class.create(enchantCity.widget.BlinkingSprite, {
	initialize: function(building) {
		var core = enchant.Core.instance;
		var image = core.assets[enchantCity.main.images["heal"]];
		var x = building.mapX * enchantCity.main.tileWidth + ((enchantCity.main.tileWidth-image.width)/2);
		var y = building.mapY * enchantCity.main.tileHeight + ((enchantCity.main.tileHeight-image.height)/2);
		enchantCity.widget.BlinkingSprite.call(this, x, y, image.width, image.height, 'rgba(128, 0, 255, 0.8)', enchantCity.main.images["heal"]);
		this.addEventListener("touchstart", function(e) {
			enchantCity.main.touchTile(e.x, e.y);
		});
	}
});

enchantCity.main.Building = function(mapX, mapY) {
	this.mapX = mapX;
	this.mapY = mapY;
	this.buildingsName = null;
	
	this.createdTime = enchantCity.main.date.getTime();
	this.landCostReceivedTime = this.createdTime;
	
	this.isPlaying = true;
	this.pausingSprite = null;
	
	this.avatars = {
		"workers": {
			"available": 0,
			"stayer": []},

		"shoppers": {
			"available": 0,
			"stayer": []},

		"students": {
			"available": 0,
			"stayer": []},

		"monsters": {
			"available": 0,
			"stayer": []}
	};
}

enchantCity.main.Building.prototype.togglePlaying = function() {
	this.isPlaying = !this.isPlaying;
}

enchantCity.main.Building.prototype.getCurrentTime = function() {
	if(!this.isPlaying) {
		return 0;
	}
	return enchantCity.main.date.getTime();
}

enchantCity.main.Building.prototype.heal = function() {
}

enchantCity.main.Building.prototype.canHeal = function() {
	return false;
}

enchantCity.main.Building.prototype.receiveLandCost = function() {
	this.landCostReceivedTime = enchantCity.main.date.getTime();
}

enchantCity.main.Building.prototype.absorbLandCost = function() {
	var currentTime = this.getCurrentTime();
	var interval = currentTime - this.landCostReceivedTime;
	var timeLimit = enchantCity.main.timeLimits["absorbLandCost"];
	if(interval > timeLimit) {
		enchantCity.main.deployDestroy(enchantCity.main.buildingsNameToTileNumber[this.buildingsName], this.mapX, this.mapY, enchantCity.main.tileNumbers["destroy"], "liquidate");
	}
}

enchantCity.main.Building.prototype.callbackEnterFrame = function() {
	this.absorbLandCost();
}

enchantCity.main.Building.prototype.cameOnNearestAvatar = function(avatars, targetBuildingsName) {
	var nearestRoute = null;
	var nearestAvatar = null;
	for(var i = 0; i < avatars.length; i++) {
		var avatar = avatars[i];
		if(avatar.targetBuidling!=null && avatar.targetBuidling.buildingsName==targetBuildingsName) {
			var route = avatar.searchRouteToBuilding(this);
			if(route) {
				if(nearestRoute==null || route.nextNode==null || (route.nextNode.score < nearestRoute.nextNode.score)) {
					nearestRoute = route;
					nearestAvatar = avatar;
					if(route.nextNode==null) {
						break;
					}
				}
			}
		}
	}
	
	if(nearestRoute) {
		nearestAvatar.stayAtBuilding(this);
		nearestAvatar.researchRoute();
	}
}

enchantCity.main.Building.prototype.displayPausingSprite = function() {
	if(this.isPlaying) {
		if(this.pausingSprite) {
			var core = enchant.Core.instance;
			core.rootScene.removeChild(this.pausingSprite);
			this.pausingSprite = null;
		}
	} else {
		if(!this.pausingSprite) {
			this.pausingSprite = new enchantCity.main.PausingSprite(this);
			var core = enchant.Core.instance;
			core.rootScene.addChild(this.pausingSprite);
		}
	}
}

enchantCity.main.Castle = function(mapX, mapY) {
	enchantCity.main.Building.apply(this, arguments);

	this.buildingsName = "castles";

	this.avatars["workers"]["available"] = 0;
	this.avatars["shoppers"]["available"] = 5;
	this.avatars["students"]["available"] = 10;
	this.avatars["monsters"]["available"] = 1;
}
enchantCity.main.Castle.prototype = new enchantCity.main.Building;

enchantCity.main.Town = function(mapX, mapY) {
	enchantCity.main.Building.apply(this, arguments);

	this.buildingsName = "towns";

	this.avatars["workers"]["available"] = 1;
	this.avatars["shoppers"]["available"] = 1;
	this.avatars["students"]["available"] = 2;
	this.avatars["monsters"]["available"] = 1;

	enchantCity.main.addAvatarsToBuilding(this, "workers");
	enchantCity.main.addAvatarsToBuilding(this, "shoppers");
	enchantCity.main.addAvatarsToBuilding(this, "students");

	this.injuredSprite = null;
}
enchantCity.main.Town.prototype = new enchantCity.main.Building;

enchantCity.main.Town.prototype.canHeal = function() {
	var injuredCount = 0;
	injuredCount += this.getInjuredCount("workers");
	injuredCount += this.getInjuredCount("shoppers");
	injuredCount += this.getInjuredCount("students");
	var expense = injuredCount * enchantCity.main.medicalExpense;
	return expense ? (enchantCity.main.cash >= expense) : false;
}

enchantCity.main.Town.prototype.getInjuredCount = function(avatarsName) {
	var injuredCount = 0;
	for(var i = 0; i < this.avatars[avatarsName]["stayer"].length; i++) {
		var avatar = this.avatars[avatarsName]["stayer"][i];
		if(avatar.isInjured()) {
			injuredCount++;
		}
	}
	return injuredCount;
}

enchantCity.main.Town.prototype.heal = function() {
	var doneHeal = false;
	for(var avatarsName in this.avatars) {
		for(var i = 0; i < this.avatars[avatarsName]["stayer"].length; i++) {
			var avatar = this.avatars[avatarsName]["stayer"][i];
			if(avatar.route==null) {
				if(avatar.isInjured()) {
					if(avatar.heal()) {
						doneHeal = true;
					} else {
						return;
					}
				}
			}
		}
	}
	if(doneHeal) {
		enchantCity.playSound(enchantCity.main.ses["heal"]);
	}
}

enchantCity.main.Town.prototype.isInjured = function() {
	for(var avatarsName in this.avatars) {
		for(var i = 0; i < this.avatars[avatarsName]["stayer"].length; i++) {
			var avatar = this.avatars[avatarsName]["stayer"][i];
			if(avatar.route==null) {
				if(avatar.isInjured()) {
					return true;
				}
			}
		}
	}
	return false;
}

enchantCity.main.Town.prototype.displayInjuredSprite = function() {
	if(this.isInjured()) {
		if(!this.injuredSprite) {
			this.injuredSprite = new enchantCity.main.InjuredSprite(this);
			var core = enchant.Core.instance;
			core.rootScene.addChild(this.injuredSprite);
		}
	} else {
		if(this.injuredSprite) {
			var core = enchant.Core.instance;
			core.rootScene.removeChild(this.injuredSprite);
			this.injuredSprite = null;
		}
	}
}

enchantCity.main.Town.prototype.callbackEnterFrame = function() {
	this.absorbLandCost();
	this.displayInjuredSprite();
}


enchantCity.main.Dungeon = function(mapX, mapY) {
	enchantCity.main.Building.apply(this, arguments);

	this.buildingsName = "dungeons";

	this.monsterCreatedTime = this.createdTime;

	this.avatars["workers"]["available"] = 5;
	this.avatars["shoppers"]["available"] = 0;
	this.avatars["students"]["available"] = 0;
	this.avatars["monsters"]["available"] = 10;
}
enchantCity.main.Dungeon.prototype = new enchantCity.main.Building;

enchantCity.main.Dungeon.prototype.createMonster = function() {
	var currentTime = this.getCurrentTime();
	var interval = currentTime - this.monsterCreatedTime;
	var timeLimit = enchantCity.main.timeLimits["createMonster"];
	if(interval > timeLimit) {
		var avatar = new enchantCity.main.Monster(this.mapX, this.mapY);
		var isWalk = avatar.walkToNearestBuilding(enchantCity.main.buildings["towns"]);
		if(!isWalk) {
			isWalk = avatar.walkToNearestBuilding(enchantCity.main.buildings["castles"]);
		}
		if(!isWalk) {
			isWalk = avatar.walkToBuilding(enchantCity.main.buildings["highways"][0]);
		}
		if(isWalk) {
			this.monsterCreatedTime = currentTime;
			enchantCity.main.avatars["monsters"].push(avatar);
		}
	}
}

enchantCity.main.Dungeon.prototype.callbackEnterFrame = function() {
	this.createMonster();
	this.displayPausingSprite();
}

enchantCity.main.Highway = function(mapX, mapY) {
	enchantCity.main.Building.apply(this, arguments);

	this.buildingsName = "highways";

	this.avatars["workers"]["available"] = enchantCity.main.infinity;
	this.avatars["shoppers"]["available"] = enchantCity.main.infinity;
	this.avatars["students"]["available"] = enchantCity.main.infinity;
	this.avatars["monsters"]["available"] = enchantCity.main.infinity;
}
enchantCity.main.Highway.prototype = new enchantCity.main.Building;

enchantCity.main.tileNumberToBuildingClass = {};
enchantCity.main.initilazeTileNumberToBuildingClass = function() {
	this.tileNumberToBuildingClass[this.tileNumbers["town"]] = this.Town;
	this.tileNumberToBuildingClass[this.tileNumbers["castle"]] = this.Castle;
	this.tileNumberToBuildingClass[this.tileNumbers["dungeon"]] = this.Dungeon;
};
enchantCity.main.initilazeTileNumberToBuildingClass();
delete enchantCity.main.initilazeTileNumberToBuildingClass;

enchantCity.main.RouteSearch = function(width, height, limitNodeCount) {
	enchantCity.route.RouteSearch.call(this, width, height);
	this.limitNodeCount = (limitNodeCount===undefined) ? 0 : limitNodeCount;
};
enchantCity.main.RouteSearch.prototype = new enchantCity.route.RouteSearch;
enchantCity.main.RouteSearch.prototype.canPassNextNode = function(nextNode) {
	if(this.limitNodeCount > 0) {
		var nodeCount = this.getNodeCount();
		if(nodeCount >= this.limitNodeCount) {
			return false;
		}
	}

	var checkFlag = false;
	if(this.nextNode.score==0 && nextNode.x==this.start.x && nextNode.y==this.start.y) {
		checkFlag = true;
	}
	
	if(!(nextNode.x==this.start.x && nextNode.y==this.start.y)) {
		checkFlag = true;
	}
	
	if(checkFlag) {
		for(var tileNum = 0; tileNum < enchantCity.main.roadTiles.length; tileNum++) {
			var roadFlag = (enchantCity.main.map._data[1][nextNode.y][nextNode.x] == enchantCity.main.roadTiles[tileNum]);
			if(roadFlag) {
				return true;
			}
		}
		return false;
	}
	
	return true;
}

enchantCity.main.WalkingAvatar = enchant.Class.create(enchantCity.avatar.FourWayAvatar, {
	initialize: function(mapX, mapY, image, avatarsName) {
		enchantCity.avatar.FourWayAvatar.call(this, mapX*enchantCity.main.tileWidth - (enchantCity.main.tileWidth/2), mapY*enchantCity.main.tileHeight - enchantCity.main.tileHeight, image);

		this.mapX = mapX;
		this.mapY = mapY;
		this.nextMapX = mapX;
		this.nextMapY = mapY;

		this.avatarsName = avatarsName;

		this.targetBuilding = null;
		this.targetAvatar = null;
		this.targetedAvatar = null;

		this._route = null;
		this.routeLoopCounter = 0;
		
		this.walkingWayFrame = -1;

		this.walkingRequiredFrame = enchantCity.main.secondToFrame(1);

		this.isNeedResearchRoute = false;

		this.endedWalkingTime = 0xFFFFFFFF;

		this.power = 0;
	},
	mapXToPixelX: function(mapX) {
		return mapX * enchantCity.main.tileWidth - (enchantCity.main.tileWidth/2);
	},
	mapYToPixelY: function(mapY) {
		return mapY * enchantCity.main.tileHeight - enchantCity.main.tileHeight;
	},
	route: {
		get: function() {
			return this._route;
		},
		set: function(route) {
			this.routeLoopCounter = 0;
			this._route = route;
			return this._route;
		}
	},
	searchRoute: function(mapX, mapY, limitNodeCount) {
		var route = new enchantCity.main.RouteSearch(enchantCity.main.map._data[1][0].length, enchantCity.main.map._data[1].length, limitNodeCount);
		var isSearch = route.search(this.mapX, this.mapY, mapX, mapY);
		if(isSearch) {
			return route;
		}
		return null;
	},
	clearFromMap: function() {
		this.mapX = this.nextMapX;
		this.mapY = this.nextMapY;
		if(this.walkingWayFrame >= 0) {
			if(enchantCity.main.roadMap[this.mapY][this.mapX][this.walkingWayFrame]==this) {
				enchantCity.main.roadMap[this.mapY][this.mapX][this.walkingWayFrame] = null;
			}
			this.walkingWayFrame = -1;
		}
	},
	walkOnNextRoute: function() {
		if(this.route==null) {
			window.console.log("WalkingAvatar.walkOnNextRoute error: this.route doesn't exist.");
			return false;
		}
		if(this.route.nextNode) {
			var x = this.mapXToPixelX(this.route.nextNode.x),
				y = this.mapYToPixelY(this.route.nextNode.y);
			this.turn(x, y);
			var walkingWayFrame = this.patternFrame;
			if(this.route.nextNode.next) {
				var nextX = this.mapXToPixelX(this.route.nextNode.next.x),
					nextY = this.mapYToPixelY(this.route.nextNode.next.y);
				walkingWayFrame = this.calculateWayFrame(x, y, nextX, nextY);
			}
			if(!enchantCity.main.roadMap[this.route.nextNode.y][this.route.nextNode.x][walkingWayFrame]) {
				this.walkingWayFrame = walkingWayFrame;
				enchantCity.main.roadMap[this.route.nextNode.y][this.route.nextNode.x][this.walkingWayFrame] = this;
				this.nextMapX = this.route.nextNode.x;
				this.nextMapY = this.route.nextNode.y;
				this.walk(x, y, this.walkingRequiredFrame, this.checkNextRoute);
				this.route.nextNode = this.route.nextNode.next;
			} else {
				this.walkingWayFrame = this.patternFrame;
				enchantCity.main.roadMap[this.mapY][this.mapX][this.walkingWayFrame] = this;
				this.makeTime(enchantCity.main.secondToFrame(1), this.checkNextRoute);
			}
			return true;
		}
		return false;
	},
	checkHittingOtherAvatar: function() {
		var fiveWays = enchantCity.main.createFiveWays(this.mapX, this.mapY);
		
		var done = false;
		for(var i = 0; i < fiveWays.length; i++) {
			if(fiveWays[i].x < 0 || fiveWays[i].x >= enchantCity.main.roadMap[this.mapY].length ||
			   fiveWays[i].y < 0 || fiveWays[i].y >= enchantCity.main.roadMap.length) {
				continue;
			}
			
			var roadTileNumber = enchantCity.main.tileNumbers["road"];
			var tileNumber = enchantCity.main.map._data[1][this.mapY][this.mapX];
			var isOnRoad = tileNumber==roadTileNumber;
			
			for(var key in enchantCity.main.roadMap[fiveWays[i].y][fiveWays[i].x]) {
				var wayTileNumber = enchantCity.main.map._data[1][fiveWays[i].y][fiveWays[i].x];
				var wayIsOnRoad = wayTileNumber==roadTileNumber;
				if(!isOnRoad || !wayIsOnRoad) {
					continue;
				}
				var otherAvatar = enchantCity.main.roadMap[fiveWays[i].y][fiveWays[i].x][key];
				if(otherAvatar) {
					done = this.callbackHittingOtherAvatar(otherAvatar);
					if(done) {
						break;
					}
				}
			}
			if(done) {
				break;
			}
		}
		return done;
	},
	callbackHittingOtherAvatar: function(otherAvatar) {
		return false;
	},
	checkNextRoute: function() {
		this.routeLoopCounter++;
		if(this.routeLoopCounter > 100) {
			window.console.log("WalkingAvatar.checkNextRoute error: over count limit.");
		}
		this.clearFromMap();
		if(this.checkResearchRoute()) {
		} else if(this.checkWalkingTargetAvatar()) {
		} else if(this.checkHittingOtherAvatar()) {
		} else if(this.walkOnNextRoute()){
		} else {
			this.endWalking();
		}
	},
	endWalking: function() {
		this.clearRoute();
		this.parentNode.removeChild(this);
		this.endedWalkingTime = enchantCity.main.date.getTime();
		this.callbackEndWalking();
		if(this.targetBuilding && this.targetBuilding.avatars[this.avatarsName]["available"]==enchantCity.main.infinity) {
			enchantCity.removeItemOfArray(enchantCity.main.avatars[this.avatarsName], this);
		}
	},
	callbackEndWalking: function() {
	},
	clearWalkingParameters: function() {
		this.leaveFromBuilding();
		this.unlockTargetAvatar();
		this.clearRoute();
	},
	clearRoute: function() {
		if(this.route) {
			this.clearFromMap();
			var fiveWays = enchantCity.main.createFiveWays(this.mapX, this.mapY);
			var done = false;
			for(var i = 0; i < fiveWays.length; i++) {
				if(fiveWays[i].x < 0 || fiveWays[i].x >= enchantCity.main.roadMap[this.mapY].length ||
				   fiveWays[i].y < 0 || fiveWays[i].y >= enchantCity.main.roadMap.length) {
					continue;
				}
				
				for(var key in enchantCity.main.roadMap[fiveWays[i].y][fiveWays[i].x]) {
					var avatar = enchantCity.main.roadMap[fiveWays[i].y][fiveWays[i].x][key];
					done = this==avatar;
					if(done) {
						enchantCity.main.roadMap[fiveWays[i].y][fiveWays[i].x][key] = null;
						break;
					}
				}
				
				if(done) {
					break;
				}
			}
			this.route = null;
		}
	},
	leaveFromBuilding: function() {
		if(this.targetBuilding) {
			enchantCity.removeItemOfArray(this.targetBuilding.avatars[this.avatarsName]["stayer"], this);
			this.targetBuilding = null;
		}
	},
	stayAtBuilding: function(building) {
		if(this.targetBuilding != building) {
			this.leaveFromBuilding();
			this.targetBuilding = building;
			if(this.targetBuilding.avatars[this.avatarsName]["available"]!=enchantCity.main.infinity) {
				this.targetBuilding.avatars[this.avatarsName]["stayer"].push(this);
			}
		}
	},
	walkToBuilding: function(building) {
		if(this.route) {
			return false;
		}
		var route = this.searchRouteToBuilding(building);
		if(route) {
			this.walkToBuildingOnRoute(route, building);
			return true;
		}
		return false;
	},
	walkToNearestBuilding: function(buildings, limitNodeCount) {
		if(this.route) {
			return false;
		}
		var nearestRoute = null;
		var nearestBuilding = null;
		for(var i = 0; i < buildings.length; i++) {
			var building = buildings[i];
			var route = this.searchRouteToBuilding(building, limitNodeCount);
			if(route) {
				if(nearestRoute==null || route.nextNode==null || (route.nextNode.score < nearestRoute.nextNode.score)) {
					nearestRoute = route;
					nearestBuilding = building;
					if(route.nextNode==null) {
						break;
					}
				}
			}
		}

		if(nearestRoute) {
			this.walkToBuildingOnRoute(nearestRoute, nearestBuilding);
			return true;
		}
		return false;
	},
	searchRouteToBuilding: function(building, limitNodeCount) {
		if(!building) {
			return null;
		}
		
		if(this.targetBuilding == building) {
			return null;
		}

		if(this.targetBuilding && (this.targetBuilding.buildingsName == building.buildingsName)) {
			return null;
		}

		var stayingNum = building.avatars[this.avatarsName]["stayer"].length,
			availableNum = building.avatars[this.avatarsName]["available"];
		if((availableNum!=enchantCity.main.infinity) && (stayingNum >= availableNum)) {
			return null;
		}

		var route = this.searchRoute(building.mapX, building.mapY, limitNodeCount);
		return route;
	},
	walkToBuildingOnRoute: function(route, building) {
		this.stayAtBuilding(building);

		enchantCity.main.addChild(this);

		this.route = route;
		this.checkNextRoute();
	},
	unlockTargetAvatar: function() {
		if(this.targetAvatar) {
			this.targetAvatar.targetedAvatar = null;
			this.targetAvatar = null;
		}
	},
	lockOnTargetAvatar: function(avatar) {
		if(this.targetAvatar != avatar) {
			this.unlockTargetAvatar();
			this.targetAvatar = avatar;
			this.targetAvatar.targetedAvatar = this;
		}
	},
	walkToAvatarOnRoute: function(route, avatar) {
		this.leaveFromBuilding();
		
		this.lockOnTargetAvatar(avatar);
		this.targetMapX = this.targetAvatar.mapX;
		this.targetMapY = this.targetAvatar.mapY;

		enchantCity.main.addChild(this);

		this.route = route;
		this.checkNextRoute();
	},
	checkWalkingTargetAvatar: function() {
		if(this.targetBuilding && this.targetAvatar) {
			window.console.log("WalkingAvatar.checkWalkingTargetAvatar error: both targets mustn't exsit.");
		}
		if(this.targetAvatar) {
			var index = enchantCity.main.avatars[this.targetAvatar.avatarsName].indexOf(this.targetAvatar);
			var isGoToTown = (index < 0);
			
			if(!isGoToTown && (this.targetMapX!=this.targetAvatar.mapX || this.targetMapY!=this.targetAvatar.mapY)) {
				var avatars = enchantCity.main.avatars[this.targetAvatar.avatarsName];
				var route = this.searchRoute(this.targetAvatar.mapX, this.targetAvatar.mapY);
				if(route) {
					this.route = route;
					return false;
				} else {
					isGoToTown = true;
				}
			}
			
			if(isGoToTown) {
				this.clearWalkingParameters();
				if(!this.walkToNearestBuilding(enchantCity.main.buildings["towns"])) {
					this.leaveFromCity();
				}
				return true;
			}
		}
		return false;
	},
	checkResearchRoute: function() {
		if(this.targetBuilding && this.targetAvatar) {
			window.console.log("WalkingAvatar.researchRoute error: both targets mustn't exsit.");
		}
		
		if(this.isNeedResearchRoute) {
			this.isNeedResearchRoute = false;
			if(this.targetBuilding && this.route) {
				var route = this.searchRoute(this.targetBuilding.mapX, this.targetBuilding.mapY);
				if(route) {
					this.route = route;
					return false;
				} else {
					this.leaveFromCity();
					return true;
				}
			}
		}
		return false;
	},
	researchRoute: function() {
		this.isNeedResearchRoute = true;
	},
	leaveFromCity: function() {
		this.leaveFromBuilding();
		if(this.parentNode) {
			this.clearWalkingParameters();
			this.walkToBuilding(enchantCity.main.buildings["highways"][0]);
		} else {
			enchantCity.removeItemOfArray(enchantCity.main.avatars[this.avatarsName], this);
		}
	}}
);

enchantCity.main.Human = enchant.Class.create(enchantCity.main.WalkingAvatar, {
	initialize: function(mapX, mapY, image, avatarsName) {
		enchantCity.main.WalkingAvatar.call(this, mapX, mapY, image, avatarsName);
		this.walkingRequiredFrame = enchantCity.main.secondToFrame(1);
	},
	callbackDie: function() {
		this.clearWalkingParameters();
		this.parentNode.removeChild(this);
		enchantCity.removeItemOfArray(enchantCity.main.avatars[this.avatarsName], this);
	},
	callbackAttacked: function(attackPower) {
		if(this.power <= 0) {
			var core = enchant.Core.instance;
			enchantCity.playSound(enchantCity.main.ses["injured"]);
			this.injured();
			return true;
		}
		return false;
	},
	heal: function() {
		if(this.isInjured()) {
			if(enchantCity.main.cash < enchantCity.main.medicalExpense) {
				return false;
			}
			enchantCity.main.cash -= enchantCity.main.medicalExpense;
			enchantCity.avatar.FourWayAvatar.prototype.heal.call(this);
		}
		
		return true;
	}}
);

enchantCity.main.Worker = enchant.Class.create(enchantCity.main.Human, {
	initialize: function(mapX, mapY) {
		var core = enchant.Core.instance;
		enchantCity.main.Human.call(this, mapX, mapY, core.assets[enchantCity.main.images["worker"]], "workers");
		this.salary = 0;
	},
	maxOfPower: 1,
	salaryCap: 1,
	callbackHittingOtherAvatar: function(otherAvatar) {
		if(this.power > 0 && otherAvatar.avatarsName=="monsters" && otherAvatar.power > 0) {
			var x = this.mapXToPixelX(otherAvatar.mapX),
				y = this.mapYToPixelY(otherAvatar.mapY);
			this.unlockTargetAvatar();
			this.leaveFromBuilding();
			this.clearRoute();
			this.power--;
			this.attack(x, y);
			enchantCity.playSound(enchantCity.main.ses["attack"]);
			if(otherAvatar.callbackAttacked(1)) {
				enchantCity.main.cash++;
				this.salary++;
			}
			return true;
		}
		return false;
	},
	callbackStoppedAction: function() {
		if(!this.walkToNearestBuilding(enchantCity.main.buildings["towns"])) {
			this.leaveFromCity();
		}
	},
	callbackEndWalking: function() {
		this.payLandCost();
	},
	walkToNearestMonster: function(avatars, limitNodeCount) {
		if(this.targetAvatar) {
			return false;
		}
		var nearestRoute = null;
		var nearestAvatar = null;
		for(var i = 0; i < avatars.length; i++) {
			var avatar = avatars[i];
			var route = this.searchRouteToMonster(avatar, limitNodeCount);
			if(route) {
				if(nearestRoute==null || route.nextNode==null || (route.nextNode.score < nearestRoute.nextNode.score)) {
					nearestRoute = route;
					nearestAvatar = avatar;
					if(route.nextNode==null) {
						break;
					}
				}
			}
		}

		if(nearestRoute) {
			this.walkToAvatarOnRoute(nearestRoute, nearestAvatar);
			return true;
		}
		return false;
	},
	searchRouteToMonster: function(monster, limitNodeCount) {
		if(!monster) {
			return null;
		}
		
		if(this.route) {
			return null;
		}

		if(this.power <= 0) {
			return null;
		}

		if(this.isInjured()) {
			return null;
		}
		
		var currentTime = enchantCity.main.date.getTime();
		var interval = currentTime - this.endedWalkingTime;
		var timeLimit = enchantCity.main.timeLimits["searchRouteToMonster"];
		if(interval > timeLimit) {
			var route = this.searchRoute(monster.mapX, monster.mapY, limitNodeCount);
			return route;
		}

		return null;
	},
	mendPower: function() {
		if(this.power>=this.maxOfPower) {
			return;
		}
		
		if(this.route) {
			return;
		}
		
		if(!this.targetBuilding) {
			return;
		}
		
		if(this.targetBuilding.buildingsName!="towns") {
			return;
		}
		
		if(this.targetBuilding.avatars["shoppers"]["stayer"].length <= 0) {
			return;
		}
		
		var shopper = this.targetBuilding.avatars["shoppers"]["stayer"][0];
		var food = shopper.getFood();
		this.power += food;
	},
	payLandCost: function() {
		if(this.route) {
			return;
		}
		
		if(!this.targetBuilding) {
			return;
		}
		
		if(this.targetBuilding.buildingsName!="towns") {
			return;
		}
		
		if(this.salary > 0) {
			this.salary--;
			this.targetBuilding.receiveLandCost(1);
		}
	},
	callbackEnterFrame: function() {
		this.mendPower();
	}}
);

enchantCity.main.Shopper = enchant.Class.create(enchantCity.main.Human, {
	initialize: function(mapX, mapY) {
		var core = enchant.Core.instance;
		enchantCity.main.Human.call(this, mapX, mapY, core.assets[enchantCity.main.images["shopper"]], "shoppers");
		this.food = 0;
	},
	maxOfFood: 1,
	getFood: function() {
		if(this.route) {
			return 0;
		}
		if(this.food <= 0) {
			return 0;
		}
		this.food--;
		return 1;
	},
	goToShopping: function() {
		if(this.route) {
			return;
		}
		if(this.isInjured()) {
			return;
		}
		if(this.food <= 0 && this.targetBuilding && this.targetBuilding.buildingsName=="towns") {
			var currentTime = enchantCity.main.date.getTime();
			var interval = currentTime - this.endedWalkingTime;
			var timeLimit = enchantCity.main.timeLimits["goToShopping"];
			if(interval > timeLimit) {
				this.walkToNearestBuilding(enchantCity.main.buildings["castles"], enchantCity.main.limitNodeCount);
			}
		}
	},
	goToHome: function() {
		if(this.route) {
			return;
		}
		if(this.food >= this.maxOfFood && this.targetBuilding && this.targetBuilding.buildingsName=="castles") {
			if(!this.walkToNearestBuilding(enchantCity.main.buildings["towns"])) {
				this.leaveFromCity();
			}
		}
	},
	buyFood: function() {
		if(this.route) {
			return;
		}
		if(this.targetBuilding && this.targetBuilding.buildingsName=="castles") {
			var currentTime = enchantCity.main.date.getTime();
			var interval = currentTime - this.endedWalkingTime;
			var timeLimit = enchantCity.main.timeLimits["buyFood"];
			if(interval > timeLimit) {
				if(this.food < this.maxOfFood) {
					this.food++;
					this.targetBuilding.receiveLandCost(1);
				} else {
					this.goToHome();
				}
			}
		}
	},
	callbackEnterFrame: function() {
		this.goToShopping();
		this.buyFood();
	}}
);

enchantCity.main.Student = enchant.Class.create(enchantCity.main.Human, {
	initialize: function(mapX, mapY) {
		var core = enchant.Core.instance;
		var rand = enchantCity.rand(2);
		enchantCity.main.Human.call(this, mapX, mapY, core.assets[enchantCity.main.images["student"][rand]], "students");
	}}
);

enchantCity.main.Monster = enchant.Class.create(enchantCity.main.WalkingAvatar, {
	initialize: function(mapX, mapY) {
		var core = enchant.Core.instance;
		enchantCity.main.WalkingAvatar.call(this, mapX, mapY, core.assets[enchantCity.main.images["monster"]], "monsters");
		this.power = this.maxOfPower;
		this.walkingRequiredFrame = enchantCity.main.secondToFrame(2);
	},
	maxOfPower: 1,
	callbackDie: function() {
		var targetBuilding = this.targetBuilding;
		var targetedAvatar = this.targetedAvatar;
		this.clearWalkingParameters();
		this.parentNode.removeChild(this);
		enchantCity.removeItemOfArray(enchantCity.main.avatars[this.avatarsName], this);
		if(targetBuilding) {
			targetBuilding.cameOnNearestAvatar(enchantCity.main.avatars[this.avatarsName], "highways");
		}
		if(targetedAvatar) {
			targetedAvatar.targetAvatar = null;
			targetedAvatar.walkToNearestMonster(enchantCity.main.avatars["monsters"], enchantCity.main.limitNodeCount);
		}
	},
	callbackAttacked: function(attackPower) {
		this.power -= attackPower;
		if(this.power <= 0) {
			this.die();
			return true;
		}
		return false;
	},
	callbackEndWalking: function() {
		if(this.power > 0) {
			enchantCity.main.deployDestroy(enchantCity.main.buildingsNameToTileNumber[this.targetBuilding.buildingsName], this.mapX, this.mapY, enchantCity.main.tileNumbers["destroy"]);
		} else {
			this.leaveFromBuilding();
			enchantCity.removeItemOfArray(enchantCity.main.avatars[this.avatarsName], this);
		}
	},
	callbackEnterFrame: function() {
		if(this.power > 0) {
			this.cameOnNearestWorker(enchantCity.main.avatars["workers"], enchantCity.main.limitNodeCount);
		}
	},
	cameOnNearestWorker: function(avatars, limitNodeCount) {
		if(this.targetedAvatar) {
			return false;
		}
		var nearestRoute = null;
		var nearestAvatar = null;
		for(var i = 0; i < avatars.length; i++) {
			var avatar = avatars[i];
			var route = avatar.searchRouteToMonster(this, limitNodeCount);
			if(route) {
				if(nearestRoute==null || route.nextNode==null || (route.nextNode.score < nearestRoute.nextNode.score)) {
					nearestRoute = route;
					nearestAvatar = avatar;
					if(route.nextNode==null) {
						break;
					}
				}
			}
		}

		if(nearestRoute) {
			nearestAvatar.walkToAvatarOnRoute(nearestRoute, this);
			return true;
		}
		return false;
	},
	callbackHittingOtherAvatar: function(otherAvatar) {
		if(this.power > 0 && otherAvatar.avatarsName!="monsters" && otherAvatar.power <= 0) {
			otherAvatar.callbackAttacked(1);
			this.callbackAttacked(1);
			return false;
		}
		return false;
	}}
);

enchantCity.main.avatarsNameToAvatarClass = {};
enchantCity.main.initilazeAvatarsNameToAvatarClass = function() {
	this.avatarsNameToAvatarClass["workers"] = this.Worker;
	this.avatarsNameToAvatarClass["shoppers"] = this.Shopper;
	this.avatarsNameToAvatarClass["students"] = this.Student;
	this.avatarsNameToAvatarClass["monsters"] = this.Monster;
};
enchantCity.main.initilazeAvatarsNameToAvatarClass();
delete enchantCity.main.initilazeAvatarsNameToAvatarClass;

enchantCity.main.addAvatarsToBuilding = function(building, avatarsName) {
	var avatarClass = this.avatarsNameToAvatarClass[avatarsName];
	if(!avatarClass) {
		return;
	}
	
	var length = building.avatars[avatarsName]["available"] - building.avatars[avatarsName]["stayer"].length;
	for(var i = 0; i < length; i++) {
		var avatar = new avatarClass(this.buildings["highways"][0].mapX, this.buildings["highways"][0].mapY);
		this.avatars[avatarsName].push(avatar);
		avatar.walkToBuilding(building);
	}
};

enchantCity.main.removeAvatars = function(avatarsName, buildingsName) {
	for(var i = 0; i < this.buildings[buildingsName].length; i++) {
		var building = this.buildings[buildingsName][i];
		this.removeAvatarsFromBuilding(building, avatarsName);
	}
};

enchantCity.main.removeAvatarsFromBuilding = function(building, avatarsName) {
	var holdover = 0;
	while((building.avatars[avatarsName]["stayer"].length - holdover) > 0) {
		var avatar = building.avatars[avatarsName]["stayer"][holdover];
		if(avatar.walkToBuilding(this.buildings["highways"][0])) {
			enchantCity.removeItemOfArray(this.avatars[avatarsName], avatar);
		} else {
			holdover++;
		}
	}
};

enchantCity.main.removeStayers = function(building, avatarsName) {
	while(building.avatars[avatarsName]["stayer"].length) {
		var avatar = building.avatars[avatarsName]["stayer"][0];
		avatar.leaveFromCity();
	}
};

enchantCity.main.researchRoute = function() {
	for(var key in this.avatars) {
		for(var i = 0; i < this.avatars[key].length; i++) {
			var avatar = this.avatars[key][i];
			avatar.researchRoute();
		}
	}
};


enchantCity.main.callbackEnterFrameForBuildings = function(buildingsName) {
	for(var i = 0; i < this.buildings[buildingsName].length; i++) {
		var building = this.buildings[buildingsName][i];
		building.callbackEnterFrame();
	}
};

enchantCity.main.callbackEnterFrameForAvatars = function(avatarsName) {
	for(var i = 0; i < this.avatars[avatarsName].length; i++) {
		var avatar = this.avatars[avatarsName][i];
		avatar.callbackEnterFrame();
	}
};

enchantCity.main.getBuildingFromMap = function(mapX, mapY) {
	var buildingsName = this.tileNumberToBuildingsName[this.map._data[1][mapY][mapX]];
	var building = null;
	if(buildingsName) {
		for(var i = 0; i < this.buildings[buildingsName].length; i++) {
			if(mapX==this.buildings[buildingsName][i].mapX && mapY==this.buildings[buildingsName][i].mapY) {
				building = this.buildings[buildingsName][i];
				break;
			}
		}
	}
	
	return building;
};

enchantCity.main.InjuredLabel = enchant.Class.create(enchantCity.widget.TextLabel, {
	initialize: function(building) {
		this.building = building;
		enchantCity.widget.TextLabel.call(this, "");
		this.reset();
	},
	reset: function() {
		var workersStayerLength = this.building.avatars["workers"]["stayer"].length;
		var shoppersStayerLength = this.building.avatars["shoppers"]["stayer"].length;
		var studentsStayerLength = this.building.avatars["students"]["stayer"].length;
		var workersInjuredCount = this.building.getInjuredCount("workers");
		var shoppersInjuredCount = this.building.getInjuredCount("shoppers");
		var studentsInjuredCount = this.building.getInjuredCount("students");
		
		var text = 
			"W: "+workersInjuredCount+" / "+workersStayerLength+"<BR>"+
			"Sp: "+shoppersInjuredCount+" / "+shoppersStayerLength+"<BR>"+
			"St: "+studentsInjuredCount+" / "+studentsStayerLength;
		this.parse(text);
	}}
);

enchantCity.main.HealButton = enchant.Class.create(enchantCity.widget.ImageButton, {
	initialize: function(buildingContent) {
		this.buildingContent = buildingContent;
		enchantCity.widget.ImageButton.call(this, "", "");
		this.addEventListener(enchant.Event.TOUCH_START, function() {
			this.buildingContent.heal();
		});
		this.reset();
	},
	reset: function() {
		var imageName = this.buildingContent.building.canHeal() ? "heal" : "cantHeal";
		this.frontSprite = enchantCity.main.images[imageName];
	}}
);

enchantCity.main.TownContent = enchant.Class.create(enchant.widget.EntityGroup, {
	initialize: function(building) {
		this.building = building;
		this.injuredLabel = new enchantCity.main.InjuredLabel(this.building);
		this.healButton = new enchantCity.main.HealButton(this);
		enchant.widget.EntityGroup.call(this, 100, 100);
		this.reset();
		this.addChild(this.injuredLabel);
		this.addChild(this.healButton);
	},
	heal: function() {
		this.building.heal();
		this.injuredLabel.reset();
		this.healButton.reset();
		this.reset();
	},
	reset: function() {
		this.width = Math.max(this.injuredLabel.width, this.healButton.width);
		this.injuredLabel.x = (this.width - this.injuredLabel.width) / 2;
		this.healButton.x = (this.width - this.healButton.width) / 2;
		this.healButton.y = this.injuredLabel.height + 2;
		this.height = this.healButton.y+this.healButton.height+2;
	}}
);

enchantCity.main.addTownDialog = function(building) {
	var core = enchant.Core.instance;
	var content = new enchantCity.main.TownContent(building);

	if(this.buildingDialog) {
		this.removeBuildingDialog();
	}
	this.buildingDialog = new enchantCity.widget.Dialog(content, "OK");
	this.buildingDialog.x = this.sceneWidth - this.buildingDialog.width;
	this.buildingDialog.y = this.mainMenu.y + this.mainMenu.height;
	this.buildingDialog.onaccept = function() {
		enchantCity.main.removeBuildingDialog();
	};
	core.rootScene.addChild(this.buildingDialog);
};

enchantCity.main.StayerLabel = enchant.Class.create(enchantCity.widget.TextLabel, {
	initialize: function(building) {
		this.building = building;
		enchantCity.widget.TextLabel.call(this, "");
		this.reset();
	},
	reset: function() {
		var text = 
			"W: "+this.building.avatars["workers"]["stayer"].length+"<BR>"+
			"Sp: "+this.building.avatars["shoppers"]["stayer"].length+"<BR>"+
			"St: "+this.building.avatars["students"]["stayer"].length;
		this.parse(text);
	}}
);

enchantCity.main.addCastleDialog = function(building) {
	var core = enchant.Core.instance;
	var content = new enchantCity.main.StayerLabel(building);

	if(this.buildingDialog) {
		this.removeBuildingDialog();
	}
	this.buildingDialog = new enchantCity.widget.Dialog(content, "OK");
	this.buildingDialog.x = this.sceneWidth - this.buildingDialog.width;
	this.buildingDialog.y = this.mainMenu.y + this.mainMenu.height;
	this.buildingDialog.onaccept = function() {
		enchantCity.main.removeBuildingDialog();
	};
	core.rootScene.addChild(this.buildingDialog);
};

enchantCity.main.PlayLabel = enchant.Class.create(enchantCity.widget.TextLabel, {
	initialize: function(building) {
		this.building = building;
		enchantCity.widget.TextLabel.call(this, "");
		this.reset();
	},
	reset: function() {
		var text = this.building.isPlaying ? "稼働中" : "停止中";
		this.parse(text);
	}}
);

enchantCity.main.PlayButton = enchant.Class.create(enchantCity.widget.ImageButton, {
	initialize: function(playContent) {
		this.playContent = playContent;
		enchantCity.widget.ImageButton.call(this, "", "");
		this.addEventListener(enchant.Event.TOUCH_START, function() {
			this.playContent.togglePlaying();
		});
		this.reset();
	},
	reset: function() {
		var imageName = this.playContent.building.isPlaying ? "pause" : "play";
		this.frontSprite = enchantCity.main.images[imageName];
	}}
);

enchantCity.main.PlayContent = enchant.Class.create(enchant.widget.EntityGroup, {
	initialize: function(building) {
		this.building = building;
		this.playLabel = new enchantCity.main.PlayLabel(this.building);
		this.playButton = new enchantCity.main.PlayButton(this);
		enchant.widget.EntityGroup.call(this, 100, 100);
		this.reset();
		this.addChild(this.playLabel);
		this.addChild(this.playButton);
	},
	togglePlaying: function() {
		this.building.togglePlaying();
		this.playLabel.reset();
		this.playButton.reset();
		this.reset();
	},
	reset: function() {
		this.width = Math.max(this.playLabel.width, this.playButton.width);
		this.playLabel.x = (this.width - this.playLabel.width) / 2;
		this.playButton.x = (this.width - this.playButton.width) / 2;
		this.playButton.y = this.playLabel.height + 2;
		this.height = this.playButton.y+this.playButton.height+2;
	}}
);

enchantCity.main.addDungeonDialog = function(building) {
	var core = enchant.Core.instance;
	var content = new enchantCity.main.PlayContent(building);

	if(this.buildingDialog) {
		this.removeBuildingDialog();
	}
	this.buildingDialog = new enchantCity.widget.Dialog(content, "OK");
	this.buildingDialog.x = this.sceneWidth - this.buildingDialog.width;
	this.buildingDialog.y = this.mainMenu.y + this.mainMenu.height;
	this.buildingDialog.onaccept = function() {
		enchantCity.main.removeBuildingDialog();
	};
	core.rootScene.addChild(this.buildingDialog);
};

enchantCity.main.removeBuildingDialog = function() {
	var core = enchant.Core.instance;
	core.rootScene.removeChild(this.buildingDialog);
	this.buildingDialog = null;
};

enchantCity.main.deployTile = function(mapX, mapY, tileNumber) {
	this.preDeployTile(mapX, mapY, tileNumber);
	var fiveWays = this.createFiveWays(mapX, mapY);
	
	var isSearch = true;
	for(var i = 0; i < fiveWays.length; i++) {
		if(fiveWays[i].x < 0 || fiveWays[i].x >= enchantCity.main.map._data[1][0].length ||
		   fiveWays[i].y < 0 || fiveWays[i].y >= enchantCity.main.map._data[1].length) {
			continue;
		}
		
		var mapTileNumber = enchantCity.main.map._data[1][fiveWays[i].y][fiveWays[i].x];
		if(mapTileNumber==this.tileNumbers["road"]) {
			var route = new enchantCity.main.RouteSearch(enchantCity.main.map._data[1][0].length, enchantCity.main.map._data[1].length);
			var isSearch = route.search(fiveWays[i].x, fiveWays[i].y, this.buildings["highways"][0].mapX, this.buildings["highways"][0].mapY);
			if(!isSearch) {
				break;
			}
		}
	}

	if(isSearch) {
		this.executeDeployTile();
	} else {
		this.cancelDeployTile();
	}
		
	return isSearch;
};

enchantCity.main.preDeployTile = function(mapX, mapY, tileNumber) {
	if(this.mapTileNumber==this.tileNumbers["cursor"]) {
		this.mapTileNumber = this.map._data[1][mapY][mapX];
		this.delployTileMapX = mapX;
		this.delployTileMapY = mapY;
		this.map._data[1][this.delployTileMapY][this.delployTileMapX] = tileNumber;
	}
};

enchantCity.main.executeDeployTile = function() {
	if(this.mapTileNumber!=this.tileNumbers["cursor"]) {
		this.map.redraw(this.delployTileMapX*this.tileWidth, this.delployTileMapY*this.tileHeight, this.tileWidth, this.tileHeight);
		this.isRedraw = true;
		this.mapTileNumber = this.tileNumbers["cursor"];
	}
}

enchantCity.main.cancelDeployTile = function() {
	if(this.mapTileNumber!=this.tileNumbers["cursor"]) {
		this.map._data[1][this.delployTileMapY][this.delployTileMapX] = this.mapTileNumber;
		this.mapTileNumber = this.tileNumbers["cursor"];
	}
};

enchantCity.main.addBuildingDialogs = {
	"towns": enchantCity.main.addTownDialog,
	"castles": enchantCity.main.addCastleDialog,
	"dungeons": enchantCity.main.addDungeonDialog};

enchantCity.main.deployCursor = function(mapTileNumber, mapX, mapY, tileNumber) {
	var building = this.getBuildingFromMap(mapX, mapY);
	if(building) {
		this.func = this.addBuildingDialogs[building.buildingsName];
		this.func(building);
		delete this.func;
		enchantCity.playSound(enchantCity.widget.ses["touchstart"]);
		return true;
	}
	return false;
};

enchantCity.main.deployDestroy = function(mapTileNumber, mapX, mapY, tileNumber, effectName) {
	effectName = effectName === undefined ? "destroy" : effectName;
	switch(mapTileNumber) {
	case this.tileNumbers["road"]:
	case this.tileNumbers["town"]:
	case this.tileNumbers["castle"]:
	case this.tileNumbers["dungeon"]:
		if(this.deployTile(mapX, mapY, tileNumber)) {
			var buildingsName = this.tileNumberToBuildingsName[mapTileNumber];
			if(buildingsName) {
				var building = null;
				for(var i = 0; i < this.buildings[buildingsName].length; i++) {
					if(mapX==this.buildings[buildingsName][i].mapX && mapY==this.buildings[buildingsName][i].mapY) {
						building = this.buildings[buildingsName][i];
						this.buildings[buildingsName].splice(i, 1);
						break;
					}
				}
				if(building) {
					for(var key in this.avatars) {
						this.removeStayers(building, key);
					}
					var core = enchant.Core.instance;
					if(building.pausingSprite) {
						core.rootScene.removeChild(building.pausingSprite);
					}
					if(building.injuredSprite) {
						core.rootScene.removeChild(building.injuredSprite);
					}
				}
			}
			this.playSpriteAndSound(mapX, mapY, effectName);
			return true;
		}
		break;
	}
	return false;
};

enchantCity.main.deployRoad = function(mapTileNumber, mapX, mapY, tileNumber) {
	switch(mapTileNumber) {
	case this.tileNumbers["destroy"]:
		if(this.tileNumberToDeployCost[tileNumber] <= this.cash) {
			if(this.deployTile(mapX, mapY, tileNumber)) {
				enchantCity.playSound(this.ses["deploy"]);
				this.cash -= this.tileNumberToDeployCost[tileNumber];
				return true;
			}
		}
		break;
	}
	
	return false;
};

enchantCity.main.canDeployBuilding = function(mapX, mapY) {
	var canDo = (this.map._data[1][mapY][mapX]==this.tileNumbers["destroy"] && 
	  ((mapY<(this.map._data[1].length-1) && this.map._data[1][mapY+1][mapX]==this.tileNumbers["road"]) ||
	   (mapY>0 && this.map._data[1][mapY-1][mapX]==this.tileNumbers["road"]) ||
	   (mapX<(this.map._data[1][mapY].length-1) && this.map._data[1][mapY][mapX+1]==this.tileNumbers["road"]) ||
	   (mapX>0 && this.map._data[1][mapY][mapX-1]==this.tileNumbers["road"]) ));
	return canDo;
};

enchantCity.main.createBuidingFromTileNumber = function(tileNumber, mapX, mapY) {
	var buildingClass = this.tileNumberToBuildingClass[tileNumber];
	var buildingsName = this.tileNumberToBuildingsName[tileNumber];
	if(buildingClass && buildingsName) {
		var building = new buildingClass(mapX, mapY);
		this.buildings[buildingsName].push(building);
	}
};

enchantCity.main.deployBuiding = function(mapTileNumber, mapX, mapY, tileNumber) {
	if(this.tileNumberToDeployCost[tileNumber] <= this.cash) {
		if(this.canDeployBuilding(mapX, mapY)) {
			if(this.deployTile(mapX, mapY, tileNumber)) {
				this.createBuidingFromTileNumber(tileNumber, mapX, mapY);
				enchantCity.playSound(this.ses["deploy"]);
				this.cash -= this.tileNumberToDeployCost[tileNumber];
				return true;
			}
		}
	}
	
	return false;
};

enchantCity.main.touchTileFunctions = {};
enchantCity.main.initializeTouchTileFunctions = function() {
	this.touchTileFunctions[this.tileNumbers["cursor"]] = this.deployCursor;
	this.touchTileFunctions[this.tileNumbers["destroy"]] = this.deployDestroy;
	this.touchTileFunctions[this.tileNumbers["road"]] = this.deployRoad;
	this.touchTileFunctions[this.tileNumbers["town"]] = this.deployBuiding;
	this.touchTileFunctions[this.tileNumbers["castle"]] = this.deployBuiding;
	this.touchTileFunctions[this.tileNumbers["dungeon"]] = this.deployBuiding;
};
enchantCity.main.initializeTouchTileFunctions();
delete enchantCity.main.initializeTouchTileFunctions;

enchantCity.main.touchTile = function(x, y) {
	var deployFlag = false;
	var mapX = Math.floor(x / enchantCity.main.tileWidth) | 0,
		mapY = Math.floor(y / enchantCity.main.tileHeight) | 0;
	if(this.map._typeData[0][mapY][mapX]!=this.mapTypes["sea"] && this.map._typeData[0][mapY][mapX]!=this.mapTypes["marblestone"]) {
		this.func = this.touchTileFunctions[this.tileNumber];
		if(this.func) {
			deployFlag = this.func(this.map._data[1][mapY][mapX], mapX, mapY, this.tileNumber);
		}
		this.func = null;
	}
	if(!deployFlag) {
		enchantCity.playSound(this.ses["ng"]);
	}
};

enchantCity.main.addMap = function() {
	var core = enchant.Core.instance;
	this.map = new enchant.extendMap.ExMap(enchantCity.main.tileWidth, enchantCity.main.tileHeight);
	this.map.image = core.assets[this.images["map"]];
	this.map.loadData([
		[39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39],
		[39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39],
		[39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39],
		[39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39],
		[39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39],
		[56,56,7,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,6,56],
		[401,343,38,39,39,39,39,39,39,39,39,39,39,6,56,56,56,56,57,361],
		[380,1,45,56,56,56,56,56,56,7,39,6,56,57,107,107,357,342,402,345],
		[344,362,362,363,107,107,107,107,107,55,56,57,107,107,361,401,393,20,395,347],
		[379,379,379,344,363,107,107,107,107,361,362,362,362,362,345,380,21,25,23,378],
		[379,379,379,379,344,363,107,107,361,345,379,379,379,379,346,397,38,6,57,378],
		[379,379,379,379,379,344,362,362,345,379,379,346,396,396,397,21,9,57,224,378],
		[396,347,379,379,379,379,379,379,379,379,346,397,225,226,227,11,57,221,257,395],
		[107,395,347,379,379,379,379,379,346,396,397,225,209,243,244,54,205,257,360,107],
		[107,107,378,379,379,346,396,399,397,225,226,213,260,260,261,107,107,357,393,107],
		[107,107,395,396,396,397,224,394,225,209,210,261,107,107,107,107,361,367,107,107],
		[107,225,226,226,226,226,229,226,213,260,261,107,107,107,361,362,345,380,107,107],
		[107,242,243,243,243,210,260,260,261,107,107,107,107,361,345,379,379,344,363,107],
		[226,209,243,243,210,261,107,107,107,107,107,107,361,345,379,379,379,379,344,362],
		[243,243,243,243,244,107,107,107,107,107,361,362,345,379,379,379,379,379,379,379]],
	[
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,311,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]
	);
	core.rootScene.addChild(this.map);

};

enchantCity.main.createHighwayFromMap = function() {
	for(var y = 0; y < this.map._typeData[1].length; y++) {
		for(var x = 0; x < this.map._typeData[1][y].length; x++) {
			switch(this.map._typeData[1][y][x]) {
			case this.mapTypes["marblestone"]:
				var building = new this.Highway(x, y);
				this.buildings["highways"].push(building);
				break;
			}
		}
	}
};

enchantCity.main.createBuildingFromMap = function() {
	for(var y = 0; y < this.map._data[1].length; y++) {
		for(var x = 0; x < this.map._data[1][y].length; x++) {
			this.createBuidingFromTileNumber(this.map._data[1][y][x], x, y);
		}
	}
};

enchantCity.main.createRoadMapFromMap = function() {
	this.roadMap = new Array(this.map._data[1].length);
	for(var y = 0; y < this.roadMap.length; y++) {
		this.roadMap[y] = new Array(this.map._data[1][y].length);
		for(var x = 0; x < this.roadMap[y].length; x++) {
			this.roadMap[y][x] = {};
			this.roadMap[y][x][enchantCity.avatar.FourWayAvatar.prototype.downward] = null;
			this.roadMap[y][x][enchantCity.avatar.FourWayAvatar.prototype.leftward] = null;
			this.roadMap[y][x][enchantCity.avatar.FourWayAvatar.prototype.rightward] = null;
			this.roadMap[y][x][enchantCity.avatar.FourWayAvatar.prototype.upward] = null;
		}
	}
};

enchantCity.main.createBgmPlayer = function() {
	this.bgmPlayer = {};
	for(var key in this.bgm) {
		this.bgmPlayer[key] = new enchantCity.bgm.BgmPlayer(this.bgm[key]);
	}
};

enchantCity.main.changeBgmPlayer = function(bgmPlayerName, forcibly) {
	forcibly = forcibly === undefined ? false : forcibly;

	if(this.bgmPlayerName) {
		var isPlay = this.bgmPlayer[this.bgmPlayerName].isPlay;
		if(isPlay) {
			this.bgmPlayer[this.bgmPlayerName].pause();
		}
	}
	this.bgmPlayerName = bgmPlayerName;
	if(this.bgmPlayerName) {
		if(isPlay || forcibly) {
			this.bgmPlayer[this.bgmPlayerName].play();
		}
	}
};

enchantCity.main.callbackEnterFrameForBgmPlayer = function() {
	for(var key in this.bgm) {
		this.bgmPlayer[key].callbackEnterFrame();
	}
};


enchantCity.main.addTouchEntity = function() {
	var core = enchant.Core.instance;

	this.sunsetEntity = new enchant.Entity();
	this.sunsetEntity.x = 0;
	this.sunsetEntity.y = 0;
	this.sunsetEntity.width = core.width;
	this.sunsetEntity.height = core.height;
	this.sunsetEntity.backgroundColor = 'rgba(223, 84, 43, 1.0)';
	this.sunsetEntity.tl.hide();
	core.rootScene.addChild(this.sunsetEntity);

	this.touchEntity = new enchant.Entity();
	this.touchEntity.x = 0;
	this.touchEntity.y = 0;
	this.touchEntity.width = core.width;
	this.touchEntity.height = core.height;
	this.touchEntity.addEventListener("touchstart", function(e) {
		if(!enchantCity.main.isPlayingTutorial) {
			enchantCity.main.touchTile(e.x, e.y);
		}
	});
	this.touchEntity.backgroundColor = 'rgba(0, 0, 0, 1.0)';
	this.touchEntity.tl.fadeTo(0, enchantCity.main.secondToFrame(2), enchant.Easing.QUAD_EASEOUT);

	core.rootScene.addChild(this.touchEntity);
};

enchantCity.main.addRegionMenu = function() {
	this.townButton = new this.TownButton();
	this.castleButton = new this.CastleButton();
	this.dungeonButton = new this.DungeonButton();

	this.regionButtons = [
		this.townButton,
		this.castleButton,
		this.dungeonButton];

	this.regionMenu = new enchant.widget.IconMenu(this.regionButtons);

	var core = enchant.Core.instance;
	core.rootScene.addChild(this.regionMenu);
};

enchantCity.main.DeployButton = enchant.Class.create(enchantCity.widget.RadioImageButton, {
	initialize: function(deployName) {
		this.deployName = deployName;
		enchantCity.widget.RadioImageButton.call(this, enchantCity.main.buttonNames[this.deployName], enchantCity.main.images[this.deployName]);
		this.addEventListener("checked", function(e) {
			if(this.checked) {
				enchantCity.main.tileNumber = enchantCity.main.tileNumbers[this.deployName];
			} else {
				if(enchantCity.main.tileNumber==enchantCity.main.tileNumbers[this.deployName]) {
					enchantCity.main.tileNumber = enchantCity.main.tileNumbers["cursor"];
				}
			}
		});
	}}
);

enchantCity.main.TownButton = enchant.Class.create(enchantCity.main.DeployButton, {
	initialize: function() {
		enchantCity.main.DeployButton.call(this, "town");
	}}
);

enchantCity.main.CastleButton = enchant.Class.create(enchantCity.main.DeployButton, {
	initialize: function() {
		enchantCity.main.DeployButton.call(this, "castle");
	}}
);

enchantCity.main.DungeonButton = enchant.Class.create(enchantCity.main.DeployButton, {
	initialize: function() {
		enchantCity.main.DeployButton.call(this, "dungeon");
	}}
);

enchantCity.main.addStatusMenu = function() {
	this.dateText = new this.DateText();
	this.populationText = new this.PopulationText();
	this.cashText = new this.CashText();
	this.bgmButton = new this.BgmButton();
	this.endButton = new this.EndButton();
	
	this.statusButtons = [
		this.dateText,
		this.populationText,
		this.cashText,
		this.bgmButton,
		this.endButton];

	this.statusMenu = new enchantCity.widget.IconMenu(this.statusButtons);
	this.dateText.x = 0;
	this.populationText.x = 94;
	this.cashText.x = 155;
	this.bgmButton.x = 221;
	this.endButton.x = 276;

	var core = enchant.Core.instance;
	core.rootScene.addChild(this.statusMenu);

};

enchantCity.main.DateText = enchant.Class.create(enchantCity.widget.StaticText, {
	initialize: function() {
		enchantCity.widget.StaticText.call(this);
		var content = (enchantCity.main.date.getMonth()+1) + '/' + enchantCity.main.date.getDate() + ' ' + enchantCity.main.date.getHours() + ':' + enchantCity.main.date.getMinutes();
		this.content = content;
		this.resize();
		this.addEventListener("enterframe", function() {
			if(!enchantCity.main.doneIntroduction) {
				enchantCity.main.isProgressingTime = false;
				enchantCity.main.canChangeBgmPlayer = false;
				enchantCity.main.changeBgmPlayer("verde", true);
				enchantCity.main.doneIntroduction = true;
				enchantCity.main.tutorialId = "introduction";
				enchantCity.main.tutorialPageNo = 0;
				enchantCity.main.playTutorial();
			}
			if(enchantCity.main.isPlayNextTutorial) {
				enchantCity.main.isPlayNextTutorial = false;
				enchantCity.main.tutorialPageNo++;
				enchantCity.main.playTutorial();
				var pagesLength = enchantCity.main.tutorialParser.getPages(enchantCity.main.tutorialId).length;
				if(enchantCity.main.tutorialPageNo >= pagesLength) {
					enchantCity.main.isPlayingTutorial = false;
					if(enchantCity.main.tutorialId=="introduction") {
						enchantCity.main.canChangeBgmPlayer = true;
						enchantCity.main.changeBgmPlayer(enchantCity.main.time);
					}
				}
			}

			var time = enchantCity.main.date.getTime();
			var isProgressingTime = enchantCity.main.isProgressingTime;
			if(!isProgressingTime && enchantCity.main.progressibleTime > time) {
				isProgressingTime = true;
			}
			if(isProgressingTime) {
				enchantCity.main.date.setTime(time + enchantCity.main.secondsPerFrame * 1000);
				var content = (enchantCity.main.date.getMonth()+1) + '/' + enchantCity.main.date.getDate() + ' ' + enchantCity.main.date.getHours() + ':' + enchantCity.main.date.getMinutes();
				this.content = content;
				this.resize();
				var month = enchantCity.main.date.getMonth()+1;
				var date = enchantCity.main.date.getDate();
				var hours = enchantCity.main.date.getHours();
				var minutes = enchantCity.main.date.getMinutes();
				if(hours==0 && minutes==0) {
					if(month==12 && date==25) {
						if(enchantCity.main.population >= 100) {
							enchantCity.main.isPlayChristmasSong = true;
							enchantCity.main.canChangeBgmPlayer = false;
							enchantCity.main.changeBgmPlayer("christmas", true);
							enchantCity.main.tutorialId = "wonChristmas";
						} else {
							enchantCity.main.tutorialId = "lostChristmas";
						}
						enchantCity.main.tutorialPageNo = 0;
						enchantCity.main.playTutorial();
					} else if(month==12 && date==26) {
						if(enchantCity.main.isPlayChristmasSong) {
							enchantCity.main.isPlayChristmasSong = false;
							enchantCity.main.canChangeBgmPlayer = true;
							enchantCity.main.changeBgmPlayer(enchantCity.main.time);
						}
					}
				} else if(hours==5 && minutes==0) {
					var core = enchant.Core.instance;
					enchantCity.main.sunsetEntity.tl.fadeTo(0.6, enchantCity.main.secondLimits["sunset"], enchant.Easing.QUAD_EASEOUT).
													 fadeTo(0, enchantCity.main.secondLimits["sunset"], enchant.Easing.QUAD_EASEOUT);
				} else if(hours==6 && minutes==0) {
					enchantCity.main.touchEntity.tl.fadeTo(0, enchantCity.main.secondLimits["sunset"], enchant.Easing.QUAD_EASEOUT);
					enchantCity.main.time = "daytime";
					if(enchantCity.main.canChangeBgmPlayer) {
						enchantCity.main.changeBgmPlayer(enchantCity.main.time);
					}
				} else if(hours==17 && minutes==0) {
					var core = enchant.Core.instance;
					enchantCity.main.sunsetEntity.tl.fadeTo(0.6, enchantCity.main.secondLimits["sunset"], enchant.Easing.QUAD_EASEOUT).
													 fadeTo(0, enchantCity.main.secondLimits["sunset"], enchant.Easing.QUAD_EASEOUT);
				} else if(hours==18 && minutes==0) {
					enchantCity.main.touchEntity.tl.fadeTo(0.6, enchantCity.main.secondLimits["sunset"], enchant.Easing.QUAD_EASEOUT);
					enchantCity.main.time = "nighttime";
					if(enchantCity.main.canChangeBgmPlayer) {
						enchantCity.main.changeBgmPlayer(enchantCity.main.time);
					}
				}
				
				enchantCity.main.callbackEnterFrameForBuildings("towns");
				enchantCity.main.callbackEnterFrameForBuildings("castles");
				enchantCity.main.callbackEnterFrameForBuildings("dungeons");
				enchantCity.main.callbackEnterFrameForAvatars("monsters");
				enchantCity.main.callbackEnterFrameForAvatars("workers");
				enchantCity.main.callbackEnterFrameForAvatars("shoppers");
				
				if(enchantCity.main.isRedraw) {
					enchantCity.main.researchRoute();
					enchantCity.main.isRedraw = false;
				}
			}
			enchantCity.main.callbackEnterFrameForBgmPlayer();
		});
	}}
);

enchantCity.main.PopulationText = enchant.Class.create(enchantCity.widget.StaticText, {
	initialize: function() {
		enchantCity.widget.StaticText.call(this, ""+enchantCity.main.population, enchantCity.main.images["population"]);
		this.addEventListener("enterframe", function() {
			var content = ""+enchantCity.main.population;
			if(this.content != content) {
				this.content = content;
				this.resize();
			}
		});
	}
});

enchantCity.main.CashText = enchant.Class.create(enchantCity.widget.StaticText, {
	initialize: function() {
		enchantCity.widget.StaticText.call(this, ""+enchantCity.main.cash, enchantCity.main.images["cash"]);
		this.addEventListener("enterframe", function() {
			var content = ""+enchantCity.main.cash;
			if(this.content != content) {
				this.content = content;
				this.resize();
			}
		});
	}}
);

enchantCity.main.BgmButton = enchant.Class.create(enchantCity.widget.CheckImageButton, {
	initialize: function() {
		enchantCity.widget.CheckImageButton.call(this, enchantCity.main.buttonNames["bgm"]);
		this.addEventListener("checked", function(e) {
			if(this.checked) {
				enchantCity.main.bgmPlayer[enchantCity.main.bgmPlayerName].play();
			} else {
				enchantCity.main.bgmPlayer[enchantCity.main.bgmPlayerName].pause();
			}
		});
	}}
);

enchantCity.main.EndButton = enchant.Class.create(enchantCity.widget.SeButton, {
	initialize: function() {
		enchantCity.widget.SeButton.call(this, enchantCity.main.buttonNames["end"]);
		this.addEventListener("touchstart", function(e) {
			enchantCity.main.addEndDialog();
		});
	}}
);

enchantCity.main.addEndDialog = function() {
	var core = enchant.Core.instance;
	var content = "ゲームを終了しますか？";

	if(this.endDialog) {
		this.removeEndDialog();
	}
	this.endDialog = new enchantCity.widget.Dialog(content, "はい", "いいえ");
	this.endDialog.x = (this.sceneWidth - this.endDialog.width) / 2;
	this.endDialog.y = (this.sceneHeight - this.endDialog.height) / 2;
	this.endDialog.onaccept = function() {
		enchantCity.main.removeEndDialog();

		enchantCity.main.bgmPlayer[enchantCity.main.bgmPlayerName].pause();
		var population = enchantCity.main.population;
		var diffTime = enchantCity.main.date.getTime() - enchantCity.main.startDate.getTime();
		var diffDate = Math.ceil(diffTime / 86400000);
		var message = diffDate + "日間で人口"+population+"人を達成しました";
		var core = enchant.Core.instance;
		core.end(population, message);
		window.console.log(message);
	};
	this.endDialog.oncancel = function() {
		enchantCity.main.removeEndDialog();
	};
	core.rootScene.addChild(this.endDialog);
};

enchantCity.main.removeEndDialog = function() {
	var core = enchant.Core.instance;
	core.rootScene.removeChild(this.endDialog);
	this.endDialog = null;
};


enchantCity.main.addMainMenu = function() {
	this.roadButton = new this.RoadButton();
	this.regionButton = new this.RegionButton();
	this.destroyButton = new this.DestroyButton();
	this.cursorButton = new this.CursorButton();

	this.mainButtons = [
		this.roadButton,
		this.regionButton,
		this.destroyButton,
		this.cursorButton
	];

	this.mainMenu = new enchant.widget.IconMenu(this.mainButtons);
	this.mainMenu.y = this.statusMenu.y + this.statusMenu.height;
	
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.mainMenu);
};

enchantCity.main.RoadButton = enchant.Class.create(enchantCity.main.DeployButton, {
	initialize: function() {
		enchantCity.main.DeployButton.call(this, "road");
	}}
);

enchantCity.main.RegionButton = enchant.Class.create(enchantCity.widget.RadioImageButton, {
	initialize: function() {
		enchantCity.widget.RadioImageButton.call(this, enchantCity.main.buttonNames["region"]);
		this.addEventListener("checked", function(e) {
			var regionMenu = enchantCity.main.regionMenu;
			var mainMenu = enchantCity.main.mainMenu;
			if(this.checked) {
				regionMenu.y = mainMenu.y+mainMenu.height-regionMenu.height;
				regionMenu.tl
				.show()
				.moveBy(0, regionMenu.height, enchantCity.main.secondToFrame(0.1));
			} else {
				regionMenu.tl
				.moveBy(0, -regionMenu.height, enchantCity.main.secondToFrame(0.1))
				.hide();
				for (var i = 0; i < regionMenu.childNodes.length; i++) {
					if(regionMenu.childNodes[i].checked) {
						regionMenu.childNodes[i].checked = false;
					}
				}
			}
		});
	}}
);

enchantCity.main.DestroyButton = enchant.Class.create(enchantCity.main.DeployButton, {
	initialize: function() {
		enchantCity.main.DeployButton.call(this, "destroy");
	}}
);

enchantCity.main.CursorButton = enchant.Class.create(enchantCity.main.DeployButton, {
	initialize: function() {
		enchantCity.main.DeployButton.call(this, "cursor");
	}}
);

enchantCity.main.addMessage = function(message) {
	this.message = new enchantCity.widget.StaticText(message);

	this.messages = [
		this.message,
	];

	this.messageMenu = new enchant.widget.IconMenu(this.messages);
	this.messageMenu.y = -this.messageMenu.height;
	this.messageMenu.tl
	.moveBy(0, this.messageMenu.height, enchantCity.main.secondToFrame(1))
	.delay(enchantCity.main.secondToFrame(3))
	.moveBy(0, -this.messageMenu.height, enchantCity.main.secondToFrame(1))
	.removeFromScene();

	var core = enchant.Core.instance;
	core.rootScene.addChild(this.messageMenu);

};

enchantCity.main.renameSoundFilesWithExtension = function() {
	var extension = enchantCity.getPlayableAudioFileExtension();
	for(var key in enchantCity.widget.ses) {
		enchantCity.widget.ses[key] = enchantCity.widget.ses[key] + extension;
	} 
	for(var key in this.ses) {
		this.ses[key] = this.ses[key] + extension;
	}
}

enchantCity.main.loadSoundList = function() {
	var soundList = enchantCity.main.soundList;
	var core = enchant.Core.instance;
	for(var i = 0; i < soundList.length; i++) {
		var soundName = soundList[i];
		core.load(soundName);
	}
};

enchantCity.main.parseTutorial = function() {
	this.tutorialParser = new enchantCity.message.Parser("tutorial");
	this.tutorialId = null;
	this.tutorialPageNo = 0;
};

enchantCity.main.playTutorial = function() {
	if(this.tutorialDialog) {
		var core = enchant.Core.instance;
		core.rootScene.removeChild(this.tutorialDialog);
		this.tutorialDialog = null;
	}
	if(this.tutorialAvatar) {
		var core = enchant.Core.instance;
		core.rootScene.removeChild(this.tutorialAvatar);
		this.tutorialAvatar = null;
	}

	var page = this.tutorialParser.getPage(this.tutorialId, this.tutorialPageNo);

	if((this.tutorialOldPage!=null && this.tutorialOldPage.className!==undefined && this.tutorialOldPage.className!="") && (page==null || page.className!=this.tutorialOldPage.className)) {
		this["not" + this.tutorialOldPage.className]();
	}

	if(page!=null) {
		var acceptName = null;
		var pagesLength = this.tutorialParser.getPages(this.tutorialId).length;
		if(this.tutorialPageNo >= pagesLength-1) {
			acceptName = "終わり";
		} else {
			acceptName = "次へ";
		}
		
		var x = Number(page.style.left.slice(0, page.style.left.length-2));
		var y = Number(page.style.top.slice(0, page.style.top.length-2));
		
		this.tutorialDialog = new enchantCity.widget.Dialog(page.innerHTML, acceptName, null, "left", "right", this.sceneWidth - x);
		this.tutorialDialog.x = x;
		this.tutorialDialog.y = y+64;
		this.tutorialDialog.onaccept = function() {
			enchantCity.main.isPlayNextTutorial = true;
		};
		this.isPlayingTutorial = true;
		
		var core = enchant.Core.instance;
		core.rootScene.addChild(this.tutorialDialog);

		var core = enchant.Core.instance;
		this.tutorialAvatar = new enchantCity.avatar.FaceAvatar(x, y, core.assets[this.images["enchantGirl"]]);
		
		this.tutorialAvatar.talk(page.title);
		
		core.rootScene.addChild(this.tutorialAvatar);

		if(page.className!==undefined && page.className!="" && page.className!=this.tutorialOldPage.className) {
			this[page.className]();
		}
	}

	this.tutorialOldPage = page;
};

enchantCity.main.BlinkingEntity = enchant.Class.create(enchantCity.widget.BlinkingSprite, {
	initialize: function(x, y, width, height) {
		enchantCity.widget.BlinkingSprite.call(this, x, y, width, height, 'rgba(255, 128, 0, 0.8)');
		this.addEventListener("touchstart", function(e) {
			enchantCity.main.touchTile(e.x, e.y);
		});
	}}
);

enchantCity.main.blinkStatusMenu = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.statusMenu.x, this.statusMenu.y, this.statusMenu.width, this.statusMenu.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkStatusMenu = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkDateText = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.statusMenu.x+this.dateText.x, this.statusMenu.y+this.dateText.y, this.dateText.width, this.dateText.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkDateText = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkCashText = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.statusMenu.x+this.cashText.x, this.statusMenu.y+this.cashText.y, this.cashText.width, this.cashText.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkCashText = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkPopulationText = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.statusMenu.x+this.populationText.x, this.statusMenu.y+this.populationText.y, this.populationText.width, this.populationText.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkPopulationText = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkBgmButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.statusMenu.x+this.bgmButton.x, this.statusMenu.y+this.bgmButton.y, this.bgmButton.width, this.bgmButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkBgmButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkEndButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.statusMenu.x+this.endButton.x, this.statusMenu.y+this.endButton.y, this.endButton.width, this.endButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkEndButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkMainMenu = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.mainMenu.x, this.mainMenu.y, this.mainMenu.width, this.mainMenu.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkMainMenu = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkRoadButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.mainMenu.x+this.roadButton.x, this.mainMenu.y+this.roadButton.y, this.roadButton.width, this.roadButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkRoadButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkRegionButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.mainMenu.x+this.regionButton.x, this.mainMenu.y+this.regionButton.y, this.regionButton.width, this.regionButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkRegionButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkDestroyButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.mainMenu.x+this.destroyButton.x, this.mainMenu.y+this.destroyButton.y, this.destroyButton.width, this.destroyButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkDestroyButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkCursorButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.mainMenu.x+this.cursorButton.x, this.mainMenu.y+this.cursorButton.y, this.cursorButton.width, this.cursorButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkCursorButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.checkRegionButton = function() {
	this.regionButton.checked = true;
}

enchantCity.main.notcheckRegionButton = function() {
}

enchantCity.main.blinkTownButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.regionMenu.x+this.townButton.x, this.regionMenu.y+this.townButton.y, this.townButton.width, this.townButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTownButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkCastleButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.regionMenu.x+this.castleButton.x, this.regionMenu.y+this.castleButton.y, this.castleButton.width, this.castleButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkCastleButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkDungeonButton = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.regionMenu.x+this.dungeonButton.x, this.regionMenu.y+this.dungeonButton.y, this.dungeonButton.width, this.dungeonButton.height);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkDungeonButton = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkHighway = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(this.buildings["highways"][0].mapX * this.tileWidth, this.buildings["highways"][0].mapY * this.tileHeight, this.tileWidth, this.tileHeight);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkHighway = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkSea = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(9 * this.tileWidth, 6 * this.tileHeight, this.tileWidth * 2, this.tileHeight * 3);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkSea = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkGrass = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(6 * this.tileWidth, 8 * this.tileHeight, this.tileWidth * 2, this.tileHeight * 3);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkGrass = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkForest = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(9 * this.tileWidth, 9 * this.tileHeight, this.tileWidth * 2, this.tileHeight * 3);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkForest = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkDesert = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity(12 * this.tileWidth, 12 * this.tileHeight, this.tileWidth * 2, this.tileHeight * 3);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkDesert = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkTutorial1 = function() {
	this.roadButton.checked = true;

	this.blinkingEntity = new enchantCity.main.BlinkingEntity((this.buildings["highways"][0].mapX-1) * this.tileWidth, (this.buildings["highways"][0].mapY-1) * this.tileHeight, this.tileWidth*2, this.tileHeight);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTutorial1 = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkTutorial2_1 = function() {
	this.regionButton.checked = true;
	this.townButton.checked = true;

	this.blinkingEntity = new enchantCity.main.BlinkingEntity((this.buildings["highways"][0].mapX-1) * this.tileWidth, (this.buildings["highways"][0].mapY-2) * this.tileHeight, this.tileWidth, this.tileHeight);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTutorial2_1 = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkTutorial2_2 = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity((this.buildings["highways"][0].mapX+1) * this.tileWidth, (this.buildings["highways"][0].mapY-1) * this.tileHeight, this.tileWidth, this.tileHeight);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTutorial2_2 = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkTutorial2_3 = function() {
	this.blinkingEntity = new enchantCity.main.BlinkingEntity((this.buildings["highways"][0].mapX-1) * this.tileWidth, (this.buildings["highways"][0].mapY) * this.tileHeight, this.tileWidth, this.tileHeight);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTutorial2_3 = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkTutorial3 = function() {
	this.progressibleTime = this.startDate.getTime() + 2 * 60 * enchantCity.main.secondsPerFrame * 1000;
	this.regionButton.checked = true;
	this.castleButton.checked = true;

	this.blinkingEntity = new enchantCity.main.BlinkingEntity((this.buildings["highways"][0].mapX-2) * this.tileWidth, (this.buildings["highways"][0].mapY-1) * this.tileHeight, this.tileWidth, this.tileHeight);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTutorial3 = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkTutorial4 = function() {
	this.progressibleTime = this.startDate.getTime() + 3 * 60 * enchantCity.main.secondsPerFrame * 1000;
	this.roadButton.checked = true;

	this.blinkingEntity = new enchantCity.main.BlinkingEntity((this.buildings["highways"][0].mapX) * this.tileWidth, (this.buildings["highways"][0].mapY-6) * this.tileHeight, this.tileWidth, this.tileHeight * 5);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTutorial4 = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.blinkTutorial5 = function() {
	this.regionButton.checked = true;
	this.dungeonButton.checked = true;

	this.blinkingEntity = new enchantCity.main.BlinkingEntity((this.buildings["highways"][0].mapX) * this.tileWidth, (this.buildings["highways"][0].mapY-7) * this.tileHeight, this.tileWidth, this.tileHeight);
	var core = enchant.Core.instance;
	core.rootScene.addChild(this.blinkingEntity);
}

enchantCity.main.notblinkTutorial5 = function() {
	this.blinkingEntity.parentNode.removeChild(this.blinkingEntity);
	this.blinkingEntity = null;
}

enchantCity.main.endTutorial = function() {
	this.isProgressingTime = true;
}

enchantCity.main.notendTutorial = function() {
}

enchantCity.main.createScene = function() {
	this.renameSoundFilesWithExtension();
	this.loadSoundList();

	this.presetDefaultButton();
	this.presetDefaultDialog();
	this.presetDefaultItemMenu();
	
	this.addMap();
	this.createRoadMapFromMap();
	this.createHighwayFromMap();
	this.createBuildingFromMap();

	this.createBgmPlayer();
	
	this.addTouchEntity();

	this.addRegionMenu();

	this.addStatusMenu();

	this.addMainMenu();
}

enchant.nineleap.assets.push("startText.png");
enchant.nineleap.assets.push("startWithTutorialText.png");

enchantCity.main.Core = enchant.Class.create(enchant.nineleap.Core, {
	initialize: function(width, height) {
		enchant.Core.call(this, width, height);
		this.addEventListener('load', function() {
			var core = this;
			this.startScene = new enchant.nineleap.SplashScene();
			this.startScene.image = core.assets['start.png'];
			var startScene = this.startScene;

			enchantCity.main.presetStartButton();

			this.startWithTutorialButton = new enchantCity.widget.ImageButton("", "startWithTutorialText.png");
			this.startWithTutorialButton.x = (this.width - this.startWithTutorialButton.width) / 2;
			this.startWithTutorialButton.y = (this.height - this.startWithTutorialButton.height) / 4 * 3;
			this.startWithTutorialButton.addEventListener("touchstart", function() {
				enchantCity.main.bgmButton.checked = true;
				enchantCity.main.doneIntroduction = false;
				if (core.started === false) {
					if (core.onstart != null) {
						core.onstart();
					}
					core.started = true;
					coreStart = true;	// deprecated
				}
				if (core.currentScene === startScene) {
					core.popScene();
				}
				this.removeEventListener(enchant.Event.TOUCH_START, arguments.callee);
			});
			this.startScene.addChild(this.startWithTutorialButton);

			this.startButton = new enchantCity.widget.ImageButton("", "startText.png");
			this.startButton.x = (this.width - this.startButton.width) / 2;
			this.startButton.y = (this.height - this.startButton.height) / 4 * 3 + this.startWithTutorialButton.image.height + 12;
			this.startButton.addEventListener("touchstart", function() {
				enchantCity.main.bgmButton.checked = true;
				enchantCity.main.doneIntroduction = true;
				if (core.started === false) {
					if (core.onstart != null) {
						core.onstart();
					}
					core.started = true;
					coreStart = true;	// deprecated
				}
				if (core.currentScene === startScene) {
					core.popScene();
				}
				this.removeEventListener(enchant.Event.TOUCH_START, arguments.callee);
			});
			this.startScene.addChild(this.startButton);

			enchantCity.main.presetDefaultButton();

			this.pushScene(this.startScene);

			this.endScene = new SplashScene();
			this.endScene.image = this.assets['end.png'];
			this.removeEventListener('load', arguments.callee);
		});
		this.scoreQueue = false;
		this.started = false;
		coreStart = false; // deprecated
	}}
);

enchantCity.main.presetStartButton = function() {
	enchantCity.widget.buttonWidthMargin = 16;
	enchant.widget._env.buttonHeight = 32;
	enchantCity.widget.images["button"] = 'dialog.png';
	enchantCity.widget.images["buttonPushed"] = 'dialog.png';
};

enchantCity.main.presetDefaultButton = function() {
	enchant.widget._env.buttonFont = '12px helvetica';	// font of Button
	enchant.widget._env.buttonWidth = 32;	// width of Button
	enchant.widget._env.buttonHeight = 24;	// height of Button
	enchantCity.widget.buttonWidthMargin = 6;	// width margin of Button
	enchantCity.widget.images["button"] = 'button.png';
	enchantCity.widget.images["buttonPushed"] = 'buttonPushed.png';
};

enchantCity.main.presetDefaultDialog = function() {
	enchantCity.widget.dialogWidthMargin = 16;	// width margin of dialog
	enchantCity.widget.dialogHeightMargin = 4;	// hieght margin of dialog
	enchantCity.widget.images["dialog"] = 'dialog.png';
};

enchantCity.main.presetDefaultItemMenu = function() {
	enchant.widget._env.itemHeight = 32;	// height of ItemMenu
	enchantCity.widget.images["iconMenuBg"] = 'iconMenuBg.png';
	enchantCity.widget.images["iconMenuBgHighlight"] = 'iconMenuBgHighlight.png';
};

enchant();

window.onload = function() {
	enchantCity.main.parseTutorial();

	var core = new enchantCity.main.Core(enchantCity.main.sceneWidth, enchantCity.main.sceneHeight);

	core.preload(enchantCity.main.preloadList);

	core.fps = enchantCity.main.fps;

	core.onload = function() {
		enchantCity.main.createScene();
	};

	core.start();
};

