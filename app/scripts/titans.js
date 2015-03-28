/*
 * Here we should take care of starting and reseting the tians
 * TODO must not repet my self as much as i am doing here... must fix it.
*/



//gunnar næsta skref er að setja setTimeout() á þetta svo einn komi í einu
//eða held það 
var Titans = {
	start: function() {
		$(".Titan1").animate( {left: '-10em'}, 10000, "linear" );
		$(".Titan2").animate( {left: '-10em'}, 10000, "linear" );
	},
	reset: function () {
		$('.Titan1').stop(true, true);
		$(".Titan1").css({left: '80em'});

		$('.Titan2').stop(true, true);
		$(".Titan2").css({left: '80em'});
	}
}

