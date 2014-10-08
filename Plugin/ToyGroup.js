/*-----------------------------------------------------------------------------------
                                        BaseToyGroup
-----------------------------------------------------------------------------------*/
var BaseToyGroup = function(){
    this.Init();
};
Object.defineProperties(BaseToyGroup.prototype, {
//------------------------- Variable -------------------------//
    //+----------- Array -----------+//
    layer: {
        set: function(_layer){this._layer = _layer;},
        get: function(){return this._layer;},
    },
    toyList: {
        set: function(_toyList){this._toyList = _toyList;},
        get: function(){return this._toyList;},
    },

//------------------------- Function -------------------------//
    Init: {
        value: function(){
            this.layer  = 0;
            this.toyList   = Array();
        }
    },
    AddToy: {
        value: function(_toy){
            this.toyList.push(_toy);
        }
    },

    Update: {
        value: function(){
            this.toyListUpdate();
        }
    },
    BaseUpdate: {
        value: function(){
            this.Update();
        }
    },
    toyListUpdate: {
        value: function(){
            for (var i = 0; i < this.toyList.length; i++){
                this.toyList[i].BaseUpdate();
            }
        }
    },


    //+----------- Touch -----------+//
    Touch: {
        value: function(){
            this.toyListTouch();
        }
    },
    BaseTouch: {
        value: function(){
            this.Update();
        }
    },
    toyListTouch:{
        value: function(){
            for (var i = 0; i < this.toyList.length; i++){
                this.toyList[i].BaseTouch();
            }
        }
    }

});
