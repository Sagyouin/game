var baseSpawnMassObj = function (){
    this.name   = 'spawnMass';
    this.x      = BASE.window.w ;
    this.y      = -200 ;
    this.w      = 96;
    this.h      = 80;
    this.layer  = 0;
};

baseSpawnMassObj.prototype.start = function(){
    this.flag   = 0;//0:drawOff  1: drawOn
    this.status = 0;//0:none     1: jumping
    this.reset();
}

baseSpawnMassObj.prototype.update = function(_num){
    if (this.status == 1){
        this.tmpTime++;
        if (this.tmpTime >= JUMP_TIME){
            this.status = 0;
        }
    }
}

baseSpawnMassObj.prototype.draw = function(){
}

baseSpawnMassObj.prototype.touch = function(_param){
    if (this.status == 0 && _param.status == 3){
        this.status = 1;
        this.tmpTime = 0;
        this.create(0);
    }
}

baseSpawnMassObj.prototype.create = function(_num){
    this.pos  = randomNum(1,3); //1:left 2:right 3:duble
    this.type = 2;              //massType
    var param = Array();
    param.push({x:(this.x - 1/3 * this.w) + this.x - (1/3 * this.w) * _num,
                y:(this.y - 1/6 * this.w) + this.y + (1/2 * this.w) * _num,
                w:96, h:80, ctx:BASE.ctx, layer:1});
    param.push({x:(this.x + 1/3 * this.w) + this.x - (1/3 * this.w) * _num,
                y:(this.y + 1/6 * this.w) + this.y + (1/2 * this.w) * _num,
                w:96, h:80, ctx:BASE.ctx, layer:2});

    if (this.pos == 1){
        param[0].type = this.type;
        param[1].type = 0;
    }
    if (this.pos == 2){
        param[0].type = 0;
        param[1].type = this.type;
    }
    if (this.pos == 3){
        param[0].type = this.type;
        param[1].type = this.type;
    }
    var mass = new baseMassObj(param[0]);
    addObject(mass);
    var mass = new baseMassObj(param[1]);
    addObject(mass);
}

baseSpawnMassObj.prototype.reset = function(){
    for (var i = 15; i > 0; i--){
        this.create(i);
    }
}
