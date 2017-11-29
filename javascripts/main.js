// Main JavaScript file

// Javascript Core Functions

(function($) {

	// Responsive Formatting
	skel.init({
		reset: 'full',
		breakpoints: {
			global:		{ range: '*', href: '/stylesheets/style.css', containers: 1400, grid: { gutters: 50 } },
			wide:		{ range: '-1680', href: '/stylesheets/style-wide.css', containers: 1200, grid: { gutters: 40 } },
			normal:		{ range: '-1280', href: '/stylesheets/style-normal.css', containers: 960, lockViewport: true },
			narrow:		{ range: '-1028', href: '/stylesheets/style-narrow.css', containers: '70%', grid: { gutters: 25 } },
			narrower:	{ range: '-980', href: '/stylesheets/style-narrower.css', grid: { collapse: true } },
			mobile:		{ range: '-640', href: '/stylesheets/style-mobile.css', containers: '70%', grid: { gutters: 15 } }
		}
	}, {
		layers: {
			layers: {
				navPanel: {
					animation: 'pushX',
					breakpoints: 'narrower',
					clickToClose: true,
					height: '100%',
					hidden: true,
					html: '<div data-action="navList" data-args="nav"></div>',
					orientation: 'vertical',
					position: 'top-left',
					side: 'left',
					width: 400
				},
				titleBar: {
					breakpoints: 'narrower',
					height: 50,
					html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span><span class="title" data-action="copyHTML" data-args="mobile-logo"></span>',
					position: 'top-left',
					side: 'top',
					width: '100%'
				}
			}
		}
	});
		
	// Disable animations/transitions until page has loaded.
	$(function() {
		var	$window = $(window),
			$body = $('body');
			$body.addClass('loading');
			$window.on('load', function() {
				$body.removeClass('loading');
			});
	});
	
})(jQuery);

// Back-to-top Button
jQuery(document).ready(function() {
	var offset = 250; // The offset is when the button will appears.
	var duration = 300; // The duration is the time until the button will appear in milliseconds.
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.back-to-top').fadeIn(duration);
		} else {
			jQuery('.back-to-top').fadeOut(duration);
		}
	});
	jQuery('.back-to-top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	});
});
