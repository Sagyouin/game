/*-----------------------------------------------------------------------------------
                                        BaseToy
-----------------------------------------------------------------------------------*/
var BaseToy = function(){
    this.x      = 0;
    this.y      = 0;
    this.ratio  = 0; // Size ratio
    this.angle  = 0; 

    this.speed          = 0;
    this.speed_angle    = 0;

    this.status = 0;    // ToyStatus   0:Standby 1:Processing 2:Done(Delete)

    this.time   = 0;

    this.flag = false;  // ToyDrawFlag false true

    this.layer  = 0;

    this.alpha  = 1.0;

};
/*-----------------------------------------------------------------------------------
                                    BaseToy Functions
-----------------------------------------------------------------------------------*/

BaseToy.prototype.Start = function(){
    this.status = 1;
};
BaseToy.prototype.Update = function(){
    if (this.status == 1){
        this.move();
    }
    this.time++;
};
BaseToy.prototype.Move = function(){
    this.x += Math.cos(Matsh.PI / ( this.radian / 180 )) * this.speed;
    this.y += Math.sin(Matsh.PI / ( this.radian / 180 )) * this.speed;;
};
BaseToy.prototype.Touch = function(){
    console.log(this.name);
};

/*--------------------------------BaseToy Draw Functions--------------------------------*/
BaseToy.prototype.Draw = function(){
    if (this.draw_pattern == "Polygon"){
        this.DrawPlygon();
    }
    if (this.draw_pattern == "Circle"){
        //this.DrawCircle);
    }
    if (this.draw_pattern == "Image"){
        //this.DrawImage();
    }
};
BaseToy.prototype.DrawPlygon = function(){
    var radDiv = ( Math.PI * 2 ) / this.sides;
    var R = this.r / ( Math.cos( radDiv / 2) );
    var radOffset = ( this.angle != undefined ) ? (this.angle * Math.PI / 180) - (Math.PI / 2)  : -Math.PI / 2;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(" + this.red + "," + this.green + "," + this.blue +" ," + this.alpha + ")";
    this.ctx.moveTo(
            ( this.x + Math.cos(radOffset) * R ) * this.base_ratio,
            ( this.y + Math.sin(radOffset) * R ) * this.base_ratio
    );
    for (var i = 1; i < this.sides; ++i) {
        var rad = radDiv * i + radOffset;
        this.ctx.lineTo(
            ( this.x + Math.cos(rad) * R ) * this.base_ratio,
            ( this.y + Math.sin(rad) * R ) * this.base_ratio
        );
    }
    this.ctx.closePath();
    this.ctx.stroke();
};

/*-----------------------------------------------------------------------------------
                                PolygonToy Functions
-----------------------------------------------------------------------------------*/
var PolygonToy = function(_ctx, _base_ratio){
    this.draw_pattern   = "Polygon";
//    this.sides          = _sides;  // 3:triangle 4:square 5:pentagon 6:hexagon 
    this.sides          = 4;  // 3:triangle 4:square 5:pentagon 6:hexagon 
    this.ctx            = _ctx;
    this.base_ratio     = _base_ratio;

    this.r      = 0; // Inscribed Circle

    this.red    = 0;
    this.blue   = 0;
    this.green  = 0;

    this.line   = 1;

};
PolygonToy.prototype = new BaseToy();

/*-----------------------------------------------------------------------------------
                                CircleToy Functions
-----------------------------------------------------------------------------------*/
var CircleToy = function(_ctx, _baes_ratio){
    this.draw_pattern   = "Circle";
//    this.aspect_ratio   = _aspect_r;    // -:| = 1:_aspect_r
    this.aspect_ratio   = 1;
    this.ctx            = _ctx;
    this.base_ratio     = _base_ratio;

    this.r      = 0; // Inscribed Circle

    this.red    = 0;
    this.blue   = 0;
    this.green  = 0;

    this.line   = 1;
};
CircleToy.prototype = new BaseToy();

/*-----------------------------------------------------------------------------------
                                ImageToy Functions
-----------------------------------------------------------------------------------*/
var ImageToy = function(_ctx, _baes_ratio){
    this.DrawPattern    = "Image";
    this.image          = Array();
//    this.image.name     = _img_name;
    this.ctx            = _ctx;
    this.base_ratio     = _base_ratio;
};
CircleToy.prototype = new BaseToy();
