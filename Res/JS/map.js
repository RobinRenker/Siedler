//row [column]
//var map = [{"Firstname":"John"}];
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
            {"center":false,"implement","wood"},
            {"center":false,"implement","dirt"}
        ]
    }
];
//#####################################################
$(window).resize(function () {
    map_json_to_array(mapJSON);
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
    getCenter
}
