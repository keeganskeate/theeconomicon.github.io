/* Fixed header slide down on scroll */
$(document).ready(function () {
    $("header").before($("header").clone().addClass("animateIt"));
    $(window).on("scroll", function () {
        $("body").toggleClass("down", ($(window).scrollTop() > 100));
    });
});
