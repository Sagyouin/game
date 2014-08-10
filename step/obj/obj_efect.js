var baseEfectObj = function(){};

baseEfectObj.prototype.start = function(){
    this.name   = 'mass';
    this.x      = Random(0,WINDOW.W);
    this.y      = Random(0,WINDOW.H);
    this.r      = 10;
    this.red    = Random(0,255);
    this.blue   = Random(0,255);
    this.green  = Random(0,255);
    this.ratio  = 1.0;
    this.flag = 1;
}

baseEfectObj.prototype.update = function(){
    if (this.flag == 1){
        this.r += 5;
        if( this.r > 600){
            this.flag == 0;
        }
    }
}

baseEfectObj.prototype.touch = function(_status, _cnt){
}


baseEfectObj.prototype.draw = function(){
    baseEfectObj.prototype.drawArc(this.x,this.y,this.r, this.red, this.blue, this.green);
}

baseEfectObj.prototype.drawArc = function(_x,_y,_r,_red,_green,_blue){
    CTX[LAYER.effect].save();
    CTX[LAYER.effect].beginPath();
    CTX[LAYER.effect].strokeStyle = "rgba(" + _red + "," + _green + "," + _blue +" ,1.0)";;
    //CTX[LAYER.effect].strokeStyle = 'rgb(255, 0, 0)';
    CTX[LAYER.effect].arc(_x * RATIO, _y * RATIO, _r * RATIO, 0, Math.PI*2, false);
    CTX[LAYER.effect].stroke();
    CTX[LAYER.effect].restore();
}




function addEfectObj(){
    var Efect = new baseEfectObj();
    Efect.start();
    addGameObject(Efect);
}
