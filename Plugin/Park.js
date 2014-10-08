/*-----------------------------------------------------------------------------------
                                        BaseToy
-----------------------------------------------------------------------------------*/
var BasePark = function(_gameWindow, _gameDevice, _fps){
    this.Init(_gameWindow, _gameDevice, _fps);
};
Object.defineProperties(BasePark.prototype, {
//------------------------- Variable -------------------------//
    toyGroupList: {
        set: function(_toyGroupList){this._toyGroupList = _toyGroupList;},
        get: function(){return this._toyGroupList;}
    },
    canvasList: {
        set: function(_canvasList){this._canvasList = _canvasList;},
        get: function(){return this._canvasList;}
    },
    ctxList: {
        set: function(_ctxList){this._ctxList = _ctxList;},
        get: function(){return this._ctxList;}
    },
    gameWindow: {
        set: function(_gameWindow){this._gameWindow = _gameWindow;},
        get: function(){return this._gameWindow;}
    },
    deviceWindow: {
        set: function(_deviceWindow){this._deviceWindow = _deviceWindow;},
        get: function(){return this._deviceWindow;}
    },
    updateTimer: {
        set: function(_updateTimer){this._updateTimer = _updateTimer;},
        get: function(){return this._updateTimer;}
    },
    drawTimer: {
        set: function(_drawTimer){this._drawTimer = _drawTimer;},
        get: function(){return this._drawTimer;}
    },
    fps: {
        set: function(_fps){this._fps = _fps;},
        get: function(){return this._fps;}

    },

//------------------------- Function -------------------------//
    Init: {
        value: function(_gameWindow, _gameDevice, _fps){
            this.toyGroupList   = Array();
            this.canvasList     = Array();
            this.ctxList        = Array();

            this.gameWindow     = _gameWindow;
            this.deviceWindow   = _gameDevice;

            this.fps            = _fps;
        }
    },
    AddToyGroup: {
        value: function(_toyGroupList){
            this.toyGroupList.push(_toyGroupList);
        }
    },

    //+----------- Touch -----------+//
    Touch: {
        value: function(){
            this.toyGroupListTouch();
        }
    },
    BaseTouch: {
        value: function(){
            this.Touch();
        }
    },
    toyGroupListTouch:{
        value: function(){
            for (var i = 0; i < this.toyGroupList.length; i++){
                this.toyGroupList[i].BaseTouch();
            }
        }
    },

    CreateCanvas: {
        value: function(_layer){
            //----- Canvas Variable (default:full screen) -----//
            this.canvasList[this.canvasList.length - 1]                 = document.createElement('canvas');
            this.canvasList[this.canvasList.length - 1].width           = this.gameWindow.w;
            this.canvasList[this.canvasList.length - 1].height          = this.gameWindow.h;
            this.canvasList[this.canvasList.length - 1].style.width     = this.deviceWindow.w + "px";
            this.canvasList[this.canvasList.length - 1].style.height    = this.deviceWindow.h + "px";
            this.canvasList[this.canvasList.length - 1].style.position = "absolute";
            this.canvasList[this.canvasList.length - 1].style.left     = "0";
            this.canvasList[this.canvasList.length - 1].style.top      = "0";
            this.canvasList[this.canvasList.length - 1].style.zIndex   = _layer;
            document.body.appendChild(this.canvasList[this.canvasList.length - 1]);
            this.ctxList[this.canvasList.length - 1] 
                = this.canvasList[this.canvasList.length - 1].getContext('2d');
            return this.canvasList.length - 1;
        }
    },

    CreateCanvasToyGroup: {
        value: function(_layerClass){
            for (var i = 0; i < this.toyGroupList.length; i++){
                var layer = _layerClass * 100 + this.toyGroupList.layer;
                this.toyGroupList[i].canvasNum = this.CreateCanvas(layer);
            }
        }
    },

//+------------------- ToyBox Call function -------------------+//
    Entry: {
        value: function(_layerClass){
            this.CreateCanvasToyGroup(_layerClass);
            this.Start();
        }
    },
    Start: {
        value: function(){
            this.BaseUpdate();
            this.BaseDraw();
 //           this.touch.flag = true;
        }
    },
    Exit: {
        value: function(){
            this.Stop();
            this.DeleteCanvas();
        }
    },
    Stop: {
        value: function(){
            clearTimeout(this.updateTimer);
            clearTimeout(this.drawTimer);
 //           this.touch.flag = false;
        }
    },

    //+----------- Update -----------+//
    Update: {
        value: function(){
            this.ToyGroupListUpdate();
        }
    },
    BaseUpdate: {
        value: function(){
            var _this = this;
            this.Update();
            this.updateTimer = setTimeout(function (){_this.BaseUpdate();}, (1000 / this.fps));
        }
    },
    ToyGroupListUpdate: {
        value: function(){
            for (var i = 0; i < this.toyGroupList.length; i++){
                this.toyGroupList[i].BaseUpdate();
            }
        }
    },
    //+----------- Draw -----------+//
    Draw: {
        value: function(){
            this.ToyGroupListDraw();
        }
    },
    BaseDraw: {
        value: function(){
            var _this = this;
            this.Draw();
            this.drawTimer = setTimeout(function (){_this.BaseDraw();}, (1000 / this.fps));
        }
    },
    ToyGroupListDraw: {
        value: function(){
            for (var i = 0; i < this.toyGroupList.length; i++){
                    this.ctxList[this.toyGroupList[i].canvasNum].clearRect(0, 0, this.gameWindow.w, this.gameWindow.h);
                for (var j = 0; j < this.toyGroupList[i].toyList.length; j++){
                    this.DrawToy(this.toyGroupList[i].toyList[j], this.toyGroupList[i].canvasNum);
                }
            }
        }
    },
    DrawToy: {
        value: function(_toy, _canvasNum){
            this.DrawImage(_toy, _canvasNum);
        }
    },

    DrawImage: {
        value: function(_toy, _canvasNum){
            this.ctxList[_canvasNum].drawImage(
                _toy.image,
                _toy.image.sw *           (_toy.image.num % ( _toy.image.w / _toy.image.sw)),
                _toy.image.sh * Math.floor(_toy.image.num / ( _toy.image.h / _toy.image.sw)),
                _toy.image.sw,
                _toy.image.sh,
                _toy.x - ( _toy.w / 2) |0,
                _toy.y - ( _toy.h / 2) |0,
                _toy.w |0,
                _toy.h |0
            );
        }
    },

    Debug: {
        value: function(){
        }
    }
});
