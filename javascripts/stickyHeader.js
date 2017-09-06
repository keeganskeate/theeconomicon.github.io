/* Fixed header slide down on scroll */
$(document).ready(function () {
    $("sticky").before($("sticky").clone().addClass("animateIt"));
    $(window).on("scroll", function () {
        $("body").toggleClass("down", ($(window).scrollTop() > 100));
    });
});
