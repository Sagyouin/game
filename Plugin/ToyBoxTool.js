/*
 * Last Update 2014/09/14
 */
var ToyBoxTool  = function(_w, _h){
    //----- Frame rate -----//
    this.fps        = 60;

    //----- Game timeer -----//
    this.time       = 0;
    this.loopTime   = this.fps * 60 * 60 * 24; //1Day

    //----- Gamse source -----//
    this.image  = Array();
    this.sound  = Array();

    //----- Parks & Toys variable -----//
    this.Parks      = Array();
    this.ParkList   = Array();

    //----- Window size -----//
    this.game_window         = Array();
    this.game_window.w       = _w;
    this.game_window.h       = _h;
    this.game_window.ratio   = this.game_window.h / this.game_window.w;

    //----- Device(Browser) size -----//
    this.device         = Array();
    this.device.w       = document.documentElement.clientWidth;
    this.device.h       = document.documentElement.clientHeight;
    this.device.ratio   = this.device.h / this.device.w;

    //----- Canvas size -----//
    this.canvas         = Array();
    this.canvas.ratio   = this.device.h / this.game_window.h;
    this.canvas.w       = this.game_window.w * this.canvas.ratio;
    this.canvas.h       = this.game_window.h * this.canvas.ratio;

    //----- Prepare Toy -----//
};

/*-----------------------------------------------------------------------------------
                                Toy Box functions
-----------------------------------------------------------------------------------*/
ToyBoxTool.prototype.PrepareImage = function(_name, _src, _sw, _sh){
    this.image[_name]           = new Image();
    thisthis.image[_name].flag.image[_name].name      = _name;
    this.image[_name].src       = _src;
    this.image[_name].sw       = _sw;
    this.image[_name].sh       = _sh;
    this.image[_name].flag      = false;

    this.image[_name].onload   = function (){
        this.image[_name].flag  = true;
    };
};

/*-----------------------------------------------------------------------------------
                                Park functions
-----------------------------------------------------------------------------------*/
ToyBoxTool.prototype.PullPark = function(){
    if ( this.Parks.length > 0 ){
        this.Parks[this.Parks.length - 1].Exit();
        this.Parks.pop();
        this.Parks[this.Parks.length - 1].Start();
    }
};
ToyBoxTool.prototype.PushPark = function(_park){
    if ( this.Parks.length > 0 ){
        this.Parks[this.Parks.length - 1].Stop();
    }
    this.Parks.push(_park);
    this.Parks[this.Parks.length - 1].Entry();
};
ToyBoxTool.prototype.ReplacePark = function(_park){
    if ( this.Parks.length > 0 ){
        this.Parks[this.Parks.length - 1].Exit();
        this.Parks.pop(_park);
    }
    this.Parks.push(_park);
    this.Parks[this.Parks.length - 1].Entry();
};

ToyBoxTool.prototype.CreatePark = function(){
    //var NewPark = function(){};
    //NewPark.prototype = new BasePark(this.fps, this.canvas);
    var NewPark = new BasePark(this.fps, this.canvas);
    return NewPark;
};
ToyBoxTool.prototype.CreateToyBox = function(){
    //var NewToyBox = function(){};
    //NewToyBox.prototype = new BaseToyBox();
    var NewToyBox = new BaseToyBox();
    return NewToyBox;
};
ToyBoxTool.prototype.CreatePolygonToy = function(_sides){
    //var NewPolygonToy = function(){};
    //NewPolygonToy.prototype = new PolygonToy(_sides);
    var NewPolygonToy = new PolygonToy(_sides);
    return NewPolygonToy;
};
/*
    this.PolygonToy  = function(_sides){this.sides  = _sides;};
    this.PolygonToy.prototype = new PolygonToy();
    this.CircleToy  = function(){};
    this.CircleToy.prototype  = new PolygonToy();
    this.ImageToy    = function(_image){this.image  = _image;};
    this.ImageToy.prototype   = new PolygonToy();
*/
/*-----------------------------------------------------------------------------------
                                Common functions
-----------------------------------------------------------------------------------*/
function RandomNum(_min, _max){
    var random = Math.floor( Math.random() * ( (_max + 1) - _min ) ) + _min;
    return random;
};
