$( document ).ready(function() {
	window.Player = (function() {
		'use strict';

		var Controls = window.Controls;

		// All these constants are in em's, multiply by 10 pixels
		// for 1024x576px canvas.
		var SPEED = 30; // * 10 pixels per second
		var WIDTH = 5;
		var HEIGHT = ($('#ground').height() / 10) + 4;

		var JUMP_UP = 8;
		var FALL_DOWN = 0.1;

		var Player = function(el, game) {
			this.el = el;
			this.game = game;
			this.pos = {
				x: 0,
				y: 0
			};
		};

		Player.prototype.gravitySpeed = FALL_DOWN;
		Player.prototype.rotate = 0; 

		/**
		 * Resets the state of the player for a new game.
		 */
		Player.prototype.reset = function() {
			this.pos.x = 0.2*this.game.WORLD_WIDTH;
			this.pos.y = 0.4*this.game.WORLD_HEIGHT;
		};

		Player.prototype.onFrame = function(delta) {

			if (Controls.keys.space && Controls._didJump) {
				Game.isPlaying = true;
				
				this.pos.y -= JUMP_UP;

				var jumpsound = document.getElementById('jumpsound');
				jumpsound.src = "pew.mp3";
				jumpsound.volume = 0.5;
				jumpsound.play();
				jumpsound.loop = false;
				this.rotate = -30;
				this.gravitySpeed = FALL_DOWN;
				Controls.didJump();
			}

			if (!Controls._didJump && Game.isPlaying) {
				this.pos.y += this.gravitySpeed;
				this.gravitySpeed += 0.025;
				if(this.rotate <= 70) {
					this.rotate += 0.5;
				}
			}

			this.checkCollisionWithBounds();
			this.checkCollisionWithTitan();

			// Update UI
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.rotate + 'deg)');
		};

		Player.prototype.checkCollisionWithBounds = function() {
			if (this.pos.x < 0 ||
				this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
				this.pos.y < 0 ||
				this.pos.y + HEIGHT > (this.game.WORLD_HEIGHT)	) {
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
			$('#ground').map(function() {
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
});
