var BASE_DIR        = "./step";
var OBJ_BASE_DIR    = BASE_DIR + "/obj";
var IMAGE_BASE_DIR  = BASE_DIR + "/img";

include(OBJ_BASE_DIR + "/player.js");
include(OBJ_BASE_DIR + "/mass.js");
include(OBJ_BASE_DIR + "/spawnMass.js");

var JUMP_TIME = 8;
var JUMP_CNT = 8;
var BASE_TILE = {w:64, h:32};
var MAX_MASS = 27;

function sceneLoad(_scene){
    resetObject();
    switch(_scene){
        case 'loadSrc':
            BASE.layer = 4;
            setImage({name:'player', src:IMAGE_BASE_DIR + '/player.png', sw:64, sh:96, w:192, h:96});
            setImage({name:'mass',   src:IMAGE_BASE_DIR + '/mass.png',   sw:96, sh:80, w:192, h:160});
            sceneLoad('start');
            break;
        case 'start':
            var player = new basePlayerObj({x:86, y:315, w:64, h:96, ctx:BASE.ctx, layer:3});
            addObject(player);
            var spawnMass = new baseSpawnMassObj ();
            addObject(spawnMass);
            break;
        default:
            break;
    }
}
