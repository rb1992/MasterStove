//jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $(document).on('click', '#MainNav a.page-scroll', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
       
        setTimeout(function () {
            $(".navbar-nav li").removeClass("active");
            $anchor.parent().addClass("active");
        }, 1500);
       
        event.preventDefault();
    });


    $(document).on('click', '#ContinueScroll a.page-scroll', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

        setTimeout(function () {
            $(".navbar-nav li").removeClass("active");
            $(".navbar-nav li:nth-child(2)").addClass("active");
        }, 1500);

        event.preventDefault();
    });

});