/*##########################################################*/
/*###############################*/
/*Size*/
function getWinSiz() {
    var x = [];
    x[0] = window.innerWidth;
    x[1] = window.innerHeight;
    return x;
}
function getSizEle(elementId) {
    var x = [];
    x[0] = document.getElementById(elementId).offsetWidth;
    x[1] = document.getElementById(elementId).offsetHeight;
    return x;
}
function expWid(element, pixelSize, duration){
    $("#" + element).animate({width: pixelSize+"px"}, {queue: false, duration: duration});
}
function expHei(element, pixelSize, duration){
    $("#" + element).animate({height: pixelSize+"px"}, {queue: false, duration: duration});
}
function aniTop(element, pixelSize, duration,queue){
    $(element).animate({top: pixelSize+"px"}, {queue: queue, duration: duration});
}
function aniLef(element, pixelSize, duration,queue){
    $(element).animate({left: pixelSize+"px"}, {queue: queue, duration: duration});
}
function aniRig(element, pixelSize, duration,queue){
    $(element).animate({right: pixelSize+"px"}, {queue: queue, duration: duration});
}
function aniBot(element, pixelSize, duration,queue){
    $(element).animate({bottom: pixelSize+"px"}, {queue: queue, duration: duration});
}
function getParentSize(el){
    return [$("#"+el).parent().width(),$("#"+el).parent().height()];
}
/*###############################*/
/*Element Style*/
function cenDivVer(elementId) {
    var x = getWinSiz()[1] - getSizEle(elementId)[1];
    x = x / 2;
    document.getElementById(elementId).style.marginTop = x + "px";
}
function rotAni(el, deAim, deCurrent, step){
    var val1 = 0;
    var val2 = 0;
    if(deAim > deCurrent){
        val1 = deAim - deCurrent;
    }
    else{
        val1 = deCurrent - deAim;
    }
    if(deAim > deCurrent){
        val2 = 360 - deAim + deCurrent;
    }
    else{
        val2 = 360 - deCurrent + deAim;
    }
    //##
    if(val1 < val2){
        if(deAim > deCurrent){
            deCurrent = deCurrent + step;
        }
        else{
            deCurrent = deCurrent - step;
        }
    }
    else{
        if (deAim < deCurrent) {
            deCurrent = deCurrent + step;
            if (deCurrent >= 360){
                deCurrent = deCurrent -360;
            }
        }
        else{
            deCurrent = deCurrent - step;
            if(deCurrent <= 0){
                deCurrent = deCurrent + 360;
            }
        }
    }
    rot(el,deCurrent);
    if (deAim != deCurrent) {
        setTimeout(function() {
            rotAni(el, deAim, deCurrent,step);
        }, 5);
    }
}
function rot(el, deg){
    var elem = document.getElementById(el);
    if(navigator.userAgent.match("Chrome")){
        elem.style.WebkitTransform = "rotate("+deg+"deg)";
    } else if(navigator.userAgent.match("Firefox")){
        elem.style.MozTransform = "rotate("+deg+"deg)";
    } else if(navigator.userAgent.match("MSIE")){
        elem.style.msTransform = "rotate("+deg+"deg)";
    } else if(navigator.userAgent.match("Opera")){
        elem.style.OTransform = "rotate("+deg+"deg)";
    } else {
        elem.style.transform = "rotate("+deg+"deg)";
    }
}
/*###############################*/
/*Color*/
function setColCla(group, r, g, b, a){
    var elements = document.getElementsByClassName(group);
    for(var i = 0; i < elements.length;i++){
        elements[i].style.background = "rgba("+r+","+g+","+b+","+a+")";
    }
}
function setColFon(group, r, g, b, a){
    var elements = document.getElementsByClassName(group);
    for(var i = 0; i < elements.length;i++){
        elements[i].style.color = "rgba("+r+","+g+","+b+","+a+")";
    }
}
function setHovCol(group, r, g, b, a){
    var hC = creHovCol([parseInt(r),parseInt(g),parseInt(b)],40);
    var hA = creHovCol([parseInt(r),parseInt(g),parseInt(b)],60);
    $('.'+group).css('background-color','rgba('+r+','+g+','+b+','+a+')').hover(
        function(){
            $(this).css('background-color','rgba('+hC[0]+','+hC[1]+','+hC[2]+','+a+')');
        },
        function(){
            $(this).css('background-color','rgba('+r+','+g+','+b+','+a+')');
        }
    ).click(
        function(){
            $(this).css('background-color','rgba('+hA[0]+','+hA[1]+','+hA[2]+','+a+')');
        },
        function(){
            $(this).css('background-color','rgba('+hC[0]+','+hC[1]+','+hC[2]+','+a+')');
        }
    );
}
function creHovCol(dataO, step){
    var dataN = [];
    var extra;
    if((dataO[0]+dataO[1]+dataO[2]) < 50){
        extra = +step;
    }
    else{
        extra = -step;
    }
    for(var i = 0; i<3; i++){
        dataN[i] = dataO[i]+extra;
    }
    return dataN;
}
function setColBor(klasse, r, g, b, a){
    $("."+klasse).css("border-color","rgba("+r+","+g+","+b+","+a+")");
}
function getRanCol(){
    return [Math.floor((Math.random() * 255)),Math.floor((Math.random() * 255)),Math.floor((Math.random() * 255))];
}
function updRanCol(){
    var elements = document.getElementsByClassName("randomColorBackground");
    for(var i = 0; i < elements.length;i++){
        var colors = getRanCol();
        elements[i].style.background = "rgba("+colors[0]+","+colors[1]+","+colors[2]+",1)";
    }
}
/*###############################*/
/*Else*/
function getMouPosWin() {
    var pos = [];
    var e = window.event;
    pos[0] = e.clientX;
    pos[1] = e.clientY;
    return pos;
}
function addCla(element, klass){
    $('#'+element).addClass(klass);
}
function remCla(element, klass){
    $('#'+element).removeClass(klass);
}
function numAbr(value){
    var retVal = Math.round(value);
    if(retVal > value){
        return retVal-1;
    }
    else{
        return retVal;
    }
}
function getScrOfEle(e){
    var el = $("#"+e);
    return [el.scrollLeft(),el.scrollTop()];
}
function cheIfIdExi(id){
    var el = document.getElementById(id);
    if(el === null){
        return false;
    }else{
        return true;
    }
}
function getDifBetNum(num1, num2, max){
    if(num1 < num2){
        return num2-num1;
    }
    else{
        return (num2+60)-num1;
    }
}
function strConStr(main,char){
    var ret = 0;
    var list = main.split("");
    var list2 = char.split("");
    for(var i = 0; i < list.length; i++){
        if(list[i] == list2[0]){
            var comp = "";
            for(var y = 0; y<char.length;y++){
                comp = comp+list[i+y];
            }
            if(comp == char){
                ret = ret + 1;
            }
        }
    }
    return ret;
}
function hasLowCas(str) {
    return (/[a-z]/.test(str));
}
function hasUppCas(str) {
    return (/[A-Z]/.test(str));
}
function hasNum(str) {
    ret = 0;
    var list = str.split("");
    for(var i = 0; i < list.length; i++){
        for(var x = 0; x<nums.length; x++){
            if(list[i] == nums[x]){
                ret++;
            }
        }
    }
    return ret;
}
/*###############################*/
/*Array*/
function cleaArr(list, deadSlot){
    /*deadSlot == Which ones are dead*/
    var newArray = [];
    for(var i = 0; i < list.length;i++){
        if(list[i] != deadSlot){
            apeToArr(newArray,list[i]);
        }
    }
    return newArray;
}
function apeToArr(array,newData){
    array[array.length] = newData;
}
/*###############################*/
/*Time*/
function corTim(x) {
    if (x.length == 1) {
        var y = "0";
        y = y + x;
        x = y;
    }
    return x;
}
function getTimStr(){
    var currentdate = getTime();
    var seconds = corTim(currentdate[0].toString());
    var minutes = corTim(currentdate[1].toString());
    var houers = corTim(currentdate[2].toString());
    var datetime = houers + ":" + minutes + ":" + seconds;
    return datetime;
}
function getTime(){
    var curTime = new Date();
    return [curTime.getHours(),curTime.getMinutes(),curTime.getSeconds()];
}
/*###############################*/
/*Ajax*/
function loadIntoDiv(div, url){
    $("#"+div).load(url);
}
function loaIntDivPos(div, url, data){
    $.ajax({
        'url':  url,
        'type': 'POST',
        'data': data,
        'cache': false,
        'success': function(result){
            document.getElementById(div).innerHTML = result;
        }
    });
}
var nums = ["0","1","2","3","4","5","6","7","8","9"];
