$( document ).ready(function() {
    window.Titans = (function() {
        'use strict';

        var SPEED = $('.GameCanvas').width() * 0.04;
        var WIDTH = 5;
        var HEIGHT = 12;

        // The start position of the player
        var PLAYER_X_POS = 0.2 * ($(window).width() / 10);

        // The start x and y position of the titans
        var INITIAL_POSITION_X = ($(window).width() / 10);
        var INITIAL_POSITION_BOT_Y = 0;
        var INITIAL_POSITION_TOP_Y = 0;

        // This instantiates the titan elements
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

        /*
         * A pseudo random function that genereates a new column/titan from 
         * 5 predifined positions
         */
        Titans.prototype.randTitans = function() {
            //Math.floor(Math.random()*(max-min+1)+min);
            var pick = Math.floor(Math.random() * (5 - 1 + 1) + 1);
            switch (pick) {
                case 1:
                    INITIAL_POSITION_BOT_Y = 47;
                    INITIAL_POSITION_TOP_Y = -71;
                    break;
                case 2:
                    INITIAL_POSITION_BOT_Y = 26;
                    INITIAL_POSITION_TOP_Y = -93;
                    break;
                case 3:
                    INITIAL_POSITION_BOT_Y = 34;
                    INITIAL_POSITION_TOP_Y = -85;
                    break;
                case 4:
                    INITIAL_POSITION_BOT_Y = 36;
                    INITIAL_POSITION_TOP_Y = -82;
                    break;
                case 5:
                    INITIAL_POSITION_BOT_Y = 40;
                    INITIAL_POSITION_TOP_Y = -78;
                    break;
                default:
                    INITIAL_POSITION_BOT_Y = 45;
                    INITIAL_POSITION_TOP_Y = -74;
            }
        }

        // Reset all the titans 
        Titans.prototype.reset = function() {
            // this.randTitans();
            this.resetTitanOne();
            this.resetTitanTwo();
            this.TitanOne.turnedOn = true;
            this.TitanTwo.turnedOn = false;
        }

        /**
         * Resets the state of the Titans for a new game.
         */
        Titans.prototype.resetTitanOne = function() {
            //Titan tree
            this.randTitans();
            this.TitanOne.posBot.x = INITIAL_POSITION_X;
            this.TitanOne.posBot.y = INITIAL_POSITION_BOT_Y;
            this.TitanOne.posTop.x = INITIAL_POSITION_X;
            this.TitanOne.posTop.y = INITIAL_POSITION_TOP_Y;
            this.TitanOne.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanOne.posTop.x + 'em, ' + this.TitanOne.posTop.y + 'em)');
            this.TitanOne.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanOne.posBot.x + 'em, ' + this.TitanOne.posBot.y + 'em)');
        };

        Titans.prototype.resetTitanTwo = function() {
            //Titan Two
            this.randTitans();
            this.TitanTwo.posBot.x = INITIAL_POSITION_X;
            this.TitanTwo.posBot.y = INITIAL_POSITION_BOT_Y;
            this.TitanTwo.posTop.x = INITIAL_POSITION_X;
            this.TitanTwo.posTop.y = INITIAL_POSITION_TOP_Y;
            this.TitanTwo.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posTop.x + 'em, ' + this.TitanTwo.posTop.y + 'em)');
            this.TitanTwo.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posBot.x + 'em, ' + this.TitanTwo.posBot.y + 'em)');
        };

        /*
         * A function that modifies the position of the titans picked from the rand function
         * at each given frame,
         */
        Titans.prototype.onFrame = function(delta) {

            if (Game.isPlaying) {

                if (this.TitanOne.posTop.x < PLAYER_X_POS && !this.TitanTwo.turnedOn) {
                    this.game.score++;
                    this.TitanTwo.turnedOn = true;
                }

                if (this.TitanTwo.posTop.x < PLAYER_X_POS && !this.TitanOne.turnedOn) {
                    this.game.score++;
                    this.TitanOne.turnedOn = true;
                }

                if (this.TitanOne.posTop.x < -10) {
                    this.TitanOne.turnedOn = false;
                    this.resetTitanOne();
                }

                if (this.TitanTwo.posTop.x < -10) {
                    this.TitanTwo.turnedOn = false;
                    this.resetTitanTwo();
                }

                if (this.TitanOne.turnedOn) {
                    this.TitanOne.posTop.x -= delta * SPEED;
                    this.TitanOne.posBot.x -= delta * SPEED;
                    this.TitanOne.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanOne.posTop.x + 'em, ' + this.TitanOne.posTop.y + 'em)');
                    this.TitanOne.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanOne.posBot.x + 'em, ' + this.TitanOne.posBot.y + 'em)');
                }

                if (this.TitanTwo.turnedOn) {
                    this.TitanTwo.posTop.x -= delta * SPEED;
                    this.TitanTwo.posBot.x -= delta * SPEED;
                    this.TitanTwo.titanBot.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posTop.x + 'em, ' + this.TitanTwo.posTop.y + 'em)');
                    this.TitanTwo.titanTop.css('transform', 'translateZ(0) translate(' + this.TitanTwo.posBot.x + 'em, ' + this.TitanTwo.posBot.y + 'em)');
                }
            }
        };
        /*
         * A function that handles resizing of our window and modifies titans accordingly
          */
        $(window).resize(function() {
            var PLAYER_X_POS = 0.2 * ($(window).width() / 10);
            var INITIAL_POSITION_X = ($(window).width() / 10);
            var INITIAL_POSITION_BOT_Y = 0;
            var INITIAL_POSITION_TOP_Y = 0;
        });
        return Titans;
    })();
});