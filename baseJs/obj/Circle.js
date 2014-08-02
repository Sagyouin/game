var circleObj = function (){};

circleObj.prototype.start = function(_param){
    this.name = 'window';
    this.x = _param.x;
    this.y = _param.y;
    this.r = _param.r;
    this.ctx = CTX;
    this.flag = true;
    this.status = false;
}

circleObj.prototype.update = function(){
}

circleObj.prototype.draw = function(){
    if (this.flag){
        if (this.status){
            fillCircle(this);
        }else{
            strokeCircle(this);
        }
    }
}

circleObj.prototype.touch = function(_param){
    this.status = false;
    if (inRing(TOUCH,this) && ( _param == 1 || _param == 2)){
        this.status = true;
    }
}
