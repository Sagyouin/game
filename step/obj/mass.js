var baseMassObj = function(_param){
    this.name   = 'mass';
    this.x      = _param.x;
    this.y      = _param.y;
    this.z      = 0;
    this.w      = _param.w;
    this.h      = _param.h;
    this.ctx    = _param.ctx;
    this.layer  = _param.layer;

    this.type       = _param.type;
    this.img        = Array();
    this.img.num    = this.type;

    this.cd     = Array();
    this.cd.x   = this.x;
    this.cd.y   = this.y;
    this.cd.r   = this.w / 4;


    this.speed      = {x:(-1/3 * this.w / JUMP_TIME), y:(1/2 * this.w / JUMP_TIME), z:0};
};

baseMassObj.prototype.start = function(){
    this.flag   = 1;
    this.status = 0;//0:none 1:moving
}

baseMassObj.prototype.update = function(_num){
    if (this.status == 1){
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.z += this.speed.z;
        this.tmpTime++;
        this.cd.x   = this.x;
        this.cd.y   = this.y;
        if (this.tmpTime >= JUMP_TIME){
            this.status = 0;
        }
    }
    if(this.x + this.w/2 < -50 || this.y - this.h/2 > BASE.canvas.height + 50){
        this.flag = 2;
    }
}

baseMassObj.prototype.touch = function(_param){
    if (this.status == 0 && _param.status == 3){
        this.status = 1;
        this.tmpTime = 0;
    }
}

baseMassObj.prototype.draw = function(){
    drawImage(this);
    //strokeCircle({x:this.cd.x, y:this.cd.y, r:this.cd.r, ctx:this.ctx});
}
