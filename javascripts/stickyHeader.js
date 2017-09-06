/* Fixed header slide down on scroll */
jQuery(document).ready(function($) {
    $("header").before($("header").clone().addClass("animateIt"));
    $(window).on("scroll", function () {
        $("body").toggleClass("down", ($(window).scrollTop() > 100));
    });
});
