$( document ).ready(function() {
    window.Game = (function() {
        'use strict';

        /**
         * Main game class.
         * @param {Element} el jQuery element containing the game.
         * @constructor
         */
        var Game = function(el) {
            this.el = el;
            // Initialize the Player and the columns he will try to avoid
            this.player = new window.Player(this.el.find('.Player'), this);
            this.titans = new window.Titans(this.el.find('.T1'),
                this.el.find('.T2'),
                this.el.find('.T3'),
                this.el.find('.T4'),
                this);

            this.isPlaying = false;

            // Cache a bound onFrame since we need it each frame.
            this.onFrame = this.onFrame.bind(this);
        };

        // Keep track of the player's score
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
            // Continues themesong if player hasn't muted it by now 
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

            // Give the player his respective score for the session
            $('.score').append("<p>" + this.score + "</p>");
            $('.score p').addClass("removeScore");

            // Make the Scoreborad appear and dismiss it with a click or tap
            var that = this;
            var scoreboardEl = this.el.find('.Scoreboard');
            scoreboardEl
                .addClass('is-visible')
                .find('.Scoreboard-restart')
                .one('tap', function() {
                    scoreboardEl.removeClass('is-visible');
                    that.start();
                });
        };

        /*
         * A function which mutes all the sounds in the game by the click/tap of an icon
         */
        var mute = false;
        $('#mutebutton').on('tap', function(e) {
            
            // Retrieve the game sound elements
            var jumpsound = document.getElementById('jumpsound');
            var deathsound = document.getElementById('deathsound');
            var themesong = document.getElementById('themesong');

            if (!mute) {

                // change the mute icon to unmute
                $('#mutebutton').css('background-image', 'url(styles/Images/unmute.png)');
                mute = true;

                // if we haven't muted the music yet mute it
                if (!mutemusic) {
                    themesong.muted = true;
                }

                // mute the rest of the sounds
                jumpsound.muted = true;
                deathsound.muted = true;
            } else {

                // change the unmute icon to mute
                $('#mutebutton').css('background-image', 'url(styles/Images/mute.png)');
                mute = false;
                if (mutemusic) {
                    themesong.muted = false;
                }
                // unmute the rest of the sounds
                themesong.muted = false;
                jumpsound.muted = false;
                deathsound.muted = false;
            }
        });

        /**
         * A function which mutes only the music in the game, well it actually pauses it
         * very much the same lo
         */
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
         * Some shared constants. And a function that modifies them whenever the window resizes
         */
        Game.prototype.WORLD_WIDTH = $(window).width() / 10;
        Game.prototype.WORLD_HEIGHT = $(window).height() / 10;
        $(window).resize(function() {
            Game.prototype.WORLD_WIDTH = $(window).width() / 10;
            Game.prototype.WORLD_HEIGHT = $(window).height() / 10;
        });
        return Game;
    })();
});