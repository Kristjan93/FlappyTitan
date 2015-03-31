window.Titans = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 12;
	var PLAYER_X_POS = 0.2*($(window).width() / 10);

	var INITIAL_POSITION_X =  ($(window).width() / 10);

	var INITIAL_POSITION_BOT_Y = 37;
	var INITIAL_POSITION_TOP_Y = 0;

	var Titans = function(el1, el2, el3, el4, game) {

		this.TitanOne = {
			turnedOn: true,
			titanBot: el1,
			titanTop: el2,
			posBot: {
				x: 0,
				y: 0
			},
			posTop: {
				x: 0,
				y: 0
			}
		}

		this.TitanTwo = {
			turnedOn: false,
			titanBot: el3,
			titanTop: el4,
			posBot: {
				x: 0,
				y: 0
			},
			posTop: {
				x: 0,
				y: 0
			}		
		}

		this.game = game;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Titans.prototype.resetTitanOne = function() {
		//Titan tree
		this.TitanOne.posBot.x = INITIAL_POSITION_X;
		this.TitanOne.posBot.y = INITIAL_POSITION_BOT_Y;
		this.TitanOne.posTop.x = INITIAL_POSITION_X;
		this.TitanOne.posTop.y = INITIAL_POSITION_TOP_Y;
		this.TitanOne.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanOne.posTop.x + 'em, ' + this.TitanOne.posTop.y + 'em)');
		this.TitanOne.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanOne.posBot.x + 'em, ' + this.TitanOne.posBot.y + 'em)');
	};

	Titans.prototype.resetTitanTwo = function() {
		//Titan Two
		this.TitanTwo.posBot.x = INITIAL_POSITION_X;
		this.TitanTwo.posBot.y = INITIAL_POSITION_BOT_Y;
		this.TitanTwo.posTop.x = INITIAL_POSITION_X;
		this.TitanTwo.posTop.y = INITIAL_POSITION_TOP_Y;
		this.TitanTwo.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posTop.x + 'em, ' + this.TitanTwo.posTop.y + 'em)');
		this.TitanTwo.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posBot.x + 'em, ' + this.TitanTwo.posBot.y + 'em)');
	};

	Titans.prototype.onFrame = function(delta) {

		if(Game.isPlaying) {

			if(this.TitanOne.posTop.x < PLAYER_X_POS) {
				this.TitanTwo.turnedOn = true;
			}

			if(this.TitanTwo.posTop.x < PLAYER_X_POS) {
				this.TitanOne.turnedOn = true;
			}

			if(this.TitanOne.posTop.x < -10) {
				this.TitanOne.turnedOn = false;
				this.resetTitanOne();
			}

			if(this.TitanTwo.posTop.x < -10) {
				this.TitanTwo.turnedOn = false;
				this.resetTitanTwo();
			}

			if(this.TitanOne.turnedOn) {
				this.TitanOne.posTop.x -= delta * SPEED;
				this.TitanOne.posBot.x -= delta * SPEED;
				this.TitanOne.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanOne.posTop.x + 'em, ' + this.TitanOne.posTop.y + 'em)');
				this.TitanOne.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanOne.posBot.x + 'em, ' + this.TitanOne.posBot.y + 'em)');
			}

			if(this.TitanTwo.turnedOn) {
				this.TitanTwo.posTop.x -= delta * SPEED;
				this.TitanTwo.posBot.x -= delta * SPEED;
				this.TitanTwo.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posTop.x + 'em, ' + this.TitanTwo.posTop.y + 'em)');
				this.TitanTwo.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posBot.x + 'em, ' + this.TitanTwo.posBot.y + 'em)');
			}
		}
	};

	return Titans;
})();






