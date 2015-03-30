window.Titans = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 12;

	var INITIAL_POSITION_BOT_X = 105;
	var INITIAL_POSITION_BOT_Y = 0;

	var INITIAL_POSITION_TOP_X = 80;
	var INITIAL_POSITION_TOP_Y = 50;

	var Titans = function(el1, el2, el3, el4, game) {

		this.TitanOne = {
			titanBot: el1,
			titanTop: el2,
			pos: {
				x: 0,
				y: 0
			}
		}

		this.TitanTwo = {
			titanBot: el3,
			titanTop: el4,
			pos: {
				x: 0,
				y: 0
			}
		}
		this.game = game;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Titans.prototype.reset = function() {
		this.TitanOne.pos.x = INITIAL_POSITION_BOT_X;
		this.TitanOne.pos.y = INITIAL_POSITION_BOT_Y;
	};

	Titans.prototype.onFrame = function(delta) {
this.TitanOne.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanOne.pos.x + 'em, ' + this.TitanOne.pos.y + 'em)');
		if(Game.isPlaying) {
			this.TitanOne.pos.x -= delta * SPEED;
			this.TitanOne.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanOne.pos.x + 'em, ' + this.TitanOne.pos.y + 'em)');
			this.TitanOne.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanOne.pos.x + 'em, ' + 0 + 'em)');

		}

		// this.TitanTwo.pos.x -= delta * SPEED;
		// this.TitanTwo.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanTwo.pos.x + 'em, ' + 0 + 'em)');
		// this.TitanTwo.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanTwo.pos.x + 'em, ' + 0 + 'em)');
	};

	return Titans;
})();






