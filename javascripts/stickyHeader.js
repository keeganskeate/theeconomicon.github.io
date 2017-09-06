/* Fixed header slide down on scroll */
jQuery(document).ready(function($) {
$(function(){
	$("header").before($(".StickyHeader").clone().addClass("fixed"));
	$(window).scroll(function(){
	if($(window).scrollTop() >= 150){
	    $('.StickyHeader.fixed').addClass('slideDown');
	}
	else{
		$('.StickyHeader.fixed').removeClass('slideDown');
	}
});

});
