var map = [];
var map_images = {
  "dirt":"../Res/Pic/dirt.png",
  "wheat":"../Res/Pic/wheat.png",
  "wood":"../Res/Pic/wood.png"};
var mapJSON = [
    {
        "Column":[
            {"center":true,"implement":"wood"},
            {"center":false,"implement":"wheat"},
        ]
    },
    {
        "Column":[
            {"master":false,"implement":"wood","value":5},
            {"master":false,"implement":"dirt","value":9}

        ]
    }
];
//#####################################################
$(window).resize(function () {

});
$(document).keydown(function (e) {
    if(e.which == 38){
        console.log("Test");
        var map = map_create_random(20,10);
        map_get_master(map);
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
function map_update() {

}
function map_create_random(width,height) {
    var map = new Array(width);
    var masterpos = [map_number_get_mid(width),map_number_get_mid(height)];

    for(var i = 0; i<map.length; i++){
        map[i] = new Array(height);
        for(var y = 0; y < map[i].length; y++){
            var implements = Math.floor((Math.random()*map_implements.length)+1);
            var value = Math.floor(Math.random()*map_max_value);
            var master = false;
            if(i == masterpos[0] && y == masterpos[1]){
                master = true;
            }

            map[i][y] = {"id":"field"+i+"_"+y,"master":master,"implement":map_implements[implements-1],"value":value};
        }
    }
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
=======
    getCenter
}
>>>>>>> origin/master
