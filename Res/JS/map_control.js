$("#map")
    .mousedown(function(event) {
        if(event.which == 1){
            map_control_mouse_down = true;
            map_control_drag_start = getMouPosWin();
            map_control_drag_start_map_pos[0] = parseInt($('#map').css("left").replace("px",""));
            map_control_drag_start_map_pos[1] = parseInt($('#map').css("top").replace("px",""));
        }
    })
    .mousemove(function() {
        if(map_control_mouse_down){
            var mouse_pos_diff = map_control_getCooDif(map_control_drag_start,getMouPosWin());
            $('#map').css({left:map_control_drag_start_map_pos[0]+mouse_pos_diff[0]+"px"});
            $('#map').css({top:map_control_drag_start_map_pos[1]+mouse_pos_diff[1]+"px"});
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
    val = 40;
    if(map_control_faster_zoom){
        val = val *4;
        console.log('dd');
    }
    if(e.originalEvent.wheelDelta /120 > 0) {
        map_control_resize(val);
    }
    else{
        map_control_resize(-val);
    }
});
$(document).keydown(function (event) {
    if(event.which == key_faster_zoom){
        map_control_faster_zoom = true;
        console.log("press");
    }
})
    .keyup(function (event) {
        if(event.which == key_faster_zoom){
            map_control_faster_zoom = false;
            console.log("rel");
        }
    });
function map_control_resize(val) {
    if(parseInt($('#map').height()) >= 0 && parseInt($('#map').width()) >= 0){
        if($('#map:hover').length != 0){
            var mousePosWin = getMouPosWin();
            var mousePosOld = [parseInt(window.event.pageX - parseInt($('#map').css('left'))), parseInt(window.event.pageY - parseInt($('#map').css('top')))];
            var mousePosPerc = [Math.round(mousePosOld[0]/($('#map').width()/100)),Math.round(mousePosOld[1]/($('#map').height()/100))];

            $('#map').width(($('#map').width()+val)+"px").height(($('#map').height()+val)+"px");

            $('#map').css({left:mousePosWin[0]-(mousePosPerc[0]*(parseInt($('#map').width())/100))});
            $('#map').css({top:mousePosWin[1]-(mousePosPerc[1]*(parseInt($('#map').height())/100))});
        }
        else{
            $('#map').width(($('#map').width()+val)+"px").height(($('#map').height()+val)+"px");
            $('#map').css({left:(parseInt($('#map').css("left").replace("px",""))-(val/2))});
            $('#map').css({top:(parseInt($('#map').css("top").replace("px",""))-(val/2))});
        }
    }
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
