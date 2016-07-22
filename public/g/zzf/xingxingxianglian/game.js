(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(768, 960, Phaser.CANVAS, '');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
'use strict';

var FloatingButton = function(game,x,rel_y,image,callback,parent) {
  Phaser.Button.call(this, game, x, game.height * rel_y, image, callback, parent);

  this.anchor.setTo(0.5,0.5);
  this.rel_y = rel_y;

  //float
  this.sinRot = this.game.rnd.realInRange(0,3);
  this.sinX = this.game.rnd.realInRange(0,3);
  this.sinY = this.game.rnd.realInRange(0,3);
  this.spd = 0.02;
  this.range = 5;
  this.orgX = this.x;
  this.orgY = this.y;
  this.orgAngle = 0;
 
};

FloatingButton.prototype = Object.create(Phaser.Button.prototype);
FloatingButton.prototype.constructor = FloatingButton;

FloatingButton.prototype.update = function() {

  	
  	this.orgY = this.game.height*this.rel_y;

  	this.sinRot += this.spd;
  	this.sinX += this.spd;
  	this.sinY += this.spd;


  	this.x = this.orgX+(Math.sin(this.sinX)* this.range);
  	this.y = this.orgY+(Math.sin(this.sinY)*this.range);
  	this.angle = this.orgAngle + Math.sin(this.sinRot)*this.range
  // write your prefab's specific update code here
  
};

module.exports = FloatingButton;

},{}],3:[function(require,module,exports){
'use strict';

var Line = function(game, x, y, rotation, width, end_1, end_2) {
  Phaser.Group.call(this, game);

  this.x = x;
  this.y = y;
  this.rotation = rotation;
  this.width = width;

  this.ends = [end_1,end_2];

  this.line_0 = new Phaser.Image(game,0,0,'line_0_spr');
  this.line_0.anchor.setTo(0,0.5);
  this.line_1 = new Phaser.Image(game,0,0,'line_1_spr');
  this.line_1.anchor.setTo(0,0.5);
  this.line_1.alpha = 0;
  this.add(this.line_0);
  this.add(this.line_1);

  this.passed = false;
  // initialize your prefab here
	
  this.rotation = rotation;
  this.width = width;

};

Line.prototype = Object.create(Phaser.Group.prototype);
Line.prototype.constructor = Line;

Line.prototype.update = function() {


  
  // write your prefab's specific update code here
  
};

Line.prototype.pass = function() {
	this.passed = true;
	this.game.add.tween(this.line_0).to({alpha: 0},200,Phaser.Easing.Linear.NONE, true, 0, 0, false);
	this.game.add.tween(this.line_1).to({alpha: 1},200,Phaser.Easing.Linear.NONE, true, 0, 0, false);
};

Line.prototype.restart = function(yoyo) {
	
	if (this.passed) {
		
		this.passed = false;
		this.game.add.tween(this.line_1).to({alpha: 0},200,Phaser.Easing.Linear.NONE, true, 500, 0, false);
		this.game.add.tween(this.line_0).to({alpha: 1},200,Phaser.Easing.Linear.NONE, true, 500, 0, false);
	}
}


module.exports = Line;

},{}],4:[function(require,module,exports){
'use strict';

var Lvl_button = function(game, x, y, number, callback) {
  Phaser.Button.call(this, game, x, y, '', callback);

  // initialize your prefab here
  this.number = number;
  this.unlocked = true;


  if (savegame_levels[number] == 1) {

  	this.loadTexture('lvl_complete_spr',number);


  }else {
  	if (number <= unlocked_levels) {
  		this.loadTexture('lvl_spr');
  		this.txt = this.game.add.bitmapText(33,20,'font_lvl',(number+1).toString(),46);
  		this.txt.x = 33 - (this.txt.textWidth * 0.5);
  		

  		//this.txt.anchor.y = 0.5;
  		this.addChild(this.txt);
  	}
  	else {
  		this.loadTexture('lvl_locked_spr');
  		this.unlocked = false;
  	}



  }


};

Lvl_button.prototype = Object.create(Phaser.Button.prototype);
Lvl_button.prototype.constructor = Lvl_button;

Lvl_button.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Lvl_button;

},{}],5:[function(require,module,exports){
'use strict';

var Star = function(game, x, y, callback, number) {
  Phaser.Button.call(this, game, x, y, '', callback);
  // initialize your prefab here
  this.number = number;
  this.lines = 0;
  this.default_lines = 0;

  this.star = new Phaser.Image(game,0,0,'star_spr');
  this.addChild(this.star);


  this.mini_star = new Phaser.Image(game,0,0,'star_mini_spr');
  this.addChild(this.mini_star);
  this.mini_star.alpha = 0;
  this.mini_star.renderable = false;

  this.star.anchor.setTo(0.5,0.5);
  this.mini_star.anchor.setTo(0.5,0.5);

  //this.game.add.tween(this).to({alpha: 0}, 1000, 1000,Phaser.Easing.Linear.NONE, true, 0, 0, false);
};

Star.prototype = Object.create(Phaser.Button.prototype);
Star.prototype.constructor = Star;

Star.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Star.prototype.restart = function() {
	this.lines = this.default_lines;
};

Star.prototype.shine = function() {
	this.mini_star.renderable = true;
	this.game.add.tween(this.mini_star).to({alpha: 1}, 500,Phaser.Easing.Linear.NONE, true, 0, 0, false);
	this.game.add.tween(this.star).to({alpha: 0}, 500,Phaser.Easing.Linear.NONE, true, 0, 0, false);
};

module.exports = Star;

},{}],6:[function(require,module,exports){
(function (global){

'use strict';

global.music = null;
global.camera_pos_x = 0;

global.marimba_notes = ['c1_sfx','d1_sfx','e1_sfx','f1_sfx','g1_sfx','a2_sfx','h2_sfx','c2_sfx','d2_sfx','e2_sfx','f2_sfx','g2_sfx','a3_sfx','h3_sfx','c3_sfx','d3_sfx','e3_sfx'];
global.marimba_notes_index = 0;
global.marimba_notes_dir = 1;



global.loadSave = function() {
	global.unlocked_levels = 0;

	global.savegame_levels = localStorage.getItem('levels');
	

	if (savegame_levels == null) {
		savegame_levels = [0]

		for (var i = 0; i < 50; i++) {

			savegame_levels[i] = 0;

		}
	}else {

		savegame_levels = JSON.parse(savegame_levels);

		for (var i = 0; i < 50; i++) {
			if (savegame_levels[i] == 1) unlocked_levels++;
		}
	}

	global.savegame_SFX = localStorage.getItem('SFX');


	if (global.savegame_SFX == null) {
		global.savegame_SFX = true;
	}else {
		if (global.savegame_SFX == 'true') {
			global.savegame_SFX = true;
		}else {
			global.savegame_SFX = false;
		}

	}

	

}

global.saveSFX = function() {
	localStorage.setItem('SFX',savegame_SFX);
}

global.savePassLevel = function(lvl_number) {
	if (savegame_levels[lvl_number] != 1) {
		
		savegame_levels[lvl_number] = 1;
		unlocked_levels++;
		localStorage.setItem('levels', JSON.stringify(savegame_levels));
	}
}

var scaleGameSizeUpdate = function() {
	var ratio = window.innerHeight/window.innerWidth;

	if (768*ratio>960) {
		this.scale.setGameSize(768,Math.floor(768*ratio));		
	}else {
		this.scale.setGameSize(768,960);
	}
}


function Boot() {
}

Boot.prototype = {
  preload: function() {
      this.load.image('preloader', 'assets/preloader.gif');
      this.load.image('cm_logo','assets/cm_logo.png');
      this.game.stage.disableVisibilityChange = true;
  },
  create: function() {
    this.game.input.maxPointers = 1;
    loadSave();
    



    this.game.stage.backgroundColor = '#000000';
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.setScreenSize(true);
    this.game.scale.setResizeCallback(scaleGameSizeUpdate,this.game);
    this.game.state.start('preload');
  }
};


global.level_nr = 5;

global.ALL_level_array = [
[[-98,161,101,156,-116,-158,99,-158],[3,2,0,3,1,0,2,1]],
[[-110,163,139,168,239,27,1,7,-226,43,-15,-162],[3,2,4,3,0,4,5,0,1,5,1,2,0,1]],
[[-167,152,169,149,-9,-182,162,-22,-179,-17],[4,1,3,0,2,3,4,2,0,4,1,0,3,1,4,3]],
[[4,-139,-168,93,-20,148,198,97],[2,0,3,2,0,3,1,0,2,1]],
[[118,46,178,179,40,123,-165,-166],[1,3,1,2,0,1,2,0]],
[[38,-119,-15,46,-152,-58,-78,-170,39,100,100,54,160,126],[5,6,4,5,4,1,3,1,2,3,0,3,1,0,2,1]],
[[80,-3,0,122,-84,-3,165,130,-172,126,0,-135],[5,0,2,5,4,1,2,4,2,1,1,3,0,2,3,0,0,1]],
[[145,-37,-83,136,-147,-38,99,141,4,-147],[3,4,2,3,0,2,1,0,4,1,0,4,3,0,1,3,1,2,4,2]],
[[134,-153,168,-55,-161,16,-72,-165,5,0,17,154,-122,109,166,82],[3,1,7,3,2,7,3,4,0,3,1,0,7,1,5,7,6,5,2,6,4,2]],
[[64,-127,196,-54,-193,60,-202,-65,-60,-136,3,68,-3,-17,196,64,-201,-198,195,-208,-2,179],[10,7,2,10,9,1,0,9,8,4,3,8,6,2,6,5,6,7,6,1,6,0,6,4,3,6,4,3,0,4,1,0,7,1,5,7,2,5,3,2]],

[[6,-88,-137,5,-79,132,125,162,172,44,-139,-196],[1,4,3,2,4,3,0,4,5,0,1,5,1,2,0,1]],
[[-179,157,192,87,178,-176,-194,-130,-93,-32,100,-58],[0,3,5,4,1,4,3,2,4,3,0,4,5,0,1,5,1,2,0,1]],
[[190,-46,154,81,43,167,-96,150,-179,72,-162,-81,-60,-171,79,-168,-47,-5,73,2],[4,1,8,6,0,1,7,0,6,7,9,6,9,2,1,9,2,1,4,3,2,8,3,2,7,3,9,7,5,9,8,5,4,8,5,4,6,5]],
[[54,173,202,174,133,2,152,-176,-100,-175,-200,8,-30,16,-130,100],[4,2,1,2,0,1,2,0,3,2,4,3,4,6,5,4,6,5,7,6,5,7]],
[[-120,157,4,87,119,-12,-5,-85,-104,-40,107,156,193,88,-186,43,-72,-143,75,-139,-130,-205,105,-224,-190,-136,191,-140],[4,2,13,2,3,13,9,11,3,9,8,10,3,8,12,3,4,12,6,1,2,6,5,2,1,5,0,4,1,0,7,1,4,7,3,4,2,3,1,2,4,1]],
[[-180,136,-112,8,4,-75,115,-51,168,100,108,157,-5,120,-36,231,-72,-208,99,-124,-143,-140,-163,-54,52,15,-73,-108,29,-235],[13,8,12,3,9,2,14,9,8,14,1,13,11,1,10,11,8,10,2,8,1,0,2,1,3,2,3,4,5,4,6,5,7,6,0,7]],
[[-51,162,-93,47,3,59,82,-34,190,-44,210,43,106,104,-179,-147,-163,-19,-83,-113,-7,-200,89,-227,152,-150,34,-96],[9,13,7,9,8,7,9,8,10,9,10,11,12,11,13,12,3,13,1,2,1,0,2,0,6,2,4,3,6,5,4,5,2,3]],
[[11,190,-82,140,75,101,-49,6,-6,-83,-73,-136,-29,-237,46,-160,46,-19,202,-20,204,100,130,25,-124,-65,-204,-44,-218,110,-132,47,113,-54],[12,8,13,3,15,12,15,13,3,2,11,8,10,11,9,10,16,9,8,16,15,3,14,15,13,14,12,13,3,12,2,8,0,2,1,0,3,1,8,4,3,8,4,3,6,5,7,6,4,7,5,4]],
[[-13,213,-183,129,-186,-46,-14,35,165,-82,159,106,-9,-203,-97,-7,73,-18,-3,-78,-95,-136,-121,-249,76,-137,64,-245],[0,8,7,0,2,0,4,0,5,4,0,5,0,3,1,0,2,1,13,9,12,13,11,9,10,11,9,12,7,9,9,8,10,9,7,2,3,7,8,3,4,8,12,4,6,12,10,6,2,10]],
[[6,-10,-133,162,128,152,137,-191,-124,-191,8,-200,6,168,-204,-21,194,-13],[2,0,4,0,8,2,3,8,7,1,4,7,5,2,1,5,4,1,3,2,6,3,4,6]],

[[3,194,-200,197,-199,-6,198,198,-2,-8,198,-5,-95,-193,115,-198],[7,5,6,7,2,6,0,2,5,0,3,5,4,3,1,4,2,1]],
[[-54,194,-198,-199,-75,-200,-199,23,193,3,44,190,51,-197,194,-197],[6,7,5,6,4,5,3,4,0,3,2,0,1,2]],
[[-4,175,-4,-42,-110,75,-153,-33,-151,-148,-49,-196,61,-195,129,-132,163,-24,83,77],[1,0,9,1,8,9,1,8,7,1,6,7,1,6,5,1,4,5,1,4,3,2,1,3,2,1]],
[[-130,175,-201,68,-124,0,-94,86,-8,-194,-41,193,3,116,49,193,95,92,156,10,199,97,154,175],[11,8,10,11,9,10,8,9,0,3,1,0,2,1,3,2,8,4,7,8,6,7,5,6,3,5,4,3,4,6]],
[[188,-97,1,-200,-199,-112,-200,190,192,196,195,-16,48,-21,51,127,141,128,133,24,-126,22,-125,138,-40,139,-43,-54,-128,-60],[13,14,12,13,11,12,10,11,9,10,8,9,7,8,6,7,5,6,4,5,3,4,2,3,1,0,2,1,0,2]],
[[-15,-217,-195,-82,-122,14,-8,111,115,9,183,-79,-204,98,-87,198,84,201,185,97,-15,-78],[6,2,7,6,3,7,3,8,9,8,4,9,3,4,3,2,1,0,0,10,5,0,4,5,10,4,2,10,1,2]],
[[-178,69,-25,201,167,151,197,-59,66,-199,-137,-140,7,-91,53,15,-46,95],[8,1,6,4,2,8,7,2,3,7,6,3,4,5,3,4,2,3,1,2,0,1,8,0,7,8,6,7,5,6]],
[[43,187,171,21,-47,195,-182,-14,-142,-164,5,-199,145,-154,-39,-17,50,0,-6,91],[8,6,7,4,5,8,7,5,4,3,5,4,6,5,1,6,9,1,3,9,2,7,0,2,8,0,7,8]],
[[214,-2,21,-85,-94,28,-4,95,187,85,-201,-29,-197,61,61,-172,-120,-157,204,-182,127,-91,97,-3],[11,0,1,11,9,1,8,10,7,9,10,7,10,1,0,10,4,0,3,4,2,3,5,2,6,5,2,6,1,2,7,1,8,7]],
[[-10,192,-185,196,-1,8,-196,13,4,-192,193,-192,198,-18],[2,1,2,5,6,2,5,6,4,5,2,4,2,3,0,2,1,0,3,1]],

[[-3,120,-197,17,-203,-156,-71,-150,-65,2,71,4,77,-147,197,-136,198,23],[6,0,8,0,5,0,3,0,0,4,1,0,5,7,6,8,7,6,8,7,5,8,6,5,1,3,2,4,3,2,4,3,1,4,2,1]],
[[-89,183,53,178,-22,-60,-170,-9,-56,-179,103,-118,92,72,183,-42],[7,6,5,7,6,5,1,6,0,1,3,0,4,3,5,4,2,5,3,2]],
[[-11,191,-197,50,197,52,-197,-185,-1,43,-7,-173,195,-174],[0,2,1,0,1,5,3,4,5,2,4,5,6,4,2,6,4,2,1,4,3,1]],
[[79,150,131,73,-88,157,-148,64,-199,-42,-92,-161,200,-142,206,12],[6,3,5,7,4,6,4,1,7,1,6,7,5,6,4,5,3,4,1,3,0,1,2,0,3,2]],
[[-177,156,88,158,185,47,-18,2,-181,-82,-10,-200,105,-82],[0,5,1,6,3,5,0,1,3,2,2,6,1,2,3,1,6,3,5,6,4,5,4,0,3,4,0,3]],
[[-87,-195,87,-190,-86,8,97,17,-198,198,-198,-83,201,200,188,-86],[4,3,3,7,3,6,2,4,6,7,4,6,5,4,7,1,5,7,0,5,2,1,0,3,1,0,3,1,2,3,0,2]],
[[-9,-194,207,-190,-196,184,196,61,-195,-102,-11,56,50,190,63,-79],[5,4,7,3,1,6,7,1,7,6,4,7,6,3,2,6,0,5,0,4,1,0,3,1,5,3,2,5,4,2]],
[[12,-51,171,-14,-100,183,136,171,-165,-4,22,97,-72,29,82,27,-111,-123,-12,-195,96,-134,-161,-200,109,-211],[12,9,10,12,11,9,8,11,1,0,7,1,3,7,5,3,2,5,6,2,4,6,0,4,9,8,10,9,0,10,8,0]],
[[-158,192,80,188,130,9,34,-32,-97,4,-185,-47,-205,-193,-121,-135,-85,-208,-37,-100,195,-133,187,196,-55,188,85,-201],[4,12,5,9,12,2,0,3,0,4,12,3,1,4,1,2,11,3,2,11,3,2,4,3,2,13,10,2,13,10,4,9,5,4,9,7,8,9,7,8,7,6,5,7,6,5]],
[[179,12,-170,13,98,-186,-171,174,167,175,-72,-180,0,40,-1,129],[7,0,7,1,7,4,3,7,5,0,1,2,3,6,4,0,6,0,1,3,6,1,2,6,5,2,6,5,4,6,3,4]],

[[5,6,-166,-169,191,-180,133,107,-135,104,-8,203,-2,-122,-201,-32,197,-44],[4,3,2,1,6,2,1,6,5,4,5,3,0,5,7,0,7,4,8,0,3,8,6,3,6,4]],
[[0,-113,-76,-62,-93,42,80,-51,81,185,-97,195,82,45,-170,-103,-8,-203,185,-103,-198,36,-214,202,200,45,202,200],[4,13,9,4,0,9,7,0,5,10,2,7,3,9,6,9,4,12,3,12,11,2,1,10,6,4,3,6,0,3,1,0,2,1,5,2,12,13,9,12,8,9,7,8,10,7,11,10]],
[[130,-123,-184,60,-73,91,178,35,101,190,-114,192,63,93,-141,-145,-8,-203,-66,-90,44,-73,-17,-1],[2,4,10,3,9,1,11,3,11,1,11,6,7,0,9,7,10,0,11,2,10,9,11,10,9,11,3,6,0,3,8,0,7,8,1,7,2,1,4,5,6,4,2,6,5,2]],
[[170,-139,-126,127,16,124,19,-3,143,31,171,165,-80,-51,-5,-96,-146,-156,-207,-56,7,-195],[4,2,7,4,6,2,3,6,7,3,6,7,10,8,0,10,4,0,5,4,2,5,1,2,9,1,8,9]],
[[94,-167,-86,-167,-91,183,-89,70,91,186,92,64,-79,-51,91,-56],[0,6,1,7,5,6,3,7,5,3,2,5,4,3,5,4,7,5,0,7,6,1,3,6,2,3]],
[[69,-186,-54,-180,135,60,-118,48,-192,-61,205,-57,-171,178,175,177,10,106,-178,-179,197,-181],[0,5,4,1,8,10,9,8,10,5,0,10,9,4,9,1,0,2,1,3,3,5,4,2,7,8,2,7,5,2,8,0,1,8,6,8,3,6,4,3]],
[[97,-190,-108,-181,-196,-100,-21,174,191,-75,3,-63,-182,21,173,32],[7,0,5,7,4,5,3,0,1,3,6,1,2,5,6,5,7,3,4,7,0,4,5,0,1,5,2,1,6,2,3,6]],
[[151,-187,-33,-58,179,32,-30,183,-130,-202,90,-66,20,54,-206,-41],[1,2,6,1,5,2,0,1,2,0,3,2,3,1,6,7,5,6,4,5,7,4]],
[[151,-189,-37,-190,-199,-72,-117,196,56,191,196,91,-22,51,11,-85],[4,7,0,4,7,2,7,0,6,3,5,0,7,5,7,6,1,7,1,0,4,3,5,4,6,5,2,6,1,2]],
[[191,-186,-4,-206,-113,-95,-4,29,187,40,-205,34,98,180,-114,182,107,-78,-197,-195],[9,2,9,5,7,6,2,7,3,5,2,3,5,2,7,5,3,7,6,3,3,4,6,8,4,6,4,8,0,4,1,0,8,0,8,1,1,3,2,8,1,2]]
];

module.exports = Boot;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    
  },
  update: function () {
    
  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

'use strict';  
var FloatingButton = require('../prefabs/floatingButton');
var Lvl_button = require('../prefabs/lvl_button');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },

  create: function() {
    
    this.background = this.game.add.tileSprite(0,0,2304,1003,'background');

    

    this.game.world.setBounds(0, 0, 2400, 1500);
    if (music == null) {
      music = this.game.add.sound('',1, true);
      music.volume = 0;
      
      if (savegame_SFX) {
        music.play();
      }
      
    }


    this.game.camera.x = camera_pos_x;
    this.game.stage.backgroundColor = '#062438';


    this.logo = this.game.add.group();

    this.logo_star_back = this.game.add.image(134,-61,'logo_star_back');
    this.logo_star_back.anchor.setTo(0.5,0.5);
    this.logo_txt = this.game.add.image(0,0,'logo');
    this.logo_txt.anchor.setTo(0.5,0.5);
    this.logo_star_front = this.game.add.image(134,-61,'logo_star_front');
    this.logo_star_front.anchor.setTo(0.5,0.5);
    this.logo.add(this.logo_star_back);
    this.logo.add(this.logo_txt);
    this.logo.add(this.logo_star_front);
    
    this.logo.x = 384;
    this.logo.y = this.game.height * 0.25;

    this.playButton =  new FloatingButton(this.game,224,0.7,'b_play',this.playButtonClick);
    this.game.add.existing(this.playButton);

    this.musicButton = new FloatingButton(this.game,544,0.7,'b_music',this.musicButtonClick);
    this.game.add.existing(this.musicButton);
    if (savegame_SFX == false) this.musicButton.alpha = 0.3;

    
    this.lvl_page_1 = this.game.add.group();

    var lvl_numb_temp = 0;
    for (var row = 0; row < 5; row++) {
      for (var collumn = 0; collumn < 5; collumn++) {

        var lvl = new Lvl_button(this.game, (123*collumn), (123*row),lvl_numb_temp,this.lvlButtonClick);
        lvl_numb_temp++;

        this.lvl_page_1.add(lvl);

      }
    }

    this.lvl_page_1.x = 878;
    this.lvl_page_1.y = 120;
    
    
    this.lvl_page_2 = this.game.add.group();

    for (var row = 0; row < 5; row++) {
      for (var collumn = 0; collumn < 5; collumn++) {

        var lvl = new Lvl_button(this.game, (123*collumn), (123*row),lvl_numb_temp,this.lvlButtonClick);
        lvl_numb_temp++;

        this.lvl_page_2.add(lvl);

      }
    }

    this.lvl_page_2.x = 878+768;
    this.lvl_page_2.y = 120;


    this.buttons_group = this.game.add.group();




    this.margin_button = 128;
    this.prev_button = this.game.add.button(768+this.margin_button,0,'gui_next', this.moveCameraToZero, this);
    this.prev_button.anchor.setTo(0.5,0.5);
    this.prev_button.scale.x = -1;
    this.buttons_group.add(this.prev_button);

    this.prev2_button = this.game.add.button(768+768+this.margin_button,0,'gui_next', this.moveCameraToOne, this);
    this.prev2_button.anchor.setTo(0.5,0.5);
    this.prev2_button.scale.x = -1;
    this.buttons_group.add(this.prev2_button);


    this.next_button = this.game.add.button(768+768-this.margin_button,0,'gui_next', this.moveCameraToTwo, this);
    this.next_button.anchor.setTo(0.5,0.5);
    this.buttons_group.add(this.next_button);

    this.buttons_group.y = this.game.height*0.9;

    this.more_games = this.game.add.button(384,this.game.height*0.92,'more_games_spr',this.moregames_button);
    this.more_games.anchor.setTo(0.5,0.5);


    this.spr_bg = this.game.add.graphics(0, 0);
    this.spr_bg.beginFill(this.fadeColor, 1);
    this.spr_bg.drawRect(0, 0, this.game.width, this.game.height);
    this.spr_bg.alpha = 1;
    this.spr_bg.endFill();
    this.spr_bg.fixedToCamera = true;

    this.game.add.tween(this.spr_bg).to({alpha: 0}, 600, Phaser.Easing.Linear.NONE, true);


    this.scale.onSizeChange.add(this.resize_layout, this);
    
    try{analytics.menu()}
    catch (a) {
      console.log("CANT FIND analytics.menu");
    };
  



    

  },

  update: function() {

    this.logo_star_back.angle += 0.5;
    this.logo_star_front.angle += 0.5;
    
  },

  resize_layout: function() {
    this.buttons_group.y = this.game.height*0.9;
    var y_offset = (this.game.height-960)*0.45;
    this.lvl_page_2.y = 120+y_offset;
    this.lvl_page_1.y = 120+y_offset;
    this.logo.y = this.game.height * 0.25;
    this.more_games.y = this.game.height * 0.92;



  },


  playButtonClick: function() {
      if (savegame_SFX) this.game.sound.play('click_sfx');
      this.game.add.tween(this.game.camera).to({x: 768}, 700, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
  },

  musicButtonClick: function() {
    
    if (savegame_SFX) this.game.sound.play('click_sfx');

    savegame_SFX = !savegame_SFX;

    if (savegame_SFX) {

      this.game.add.tween(this).to({alpha: 1}, 500,Phaser.Easing.Linear.NONE, true, 0, 0, false);
      music.play();

    }else {
      music.stop();
      this.game.add.tween(this).to({alpha: 0.3}, 500,Phaser.Easing.Linear.NONE, true, 0, 0, false);

    }


    saveSFX();
  },

  lvlButtonClick: function() {
    if (this.unlocked) {
      if (savegame_SFX) this.game.sound.play('click_sfx');
      level_nr = this.number;
      this.game.state.getCurrentState().fadeToPlay();
    }
  },

  fadeToPlay: function() {

      var s = this.game.add.tween(this.spr_bg).to({alpha: 1}, 600, Phaser.Easing.Linear.NONE, true, 0, 0, false);
      s.onComplete.add(this.goToPlay, this);
  },

  goToPlay: function() {
    this.game.state.start('play');
  },

  moveCameraToZero: function() {
    if (savegame_SFX) this.game.sound.play('click_sfx');
    this.game.add.tween(this.game.camera).to({x: 0}, 700, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
  },

  moveCameraToOne: function() {
    if (savegame_SFX) this.game.sound.play('click_sfx');
    this.game.add.tween(this.game.camera).to({x: 768}, 700, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
  },

  moveCameraToTwo: function() {
    if (savegame_SFX) this.game.sound.play('click_sfx');
    this.game.add.tween(this.game.camera).to({x: 1536}, 700, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
  },

  moregames_button: function() {
//    moregames.redirect();
  },

  shutdown: function() {
    this.spr_bg.destroy();
    this.lvl_page_2.destroy();
    this.lvl_page_1.destroy();
    this.logo.destroy();
    this.playButton.destroy();
    this.musicButton.destroy();
    this.prev_button.destroy();
    this.prev2_button.destroy();
    this.next_button.destroy();
  }


};

module.exports = Menu;

},{"../prefabs/floatingButton":2,"../prefabs/lvl_button":4}],9:[function(require,module,exports){
(function (global){

  'use strict';
  var Star = require('../prefabs/star');
  var Line = require('../prefabs/line');
  var Play = function() {}
  Play.prototype = {
    
    create: function() {

      marimba_notes_index = 0;
      marimba_notes_dir = 1;

      


      this.background = this.game.add.image(0,0,'background');


      this.win = false;
      this.star_shadow_group = this.game.add.group();
      this.line_shadow_group = this.game.add.group();
      this.line_group = this.game.add.group();
      this.star_group = this.game.add.group();

      global.marker = this.game.add.image(0,0,'star_marker_spr');
      marker.anchor.setTo(0.5,0.5);
      marker.alpha = 0;


      global.active_nod = null;
      global.reseting = false;
      
      this.puzzle_nr = level_nr;
      
      if (this.puzzle_nr < 5) {
        this.connect_txt = this.game.add.image(384,this.game.height * 0.05,'connect_spr');
        this.connect_txt.anchor.setTo(0.5,0.5);
      }

      if (this.puzzle_nr < 25) {
        camera_pos_x = 768;
      }else {
        camera_pos_x = 1536;
      }
      var level_array = global.ALL_level_array[global.level_nr];

      this.parse_level(this,level_array);

      this.gui_buttons = this.game.add.group();
      this.gui_levels = this.game.add.button(40,0,'gui_levels',this.button_backToLevels, this);
      this.gui_levels.anchor.setTo(0.5,0.5);
      this.gui_buttons.add(this.gui_levels);
      this.gui_music = this.game.add.button(168,0,'gui_music',this.button_music, this);
      this.gui_music.anchor.setTo(0.5,0.5);
      if (!global.savegame_SFX) this.gui_music.alpha = 0.3;
      this.gui_buttons.add(this.gui_music);
      this.gui_restart = this.game.add.button(296,0,'gui_reset',this.button_restart, this);
      this.gui_restart.anchor.setTo(0.5,0.5);
      this.gui_buttons.add(this.gui_restart);
      this.gui_buttons.y = this.game.height * 0.9;
      this.gui_buttons.x = 40;
      

      


      this.scale.onSizeChange.add(this.resize_layout, this);


      this.spr_bg = this.game.add.graphics(0, 0);
      this.spr_bg.beginFill(this.fadeColor, 1);
      this.spr_bg.drawRect(0, 0, this.game.width, this.game.height);
      this.spr_bg.alpha = 1;
      this.spr_bg.endFill();

      this.game.add.tween(this.spr_bg).to({alpha: 0}, 600, Phaser.Easing.Linear.NONE, true);

    },

    resize_layout: function() {

      if (this.game.height > 960) {
        var offset_y = (this.game.height-960) * 0.45;
        this.star_group.y = offset_y;
        this.star_shadow_group.y = offset_y;
        this.line_group.y = offset_y;
        this.line_shadow_group.y = offset_y;
      }else {
        this.star_group.y = 0;
        this.star_shadow_group.y = 0;
        this.line_group.y = 0;
        this.line_shadow_group.y = 0;
      }

      this.gui_buttons.y = this.game.height - 140;

    },

    update: function() {



    }, 
    
    fadeToPlay: function() {

      
      var s = this.game.add.tween(this.spr_bg).to({alpha: 1}, 600, Phaser.Easing.Linear.NONE, true, 0, 0, false);
      s.onComplete.add(this.goToPlay, this);
    },

    fadeToMenu: function() {

        
        var s = this.game.add.tween(this.spr_bg).to({alpha: 1}, 600, Phaser.Easing.Linear.NONE, true, 0, 0, false);
        s.onComplete.add(this.goToMenu, this);
    },

    goToMenu: function() {
    this.game.state.start('menu');
    },

    goToPlay: function() {
    this.game.state.restart();
    },

    parse_level: function(context, array) {
      var level_stars = array[0];
    
      var level_lines = array[1];
      var centerX = 384;
      var centerY = 400;
      var star_number = 0;


      for (var i = 0; i < level_stars.length; i+= 2) {
        
        var new_star = new Star(context.game,centerX+(level_stars[i]*1.3),centerY+(level_stars[i+1]*1.3),context.starClick,star_number);
        star_number++;
        this.star_group.add(new_star);
        var shadow = new Phaser.Image(context.game,centerX+(level_stars[i]*1.3),centerY+(level_stars[i+1]*1.3)+20,'star_shadow_spr');
        shadow.anchor.setTo(0.5,0.5);
        context.star_shadow_group.add(shadow);
      }

      for (var j = 0; j < level_lines.length; j+= 2) {
        

        var star_1 = context.star_group.getChildAt(level_lines[j]);
        var star_2 = context.star_group.getChildAt(level_lines[j+1]);

        star_1.lines++;
        star_1.default_lines++;
        star_2.lines++;
        star_2.default_lines++;

        var rotation = Phaser.Math.angleBetween(star_1.x,star_1.y,star_2.x,star_2.y);
        
        var width = Phaser.Math.distance(star_1.x,star_1.y,star_2.x,star_2.y);

        var new_line = new Line(context.game, star_1.x,star_1.y, rotation, width, star_1.number,star_2.number);
        
        var line_shadow = new Phaser.Image(context.game,star_1.x,star_1.y+15,'line_shadow_spr');
        line_shadow.width = new_line.width;
        line_shadow.rotation = new_line.rotation;
        

        context.line_shadow_group.add(line_shadow);
        context.line_group.add(new_line);
        



      }
      

    },

    starClick: function() {

      if (this.game.time.events.length > 0) return;

      var game = this.game;
      var current_state = game.state.getCurrentState();
      
      if(current_state.win) return;

      if (active_nod == null) {
        current_state.play_marimba_note();
        marker.alpha = 1;
        marker.x = this.x;
        marker.y = this.y;
        active_nod = this;
        return;
      }

      if (active_nod == this) {
        return;
      }

      var line = current_state.checkLine(active_nod.number, this.number,this.game.state.getCurrentState());

      if (line != null) {
        line.pass();
        active_nod.lines--;
        this.lines--;

        marker.x = this.x;
        marker.y = this.y;
        active_nod = this;
        current_state.play_marimba_note();
      }

      if (this.lines == 0) {
        var all_lines_passed = true;
        for (var i = 0; i < current_state.line_group.length; i++) {
          var line = current_state.line_group.getChildAt(i);
          if (line.passed == false) {
            all_lines_passed = false;
            break
          }
        }

        if (all_lines_passed) {
          current_state.winLevel();
        }else {
          
        
          this.game.time.events.add(Phaser.Timer.SECOND*0.5, current_state.restartLevel, current_state);
          this.game.time.events.add(Phaser.Timer.SECOND*0.75, current_state.failSound, current_state);

        }

      }
    },

    checkLine: function(end_1,end_2,context) {

      var context = context;
      
      for (var i = 0; i < context.line_group.length; i++) {
        var line = context.line_group.getChildAt(i);
        if (line.ends.indexOf(end_1) != -1 && line.ends.indexOf(end_2) != -1 && !line.passed) {
          return line;
        }

      }
      

      return null;


    }, failSound: function() {
      if (savegame_SFX) this.game.sound.play('fail_sfx');
    },

    restartLevel: function() {
      
      for (var i = 0; i < this.line_group.length; i++) {
        var line = this.line_group.getChildAt(i);
        
        line.restart();
      }
      for (var j = 0; j < this.star_group.length; j++) {
        var star = this.star_group.getChildAt(j);
        star.restart();
      }

      marimba_notes_index = 0;
      marimba_notes_dir = 1;

      active_nod = null;  
      this.game.add.tween(marker).to({alpha: 0},500,Phaser.Easing.Linear.NONE, true, 0, 0, false);
    },

    winLevel: function() {
      if (savegame_SFX) this.game.sound.play('win_sfx');
      savePassLevel(level_nr);
      
      this.win = true;
      this.game.add.tween(this.gui_restart).to({alpha: 0},500,Phaser.Easing.Linear.NONE, true, 0, 0, false);
      this.game.add.tween(marker).to({alpha: 0},500,Phaser.Easing.Linear.NONE, true, 0, 0, false);

      
      for (var i = 0; i < this.star_group.length; i++) {

        var star = this.star_group.getChildAt(i);
        star.shine();

      }

      this.game.add.tween(this.star_shadow_group).to({alpha: 0}, 500, Phaser.Easing.Linear.NONE, true, 0, 0, false);

      
      if (this.puzzle_nr < 49) {
      this.nextLevel_button = this.game.add.button(768-148,0,'gui_next',this.button_nextLevel, this);
      this.nextLevel_button.anchor.setTo(0.5,0.5);
      this.gui_buttons.add(this.nextLevel_button);
      this.game.add.tween(this.nextLevel_button).to({width: 137, height: 157}, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
      }

//      adSense.showAdvertising();
  //    analytics.level(this.puzzle_nr);

    },

    button_backToLevels: function() {
      if (savegame_SFX) this.game.sound.play('click_sfx');
      this.fadeToMenu();

    },

    button_music: function() {

      if (savegame_SFX) this.game.sound.play('click_sfx');

      savegame_SFX = !savegame_SFX;

      if (savegame_SFX) {

      this.game.add.tween(this.gui_music).to({alpha: 1}, 500,Phaser.Easing.Linear.NONE, true, 0, 0, false);
      music.play();

      }else {

      this.game.add.tween(this.gui_music).to({alpha: 0.3}, 500,Phaser.Easing.Linear.NONE, true, 0, 0, false);
      music.stop();
      }


    saveSFX();

    },

    button_nextLevel: function() {

      
      if (savegame_SFX) this.game.sound.play('click_sfx');
      level_nr = this.puzzle_nr+1;
      this.fadeToPlay();






    },

    button_restart: function() {
      if (!this.win) {
        if (savegame_SFX) this.game.sound.play('click_sfx');
        this.restartLevel();
      }
    },

    shutdown: function() {
      this.spr_bg.destroy();
      this.star_group.destroy();
      this.star_shadow_group.destroy();
      this.line_group.destroy();
      this.line_shadow_group.destroy();
      this.gui_buttons.destroy();
    },


    play_marimba_note: function() {
      if (savegame_SFX) {

        this.game.sound.play(marimba_notes[marimba_notes_index]);

        

        marimba_notes_index += marimba_notes_dir;

        if (marimba_notes_index < 0 || marimba_notes_index == marimba_notes.length) {
          marimba_notes_index = this.game.math.clamp(marimba_notes_index,1,marimba_notes.length-2);
          marimba_notes_dir *= -1;
        }
      }
    }


    
  };
  
  module.exports = Play;
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../prefabs/line":3,"../prefabs/star":5}],10:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.cm_logo = this.game.add.image(this.game.width/2, this.game.height*0.40,'cm_logo');
    this.cm_logo.anchor.setTo(0.5,1);
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background','assets/bg.png');
    this.load.image('logo','assets/logo.png');
    this.load.image('logo_star_back','assets/logo_star_back.png');
    this.load.image('logo_star_front','assets/logo_star_front.png');
    this.load.image('b_music','assets/b_music.png');
    this.load.image('b_play','assets/b_play.png');

    this.load.image('star_spr','assets/star_spr.png');
    this.load.image('star_shadow_spr','assets/star_shadow_spr.png');
    this.load.image('star_mini_spr','assets/star_mini_spr.png');

    this.load.image('line_0_spr','assets/line_0_spr.png');
    this.load.image('line_1_spr','assets/line_1_spr.png');
    this.load.image('line_shadow_spr','assets/line_shadow_spr.png');
    this.load.image('star_marker_spr','assets/star_marker_spr.png');

    this.load.image('gui_levels','assets/gui_levels.png');
    this.load.image('gui_music','assets/gui_music.png');
    this.load.image('gui_next','assets/gui_next.png');
    this.load.image('gui_reset','assets/gui_reset.png');

    this.load.image('lvl_spr','assets/lvl_spr.png');
    this.load.image('connect_spr', 'assets/connect_spr.png');
    this.load.image('lvl_locked_spr', 'assets/lvl_locked_spr.png');
    this.load.spritesheet('lvl_complete_spr', 'assets/lvl_complete_spr.png', 75, 75);
    this.load.image('more_games_spr','assets/more_games_spr.png');

    this.load.bitmapFont('font_lvl','assets/font_lvl.png','assets/font_lvl.fnt');

    this.load.audio('a2_sfx',['assets/a2_sfx.mp3', 'assets/a2_sfx.ogg']);
    this.load.audio('a3_sfx',['assets/a3_sfx.mp3', 'assets/a3_sfx.ogg']);
    this.load.audio('c1_sfx',['assets/c1_sfx.mp3', 'assets/c1_sfx.ogg']);
    this.load.audio('c2_sfx',['assets/c2_sfx.mp3', 'assets/c2_sfx.ogg']);
    this.load.audio('c3_sfx',['assets/c3_sfx.mp3', 'assets/c3_sfx.ogg']);
    this.load.audio('click_sfx',['assets/click_sfx.mp3', 'assets/click_sfx.ogg']);
    this.load.audio('d1_sfx',['assets/d1_sfx.mp3', 'assets/d1_sfx.ogg']);
    this.load.audio('d2_sfx',['assets/d2_sfx.mp3', 'assets/d2_sfx.ogg']);
    this.load.audio('d3_sfx',['assets/d3_sfx.mp3', 'assets/d3_sfx.ogg']);
    this.load.audio('e1_sfx',['assets/e1_sfx.mp3', 'assets/e1_sfx.ogg']);
    this.load.audio('e2_sfx',['assets/e2_sfx.mp3', 'assets/e2_sfx.ogg']);
    this.load.audio('e3_sfx',['assets/e3_sfx.mp3', 'assets/e3_sfx.ogg']);
    this.load.audio('f1_sfx',['assets/f1_sfx.mp3', 'assets/f1_sfx.ogg']);
    this.load.audio('f2_sfx',['assets/f2_sfx.mp3', 'assets/f2_sfx.ogg']);
    this.load.audio('fail_sfx',['assets/fail_sfx.mp3', 'assets/fail_sfx.ogg']);
    this.load.audio('g1_sfx',['assets/g1_sfx.mp3', 'assets/g1_sfx.ogg']);
    this.load.audio('g2_sfx',['assets/g2_sfx.mp3', 'assets/g2_sfx.ogg']);
    this.load.audio('h2_sfx',['assets/h2_sfx.mp3', 'assets/h2_sfx.ogg']);
    this.load.audio('h3_sfx',['assets/h3_sfx.mp3', 'assets/h3_sfx.ogg']);
    this.load.audio('music_sfx',['assets/music_sfx.mp3', 'assets/music_sfx.ogg']);
    this.load.audio('win_sfx',['assets/win_sfx.mp3', 'assets/win_sfx.ogg']);

  },


  create: function() {
    this.asset.cropEnabled = false;
  },

  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])