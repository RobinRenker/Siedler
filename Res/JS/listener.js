$(window).load(function () {
    $(window).trigger('resize');
});
//#########################################
//Klassen
$(window).resize(function () {
    $('.s_max_window_size').each(function () {
        $(this).height($(window).height());
        $(this).width($(window).width());
    })
});

