var basePlayerObj = function (_param){
    this.name   = 'player';
    this.x      = _param.x;
    this.y      = _param.y;
    this.z      = 0;
    this.w      = _param.w;
    this.h      = _param.h;

    this.ctx    = _param.ctx;
    this.layer  = _param.layer;

    this.cd     = Array();
    this.cd.x   = this.x;
    this.cd.y   = this.y + this.h / 2;
    this.cd.r   = this.w / 4;

    this.img        = Array();
    this.img.num    = 0;

    this.speed      = Array();
    this.speed.x    = 0;
    this.speed.y    = 0;
    this.speed.z    = 0;

    this.jumpCnt    = 0;

    this.base   = Array();
    for (var i = 0; i < 3; i++){
        this.base[i] = {x:(this.x + (i - 1) * BASE_TILE.w / 2), y:(this.y + (i - 1) * BASE_TILE.h / 2)};
    }
};

basePlayerObj.prototype.start = function(){
    this.flag   = 1;//0:drawOFF 1:drawON
    this.status = 0;//0:none    1:jumping
    this.pos    = 1;//0:left    1:center  2:right
}

basePlayerObj.prototype.update = function(){
    if(this.status == 1){
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.z += this.speed.z;
        this.cd.x   = this.x;
        this.cd.y   = this.y + this.h / 2;;
        this.tmpTime++;
        if (this.tmpTime == (JUMP_TIME / 2)){
            this.speed.z *= -1;
        }
        if (this.tmpTime >= JUMP_TIME){
            this.status = 0;
            this.hitMassCheck();
        }
    }
}

basePlayerObj.prototype.draw = function(){
    this.img.sx = this.img.sw * this.img.num;
    drawImage(this);
    //strokeCircle({x:this.cd.x, y:this.cd.y, r:this.cd.r, ctx:this.ctx});
}

basePlayerObj.prototype.touch = function(_param){
    if (this.status == 0 && _param.status == 3){
        this.status = 1;
        this.tmpTime = 0;
        var tmpPos  = this.pos;
        if (_param.num == 1){
            this.pos = 0;
        }
        if (_param.num == 2){
            this.pos = 2;
        }
        this.jumpCnt++;
        this.jumpSet(tmpPos, this.pos);
    }
}

basePlayerObj.prototype.jumpSet = function(_posOld, _posNew){
    this.speed.x = -(this.base[_posOld].x - this.base[_posNew].x) /  JUMP_TIME;
    this.speed.y = -(this.base[_posOld].y - this.base[_posNew].y) /  JUMP_TIME;
    this.speed.z = -8;
}

basePlayerObj.prototype.hitMassCheck = function(){

    for(var i = 0; i < OBJ.length; i++){
        if (OBJ[i].name == 'mass'){
            if (hitRing(this.cd, OBJ[i].cd)){
                if (OBJ[i].type == 0){
                    sceneLoad('start');
                }
                break;
            }
        }
    }
}
