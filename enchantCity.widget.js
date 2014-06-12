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

enchantCity.widget = {
	buttonWidthMargin: 6,
	dialogWidthMargin: 16,
	dialogHeightMargin: 16,
	dialogHeightMarginInBetweenButton: 0,
	images: {
		"button": null,
		"buttonPushed": null,
		"dialog": null,
		"iconMenuBg": null,
		"iconMenuBgHighlight": null},
	ses: {
		"touchstart": null}};

enchantCity.widget.BlinkingSprite = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, width, height, color, imageName) {
		enchant.Sprite.call(this, width, height);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		if(color) {
			this.backgroundColor = color;
		}
		if(imageName) {
			var core = enchant.Core.instance;
			var image = core.assets[imageName];
			this.image = image;
		}
		this.tl.fadeTo(0.4, 6).
				fadeTo(0.8, 6).
				loop();
	}}
);

enchantCity.widget.TextLabel = enchant.Class.create(enchant.Label, {
	initialize: function(text) {
        enchant.Label.call(this, text);
        this.parse(text);
	},
	parse: function(text) {
		var label = enchant.widget.parseContent(text);
        this.width = label.width;
        this.height = label.height;
        this.font = label.font;
        this.color = label.color;
        this.text = text;
	}}
);

enchantCity.widget.Button = enchant.Class.create(enchant.widget.Button, {
	initialize: function(content) {
		this.initializeButton(content);
		this.resize();
	},
	initializeButton: function(content) {
		var core = enchant.Core.instance;
		content = content || '';
		this.minwidth = enchant.widget._env.buttonWidth;
		this.minheight = enchant.widget._env.buttonHeight;
		this.buttonWidthMargin = enchantCity.widget.buttonWidthMargin;
		this.imageFile = enchantCity.widget.images["button"];
		this.pushedImageFile = enchantCity.widget.images["buttonPushed"];

		enchant.widget.EntityGroup.call(this, this.minwidth, this.minheight);
		this._image;
		this._pushedimage;
		this._content;
		this._rawContent;
		var image = new enchant.widget.Ninepatch(this.minwidth, this.minheight);
		image.src = core.assets[this.imageFile];
		this.image = image;

		var image = new enchant.widget.Ninepatch(this.minwidth, this.minheight);
		image.src = core.assets[this.pushedImageFile];
		this.pushedimage = image;

		this.content = content;
		this.resize();
	},
	resize: function() {
		this.width = Math.max(this._content.width+this.buttonWidthMargin*2, this.minwidth);
		this.height = Math.max(this._content.height, this.minheight);
		this.refresh();
	},
	setBgImage: function(bgImage) {
		bgImage = (bgImage === undefined) ? this.imageFile : bgImage;
		var core = enchant.Core.instance;
		var image = new enchant.widget.Ninepatch(this.width, this.height);
		image.src = core.assets[bgImage];
		this.image = image;
	},
	blink: function() {
		var core = enchant.Core.instance;
		var frame = this.age%core.fps;
		var half = core.fps/2;
		if(frame==0) {
			this.setBgImage(this.pushedImageFile);
		} else if(frame==half) {
			this.setBgImage();
		}
	},
	startBlinking: function() {
		this.addEventListener("enterframe", this.blink);
	},
	endBlinking: function() {
		this.removeEventListener("enterframe", this.blink);
		this.setBgImage();
	}}
);	

enchantCity.widget.SeButton = enchant.Class.create(enchantCity.widget.Button, {
	initialize: function(content) {
		enchantCity.widget.Button.call(this, content);
		this.initializeSe();
	},
	initializeSe: function() {
		this.touchstartSeFile = enchantCity.widget.ses["touchstart"];

		this.addEventListener(enchant.Event.TOUCH_START, function() {
			enchantCity.playSound(this.touchstartSeFile);
		});
	}}
);	

enchantCity.widget.ImageButton = enchant.Class.create(enchantCity.widget.SeButton, {
	initialize: function(content, frontImageName) {
		enchantCity.widget.SeButton.call(this, content);
		this.initializeImage(frontImageName);
	},
	initializeImage: function(frontImageName) {
		this.frontSprite = frontImageName;
	},
	resize: function() {
		if (this._content && this._rawContent!="" && this._frontSprite) {
			this.width = Math.max(this._content.width+this._frontSprite.width+this.buttonWidthMargin*2, this.minwidth);
			this.height = Math.max(this._content.height, this._frontSprite.height, this.minheight);
		} else if (this._content && this._rawContent!="" && !this._frontSprite) {
			this.width = Math.max(this._content.width+this.buttonWidthMargin*2, this.minwidth);
			this.height = Math.max(this._content.height, this.minheight);
		} else if ((!this._content || this._rawContent=="") && this._frontSprite) {
			this.width = Math.max(this._frontSprite.width+this.buttonWidthMargin*2, this.minwidth);
			this.height = Math.max(this._frontSprite.height, this.minheight);
		}
		this.refresh();
	},
	refresh: function() {
		if (this._content && this._rawContent!="" && this._frontSprite) {
			this._content.alignRightIn(this, this.buttonWidthMargin).alignVerticalCenterIn(this);
			this._frontSprite.alignLeftIn(this, this.buttonWidthMargin).alignVerticalCenterIn(this);
		} else if (this._content && this._rawContent!="" && !this._frontSprite) {
			this._content.alignHorizontalCenterIn(this).alignVerticalCenterIn(this);
		} else if ((!this._content || this._rawContent=="") && this._frontSprite) {
			this._frontSprite.alignHorizontalCenterIn(this).alignVerticalCenterIn(this);
		}
	},
	frontSprite: {
		get: function() {
			return this._frontSprite;
		},
		set: function(frontImageName) {
			var core = enchant.Core.instance;
			var image = core.assets[frontImageName];
			if(image) {
				if(this._frontSprite) {
					this.removeChild(this._frontSprite);
				}
				this._frontSprite = new enchant.Sprite();
				this._frontSprite.image = image;
				this._frontSprite.width = this._frontSprite.image.width;
				this._frontSprite.height = this._frontSprite.image.height;
				this.resize();
				this.addChild(this._frontSprite);
			}
		}
	}}
);
		
