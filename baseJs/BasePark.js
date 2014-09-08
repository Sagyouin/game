/*
*
*/
var BasePark = function(_ctx, _fps, _ratio, _w, _h){
    this.Toys   = Array();  // this Park Toys
    this.ctx    = _ctx;     // this Park ctx
    this.fps    = _fps;     // this Park fps
    this.w      = _w;       // this Park width
    this.h      = _h;       // this Park height
    this.ratio  = _ratio;

    this.update_timer;
    this.draw_timer;

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
