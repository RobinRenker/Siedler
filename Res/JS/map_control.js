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
function map_control_field_click(id) {
    console.log("--> "+id["id"]);
}
function map_control_resize(val) {
    map_control_resize_field(val);
    map_control_resize_mappos(val);
    map_control_resize_hex();
}
function map_control_resize_mappos(val) {
    var todoPercW = ($('#map_abs').width()/100)*val;
    var todoPercH = ($('#map_abs').height()/100)*val;
    var perfMapSize = map_control_get_perf_map_size(map);

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
            .height(perfMapSize[0]+"px")
            .width(perfMapSize[1]+"px");
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
    $('.map_field')
        .width(map_field_def_size_w)
        .height(map-map_field_def_size_seiten());
    $('.map_field_rel')
        .width(map_field_def_size_w)
        .height(map-map_field_def_size_seiten());

    var smallest = map_control_get_smallest_pos(map);

    for(var i = 0; i < map.length; i++){
        var elPos = map_control_read_pos(map[i]["id"]);
        var vTop = map_control_num_diff(smallest['y'],elPos[0])*(map_field_def_size_h()-map_field_def_size_ws_h());
        var vLeft = map_control_num_diff(smallest['x'],elPos[1])*map_field_def_size_w;

        if(elPos[0]%2 != 0 || elPos[0]%2 != -0){
            vLeft = vLeft+(map_field_def_size_w/2);
        }

        $('#'+map[i]["id"]).css({top:vTop,left:vLeft});
    }
}
function map_control_resize_hex() {
    var mar1 = (map_field_def_size_w-map_field_def_size_seiten())/2;
    $('.hex')
        .width(map_field_def_size_seiten())
        .height(map_field_def_size_w)
        .css({
            'margin-left':mar1+"px",
            'top':(-mar1)+"px"
        });
}
function map_control_drag_leave() {
    map_control_mouse_down = false;
    map_control_getting_dragged = false;
    map_control_drag_start = [];
    map_control_drag_start_map_pos = [];
}
//################################################################
function map_control_getCooDif(coordinates1,coordinates2){
    var ret = [];
    ret[0] = numChgVor(coordinates1[0]-coordinates2[0]);
    ret[1] = numChgVor(coordinates1[1]-coordinates2[1]);
    return ret;
}
function map_control_read_pos(id){
    var ret = id.split("field")[1];
    var ret = ret.split("_");
    return [parseInt(ret[0]),parseInt(ret[1])];
}
function map_control_num_diff(num1, num2) {
    if(num1 > num2){
        var tmp = num1;
        num1 = num2;
        num2 = tmp;
    }
    var c = 0;
    while(num1 < num2){
        c++;
        num1++;
    }
    return c;
}
function map_control_get_perf_map_size(mapX) {
    var ret = [0,0];
    var smal = map_control_get_smallest_pos(mapX);
    var big = map_control_get_biggest_pos(mapX);
    var widthC = big['x'] - smal['x'];
    var heightC = big['y'] - smal['y'];
    ret[0] = (1+heightC)*(map_field_def_size_h()-map_field_def_size_ws_h())+map_field_def_size_ws_h();
    ret[1] = (1+widthC)*map_field_def_size_w+(map_field_def_size_w/2);
    return ret;
}
function map_control_get_smallest_pos(m) {
    var smallest = null;
    for(var i = 0; i <m.length;i++){
        var cur = map_control_read_pos(m[i]['id']);
        if(smallest == null){
            smallest = {'x':cur[1],'y':cur[0]};
        }
        else if(smallest['y'] > cur[0]) {
            smallest = {'x':cur[1],'y':cur[0]};
        }
        else if(smallest['y'] == cur[0] && smallest['x'] > cur[1]){
            smallest['x'] = cur[1];
        }
    }
    return smallest;
}
function map_control_get_biggest_pos(m) {
    var biggest = null;
    for(var i = 0; i <m.length;i++){
        var cur = map_control_read_pos(m[i]['id']);
        if(biggest == null){
            biggest = {'x':cur[1],'y':cur[0]};
        }
        else if(biggest['y'] < cur[0]) {
            biggest = {'x':cur[1],'y':cur[0]};
        }
        else if(biggest['y'] == cur[0] && biggest['x'] < cur[1]){
            biggest['x'] = cur[1];
        }
    }
    return biggest;
}