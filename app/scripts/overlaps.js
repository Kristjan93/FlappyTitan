/*
 * Overlaps stores helper functions for collision detection
 *  - abstracts the collision of elements
 */

var overlaps = (function() {
    'use strict';
    /*
     * A function which returns the position of an element
     */
    function getPositions(elem) {
        var pos, width, height;
        pos = $(elem).position();
        width = $(elem).width();
        height = $(elem).height();
        return [
            [pos.left, pos.left + width],
            [pos.top, pos.top + height]
        ];
    }

    /*
     * A function which takes in two ponts and returns if they have collided or not
     */
    function comparePositions(p1, p2) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }
    return function(a, b) {
        var pos1 = getPositions(a),
            pos2 = getPositions(b);
        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    };
})();
