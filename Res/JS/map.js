$(document).keydown(function (e) {
    if (e.which != 38) {
        if (e.which == 39) {
            menu_top_height_intent = 100;
        }
    } else {
        map = map_create_random(30, 30);
        map_display(map);
        map_control_resize(0);
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
    var nmap;
    for(var i = 0; i<map.length;i++){
        for(var y = 0; y<map[i].length;y++){
            //$('#map').html($('#map').html() + map_create_field(map[i][y]));
            nmap = nmap + map_create_field(map[i][y]);
        }
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
