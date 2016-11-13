//########################################################################
//Menu Var

//########################################################################
$(window).resize(function () {

});
$('#menu_create_map').mousedown(function () {
    try{
        var x = $('#menu_create_map_x').val();
        var y = $('#menu_create_map_y').val();
        if($.isNumeric(x) && $.isNumeric(y)){
            x = parseInt(x);
            y = parseInt(y);
            map = map_create_random(y, x);
            map_display(map);
            map_control_resize(0);
        }
    }
    catch (error){

    }
});
//########################################################################
function menu_side_hide() {
    $('.menu_side_sec').each(function () {
        $(this).css({'visibility':'hidden'});
    });
}
function menu_side_show(id, width) {
    if(id != null){
        $('#'+id).css({'visibility':'visible'});
    }
    $('#menu_side').animate({width: width+"px"}, {queue: false, duration: 150});
}