$('#menu_top').hover(function () {
    $('#menu_top').animate({height: menu_top_height_intent},{queue:false,duration:100});
    $('#menu_side').animate({top: menu_top_height_intent},{queue:false,duration:100});
    $('#menu_side').animate({height: $(window).height()-menu_top_height_intent},{queue:false,duration:100});
});
$('#menu_top').mouseleave(function () {
    $('#menu_top').animate({height: menu_top_height_def},{queue:false,duration:100})
    $('#menu_side').animate({top: menu_top_height_def},{queue:false,duration:100});
    $('#menu_side').animate({height: $(window).height()-menu_top_height_def},{queue:false,duration:100});
});
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
