var baseFadeObj = new baseObj();


baseFadeObj.start = function(_type){
    this.param.name = 'fade';
    this.param.type = _type;
    this.param.time = 0;
    this.param.flag = 1;

    switch(this.param.type){
        case "black_out":
            this.alpha = 0;
            this.end_time = FPS.update;
            setTimeout("enterScene('black_in')", (1000 / FPS.update) * this.end_time);
            break;

        case "black_in":
            this.alpha = 1.0;
            this.end_time = FPS.update;
            setTimeout("execScene()", (1000 / FPS.update) * this.end_time );
            break;
    }
}

baseFadeObj.update = function(){
    if (this.param.time < this.end_time){
        switch(this.param.type){
            case "black_out":
                this.alpha = ( 1.0 / this.end_time ) * this.param.time ;
                break;

            case "black_in":
                this.alpha = 1.0 - ( 1.0 / this.end_time ) * this.param.time ;
                break;
        }
        this.param.time ++;
    }else{
        this.param.flag = 0;
    }
}


baseFadeObj.draw = function(){
    if (this.param.flag == 1){
        switch(this.param.type){
            case "black_out":
                CTX[LAYER.effect].fillStyle = "rgba(0,0,0," + this.alpha + ")";
                CTX[LAYER.effect].fillRect(0 * RATIO, 0 * RATIO, CANVAS[LAYER.effect].width * RATIO, CANVAS[LAYER.effect].height * RATIO);
                break;

            case "black_in":
                CTX[LAYER.effect].fillStyle = "rgba(0,0,0," + this.alpha + ")";
                CTX[LAYER.effect].fillRect(0 * RATIO, 0 * RATIO, CANVAS[LAYER.effect].width * RATIO, CANVAS[LAYER.effect].height * RATIO);
                break;
        }
    }
}

var FadeObj = baseFadeObj;
