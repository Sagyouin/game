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
};

/*-----------------------------------------------------------------------------------
                                PolygonToy Functions
-----------------------------------------------------------------------------------*/
var PolygonToy = function(_sides){
    this.draw_pattern   = "Polygon";
    this.sides          = 4;  // 3:triangle 4:square 5:pentagon 6:hexagon 

    this.r      = 0; // Inscribed Circle

    this.red    = 255;
    this.blue   = 0;
    this.green  = 0;

    this.line   = 1;

    this.sides  = _sides;
    console.log(this.sides);
};
PolygonToy.prototype = new BaseToy();

/*-----------------------------------------------------------------------------------
                                CircleToy Functions
-----------------------------------------------------------------------------------*/
var CircleToy = function(){
    this.draw_pattern   = "Circle";
    this.aspect_ratio   = 1; // -:| = 1:_aspect_r

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
var ImageToy = function(_image){
    this.DrawPattern    = "Image";
    this.image          = _image;
};
CircleToy.prototype = new BaseToy();
