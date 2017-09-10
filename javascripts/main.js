/* Main JavaScript file */

/* When the user clicks on the button, toggle between hiding and showing the dropdown content. 
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
/* Close the dropdown menu if the user clicks outside of it. 
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

// Back to top Button
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
