/* Main JavaScript file */
$(function(){
	$("header").before($(".StickyHeader").clone().addClass("fixed"));
	$(window).scroll(function(){
		if($(window).scrollTop() >= 150){
			$('.StickyHeader.fixed').addClass('slideDown');
		}
	else{
		$('.StickyHeader.fixed').removeClass('slideDown');
	}
/* When the user clicks on the button, toggle between hiding and showing the dropdown content. */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
/* Close the dropdown menu if the user clicks outside of it. */
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* Sticky header slide down effect 
$(window).scroll(function(){
    var sticky = $('#nav'),
        scroll = $(window).scrollTop();
        if (scroll >= 200){
            sticky.addClass('fixed-nav');
            sticky.slideDown(1000);
        }
        else {
            sticky.removeClass('fixed-nav');
            sticky.removeAttr("style"); //slideDown adds the style="block" which needs to be removed so that next time slideDown will work
        }
});
