//########################################################################
//Menu Var
menu_side_width_def = 50;
menu_side_width_intent = 100;
//########################################################################
$('#menu_side').hover(function () {
    $('#menu_side').animate({width: menu_side_width_intent},{queue:false,duration:100});
});
$('#menu_side').mouseleave(function () {
    $('#menu_side').animate({width: menu_side_width_def},{queue:false,duration:100});
});
$(window).resize(function () {
    $('#menu_side').height($(window).height()-$('#menu_top').height());
    $('#menu_side').css({top:$('#menu_top').height()});
});
//########################################################################
function menu_side_hide() {
    $('.menu_side_sec').each(function () {
        $(this).css({'visibility':'hidden'});
    });
}
function menu_side_show(id) {
    $('#'+id).css({'visibility':'visible'});
}