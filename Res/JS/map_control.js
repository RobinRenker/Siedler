$("#map_abs")
    .mousedown(function(event) {
        if(event.which == 1){
            map_control_mouse_down = true;
            map_control_drag_start = getMouPosWin();
            map_control_drag_start_map_pos[0] = parseInt($('#map_abs').css("left").replace("px",""));
            map_control_drag_start_map_pos[1] = parseInt($('#map_abs').css("top").replace("px",""));
        }
    })
    .mousemove(function() {
        if(map_control_mouse_down){
            var mouse_pos_diff = map_control_getCooDif(map_control_drag_start,getMouPosWin());
            $('#map_abs').css({left:map_control_drag_start_map_pos[0]+mouse_pos_diff[0]+"px"});
            $('#map_abs').css({top:map_control_drag_start_map_pos[1]+mouse_pos_diff[1]+"px"});
        }
    })
    .mouseup(function(event) {
        if(event.which == 1){
            map_control_drag_leave();
        }
    });
$('#mapcont_rel').mouseleave(function () {
    map_control_drag_leave();
})
    .mouseup(function (event) {
        if(event.which == 1){
            map_control_drag_leave();
        }
    })
    .focusout(function () {
        map_control_drag_leave();
    });
$('#mapcont_rel').bind('mousewheel', function(e){
    valPerc = 10;
    if(map_control_faster_zoom){
        valPerc = 30;
    }
    if(e.originalEvent.wheelDelta /120 > 0) {
        map_control_resize(valPerc);
    }
    else{
        map_control_resize(-valPerc);
    }
});
$(document).keydown(function (event) {
    if(event.which == key_faster_zoom){
        map_control_faster_zoom = true;
    }
})
    .keyup(function (event) {
        if(event.which == key_faster_zoom){
            map_control_faster_zoom = false;
        }
    });
function map_control_resize(val) {
    map_control_resize_field(val);
    map_control_resize_mappos(val);
}
function map_control_resize_mappos(val) {
    var sizeOld = [$('#map_abs').width(),$('#map_abs').height()];
    var todoPercW = ($('#map_abs').width()/100)*val;
    var todoPercH = ($('#map_abs').height()/100)*val;
    if(parseInt($('#map_abs').height())+todoPercW >= 0 && parseInt($('#map_abs').width())+todoPercH >= 0){
        var mousePosWin = getMouPosWin();
        var mousePosOld = [
            parseInt(window.event.pageX - parseInt($('#map_abs').css('left'))),
            parseInt(window.event.pageY - parseInt($('#map_abs').css('top')))
        ];
        var mousePosPerc = [
            Math.round(mousePosOld[0]/($('#map_abs').width()/100)),
            Math.round(mousePosOld[1]/($('#map_abs').height()/100))
        ];

        $('#map_abs')
            .width(($('#map_abs').width()+todoPercW)+"px")
            .height(($('#map_abs').height()+todoPercH)+"px");
        $('#map')
            .width($('#map_abs').width())
            .height($('#map_abs').height());

        if($('#map_abs:hover').length != 0){

            $('#map_abs')
                .css({
                    left:mousePosWin[0]-(mousePosPerc[0]*(parseInt($('#map_abs').width())/100))
                })
                .css({
                    top:mousePosWin[1]-(mousePosPerc[1]*(parseInt($('#map_abs').height())/100))
                });
        }
        else{
            $('#map_abs')
                .css({left:(parseInt($('#map_abs').css("left").replace("px",""))-((todoPercH)/2))})
                .css({top:(parseInt($('#map_abs').css("top").replace("px",""))-(todoPercH/2))});
        }
    }
}
function map_control_resize_field(val) {
    map_field_def_size_w = map_field_def_size_w+ (map_field_def_size_w/100)*val;
    $('.field').each(function () {
        $(this)
            .width(map_field_def_size_w)
            .height(map_field_def_size_h());
    });
    /*for(var i = 0; i < map.length;i++){
        for(var y = 0; y<map[i].length;y++){
            map[i][y]["left"] = (map[i][y]["left"]+(map[i][y]["left"]/100)*val);
            $('#'+map[i][y]["id"]).css({left:map[i][y]["left"]});
        }
    }*/
}
function map_control_get_fitting_map_size(map) {
    var longest = 0;
    for(var i = 0; i<map.length;i++){
        if(map[i].length > longest){
            longest = map[i].length;
        }
    }
    return [longest * map_field_def_size+map_field_def_size, map.length*map_field_def_size];
}
function map_control_drag_leave() {
    map_control_mouse_down = false;
    map_control_getting_dragged = false;
    map_control_drag_start = [];
    map_control_drag_start_map_pos = [];
}
function map_control_getCooDif(coordinates1,coordinates2){
    var ret = [];
    ret[0] = numChgVor(coordinates1[0]-coordinates2[0]);
    ret[1] = numChgVor(coordinates1[1]-coordinates2[1]);
    return ret;
}
