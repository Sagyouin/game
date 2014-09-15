/*
 *
 */
var BasePark = function(_fps, _canvas){
    //----- Input BasePark Variable -----//
    this.fps    = _fps;
    this.w      = _canvas.w;
    this.h      = _canvas.h;
    this.ratio  = _canvas.ratio;

    //----- Park Variable -----//
    this.toyBoxes   = Array();
    this.touch      = Array();
    this.touch.flag = false;

    //----- setTimeout Variable -----//
    this.update_timer;
    this.draw_timer;

    //----- Camera -----//
    this.camera = Array();
    this.camera.x   = 0;
    this.camera.y   = 0;
};

/*-----------------------------------------------------------------------------------
                                Park Canvas Function
-----------------------------------------------------------------------------------*/
BasePark.prototype.CreateCanvas = function(){
    //----- Canvas Variable (default:full screen) -----//
    this.canvas                 = document.createElement('canvas');
    this.canvas.width           = this.w;
    this.canvas.height          = this.h;
    this.canvas.style.position  = "absolute";
    this.canvas.style.left      = "0";
    this.canvas.style.top       = "0";
    document.body.appendChild(this.canvas);
    this.ctx    = this.canvas.getContext('2d');

    //----- Add EventListener -----//
    this.canvas.addEventListener("touchstart", this, false);
    this.canvas.addEventListener("touchmove",  this, false);
    this.canvas.addEventListener("touchend",   this, false);
};
BasePark.prototype.DeleteCanvas = function(){
    //----- Remove EventListener -----//
    this.canvas.removeEventListener("touchstart", this, false);
    this.canvas.removeEventListener("touchmove",  this, false);
    this.canvas.removeEventListener("touchend",   this, false);
    document.body.removeChild(this.canvas);
};

/*-----------------------------------------------------------------------------------
                            Park Event functions
-----------------------------------------------------------------------------------*/
BasePark.prototype.handleEvent = function(event) {
    console.log(event.type);
    event.preventDefault();
    switch(event.type) {
        case 'touchstart':
        case 'touchmove':
        case 'touchend':
            this.GetTouchStatus(event);
            this.TouchOrigin();
            break;
    }
};

/*-----------------------------------------------------------------------------------
                            Change Park functions
-----------------------------------------------------------------------------------*/
BasePark.prototype.Entry = function(){
    this.CreateCanvas();
    this.Start();
};
BasePark.prototype.Start = function(){
    this.Update();
    this.Draw();
    this.touch.flag = true;
};
BasePark.prototype.Exit = function(){
    this.Stop();
    this.DeleteCanvas();
};
BasePark.prototype.Stop = function(){
    clearTimeout(this.update_timer);
    clearTimeout(this.draw_timer);
    this.touch.flag = false;
};

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
BasePark.prototype.Update = function(){
    var _this = this;
    for (var i = 0; i < this.toyBoxes.length; i++) {
        this.toyBoxes[i].OriginUpdate();
    }
    this.update_timer = setTimeout(function (){_this.Update();}, (1000 / this.fps));
};

BasePark.prototype.Draw = function(){
    var _this = this;
    this.ctx.clearRect(0,0, this.w, this.h);
    for (var i = 0; i < this.toyBoxes.length; i++) {
        for (var j = 0; j < this.toyBoxes[i].toys.length; j++){
            this.DrawToy(this.toyBoxes[i].toys[j]);
        }
    }
    this.draw_timer  = setTimeout(function (){_this.Draw();}, (1000 / this.fps));
};

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
BasePark.prototype.TouchOrigin = function(){
    this.Touch();
    this.ToysTouch();
};
BasePark.prototype.Touch = function(){
};
BasePark.prototype.ToysTouch = function(){
    for (var i = 0; i < this.toyBoxes.length; i++) {
        this.toyBoxes[i].OriginTouch(this.touch);
    }
};

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*
BasePark.prototype.AddToy = function(_toy){
    this.Toys.push(_toy);
};
*/
BasePark.prototype.AddToyBox = function(_toyBox){
    this.toyBoxes.push(_toyBox);
    this.SortToyBox();
};
BasePark.prototype.RemoveToy = function(_num){
    this.toyBoxes.splice(_num,1);
};
BasePark.prototype.SortToyBox = function(){
    this.toyBoxes.sort(function(a, b) {
        if( a.layer < b.layer ) return -1;
        if( a.layer > b.layer ) return 1;
    });
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
BasePark.prototype.GetTouchStatus = function(event) {
    var rect = event.target.getBoundingClientRect();
    this.touch.status = event.type;
    switch(event.type) {
        case 'touchstart':
            this.touch[0]   = Array();
            this.touch[0].x = Math.floor( (event.touches[0].clientX - rect.left) );
            this.touch[0].y = Math.floor( (event.touches[0].clientY - rect.top) );
            break;
        case 'touchmove':
            this.touch[1]   = Array();
            this.touch[1].x = Math.floor( (event.touches[0].clientX - rect.left) );
            this.touch[1].y = Math.floor( (event.touches[0].clientY - rect.top) );
            break;
        case 'touchend':
            break;
    }
};
