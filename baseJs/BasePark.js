/*
 *
 */
var BasePark = function(_ctx, _fps, _w, _h){
    this.Toys   = Array();  // this Park Toys
    this.ctx    = _ctx;     // this Park ctx
    this.fps    = _fps;     // this Park fps
    this.w      = _w;       // this Park width
    this.h      = _h;       // this Park height

    this.update_timer;
    this.draw_timer;

    document.addEventListener('touchstart', this, false);
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
BasePark.prototype.Entry = function(){
    this.Start();
};
BasePark.prototype.Start = function(){
    this.Update();
    this.Draw();
};
BasePark.prototype.Exit = function(){
    this.Stop();
    document.removeEventListener('touchstart', this, false)
};
BasePark.prototype.Stop = function(){
    clearTimeout(this.update_timer);
    clearTimeout(this.draw_timer);
};
/*-----------------------------------------------------------------------------------*/



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
        this.Toys[i].Draw();
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
/*-----------------------------------------------------------------------------------*/
BasePark.prototype.AddToy = function(_toy){
    this.Toys.push(_toy);
};
BasePark.prototype.RemoveToy = function(_num){
    this.Toys.splice(_num,1);
};
/*-----------------------------------------------------------------------------------*/
