/*
 * Last Update 2014/09/14
 */
var ToyBox  = function(_w, _h){
    this.Init(_w, _h);
};
Object.defineProperties(ToyBox.prototype, {
//------------------------- Variable -------------------------//
    fps: {
        set: function(_fps){this._fps = _fps;},
        get: function(){return this._fps;}
    },
    time: {
        set: function(_time){this._time = _time;},
        get: function(){return this._time;}
    },
    //----- Gamse source -----//
    image: {
        set: function(_image){this._image = _image;},
        get: function(){return this._image;}
    },
    sound: {
        set: function(_sound){this._sound = _sound;},
        get: function(){return this._sound;}
    },
    //----- Parks & Toys variable -----//
    parkList: {
        set: function(_parkList){this._parkList = _parkList;},
        get: function(){return this._parkList;}
    },
    gameWindow: {
        set: function(_gameWindow){this._gameWindow = _gameWindow;},
        get: function(){return this._gameWindow;}
    },
    deviceWindow: {
        set: function(_deviceWindow){this._deviceWindow = _deviceWindow;},
        get: function(){return this._deviceWindow;}
    },

//------------------------- Function -------------------------//
    Init: {
        value: function(_w, _h){
            this.fps            = 60;
            this.time           = 0;

            this.image          = Array();
            this.sound          = Array();

            this.parkList       = Array();

            this.gameWindow     = Array();
            this.deviceWindow   = Array();

            this.PrepareGameWindow(_w, _h);
            this.PrepareDeviceWindow();
        }
    },
    PrepareGameWindow: {
        value: function(_w, _h){
            this.gameWindow.w = _w;
            this.gameWindow.h = _h;
        }
    },
    PrepareDeviceWindow: {
        value: function(){
            this.deviceWindow.w = document.documentElement.clientWidth;
            this.deviceWindow.h = document.documentElement.clientHeight;
        }
    },

//------------------ Src Set ------------------------//
    PrepareImage: {
        value: function(_name, _src, _sw, _sh){
            this.image[_name]           = new Image();
            this.image[_name].src       = _src;
            this.image[_name].sw        = _sw;
            this.image[_name].sh        = _sh;
            this.image[_name].flag      = false;

            this.image[_name].onload    = function (){
                this.flag   = true;
                this.w = this.width; 
                this.h = this.height;
            };
        }
    },
    PrepareSound: {
        value: function(_name, _src){
        }
    },

//------------------ Park Set ------------------------//
    PullPark: {
        value: function(){
            if ( this.parkList.length > 0 ){
                this.parkList[this.parkList.length - 1].Exit();
                this.parkList.pop();
                this.parkList[this.parkList.length - 1].Start();
            }
        }
    },
    PushPark: {
        value: function(_park){
            if ( this.parkList.length > 0 ){
                this.parkList[this.parkList.length - 1].Stop();
            }
            this.parkList.push(_park);
            this.parkList[this.parkList.length - 1].Entry(this.parkList.length - 1);
        }
    },
    ReplacePark: {
        value: function(_park){
            if ( this.parkList.length > 0 ){
                this.parkList[this.parkList.length - 1].Exit();
                this.parkList.pop(_park);
            }
            this.parks.push(_park);
            this.parks[this.parks.length - 1].Entry(this.parkList.length - 1);
        }
    },

//------------------ Create ------------------------//
    CreateParkClass: {
        value: function(){
            var tmpPark = function(){};
            tmpPark.prototype = Object.create(BasePark.prototype,{});
            return tmpPark;
        }
    },
    CreatePark: {
        value: function(){
            return new BasePark(this.gameWindow, this.deviceWindow, this.fps);
        }
    },

    CreateToyClass: {
        value: function(){
            var tmpToy = function(){};
            tmpToy.prototype = Object.create(BaseToy.prototype,{});
            return tmpToy;
        }
    },
    CreateToy: {
        value: function(){
            return new BaseToy();
        }
    },

    CreateToyGroupClass: {
        value: function(){
            var tmpToyGroup = function(){};
            tmpToyGroup.prototype = Object.create(BaseToyGroup.prototype,{});
            return tmpToyGroup;
        }
    },
    CreateToyGroup: {
        value: function(){
            return new BaseToyGroup();
        }
    },

    Debug: {
        value: function(){
        }
    }
});


/*-----------------------------------------------------------------------------------
                                Common functions
-----------------------------------------------------------------------------------*/
function RandomNum(_min, _max){
    var random = Math.floor( Math.random() * ( (_max + 1) - _min ) ) + _min;
    return random;
};
function LastArray(_array){
    return _array.length - 1;
};
function CloneObject(_obj){
    var copy = _obj.constructor(); 
        for (var attr in _obj) { 
            if (_obj.hasOwnProperty(attr)) copy[attr] = _obj[attr]; 
        } 
    return copy; 
};