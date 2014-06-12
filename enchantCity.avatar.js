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

enchantCity.avatar = {
	secondsPerAnimation: 0.1};

enchantCity.avatar.AnimationAvatar = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, image, width, height) {
		enchant.Sprite.call(this, width, height);

		this.image = image;
		this.x = x;
		this.y = y;

		this.action = "stop";

		this.animPattern = { 
			"stop": [ 1]};

		this.patternFrame = 0;
		
		this.animFrame = 0;
		this.addEventListener('enterframe', function() {
			this.setActionFrame();
			if (this.action) {
				var animPattern = this.animPattern[this.action];
				var core = enchant.Core.instance;
				if (this.age%(Math.round(core.fps*enchantCity.avatar.secondsPerAnimation)) == 0) {
					this.animFrame++;
					if (animPattern[this.animFrame] === -1) {
						this.animFrame = 0;
						this.action = "stop";
					}
					if (animPattern[this.animFrame] === -2) {
						this.parentNode.removeChild(this);
					}
					if (animPattern[this.animFrame] === -3) {
						this.animFrame = 0;
						this.action = "stop";
						this.callbackStoppedAction();
					}
					if (this.animFrame >= animPattern.length) {
						this.animFrame = 0;
					}
				}
			}
		});
	},

	setActionFrame: function() {
		if (this.action) {
			var animPattern = this.animPattern[this.action];
			this.frame = animPattern[this.animFrame]+this.patternFrame;
		}
   	},

	callbackStoppedAction: function() {
	}}
);

enchantCity.avatar.FourWayAvatar = enchant.Class.create(enchantCity.avatar.AnimationAvatar, {
	initialize: function(x, y, image) {
		var width = ~~(image.width / 3);
		var height = width;
		enchantCity.avatar.AnimationAvatar.call(this, x, y, image, width, height);

		this.injuredFrame = 0;
		
		this.animPattern["walk"] = [ 2, 1, 0, 1];
		this.animPattern["attack"] = [ 12, 12, 13, 13, 14, 14, -3];
		this.animPattern["die"] = [ -2];
	},

	downward: 0,
	leftward: 3,
	rightward: 6,
	upward: 9,

	calculateWayFrame: function(currentX, currentY, nextX, nextY) {
		var patternFrame = this.downward;
		if(Math.round(currentY) < Math.round(nextY)) {
			patternFrame = this.downward;
		} else if(Math.round(currentX) > Math.round(nextX)) {
			patternFrame = this.leftward;
		} else if(Math.round(currentX) < Math.round(nextX)) {
			patternFrame = this.rightward;
		} else if(Math.round(currentY) > Math.round(nextY)) {
			patternFrame = this.upward;
		}
		
		return patternFrame;
	},

	turn: function(x, y) {
		this.patternFrame = this.calculateWayFrame(this.x, this.y, x, y) + this.injuredFrame;
	},

	walk: function(x, y, frame, func) {
		this.turn(x, y);
		this.animFrame = 0;
		this.action = "walk";
		this.setActionFrame();
		
		this.tl
		.moveTo(x, y, frame)
		.then(func);
	},
	
	attack: function(x, y) {
		this.turn(x, y);
		this.animFrame = 0;
		this.action = "attack";
		this.setActionFrame();
	},
	
	die: function() {
		var core = enchant.Core.instance;
		var frame = Math.round(core.fps*0.1);
		this.tl
		.fadeOut(frame)
		.fadeIn(frame)
		.fadeOut(frame)
		.fadeIn(frame)
		.then(this.callbackDie);
	},

	injured: function() {
		this.injuredFrame = 24;
	},

	isInjured: function() {
		return this.injuredFrame > 0;
	},

	heal: function() {
		this.injuredFrame = 0;
	},

	makeTime: function(frame, func) {
		this.tl
		.delay(frame)
		.then(func);
	},

	callbackDie: function() {
		this.animFrame = 0;
		this.attack = "die";
	}}
);

enchantCity.avatar.FaceAvatar = enchant.Class.create(enchantCity.avatar.AnimationAvatar, {
	initialize: function(x, y, image) {
		var width = ~~(image.width / 3);
		var height = width;
		enchantCity.avatar.AnimationAvatar.call(this, x, y, image, width, height);

		this.animPattern["talk"] = [ 2, 2, 0, 0, 1, 1, 2, 2, 0, 0, -1];
	},

	setMien: function(mienName) {
		this.patternFrame = this.miens[mienName];
	},
	talk: function(mienName) {
		if(mienName) {
			this.setMien(mienName);
		}
		this.action = "talk";
	}}
);

enchantCity.avatar.FaceAvatar.prototype.miens = {
	"normal": 0,
	"sad": 3,
	"serious": 6,
	"happy": 9,
	"surprise": 12,
	"blank": 15,
	"bitter": 18,
	"sweet": 21};
	