enchantCity.widget.CheckImageButton = enchant.Class.create(enchantCity.widget.ImageButton, {
	initialize: function(content, frontImageName) {
		this.initializeButton(content);
		this.initializeImage(frontImageName);
		this.initializeSe();
		this.addEventListener(enchant.Event.TOUCH_START, function() {
			this.toggleCheck();
		});
		this.addEventListener(enchant.Event.TOUCH_END, function() {
		});
	},
	checked: {
		get: function() {
			return this.getChecked();
		},
		set: function(checked) {
			this.setChecked(checked);
		}
	},
	getChecked: function() {
		var checked = this.background==this._pushedimage;
		return checked;
	},
	setChecked: function(checked) {
		if(checked && !this.checked) {
			if (!this._pushedimage) {
				return;
			}
			this.background = this._pushedimage;
			this.dispatchCheckedEvent();
		} else if(!checked && this.checked) {
			this.background = this._image;
			this.dispatchCheckedEvent();
		}
	},
	dispatchCheckedEvent: function() {
		this.dispatchEvent(new enchant.Event("checked"));
	},
	toggleCheck: function() {
		this.checked = !this.checked;
	}}
);
		
enchantCity.widget.RadioImageButton = enchant.Class.create(enchantCity.widget.CheckImageButton, {
	initialize: function(content, frontImageName) {
		enchantCity.widget.CheckImageButton.call(this, content, frontImageName);
	},
	setChecked: function(checked) {
		var thisChecked = this.checked;
		enchantCity.widget.CheckImageButton.prototype.setChecked.call(this, checked);
		if(checked && !thisChecked) {
			var childNodes = this.parentNode.childNodes;
			for (var i = 0; i < childNodes.length; i++) {
				var child = childNodes[i];
				if(child!=this && child.checked) {
					child.checked = false;
				}
			}
		}
	}}
);

enchantCity.widget.StaticText = enchant.Class.create(enchantCity.widget.ImageButton, {
	initialize: function(content, frontImageName) {
		this.initializeButton(content);
		this.initializeImage(frontImageName);
	}}
);

