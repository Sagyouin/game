var BaseToyBox  = function(){
    //----- ToyBox var -----//
    this.toys   = Array();

    //----- flag -----//
    this.updateFlag = true;
    this.touchFlag = true;
};
//-------------------------------------------------------------//
BaseToyBox.prototype.AddToy  = function(_toy){
    this.toys.push(_toy);
};
BasePark.prototype.DeleteCheckToys = function(){
    for (var i = 0; i < this.toys.length; i++) {
        if (toys[i].status == 2){
            this.DeleteToy(i);
            i--;
        }
    }
};
BasePark.prototype.DeleteToy = function(_num){
    this.toys.splice(_num,1);
};
//-------------------------------------------------------------//
BaseToyBox.prototype.OriginUpdate  = function(){
    this.Update();
    if (this.updateFlag){
        for (var i = 0; i < this.toys.length; i++) {
            this.toys[i].Update();
        }
        this.DeleteCheckToys();
    }
};
BaseToyBox.prototype.Update  = function(){
};

BaseToyBox.prototype.OriginTouch  = function(){
    this.Touch();
    if (this.touchFlag){
        for (var i = 0; i < this.toys.length; i++) {
            this.toys[i].Touch();
        }
    }
};
BaseToyBox.prototype.Touch  = function(){
};
