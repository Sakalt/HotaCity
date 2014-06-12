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

enchantCity.route = {};

enchantCity.route.Node = function(x, y) {
	this.x = x;
	this.y = y;
	this.score = null;
	this.next = null;
	this.isDeadEnd = false;
};

enchantCity.route.NodeList = function(){
	this.data = {};	
};

enchantCity.route.NodeList.prototype.add = function(node) { 
	this.data[node.x + ',' + node.y] = node; 
};
enchantCity.route.NodeList.prototype.get = function(x, y) { 
	var node = this.data[x + ',' + y];
	if(node==null) {
		node = new enchantCity.route.Node(x, y);
		this.add(node);
	}
	return node;
};
enchantCity.route.NodeList.prototype.length = function() {
	return this.data.length;
};
enchantCity.route.NodeList.prototype.remove = function(node) { 
	delete this.data[node.x + ',' + node.y]; 
};

enchantCity.route.RouteSearch = function(width, height) {
	this.width = width;
	this.height = height;
};

enchantCity.route.RouteSearch.prototype = {
	search : function(startX, startY, goalX, goalY) {
		this.goal = {x:goalX, y:goalY};
		this.start = {x:startX, y:startY};
		
		this.nodeList = new enchantCity.route.NodeList();

		// ゴールノードの設定
		this.nextNode = this.nodeList.get(this.goal.x, this.goal.y);
		this.nextNode.score = 0;

		var loopLimit = this.width * this.height,
			loopCount = 0;
		while (true) {
			loopCount++;
			if(loopCount > loopLimit) {
				window.console.log("RouteSearch.search error: over count limit.");
			}
			if (this.nextNode.x == this.start.x && this.nextNode.y == this.start.y) {
				this.nextNode = this.nextNode.next;
				return true;
			}
			this.searchNextRoute();
			while(this.nextNode.isDeadEnd) {
				this.nextNode = this.nextNode.next;
				if (this.nextNode==null) {
					return false;
				}
				this.searchTravelableNode();
			}
		}
		return false; 	
	},

	searchNextRoute : function() {
		// 次のノードを探索候補
		var nextNodePositions = [
			{x:this.nextNode.x, y:this.nextNode.y - 1}, 
			{x:this.nextNode.x, y:this.nextNode.y + 1}, 
			{x:this.nextNode.x - 1, y:this.nextNode.y}, 
			{x:this.nextNode.x + 1, y:this.nextNode.y}
		];

		var minScoreNode = null;
		for (var i = 0, len = nextNodePositions.length; i < len; i++) {
			var nextNodePosition = nextNodePositions[i];
			
			// 地図の範囲外であれば探索しない
			if (nextNodePosition.x < 0 || nextNodePosition.x >= this.width || nextNodePosition.y < 0 || nextNodePosition.y >= this.height) {
				continue;
			}
			
			//ノードの取得
			var nextNode = this.nodeList.get(nextNodePosition.x, nextNodePosition.y);

			//行き止まりは除外する
			if(nextNode.isDeadEnd) {
				continue;
			}

			//このノードが通れるか判定する
			var done = this.canPassNextNode(nextNode);
			if(!done) {
				continue;
			}
			
			var score = this.nextNode.score + 1 + Math.abs(nextNodePosition.x - this.start.x) + Math.abs(nextNodePosition.y - this.start.y);

			// スコアが格納されていない,またはほかの経路よりも効率が良ければスコアをセットする
			if ((nextNode.score==null) || (nextNode.score > score)) {
				nextNode.score = score;
				nextNode.next = this.nextNode;
			}
			
			if((nextNode.score > this.nextNode.score) && (minScoreNode==null || minScoreNode.score > nextNode.score)) {
				minScoreNode = nextNode;
			}
		}
		
		if(minScoreNode==null) {
			//一番小さいスコアが無ければ、そのノードは行き止まり
			this.nextNode.isDeadEnd = true;
		} else {		
			// 次の検索対象は一番小さいスコアのノードにする
			this.nextNode = minScoreNode;
		}
	},
	canPassNextNode: function() {
		return true;
	},
	searchTravelableNode: function() {
		var nextNodePositions = [
			{x:this.nextNode.x, y:this.nextNode.y - 1}, 
			{x:this.nextNode.x, y:this.nextNode.y + 1}, 
			{x:this.nextNode.x - 1, y:this.nextNode.y}, 
			{x:this.nextNode.x + 1, y:this.nextNode.y}
		];

		var minScoreNode = null;
		for (var i = 0, len = nextNodePositions.length; i < len; i++) {
			var nextNodePosition = nextNodePositions[i];
			
			// 地図の範囲外であれば探索しない
			if (nextNodePosition.x < 0 || nextNodePosition.x >= this.width || nextNodePosition.y < 0 || nextNodePosition.y >= this.height) {
				continue;
			}
			
			//ノードの取得
			var nextNode = this.nodeList.get(nextNodePosition.x, nextNodePosition.y);

			// ほかの経路のうち、一番小さいスコアを探す（ただし、元へ戻る経路は除外する）
			if (!nextNode.isDeadEnd && (nextNode.score > this.nextNode.score) && (minScoreNode==null || minScoreNode.score > nextNode.score)) {
				minScoreNode = nextNode;
			}
		}
		
		if(minScoreNode==null) {
			//一番小さいスコアが無ければ、そのノードは行き止まり
			this.nextNode.isDeadEnd = true;
		} else {		
			// 次の検索対象は一番小さいスコアのノードにする
			this.nextNode = minScoreNode;
		}
	},
	getNodeCount: function() {
		var nodeCount = 0;
		var node = this.nextNode;
		while(node) {
			nodeCount++;
			node = node.next;
		}
		return nodeCount;
	}};
