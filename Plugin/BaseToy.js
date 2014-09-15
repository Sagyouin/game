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

    this.alpha  = 1.0;
};
/*-----------------------------------------------------------------------------------
                                    BaseToy Functions
-----------------------------------------------------------------------------------*/
BaseToy.prototype.OriginStart = function(){
    this.status = 1;
    this.Start();
};
BaseToy.prototype.Start = function(){
};

BaseToy.prototype.OriginUpdate = function(){
    this.Update();
    this.time++;
};
BaseToy.prototype.Update = function(){
    if (this.status == 1){
        this.Move();
    }
};
BaseToy.prototype.Move = function(){
    this.x += Math.cos(Matsh.PI / ( this.radian / 180 )) * this.speed;
    this.y += Math.sin(Matsh.PI / ( this.radian / 180 )) * this.speed;;
};
BaseToy.prototype.Touch = function(){
};
BaseToy.prototype.HitCheck = function(_otherToy){
    if ( this.dcType == "d" && _otherToy.dcType == "d"){
        return this.x == _otherToy.x && this.y == _otherToy.y;
    };
    if ( this.dcType == "d" && _otherToy.dcType == "s"){
        return ( _otherToy.x - _otherToy.w / 2 ) < this.x && this.x < ( _otherToy.x + _otherToy.w / 2 ) &&
                ( _otherToy.y - _otherToy.h / 2 ) < this.y && this.y < ( _otherToy.y + _otherToy.h / 2 );
    };
    if ( this.dcType == "d" && _otherToy.dcType == "c"){
        return Math.pow((_otherToy.x - this.x ), 2) + Math.pow((_otherToy.y - this.y ), 2) < Math.pow(_otherToy.r, 2);
    };


    if ( this.dcType == "s" && _otherToy.dcType == "d"){
        return ( this.x - this.w / 2 ) < _otherToy.x && _otherToy.x < ( this.x + this.w / 2 ) &&
                ( this.y - this.h / 2 ) < _otherToy.y && _otherToy.y < ( this.y + this.h / 2 );
    }
    if ( this.dcType == "s" && _otherToy.dcType == "s"){
        return  (_otherToy.x - (_otherToy.w / 2)) < (this.x + (this.w / 2)) &&
                (this.x - (this.w / 2)) < (_otherToy.x + (_otherToy.w / 2)) &&
                (_otherToy.y - (_otherToy.h / 2)) < (this.y + (this.h / 2)) &&
                (this.y - (this.h / 2)) < (_otherToy.y + (_otherToy.h / 2));
    };
    if ( this.dcType == "s" && _otherToy.dcType == "c"){
    };

    if ( this.dcType == "c" && _otherToy.dcType == "d"){
        return Math.pow((this.x - _otherToy.x ), 2) + Math.pow((this.y - _otherToy.y ), 2) < Math.pow(this.r, 2);
    };
    if ( this.dcType == "c" && _otherToy.dcType == "s"){
    };
    if ( this.dcType == "c" && _otherToy.dcType == "c"){
        return Math.pow((this.x - _otherToy.x), 2) + Math.pow((this.y - _otherToy.y), 2) <
                Math.pow((this.r + _otherToy.r), 2);
    }
    return false;
};

/*-----------------------------------------------------------------------------------
                                PolygonToy Functions
-----------------------------------------------------------------------------------*/
var PolygonToy = function(_sides){
    this.draw_pattern   = "Polygon";
    this.r      = 0; // Inscribed Circle

    this.red    = 0;
    this.blue   = 0;
    this.green  = 0;

    this.line   = 1;

    this.sides  = _sides;
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
