/*-----------------------------------------------------------------------------------
                                        BaseToy
-----------------------------------------------------------------------------------*/
var BaseToy = function(){
    this.Init();
};
Object.defineProperties(BaseToy.prototype, {
//------------------------- Variable -------------------------//
    //---------- Draw Status ----------//
    x: {
        set: function(_x){this._x = _x;},
        get: function(){return this._x;}
    },
    y: {
        set: function(_y){this._y = _y;},
        get: function(){return this._y;}
    },
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
    rad :{ 
        set: function(_rad){this._rad = _rad;},
        get: function(){return this._rad;},
    },

    //+------------ Move ------------+//
    moveSpeed:{
        set: function(_moveSpeed){this._moveSpeed = _moveSpeed;},
        get: function(){return this._moveSpeed;},
    },
    moveRad :{
        set: function(_moveRad){this._moveRad = _moveRad;},
        get: function(){return this._moveRad;},
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

            this.rad  = 0;

            this.image;
            this.imageAnimation = Array();
            this.imageFrame = Array();

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
    SetImage: {
        value: function(_image){
            this.image = _image;
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
            if ( this.movePatternActionList.length == 0 ){
                if ( !this.MovePatternSet() ){
                    return;
                }
            }

            this.moveSpeed.x = 0;
            this.moveSpeed.y = 0;

            for (var i = 0; i < this.movePatternActionList.length; i++){
                switch(this.movePatternActionList[i].pattern){
                    case 'moveTo':
                        this.CalculationMoveTo(i);
                        break;
                    case 'moveBy':
                        this.CalculationMoveBy(i);
                        break;
                    case 'rotationTo':
                        this.CalculationRotationTo(i);
                        break;
                    case 'rotationBy':
                        this.CalculationRotationBy(i);
                        break;
                    case 'circleTo':
                        this.CalculationCircleTo(i);
                        break;
                    case 'circleBy':
                        this.CalculationCircleBy(i);
                        break;
                    case 'wait':
                        this.CalculationWait(i);
                        break;
                    default :
                        break;
                }
            }
            this.MovePatternActionListDelete();

            this.x += this.moveSpeed.x;
            this.y += this.moveSpeed.y;

        }
    },
    MovePatternSet: {
        value: function(){
            if ( this.movePatternList.length != 0 ){
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
    CalculationMoveBy: {
        value: function(_num){
            this.moveSpeed.x += this.movePatternActionList[_num].x / this.movePatternActionList[_num].frame;
            this.moveSpeed.y += this.movePatternActionList[_num].y / this.movePatternActionList[_num].frame;
            this.movePatternActionList[_num].x -= this.moveSpeed.x;
            this.movePatternActionList[_num].y -= this.moveSpeed.y;
            this.movePatternActionList[_num].frame--;
        }
    },

    CalculationCircleTo: {
        value: function(_num){
            var baseRad = Math.atan2( (this.y - this.movePatternActionList[_num].y) , (this.x - this.movePatternActionList[_num].x) ) / Math.PI * 180;
            var moveRad = this.movePatternActionList[_num].rad / this.movePatternActionList[_num].frame;
            var r       = Math.sqrt( Math.pow((this.y - this.movePatternActionList[_num].y), 2) + Math.pow((this.x - this.movePatternActionList[_num].x), 2) );


            var moveX = r * Math.cos( (moveRad + baseRad ) * Math.PI / 180 ) + this.movePatternActionList[_num].x;
            var moveY = r * Math.sin( (moveRad + baseRad ) * Math.PI / 180 ) + this.movePatternActionList[_num].y;

            this.moveSpeed.x += moveX - this.x;
            this.moveSpeed.y += moveY - this.y;

            this.movePatternActionList[_num].frame--;
            this.movePatternActionList[_num].rad -= moveRad;            
        }
    },
    CalculationCircleBy: {
        value: function(_num){
            var centerX = this.x + this.movePatternActionList[_num].x;
            var centerY = this.y + this.movePatternActionList[_num].y;

            var baseRad = Math.atan2( (this.y - centerY) , (this.x - centerX) ) / Math.PI * 180;
            var moveRad = this.movePatternActionList[_num].rad / this.movePatternActionList[_num].frame;
            var r       = Math.sqrt( Math.pow((this.y - centerY), 2) + Math.pow((this.x - centerX), 2) );

            var moveX = r * Math.cos( (moveRad + baseRad ) * Math.PI / 180 ) + centerX;
            var moveY = r * Math.sin( (moveRad + baseRad ) * Math.PI / 180 ) + centerY;

            this.moveSpeed.x += moveX - this.x;
            this.moveSpeed.y += moveY - this.y;

            this.movePatternActionList[_num].frame--;
            this.movePatternActionList[_num].rad -= moveRad;
            
            this.movePatternActionList[_num].x -= moveX - this.x;
            this.movePatternActionList[_num].y -= moveY - this.y;
            
        }
    },


    CalculationRotationTo: {
        value: function(_num){
            this.rad += ( this.movePatternActionList[_num].rad - this.rad ) / this.movePatternActionList[_num].frame;
            this.movePatternActionList[_num].frame--;
        }
    },
    CalculationRotationBy: {
        value: function(_num){
            var rad = this.movePatternActionList[_num].rad / this.movePatternActionList[_num].frame;
            this.rad += rad;
            this.movePatternActionList[_num].rad -= rad;
            this.movePatternActionList[_num].frame--;
        }
    },
    CalculationWait: {
        value: function(_num){
            this.movePatternActionList[_num].frame--;
        }
    },


    //+----------- Move Pattern Set API -----------+//
    /*
    MoveForward: {
        value: function(_speedX, _speedY, _frame){
            this.movePatternList.push({pattern:'moveForward', speedX:_speedX, speedY:_speedY, frame:_frame, 
                                       together:false, flag:true});
            return this;
        }
    },
    */
    MoveTo: {
        value: function(_x, _y, _frame){
            this.movePatternList.push({pattern:'moveTo', x:_x, y:_y, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    MoveBy: {
        value: function(_x, _y, _frame){
            this.movePatternList.push({pattern:'moveBy', x:_x, y:_y, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    CircleTo: {
        value: function(_x, _y, _rad, _frame, _rotate){
            this.movePatternList.push({pattern:'circleTo', x:_x, y:_y, rad:_rad, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    CircleBy: {
        value: function(_x, _y, _rad, _frame, _rotate){
            this.movePatternList.push({pattern:'circleBy', x:_x, y:_y, rad:_rad, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    RotationTo: {
        value: function(_rad, _frame){
            this.movePatternList.push({pattern:'rotationTo', rad:_rad, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    RotationBy: {
        value: function(_rad, _frame){
            this.movePatternList.push({pattern:'rotationBy', rad:_rad, frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    Wait: {
        value: function(_frame){
            this.movePatternList.push({pattern:'wait', frame:_frame,
                                       together:false, flag:true});
            return this;
        }
    },
    And: {
        value: function(){
            this.movePatternList[this.movePatternList.length - 1].together = true;
            return this;
        }
    },
    Loop: {
        value: function(){
            this.flagMoveLoop = true;
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
