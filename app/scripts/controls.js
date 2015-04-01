$( document ).ready(function() {
    window.Controls = (function() {
        'use strict';

        /**
         * Key codes we're interested in.
         */
        var KEYS = {
            32: 'space'
        };

        /**
         * A singleton class which abstracts all player input,
         * should hide complexity of dealing with keyboard, mouse
         * and touch devices.
         * @constructor
         */
        var Controls = function() {
            this._didJump = false;
            this.keys = {};
            $(window)
                .on('keydown', this._onKeyDown.bind(this))
                .on('keyup', this._onKeyUp.bind(this));
                // jQuery mobile integration added with vmouseup/down
                $('.GameCanvas').on('vmouseup', this._onClickUp.bind(this));
                $('.GameCanvas').on('vmousedown',this._onClickDown.bind(this));
        };
        /**
         * Functions which checks the input from and makes the player 
         * move accordingly for both standard i/o devices and touchscreens
         */
        Controls.prototype._onKeyDown = function(e) {
            // Only jump if space was pressed.
            if (e.keyCode in KEYS) {
                this._didJump = true;
                var keyName = KEYS[e.keyCode];
                this.keys[keyName] = true;
            }
        };

        Controls.prototype._onClickDown = function(e) {
            if (e) {
                this._didJump = true;
                var keyName = KEYS[32];
                this.keys[keyName] = true;
            }
        };

        /**
         * Functions which lets the game know that the player finished jumping
         */
        Controls.prototype._onClickUp = function(e) {
            if (e) {
                var keyName = KEYS[32];
                this.keys[keyName] = false;
                return false;
            }
        };

        Controls.prototype._onKeyUp = function(e) {
            if (e.keyCode in KEYS) {
                var keyName = KEYS[e.keyCode];
                this.keys[keyName] = false;
                return false;
            }
        };
        
        /**
         * Only answers true once until a key is pressed again.
         */
        Controls.prototype.didJump = function() {
            var answer = this._didJump;
            this._didJump = false;
            return answer;
        };
        
        // Export singleton.
        return new Controls();
    })();
});
