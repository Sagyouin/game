var TOUCH = {x:0, y:0, num:0, status:1, allow:0};
function onTouchStart(event) {
    var rect = event.target.getBoundingClientRect();
    TOUCH.x = Math.floor( (event.touches[0].clientX - rect.left) );
    TOUCH.y = Math.floor( (event.touches[0].clientY - rect.top) );
    TOUCH.num = event.touches.length;
    TOUCH.status = 1;
    event.preventDefault();
    touchObject({status:TOUCH.status, num:TOUCH.num});
}
function onTouchMove(event) {
    var rect = event.target.getBoundingClientRect();
    TOUCH.x = Math.floor( (event.touches[0].clientX - rect.left) );
    TOUCH.y = Math.floor( (event.touches[0].clientY - rect.top) );
    TOUCH.num = event.touches.length;
    TOUCH.status = 2;
    event.preventDefault();
    touchObject({status:TOUCH.status, num:TOUCH.num});
}
function onTouchEnd(event) {
    if (TOUCH.allow == 0){
        TOUCH.allow = 1;
    TOUCH.status = 3;
    touchObject({status:TOUCH.status, num:TOUCH.num});
        TOUCH.allow = 0;
    }
}


function mouseDownListner(event){
    if (TOUCH.allow == 0){
        TOUCH.allow = 1;
        var rect = event.target.getBoundingClientRect();
        TOUCH.x = Math.floor( (event.clientX - rect.left) );
        TOUCH.y = Math.floor( (event.clientY - rect.top) );
        TOUCH.num = 1;
        TOUCH.status = 1;
        touchObject({status:TOUCH.status, num:TOUCH.num});
        TOUCH.allow = 0;
    }
}
function mouseMoveListner(event){
    if (TOUCH.allow == 0){
        TOUCH.allow = 1;
        var rect = event.target.getBoundingClientRect();
        TOUCH.x = Math.floor( (event.clientX - rect.left) );
        TOUCH.y = Math.floor( (event.clientY - rect.top) );
        TOUCH.num = 1;
        TOUCH.status = 2;
        touchObject({status:TOUCH.status, num:TOUCH.num});
        TOUCH.allow = 0;
    }
}
function mouseUpListner(event){
    if (TOUCH.allow == 0){
        TOUCH.allow = 1;
        TOUCH.status = 3;
        touchObject({status:TOUCH.status, num:TOUCH.num});
        TOUCH.allow = 0;
    }
}
function contextMenu(event){
    event.preventDefault();
    if (TOUCH.allow == 0){
        TOUCH.allow = 1;
        TOUCH.num = 2;
        TOUCH.status = 3;
        touchObject({status:TOUCH.status, num:TOUCH.num});
        TOUCH.allow = 0;
    }
}
