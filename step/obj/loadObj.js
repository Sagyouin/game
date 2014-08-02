var BASE_DIR        = "./step";
var OBJ_BASE_DIR    = BASE_DIR + "/obj";
var IMAGE_BASE_DIR  = BASE_DIR + "/img";

include(OBJ_BASE_DIR + "/player.js");
include(OBJ_BASE_DIR + "/mass.js");
include(OBJ_BASE_DIR + "/spawnMass.js");

var JUMP_TIME = 8;
var BASE_TILE = {w:64, h:32};
var MAX_MASS = 27;

function sceneLoad(_scene){
    resetObject();
    switch(_scene){
        case 'loadSrc':
            BASE.layer = 4;
            setImage({name:'player', src:IMAGE_BASE_DIR + '/player.png'});
            sceneLoad('start');
            break;
        case 'start':
            var player = new basePlayerObj({x:86, y:315, w:64, h:96, ctx:BASE.ctx, layer:3});
            addObject(player);
            //var spawnMass = new baseSpawnMassObj ();
            //addObject(spawnMass);
            break;
        default:
            break;
    }
}
