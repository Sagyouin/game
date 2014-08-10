var BASE = Array();
var OBJ  = Array();
var IMAGE = Array();

window.addEventListener('load',initMain,false);
function initMain(){
    //FPS
    BASE.fps = 60;

    //device size
    BASE.window   = Array();
    BASE.window.w     = 300;
    BASE.window.h     = 500;
    BASE.window.ratio = BASE.window.h / BASE.window.w;

    //canvas setting (full screen)
    BASE.canvas         = document.getElementById('world');
    BASE.canvas.width   = document.documentElement.clientWidth;
    BASE.canvas.height  = document.documentElement.clientHeight;
    BASE.canvas.ratio   = BASE.canvas.height / BASE.canvas.width;
    BASE.ctx            = BASE.canvas.getContext('2d');

    //window orientation
    BASE.orientation    = 'portrait';   //portrait landscape

    //ratio drawPos setting
    BASE.drawPos    = 'center';    //top center bottom
    BASE.drawOffset = Array();
    BASE.drawOffset.x = 0;
    BASE.drawOffset.y = 0;
    if ( BASE.orientation == 'portrait' ) {
        BASE.ratio      = BASE.canvas.width / BASE.window.w;
        if (BASE.window.ratio <= BASE.canvas.ratio){
            if (BASE.drawPos == 'top'){
                BASE.drawOffset.y = 0;
            }
            if (BASE.drawPos == 'bottom'){
                BASE.drawOffset.y = BASE.canvas.height - BASE.window.h * BASE.ratio;
            }
            if (BASE.drawPos == 'center'){
                BASE.drawOffset.y = (BASE.canvas.height - BASE.window.h * BASE.ratio) / 2;
            }
        }else{
            BASE.ratio = BASE.canvas.height / BASE.window.h;
            if (BASE.drawPos == 'top'){
                BASE.drawOffset.x = 0;
            }
            if (BASE.drawPos == 'bottom'){
                BASE.drawOffset.x = BASE.canvas.width - BASE.window.w * BASE.ratio;
            }
            if (BASE.drawPos == 'center'){
                BASE.drawOffset.x = (BASE.canvas.width - BASE.window.w * BASE.ratio) / 2;
            }
        }
    }
    if ( BASE.orientation == 'landscape' ) {
        BASE.ratio = BASE.canvas.height / BASE.window.h;
    }

    //touch event check
    if(window.TouchEvent){
        BASE.canvas.addEventListener("touchstart", onTouchStart, false);
        BASE.canvas.addEventListener("touchmove",  onTouchMove,  false);
        BASE.canvas.addEventListener("touchend",   onTouchEnd,   false);
    }else{
        BASE.canvas.addEventListener("mousedown",   mouseDownListner, false);
        BASE.canvas.addEventListener("mousemove",   mouseMoveListner, false);
        BASE.canvas.addEventListener("mouseup",     mouseUpListner,   false);
        BASE.canvas.addEventListener("contextmenu", contextMenu,      false);
    }

    sceneLoad('loadSrc');
    mainLoop();
}

/*------------------------- Object Lib -------------------------*/
function mainLoop(){
    var i = 0;
    //reset window
    BASE.ctx.clearRect(0,0,BASE.canvas.width, BASE.canvas.height);

    //update object
    for (i = 0; i < OBJ.length; i++) {
        OBJ[i].update(i);
    }

    //delete object
    for (i = 0; i < OBJ.length; i++) {
        if (OBJ[i].flag == 2) {
            deleteObject(i);
            i--;
        }
    }

    //draw object
    for (var j = 0; j < BASE.layer; j++){
        for (var i = 0; i < OBJ.length; i++) {
            if (OBJ[i].layer == j){OBJ[i].draw(i);}
        }
    }

    setTimeout('mainLoop()', (1000 / BASE.fps));
}

function touchObject(_param){
    for (var i = 0; i < OBJ.length; i++) {OBJ[i].touch(_param);}
    TOUCH.status = 0;
}

function deleteObject(_num){
    OBJ.splice(_num,1);
}
function addObject(_obj){
    OBJ.push(_obj);
    startObject(OBJ.length - 1);
}
function startObject(_num){
    OBJ[_num].start();
}
function resetObject(){
    OBJ = Array();
}

function startObjectAll(){
    for (var i = 0; i < OBJ.length; i++) {startObject(i);}
}
function searchObject(_name){
    for (var i = 0; i < OBJ.length; i++) {
        if (OBJ[i].name == _name){
            return i;
        }
    }
    return false;
}

function sortObject(){
    OBJ.sort(function(a, b) {
        if( a.layer < b.layer ) return -1;
        if( a.layer > b.layer ) return 1;
        if( a.x < b.x ) return 1;
        if( a.x > b.x ) return -1;
    });
}

function countObject(_name){
    var num = 0;
    for (var i = 0; i < OBJ.length; i++) {
        if (OBJ[i].name == _name){num ++;}
    }
    return num;
}
/*------------------------- Object Lib -------------------------*/


/*----------------- HIT CHECK -----------------*/
function inRing(_param1, _param2){
    if ( Math.pow(_param1.x - _param2.x, 2) + Math.pow(_param1.y - _param2.y, 2) <= Math.pow(_param2.r, 2) ){
        return true;
    }
    return false;
}
function inSquare(_param1, _param2){
    if (_param2.x - _param2.w/2 <= _param1.x && _param1.x <= _param2.x + _param2.w /2
            && _param2.y - _param2.h/2 <= _param1.y && _param1.y <= _param2.y + _param2.h /2){
        return true;
    }
    return false;
}
function hitRing(_param1,_param2){
    if( Math.pow((_param2.x - _param1.x),2) + Math.pow((_param2.y - _param1.y),2) < Math.pow((_param2.r + _param1.r),2) ){
        return true;
    }
    return false;
}
/*----------------- HIT CHECK -----------------*/

/*----------------- LIB TOOLS -----------------*/
function randomNum(_min, _max){
    var random = Math.floor( Math.random() * ( (_max + 1) - _min ) ) + _min;
    return random;
}
function setImage(_param){
    IMAGE[_param.name]          = new Image();
    IMAGE[_param.name].src      = _param.src;
    IMAGE[_param.name].sw       = _param.sw;
    IMAGE[_param.name].sh       = _param.sh;
    IMAGE[_param.name].w        = _param.w;
    IMAGE[_param.name].h        = _param.h;
}
/*----------------- LIB TOOLS -----------------*/


