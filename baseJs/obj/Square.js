var squareObj = function (){};

squareObj.prototype.start = function(_param){
    this.name = 'window';
    this.x = _param.x;
    this.y = _param.y;
    this.w = _param.w;
    this.h = _param.h;
    this.rad = _param.rad;
    this.ctx = _param.ctx;
    this.flag = true;
    this.status = false;
}

squareObj.prototype.update = function(){
    this.rad += Math.PI / 120;
}

squareObj.prototype.draw = function(){
    if (this.flag){
        if (this.status){
            fillSquare(this);
        }else{
            strokeSquare(this);
        }
    }
}

squareObj.prototype.touch = function(_param){
    this.status = false;
    if (inSquare(TOUCH,this) && ( _param == 1 || _param == 2)){
        this.status = true;
    }
}
