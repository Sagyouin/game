/*
 * 
 */
var ToyBox  = function(_w,_h){
    this.fps        = 60;

    //Game Time
    this.time       = 0;
    this.loopTime   = this.fps * 60 * 60 * 24;

    //Src
    this.image  = Array();
    this.sound  = Array();

    //Parks & Toys
    this.Parks  = Array();
    this.Toys   = Array();
    
    //Camera
    this.camera = Array();
    this.camera.x   = 0;
    this.camera.y   = 0;

    //Window size
    this.window         = Array();
    this.window.w       = _w;
    this.window.h       = _h;
    this.window.ratio   = this.window.h / this.window.w;

    //Device size
    this.device         = Array();
    this.device.w       = document.documentElement.clientWidth;
    this.device.h       = document.documentElement.clientHeight;
    this.device.ratio   = this.device.h / this.device.w;

    //Canvas setting (default:full screen)
    this.canvas         = document.createElement('canvas');
    this.canvas.setAttribute("id", "ToyBox");
    this.canvas.ratio   = this.device.h / this.window.h;
    this.canvas.width   = this.window.w * this.canvas.ratio;
    this.canvas.height  = this.window.h * this.canvas.ratio;
    this.canvas.ratio   = this.canvas.height / this.canvas.width;
    this.canvas.style.position  = "absolute";
    this.canvas.style.left      = "0";
    this.canvas.style.top       = "0";
    document.body.appendChild(this.canvas);

    //set context
    this.ctx    = this.canvas.getContext('2d');

    //touch event check
    /*
    if(window.TouchEvent){
        this.canvas.addEventListener("touchstart",  this.onTouchStart,      false);
        this.canvas.addEventListener("touchmove",   this.onTouchMove,       false);
        this.canvas.addEventListener("touchend",    this.onTouchEnd,        false);
    }else{
        this.canvas.addEventListener("mousedown",   this.mouseDownListner,  false);
        this.canvas.addEventListener("mousemove",   this.mouseMoveListner,  false);
        this.canvas.addEventListener("mouseup",     this.mouseUpListner,    false);
        this.canvas.addEventListener("contextmenu", this.contextMenu,       false);
    }
    */
    //status 0:Pause 1:Processing 2:End
    this.status = 0;

    this.touch = Array();

    //Park Set
    this.Park = function(){};
    this.Park.prototype = new BasePark(this.ctx, this.fps, this.canvas.ratio, this.canvas.width, this.canvas.height);

    //Toy Set
    this.PolygonToy  = function(_sides){
        this.sides  = _sides;
    };
    this.PolygonToy.prototype = new PolygonToy();

    this.CircleToy   = function(_aspect_ratio){
        this.aspect_ratio = _aspect_ratio;
    };
    this.CircleToy.prototype  = new PolygonToy();

    this.ImageToy    = function(_img_name){
        this.image.name = _img_name
    };
    this.ImageToy.prototype   = new PolygonToy();
};

/*-----------------------------------------------------------------------------------
                            Toy Box Touch events
-----------------------------------------------------------------------------------*/
ToyBox.prototype.onTouchStart = function(event) {
    this.touch = Array();
    var rect = event.target.getBoundingClientRect();
    for (var i = 0; i < event.touches.length; i++){
        this.touch[i]   = Array();
        this.touch[i].x = Math.floor( (event.touches[0].clientX - rect.left) );
        this.touch[i].y = Math.floor( (event.touches[0].clientY - rect.top) );
    }
    this.touch.status = "touchstart";
    event.preventDefault();
};

ToyBox.prototype.onTouchMove = function(event) {
    this.touch = Array();
    var rect = event.target.getBoundingClientRect();
    for (var i = 0; i < event.touches.length; i++){
        this.touch[i]   = Array();
        this.touch[i].x = Math.floor( (event.touches[0].clientX - rect.left) );
        this.touch[i].y = Math.floor( (event.touches[0].clientY - rect.top) );
    }
    this.touch.status = "touchmove";
    event.preventDefault();
};

ToyBox.prototype.onTouchEnd = function(event) {
    this.touch.status = "touchend";
};

ToyBox.prototype.mouseDownListner = function(event){
    this.touch = Array();
    var rect = event.target.getBoundingClientRect();
    touch[0].x = Math.floor( (event.clientX - rect.left) );
    touch[0].y = Math.floor( (event.clientY - rect.top) );
    this.touch.status = "touchstart";
};
ToyBox.prototype.mouseMoveListner = function(event){
    this.touch = Array();
    var rect = event.target.getBoundingClientRect();
    touch[0].x = Math.floor( (event.clientX - rect.left) );
    touch[0].y = Math.floor( (event.clientY - rect.top) );
    this.touch.status = "touchmove";
};

ToyBox.prototype.mouseUpListner = function(event){
    this.touch.status = "touchend";
};

ToyBox.prototype.contextMenu = function(event){
    /*
    event.preventDefault();
    touch.status = 4;
    */
};

/*-----------------------------------------------------------------------------------
                                Toy Box functions
-----------------------------------------------------------------------------------*/
ToyBox.prototype.PrepareImage = function(_name, _src, _sw, _sh){
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
ToyBox.prototype.PullPark = function(){
    if ( this.Parks.length > 0 ){
        this.Parks[this.Parks.length - 1].Exit();
        this.Parks.pop();
        this.Parks[this.Parks.length - 1].Entry();
    }
};
ToyBox.prototype.PushPark = function(_park){
    if ( this.Parks.length > 0 ){
        this.Parks[this.Parks.length - 1].Exit();
    }
    this.Parks.push(_park);
    this.Parks[this.Parks.length - 1].Entry();
};
ToyBox.prototype.ReplacePark = function(_park){
    if ( this.Parks.length > 0 ){
        this.Parks[this.Parks.length - 1].Exit();
        this.Parks.pop(_park);
    }
    this.Parks.push(_park);
    this.Parks[this.Parks.length - 1].Entry();
};

/*-----------------------------------------------------------------------------------
                                Toy Draw functions
-----------------------------------------------------------------------------------*/
ToyBox.prototype.DrawPlygon = function(_toy){
    var radDiv = ( Math.PI * 2 ) / _toy.sides;
    var R = _toy.r / ( Math.cos( radDiv / 2) );
    var radOffset = ( _toy.angle != undefined ) ? (_toy.angle * Math.PI / 180) - (Math.PI / 2)  : -Math.PI / 2;

    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(" + _toy.red + "," + _toy.green + "," + _toy.blue +" ," + _toy.alpha + ")";
    this.ctx.moveTo(
            ( _toy.x + Math.cos(radOffset) * R ) * this.canvas.ratio,
            ( _toy.y + Math.sin(radOffset) * R ) * this.canvas.ratio
    );
    for (var i = 1; i < _toy.sides; ++i) {
        var rad = radDiv * i + radOffset;
        this.ctx.lineTo(
            ( _toy.x + Math.cos(rad) * R ) * this.canvas.ratio,
            ( _toy.y + Math.sin(rad) * R ) * this.canvas.ratio
        );
    }
    this.ctx.closePath();
    this.ctx.stroke();
};









function randomNum(_min, _max){
    var random = Math.floor( Math.random() * ( (_max + 1) - _min ) ) + _min;
    return random;
};



