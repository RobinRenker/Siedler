$("#map")
    .mousedown(function() {
        map_mouse_down = true;
    })
    .mousemove(function() {
        if(map_mouse_down){
            map_getting_dragged = true;
        }
        if(map_getting_dragged){
            console.log("moved");
        }
    })
    .mouseup(function() {
        map_mouse_down = false;
        map_getting_dragged = false;
    });
