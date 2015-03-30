/*
 * Here we should take care of starting and reseting the tians
 * TODO must not repet my self as much as i am doing here... must fix it.
 */

//gunnar næsta skref er að setja setTimeout() á þetta svo einn komi í einu
//eða held það
'use strict';
var Titans = {
	start: function() {
		$('.T1').css({
			left: '-10em'
		}, 10000, 'linear');
		$('.T2').animate({
			left: '-10em'
		}, 10000, 'linear');
		$('.T3').animate({
			left: '-10em'
		}, 10000, 'linear');
		$('.T4').animate({
			left: '-10em'
		}, 10000, 'linear');
	},
	reset: function() {
		$('.T1').stop(true, true);
		$('.T1').css({
			left: '50em'
		});

		$('.T2').stop(true, true);
		$('.T2').css({
			left: '50em'
		});

		$('.T3').stop(true, true);
		$('.T3').css({
			left: '80em'
		});
		$('.T4').stop(true, true);
		$('.T4').css({left: '80em'});
		

	}
};