/*
*
*/
var BasePark = function(_fps, _canvas){
    //----- Input ToyBox Variable -----//
    this.fps    = _fps;
    this.w      = _canvas.w;
    this.h      = _canvas.h;
    this.ratio  = _canvas.ratio;

    //----- Park Variable -----//
    this.Toys   = Array();
//    this.id     = this.GetId();

    //----- setTimeout Variable -----//
    this.update_timer;
    this.draw_timer;

    //----- Canvas Variable (default:full screen) -----//
    this.canvas                 = document.createElement('canvas');
    this.canvas.width           = this.w;
    this.canvas.height          = this.h;
    this.canvas.style.position  = "absolute";
    this.canvas.style.left      = "0";
    this.canvas.style.top       = "0";
//    this.canvas.setAttribute("id", this.id);
    document.body.appendChild(this.canvas);
    this.ctx    = this.canvas.getContext('2d');

    //----- Camera -----//
    this.camera = Array();
    this.camera.x   = 0;
    this.camera.y   = 0;
};
/*-----------------------------------------------------------------------------------
                                Park functions
-----------------------------------------------------------------------------------*/
BasePark.prototype.handleEvent = function() {
    switch(event.type) {
        case 'touchstart':
            this.Touch();
            break;
    }
};
/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
BasePark.prototype.Entry = function(){
    this.Start();
};
BasePark.prototype.Start = function(){
    document.addEventListener('touchstart', this, false);
    this.Update();
    this.Draw();
};
BasePark.prototype.Exit = function(){
    this.Stop();
    document.body.appendChild(this.canvas);
};
BasePark.prototype.Stop = function(){
    document.removeEventListener('touchstart', this, false)
    clearTimeout(this.update_timer);
    clearTimeout(this.draw_timer);
};

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
BasePark.prototype.Update = function(){
    var _this = this;
    for (var i = 0; i < this.Toys.length; i++) {
        this.Toys[i].Update();
    }
    this.update_timer = setTimeout(function (){_this.Update();}, (1000 / this.fps));
};
BasePark.prototype.Draw = function(){
    var _this = this;
    this.ctx.clearRect(0,0, this.w, this.h);
    for (var i = 0; i < this.Toys.length; i++) {
        this.DrawToy(this.Toys[i]);
        //this.Toys[i].Draw();
    }
    this.draw_timer  = setTimeout(function (){_this.Draw();}, (1000 / this.fps));
};
BasePark.prototype.Touch = function(){
    for (var i = 0; i < this.Toys.length; i++) {
        this.Toys[i].Touch();
    }
};

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
BasePark.prototype.AddToy = function(_toy){
    this.Toys.push(_toy);
};
BasePark.prototype.RemoveToy = function(_num){
    this.Toys.splice(_num,1);
};

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
BasePark.prototype.DrawToy = function(_toy){
    if (_toy.draw_pattern == "Polygon"){
        this.DrawPlygon(_toy);
    }
    if (_toy.draw_pattern == "Circle"){
        //this.DrawCircle);
    }
    if (_toy.draw_pattern == "Label"){
        //this.DrawLabel();
    }
    if (_toy.draw_pattern == "Image"){
        //this.DrawImage();
    }
};

BasePark.prototype.DrawPlygon = function(_toy){
    var radDiv = ( Math.PI * 2 ) / _toy.sides;
    var R = _toy.r / ( Math.cos( radDiv / 2) );
    var radOffset = ( _toy.angle != undefined ) ? (_toy.angle * Math.PI / 180) - (Math.PI / 2)  : -Math.PI / 2;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(" + _toy.red + "," + _toy.green + "," + _toy.blue +" ," + _toy.alpha + ")";
    this.ctx.moveTo(
            ( _toy.x + Math.cos(radOffset) * R ) * this.ratio,
            ( _toy.y + Math.sin(radOffset) * R ) * this.ratio
    );
    for (var i = 1; i < _toy.sides; ++i) {
        var rad = radDiv * i + radOffset;
        this.ctx.lineTo(
            ( _toy.x + Math.cos(rad) * R ) * this.ratio,
            ( _toy.y + Math.sin(rad) * R ) * this.ratio
        );
    }
    this.ctx.closePath();
    this.ctx.stroke();
};

BasePark.prototype.DrawImage = function(_toy){
    this.ctx.drawImage(
        _toy.image,
        _toy.image.sw *           (_toy.image.num % ( _toy.image.w / _toy.image.sw)),
        _toy.image.sh * Math.floor(_toy.image.num / ( _toy.image.w / _toy.image.sw)),
        _toy.image.sw,
        _toy.image.sh,
        ( ( (_toy.x - _toy.w / 2) + CAMERA.x ) * this.ratio )|0,
        ( ( (_toy.y - _toy.h / 2) + CAMERA.y ) * this.ratio )|0,
        (_toy.w * this.ratio)|0,
        (_toy.h * this.ratio)|0
    );
}


/*-----------------------------------------------------------------------------------
                            Toy Box Touch events
-----------------------------------------------------------------------------------*/
/*
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
    event.preventDefault();
    touch.status = 4;
};
*/
