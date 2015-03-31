	window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 12;
	var INITIAL_POSITION_X = 5;
	var INITIAL_POSITION_Y = 25;

	var JUMP_UP = 8;
	var FALL_DOWN = 0.4;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = {
			x: 0,
			y: 0
		};
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {

		if (Controls.keys.space && Controls._didJump) {
			Game.isPlaying = true;
			this.pos.y -= JUMP_UP;
			Controls.didJump();
		}

		if (!Controls._didJump && Game.isPlaying) {
			this.pos.y += FALL_DOWN;
		}

		this.checkCollisionWithBounds();
		this.checkCollisionWithTitan();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			Game.isPlaying = false;
			return this.game.gameover();
		}
	};

	//This function need a helper function caled overlaps
	//it users jquery to check if player touched the titans
	Player.prototype.checkCollisionWithTitan = function() {
		var didTouch = false;
		Player = $('.Player')[0];
		$('.Titan').map(function() {
			if (overlaps(Player, this)) {
				didTouch = true;
			}
		});
		if (didTouch) {
			Game.isPlaying = false;
			return this.game.gameover();
		}
	};
	return Player;
})();
