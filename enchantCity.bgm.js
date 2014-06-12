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

enchantCity.bgm = {};

enchantCity.bgm.volume = 0.25;
enchantCity.bgm.fadeFrame = 10;
enchantCity.bgm.fadeMode = true;

enchantCity.bgm.BgmPlayer = function(playList) {
	this.playList = [];
	var extension = enchantCity.getPlayableAudioFileExtension();
	for(var i = 0; i < playList.length; i++) {
		this.playList[i] = new Audio(playList[i]+extension);
	}
	this.playNumber = 0;
	this.isPlay = false;
	this.bgmDuration = 0;
	this.playStartedTime = 0;

	this.fadeDuration = 100;
	this.fadeStartedTime = 0;
}

enchantCity.bgm.BgmPlayer.prototype = {
	play: function() {
		this.bgm = this.playList[this.playNumber];
		if(!this.bgm) {
			return;
		}
		if(enchantCity.bgm.fadeMode) {
			this.bgm.volume = 0;
			this.setFade(enchantCity.bgm.volume);
		} else {
			this.bgm.volume = enchantCity.bgm.volume;
		}
		var timeoutTime = 0;
		this.bgm.play();
		if(!isNaN(this.bgm.currentTime) && !isNaN(this.bgm.duration)) {
			this.bgmDuration = (this.bgm.duration - this.bgm.currentTime)*1000;
		} else {
			this.bgmDuration = 1000;
		}
		this.playStartedTime = window.getTime();
		this.isPlay = true;
	},

	pause: function() {
		this.isPlay = false;
		if(enchantCity.bgm.fadeMode) {
			this.setFade(0);
		} else {
			this.pauseActually();
		}
	},

	pauseActually: function() {
		if(!this.bgm) {
			return;
		}
		this.bgm.pause();
	},

	playNext: function() {
		if(!this.bgm) {
			return;
		}
		if(!this.isPlay) {
			return;
		}
		var currentTime = window.getTime();
		var interval = currentTime - this.playStartedTime;
		var timeLimit = this.bgmDuration;
		if(interval > timeLimit) {
			if(!this.bgm.ended) {
				this.playStartedTime += 1000;
				return;
			}
			this.playNumber++;
			if(this.playNumber >= this.playList.length) {
				this.playNumber = 0;
			}
			this.play();
		}
	},

	setFade: function(fadeOutVolume) {
		if(!this.bgm) {
			return;
		}
		this.fadeFrameCount = 0;
		this.fadeInVolume = this.bgm.volume;
		this.fadeOutVolume = fadeOutVolume;
		this.fadeStartedTime = window.getTime();
	},

	fade: function() {
		if(!this.bgm) {
			return;
		}
		if(this.fadeStartedTime == 0) {
			return;
		}
		var currentTime = window.getTime();
		var interval = currentTime - this.fadeStartedTime;
		var timeLimit = this.fadeDuration;
		if(interval > timeLimit) {
			this.fadeFrameCount++;
			if(this.fadeFrameCount >= enchantCity.bgm.fadeFrame) {
				this.bgm.volume = this.fadeOutVolume;
				if(this.bgm.volume == 0) {
					this.fadeStartedTime = 0;
					this.pauseActually();
				}
			} else {
				this.bgm.volume += (this.fadeOutVolume-this.fadeInVolume)/enchantCity.bgm.fadeFrame;
			}
		}
	},

	callbackEnterFrame: function() {
		this.playNext();
		this.fade();
	}};
