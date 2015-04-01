window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;

		this.player = new window.Player(this.el.find('.Player'), this);
		this.titans = new window.Titans(this.el.find('.T1'),
			this.el.find('.T2'),
			this.el.find('.T3'),
			this.el.find('.T4'),
			this);

		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);

		var startEl = this.el.find('.Startboard');
		startEl
			.addClass('is-visible')
			.find('.Startboard-start')
			.one('click', function() {
				start.removeClass('is-visible');
				that.start();
			});
	};

	Game.prototype.score = 0;

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;

		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.titans.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();
		if (!mutemusic) {
			document.getElementById('themesong').play();
		}
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;

		window.requestAnimationFrame(this.onFrame);

		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.titans.reset();
		this.score = 0;
		$(".removeScore").remove();

	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		document.getElementById('themesong').pause();
		document.getElementById('deathsound').play();
		$('.score').append("<p>" + this.score + "</p>");
		$('.score p').addClass("removeScore");
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
			.one('vmousedown', function() {
				scoreboardEl.removeClass('is-visible');
				that.start();
			});
			
			// $(window).keypress(function(e) {
			// 	if(e.which == 13) {
			// 		scoreboardEl.removeClass('is-visible');
			// 		that.start();
			// 	}
			// });
	};

	var mute = false;
	$('#mutebutton').on('tap', function(e) {
		var jumpsound = document.getElementById('jumpsound');
		var deathsound = document.getElementById('deathsound');
		var themesong = document.getElementById('themesong');
		if (!mute) {
			$('#mutebutton').css('background-image', 'url(styles/Images/unmute.png)');
			mute = true;
			if (!mutemusic) {
				themesong.muted = true;
			}
			jumpsound.muted = true;
			deathsound.muted = true;
		} else {
			$('#mutebutton').css('background-image', 'url(styles/Images/mute.png)');
			mute = false;
			if (mutemusic) {
				themesong.muted = false;
			}
			themesong.muted = false;
			jumpsound.muted = false;
			deathsound.muted = false;
		}
	});


	var mutemusic = false;
	$('#mutemusic').on('tap',function(e) {
		var themesong = document.getElementById('themesong');
		if (!mutemusic) {
			themesong.pause();
			$('#mutemusic').css('background-image', 'url(styles/Images/unmutemusic.png)');
			mutemusic = true;
		} else {
			themesong.play();
			$('#mutemusic').css('background-image', 'url(styles/Images/mutemusic.png)');
			mutemusic = false;
		}
	});
	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = $(window).width() / 10;
	Game.prototype.WORLD_HEIGHT = $(window).height() / 10;
	$(window).resize(function() {
		Game.prototype.WORLD_WIDTH = $(window).width() / 10;
		Game.prototype.WORLD_HEIGHT = $(window).height() / 10;
	});
	return Game;
})();