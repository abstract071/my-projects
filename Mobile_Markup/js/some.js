$(function() {
	$(window).resize(function() {
		if ( $(window).width() > 768 ) {
			$('.main-nav-mobile').hide();
		}
	});
	$('.nav-btn').click(function() {
		$('.main-nav-mobile').toggle({
			duration: 1000
		});
	});
});