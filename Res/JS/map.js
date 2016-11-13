$(document).keydown(function (e) {
    if (e.which != 38) {
        if (e.which == 39) {
            menu_top_height_intent = 100;
        }
    } else {
        console.log(map[map.length-1]);
    }
});
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
function map_array_to_json() {

}
function map_create_random(w, h) {
    var maptmp = new Array();
    for(var i = 0; i < h; i++){
        for(var y = 0; y < w; y++){
            var implements = Math.floor((Math.random()*map_implements.length)+1);
            var value = Math.floor(Math.random()*map_max_value);
            maptmp[maptmp.length] = {"id":"field"+i+"_"+y,"implement":map_implements[implements-1],"value":value,"left":0,"top":0};
        }
    }
    return maptmp;
}
function map_display(map) {
    var nmap = "";
    for(var i = 0; i<map.length;i++){
        nmap = nmap + map_create_field(map[i]);
    }
    $('#map').html(nmap);
}
function map_create_field(obj) {
    var part1 =  '<div id="'+obj["id"]+'" class="map_field">';

    var part2 = '</div>';

    return part1+map_create_field_hex(obj)+part2;
}
function map_create_field_hex(obj) {
    var colorCl = obj["implement"];
    var id = obj["id"];
    var ret = '<div ' +
        'class="map_field_rel">' +
        '<div onclick="map_control_field_click('+id+')" class="hex hex_1 '+colorCl+'"></div>' +
        '<div onclick="map_control_field_click('+id+')" class="hex hex_2 '+colorCl+'"></div>' +
        '<div onclick="map_control_field_click('+id+')" class="hex hex_3 '+colorCl+'"></div>' +
        '</div>';

    return ret;
}
//#####################################################
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
