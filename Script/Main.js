$(window).resize(function(){
    $('.max_size').each(function(){
        $(this).parent()
        $(this).height($(this).parent().height());
        $(this).width($(this).parent().width());
    });
});