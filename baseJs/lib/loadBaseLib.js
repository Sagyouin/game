function include(_file){
    var script = document.createElement('script');
    script.src = _file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

var GAME_BASE_DIR = "./baseJs";
var GAME_BASE_LIB_DIR = GAME_BASE_DIR + "/lib";
include(GAME_BASE_LIB_DIR + "/baseLib.js");
include(GAME_BASE_LIB_DIR + "/touch.js");
include(GAME_BASE_LIB_DIR + "/draw.js");
