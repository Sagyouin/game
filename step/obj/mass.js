var baseMassObj = function(_param){
    this.name   = 'mass';
    this.x      = _param.x;
    this.y      = _param.y;
    this.z      = 0;
    this.w      = _param.w;
    this.h      = _param.h;
    this.r      = _param.w;
    this.ctx    = _param.ctx;
    this.layer  = _param.layer;

    this.type   = _param.type;
    this.img        = new Image();
    this.img.num    = this.type;
    this.img.src    = "./step/img/step.png";
    this.img.sw     = 96;
    this.img.sh     = 80; 
    this.img.sx     = 0;
    this.img.sy     = this.img.sh * this.img.num;

    this.speed      = {x:(-1/3 * this.w / JUMP_TIME), y:(1/2 * this.w / JUMP_TIME)};
};

baseMassObj.prototype.start = function(){
    this.flag   = 1;
    this.status = 0;
}

baseMassObj.prototype.update = function(_num){
    if (this.status == 1){
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.tmpTime++;
        if (this.tmpTime >= JUMP_TIME){
            this.status = 0;
        }
    }
    if(this.x + this.w/2 < -50 || this.y - this.h/2 > DEVICE.h + 50){
        deleteObject(_num);
    }
}

baseMassObj.prototype.touch = function(_param){
    if (this.status == 0 && _param.status == 3){
        this.status = 1;
        this.tmpTime = 0;
    }
}

baseMassObj.prototype.draw = function(){
    this.ctx.drawImage(this.img, this.img.sx, this.img.sy, this.img.sw, this.img.sh,
        (this.x - this.w / 2), ( this.y - this.h / 2 + this.z), this.w, this.h);
}
