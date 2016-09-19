//############################################################
//Menu
menu_top_height_def = 50;
menu_side_width_def = 50;
//############################################################
//Map_Control
map_control_getting_dragged = false;
map_control_mouse_down = false;
map_control_drag_start = null;
map_control_drag_start_map_pos = [];
map_control_mouse_pos = [];
map_control_faster_zoom = false;
//############################################################
//Map
map = null;
map_images = {
    "dirt":'http://static-eu.insales.ru/images/products/1/2777/56486617/%D0%9A%D0%BE%D0%BB%D0%BE%D0%BD%D0%B8%D0%B7%D0%B0%D1%82%D0%BE%D1%80%D1%8B_5-6_%D0%9A%D1%83%D0%BF%D1%86%D1%8B_%D0%B8_%D0%B2%D0%B0%D1%80%D0%B2%D0%B0%D1%80%D1%8B_%D1%82%D0%B0%D0%B9%D0%BB_1.png',
    "wheat":'http://mlgame.ws/wp-content/uploads/2013/07/Die_Siedler_von_Catan.png',
    "wood":'http://static-eu.insales.ru/images/products/1/2778/56486618/%D0%9A%D0%BE%D0%BB%D0%BE%D0%BD%D0%B8%D0%B7%D0%B0%D1%82%D0%BE%D1%80%D1%8B_5-6_%D0%9A%D1%83%D0%BF%D1%86%D1%8B_%D0%B8_%D0%B2%D0%B0%D1%80%D0%B2%D0%B0%D1%80%D1%8B_%D1%82%D0%B0%D0%B9%D0%BB_2.png'};
map_implements = ["wood","wheat","dirt"];
map_max_value = 12;
map_field = '<div class="field"></div>';
map_field_def_size_w = 200;
//map_field_def_size_h = 231;
//############################################################
//Keys
key_faster_zoom = 70;//F
//############################################################//############################################################
