/* Fixed header slide down on scroll */
var $wrapper = $(".heading-wrapper");
var $win = $(window);
var doc = document.documentElement, body = document.body;
var top = 0;
$wrapper.clone().appendTo("body").addClass("relative");

$win.scroll(function () {
   top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
   if( top > 150)
       setTimeout(function(){$wrapper.addClass("fixed");},0);
   else if( $wrapper.hasClass("fixed") )
      setTimeout(function(){$wrapper.removeClass("fixed");},0);
});
