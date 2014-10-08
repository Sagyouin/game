/*-----------------------------------------------------------------------------------
                                        BaseToy
-----------------------------------------------------------------------------------*/
var BaseToy = function(){
    this.Init();
};
Object.defineProperties(BaseToy.prototype, {
//------------------------- Variable -------------------------//
    //---------- Position ----------//
    x: {
        set: function(_x){this._x = _x;},
        get: function(){return this._x;}
    },
    y: {
        set: function(_y){this._y = _y;},
        get: function(){return this._y;}
    },
    //------------ Size ------------//
    w: {
        set: function(_w){this._w = _w;},
        get: function(){return this._w;}
    },
    h: {
        set: function(_h){this._h = _h;},
        get: function(){return this._h;}
    },
    ratio :{
        set: function(_ratio){this._ratio = _ratio;},
        get: function(){return this._ratio;},
    },
    //---------- Angle ----------//
    angle :{
        set: function(_angle){this._angle = _angle;},
        get: function(){return this._angle;},
    },

    //+------------ Move ------------+//
    moveSpeed:{
        set: function(_moveSpeed){this._moveSpeed = _moveSpeed;},
        get: function(){return this._moveSpeed;},
    },
    moveAngle :{
        set: function(_moveAngle){this._moveAngle = _moveAngle;},
        get: function(){return this._moveAngle;},
    },
    movePatternList:{
        set: function(_movePatternList){this._movePatternList = _movePatternList;},
        get: function(){return this._movePatternList;},
    },
    movePatternActionList:{
        set: function(_movePatternActionList){this._movePatternActionList = _movePatternActionList;},
        get: function(){return this._movePatternActionList;},
    },

    //+----------- Image -----------+//
    image:{
        set: function(_image){this._image = _image;},
        get: function(){return this._image;},
    },
    imageAnimation:{
        set: function(_imageAnimation){this._imageAnimation = _imageAnimation;},
        get: function(){return this._imageAnimation;},
    },
    imageFrame:{
        set: function(_imageFrame){this._imageFrame = _imageFrame;},
        get: function(){return this._imageFrame;},
    },

    //+----------- Flag -----------+//
    flagDraw:{
        set: function(_flagDraw){this._flagDraw = _flagDraw;},
        get: function(){return this._flagDraw},
    },
    flagUpdate:{
        set: function(_flagUpdate){this._flagUpdate = _flagUpdate;},
        get: function(){return this._flagUpdate;},
    },
    flagMoveLoop:{
        set: function(_flagMove){this._flagMove = _flagMove;},
        get: function(){return this._flagMove;},
    },
    flagTouch:{
        set: function(_flagTouch){this._flagTouch = _flagTouch;},
        get: function(){return this._flagTouch;},
    },

    //+----------- Other -----------+//
    time: {
        set: function(_time){this._time = _time;},
        get: function(){return this._time;},
    },

//------------------------- Function -------------------------//
    Init: {
        value: function(){
            this.x      = 0;
            this.y      = 0;
            this.w      = 0;
            this.h      = 0;

            this.ratio      = Array();
            this.ratio.w    = 1.0;
            this.ratio.h    = 1.0;

            this.angle  = 0;

            this.moveSpeed              = Array();
            this.movePatternList        = Array();
            this.movePatternActionList  = Array();

            this.flagDraw       = true;
            this.flagUpdate     = true;
            this.flagMoveLoop   = false;
            this.flagTouch      = true;

            this.time   = 0;
        }
    },

//------------------------- Update -------------------------//
    Update: {
        value: function(){
            this.Move();
        }
    },
    BaseUpdate: {
        value: function(){
            if(this.flagUpdate){
                this.Update();
                this.time++;
            }
        }
    },

//------------------------- Move -------------------------//
    Move: {
        value: function(){
            if ( Array.isArray(this.movePatternActionList) && this.movePatternActionList.length == 0 ){
                if ( !this.MovePatternSet() ){
                    return;
                }
            }
            this.moveSpeed.x = 0;
            this.moveSpeed.y = 0;
            for (var i = 0; i < this.movePatternActionList.length; i++){
                switch(this.movePatternActionList[i].pattern){
                    case 'moveto':
                        this.CalculationMoveTo(i);
                        break;
                    default :
                        break;
                }
            }
            this.x += this.moveSpeed.x;
            this.y += this.moveSpeed.y;
            this.MovePatternActionListDelete();
        }
    },
    MovePatternSet: {
        value: function(){
            if ( Array.isArray(this.movePatternList) && this.movePatternList.length != 0){
                for (var i = 0; i < this.movePatternList.length; i++){
                    this.movePatternActionList.push(CloneObject(this.movePatternList.shift()));
                    if(!this.movePatternActionList[this.movePatternActionList.length - 1].together){
                        break;
                    }
                }
                if (this.flagMoveLoop){
                    for(var i = 0; i < this.movePatternActionList.length; i++){
                        this.movePatternList.push(CloneObject(this.movePatternActionList[i]));
                    }
                }
                return true;
            }
            return false;
        }
    },
    MovePatternActionListDelete: {
        value: function(){
            for(var i = 0; i < this.movePatternActionList.length; i++){
                if ( this.movePatternActionList[i].frame == 0){
                    this.movePatternActionList.splice(i,1);
                    i--;
                }
            }
        }
    },

    //+----------- Calculation  Move Pattern -----------+//
    CalculationMoveTo: {
        value: function(_num){
            this.moveSpeed.x += (this.movePatternActionList[_num].x - this.x) / this.movePatternActionList[_num].frame;
            this.moveSpeed.y += (this.movePatternActionList[_num].y - this.y) / this.movePatternActionList[_num].frame;
            this.movePatternActionList[_num].frame--;
        }
    },

    //+----------- Move Pattern Set API -----------+//
    MoveForward: {
        value: function(_speedX, _speedY, _frame){
            this.movePatternList.push({pattern:'moveforward', speedX:_speedX, speedY:_speedY, frame:_frame, 
                                       together:false, flag:true});
            return this;
        }
    },
    MoveTo: {
        value: function(_x, _y, _frame){
            this.movePatternList.push({pattern:'moveto', x:_x, y:_y, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    MoveBy: {
        value: function(_x, _y, _frame){
            this.movePatternList.push({pattern:'moveby', x:_x, y:_y, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    MoveWait: {
        value: function(_frame){
            this.movePatternList.push({pattern:'movewait', frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    Rotation: {
        value: function(_rad, _frame){
            this.movePatternList.push({pattern:'rotation', rad:_rad, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    And: {
        value: function(){
            this.movePatternList[this.movePattern.length].together = true;
            return this;
        }
    },
    Loop: {
        value: function(){
            this.flagMoveLoop = true;
        }
    },

    SetImage: {
        value: function(_image){
            this.image = _image;
        }
    },


    //+----------- Touch -----------+//
    Touch: {
        value: function(){
        }
    },
    BaseTouch:{
        value: function(){
            if(this.flagTouch){
                this.Touch();
            }
        }
    },

    //+----------- Other -----------+//
    Debug: {
        value: function(){
            console.log(this);
        }
    }
});