enchantCity.widget.Dialog = enchant.Class.create(enchant.widget.EntityGroup, {
	initialize: function(content, ac, ig, contentAlignType, buttonAlignType, staticWidth, staticHeight) {
		this.dialogWidthMargin = enchantCity.widget.dialogWidthMargin;
		this.dialogHeightMargin = enchantCity.widget.dialogHeightMargin;
		this.dialogHeightMarginInBetweenButton = enchantCity.widget.dialogHeightMarginInBetweenButton;

		this.contentAlignFunc = enchant.Entity.prototype.alignHorizontalCenterIn;
		switch(contentAlignType) {
		case "left":
			this.contentAlignFunc = enchant.Entity.prototype.alignLeftIn;
			break;
		case "right":
			this.contentAlignFunc = enchant.Entity.prototype.alignRightIn;
			break;
		}
		this.buttonAlignFunc = enchant.Entity.prototype.alignHorizontalCenterIn;
		switch(buttonAlignType) {
		case "left":
			this.buttonAlignFunc = enchant.Entity.prototype.alignLeftIn;
			break;
		case "right":
			this.buttonAlignFunc = enchant.Entity.prototype.alignRightIn;
			break;
		}
		this.staticWidth = staticWidth;
		this.staticHeight = staticHeight;

		var core = enchant.Core.instance;
		var dialogwidth = (this.staticWidth === undefined) ? enchant.widget._env.dialogWidth : this.staticWidth;
		var dialogheight = (this.staticHeight === undefined) ? enchant.widget._env.dialogHeight : this.staticHeight;

		enchant.widget.EntityGroup.call(this, dialogwidth, dialogheight);

		var that = this;
		if(ac) {
			this._accept = new enchantCity.widget.SeButton(ac);
			this._accept.addEventListener(enchant.Event.TOUCH_END, function() {
				that.dispatchEvent(new enchant.Event(enchant.Event.ACCEPT));
			});
		}
			
		if(ig) {
			this._cancel = new enchantCity.widget.SeButton(ig);
			this._cancel.addEventListener(enchant.Event.TOUCH_END, function() {
				that.dispatchEvent(new enchant.Event(enchant.Event.CANCEL));
			});
		}

		this.content = content;

		var np = new enchant.widget.Ninepatch(this.width, this.height);
		np.src = core.assets[enchantCity.widget.images["dialog"]];
		this.background = np;

		if(this._accept) {
			this.addChild(this._accept);
		}
		
		if(this._cancel) {
			this.addChild(this._cancel);
		}
	},
	content: {
		get: function() {
			return this._content;
		},
		set: function(content) {
			this.removeChild(this._content);
			this._content = enchant.widget.parseContent(content);
			var width = this._content.width+this.dialogWidthMargin*2;
			var height = this._content.height+this.dialogHeightMargin*2;
			var buttonHeight = 0;
			if(this._accept) {
				buttonHeight = this._accept.height;
			}
			if(this._cancel) {
				buttonHeight = this._cancel.height;
			}
			if(buttonHeight > 0) {
				height += buttonHeight+this.dialogHeightMarginInBetweenButton;
			}

			if(this.staticWidth === undefined) {
				this.width = width;
			}
			if(this.staticHeight === undefined) {
				this.height = height;
			}

			this.contentAlignFunc.call(this._content, this, this.dialogWidthMargin).alignTopIn(this, this.dialogHeightMargin);

			if(this._accept && this._cancel) {
				this._accept.alignLeftIn(this, this.dialogWidthMargin).alignBottomIn(this, this.dialogHeightMargin);
				this._cancel.alignRightIn(this, this.dialogWidthMargin).alignBottomIn(this, this.dialogHeightMargin);
			} else if(this._accept) {
				this.buttonAlignFunc.call(this._accept, this, this.dialogWidthMargin).alignBottomIn(this, this.dialogHeightMargin);
			} else if(this._cancel) {
				this.buttonAlignFunc.call(this._cancel, this, this.dialogWidthMargin).alignBottomIn(this, this.dialogHeightMargin);
			}

			this.addChild(this._content);
		}
	},
	onaccept: function() {
	},
	oncancel: function() {
	}}
);

enchantCity.widget.IconMenu = enchant.Class.create(enchant.widget.IconMenu, {
    initialize: function(buttons) {
		this.itemHieght = enchant.widget._env.itemHeight;
		this.bgImageFile = enchantCity.widget.images["iconMenuBg"];
		this.bgHighlightImageFile = enchantCity.widget.images["iconMenuBgHighlight"];
		
		enchant.widget.IconMenu.call(this, buttons);
	},
	addChildForIcon: function(child) {
		var addChild = enchant.widget.EntityGroup.prototype.addChild;
		addChild.call(this, child);
		this._icons.push(child);
	},
	addChildForBg: function(bgImage) {
		bgImage = (bgImage === undefined) ? this.bgImageFile : bgImage;
		var core = enchant.Core.instance;
		var addChild = enchant.widget.EntityGroup.prototype.addChild;
		var size = this.itemHieght;
		var sp = new enchant.Sprite(size, size);
		addChild.call(this, sp);
		this._bgs.push(sp);
		var np = new enchant.widget.Ninepatch(sp.width, sp.height);
		np.src = core.assets[bgImage];
		sp.image = np;
	},
	content: {
		get: function() {
			return this._icons;
		},
		set: function(content) {
			var removeChild = enchant.widget.EntityGroup.prototype.removeChild;
			var menu = this;
			if (this.childNodes) {
				this.childNodes.slice().forEach(function(child) {
					removeChild.call(menu, child);
				});
			}
			content.forEach(function(child) {
				menu.addChildForBg();
			});
			content.forEach(function(child) {
				menu.addChildForIcon(child);
			});
			this.refresh();
		}
	},
	setBgImage: function(bgImage) {
		bgImage = (bgImage === undefined) ? this.bgImageFile : bgImage;
		var core = enchant.Core.instance;
		this._bgs.forEach(function(bg) {
			var image = new enchant.widget.Ninepatch(bg.width, bg.height);
			image.src = core.assets[bgImage];
			bg.image = image;
		});
	},
	setBgColor: function(color) {
		color = (color === undefined) ? 'rgba(255, 255, 255, 1.0)' : color;
		var core = enchant.Core.instance;
		this._bgs.forEach(function(bg) {
			bg.backgroundColor = color;
		});
	},
	blink: function() {
		var core = enchant.Core.instance;
		var frame = this.age%core.fps;
		var half = core.fps/2;
		if(frame==0) {
			this.setBgImage(this.bgHighlightImageFile);
		} else if(frame==half) {
			this.setBgImage();
		}
	},
	startBlinking: function() {
		this.addEventListener("enterframe", this.blink);
	},
	endBlinking: function() {
		this.removeEventListener("enterframe", this.blink);
		this.setBgImage();
	}}
);
