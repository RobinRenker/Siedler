$(window).load(function () {
    $(window).trigger('resize');
});
//#########################################
//Klassen
$(window).resize(function () {
    $('.s_max_window_size').each(function () {
        $(this).height($(window).height());
        $(this).width($(window).width());
    })
});
$(window).resize(function () {
    $('.match_height_with_width').each(function () {
        $(this).height(parseInt($(this).width())+"px");
    })
});














//test
$(window).load(function () {
    var black = "<div class='tb match_height_with_width'></div>";
    var white = "<div class='tw match_height_with_width'></div>";

    var swap = false;
    for(var i = 0; i<100;i++){
        if(i == 10 || i == 20 || i == 30 || i == 40 || i == 50 || i == 60 || i == 70 || i == 80 || i == 90){
            if(swap == true){
                swap = false;
            }
            else {
                swap = true;
            }
        }
       if(swap){
           swap = false;
           document.getElementById('map').innerHTML = document.getElementById('map').innerHTML+black;
       }
       else{
           swap = true;
           document.getElementById('map').innerHTML = document.getElementById('map').innerHTML+white;
       }
   }
});

