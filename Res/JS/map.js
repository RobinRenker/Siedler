//#####################################################
$(window).resize(function () {
    map_resize();
});
$(document).keydown(function (e) {
    if(e.which == 38){
        map = map_create_random(10,10);
        map_display(map);
        map_control_resize(0);
    }
    else if(e.which == 40){
        console.log("map width: "+$('#map').width());
        console.log("map height: "+$('#map').height());
        console.log("field width: "+$('.map_field').width());
        console.log("field height: "+$('.map_field').height());
    }
    else if(e.which == 39){
        map_field_hex_update();
    }
});
function map_resize() {

}
//#####################################################
function map_json_to_array(json) {
    var dummyMap = new Array(json.length);
    for(var key in json){
        dummyMap[key] = new Array(json[key].Column.length);
        passCounter = 0;
        for(var key2 in json[key].Column){
            dummyMap[key][passCounter] = json[key].Column[key2];
            passCounter++;
        }
    }
    return dummyMap;
}
function map_update() {

}
function map_create_random(width,height) {
    var map = new Array(width);

    for(var i = 0; i<map.length; i++){
        map[i] = new Array(height);
        for(var y = 0; y < map[i].length; y++){
            var implements = Math.floor((Math.random()*map_implements.length)+1);
            var value = Math.floor(Math.random()*map_max_value);
            var master = false;
            if(i == 0 && y == 0){
                master = true;
            }

            map[i][y] = {"id":"field"+i+"_"+y,"master":master,"implement":map_implements[implements-1],"value":value,"left":0,"top":0};
        }
    }

    /*var master_marging = [0,0];
    var cur_left = 0;
    var cur_top = 0;
    for(var i = 0; i<map.length;i++){
        for(var y = 0; y<map[i].length;y++){
            map[i][y]["top"] = cur_top +"px";
            map[i][y]["left"] = cur_left+"px";
            cur_left = cur_left + map_field_def_size_w;
        }
        cur_top = cur_top + map_field_def_size_h()-map_field_def_size_ws_h();
        if(cur_left%map_field_def_size_w == 0){
            cur_left = map_field_def_size_w/2;
        }
        else{
            cur_left = 0;
        }
    }*/

    return map;
}
function map_get_master(map) {
    var ret = null;
    for(var i = 0; i<map.length; i++){
        for(var y = 0;y<map[i].length;y++){
            if(map[i][y].master == true){
               ret = [i,y];
            }
        }
    }
    return ret;
}
function map_display(map) {
    for(var i = 0; i<map.length;i++){
        for(var y = 0; y<map[i].length;y++){
            $('#map').html($('#map').html() + map_get_field(map[i][y]));
        }
    }
}
function map_get_field(obj) {
    var imagePath = ''+map_images2[obj["implement"]];
    var id = ''+obj["id"].toString();
    return '<div id="'+obj["id"]+'" class="map_field"' +
        'style="width:'+map_field_def_size_w+'px;' +
        'height:'+map_field_def_size_h()+'px;' +
        'left:'+obj["left"]+';' +
        'top:'+obj["top"]+';' +
        'background-image:url('+imagePath+')">' +
        '<div onclick="map_control_field_click(this)" class="map_field_hex_t"></div> ' +
        '<div class="map_field_hex_m"></div> ' +
        '<div class="map_field_hex_b"></div> ' +
        '</div>';
}
//#####################################################
function map_number_get_mid(num) {
    if(num%2 == 0){
        return num/2;
    }
    else{
        num = num-1;
        return num/2+1;
    }
}
function map_field_def_size_h() {
    return Math.sqrt((map_field_def_size_w*map_field_def_size_w)+(map_field_def_size_seiten()*map_field_def_size_seiten()));
}
function map_field_def_size_seiten() {
    return map_field_def_size_w/(Math.sqrt(3));
}
function map_field_def_size_ws_h() {
    return Math.sqrt((map_field_def_size_seiten()*map_field_def_size_seiten())-((map_field_def_size_w/2)*(map_field_def_size_w/2)));
}
//#####################################################
function map_field_hex_update() {
    var styles1 = {
        'position': 'relative',
        'width': '200px',
        'height': '115.47px',
        'margin': '57.74px 0',
        'background-color:':'saddlebrown'
    };
    $('.hex').css(styles1);
    console.log("done");
}
