/*base*/
function fillSquare(_param){
    _param.ctx.save();
    _param.ctx.beginPath();
    _param.ctx.fillStyle = "rgba(" +_param.red+ "," +_param.green+ "," +_param.blue+ "," +_param.alpha+ ")";
    _param.ctx.translate(_param.x, _param.y);
    _param.ctx.rotate(_param.rad);
    _param.ctx.fillRect(-_param.w/2, -_param.h/2, _param.w, _param.h);
    _param.ctx.restore();
}
function strokeSquare(_param){
    _param.ctx.save();
    if(_param.type == 1){
        _param.ctx.setLineDash([10,10]);
    }
    _param.ctx.strokeStyle = "rgba(" +_param.red+ "," +_param.green+ "," +_param.blue+ "," +_param.alpha+ ")";
    _param.ctx.beginPath();
    _param.ctx.translate(_param.x * BASE.ratio + BASE.drawOffset.x, _param.y * BASE.ratio + BASE.drawOffset.y);
    _param.ctx.rotate(_param.rad);
    _param.ctx.strokeRect(-_param.w/2 * BASE.ratio, -_param.h/2 * BASE.ratio, _param.w * BASE.ratio, _param.h * BASE.ratio);
    _param.ctx.restore();
}

function fillSquareR(_param){
    //ctx.fillStyle = C_F;
}
function strokeSquareR(_param){
    _param.ctx.save();
    if(_param.type == 1){
        _param.ctx.setLineDash([10,10]);
    }
    _param.ctx.beginPath();
    _param.ctx.strokeStyle = "rgba(" +_param.red+ "," +_param.green+ "," +_param.blue+ "," +_param.alpha+ ")";
    _param.ctx.moveTo( ( _param.x - _param.w/2 + _param.r ), _param.y - _param.h/2);
    _param.ctx.lineTo( ( _param.x + _param.w/2 - _param.r ), _param.y - _param.h/2);
    _param.ctx.arc( ( _param.x + _param.w/2 - _param.r ), (_param.y - _param.h/2 + _param.r) , _param.r, Math.PI*1.5, 0, false);
    _param.ctx.lineTo( (_param.x + _param.w/2), ( _param.y + _param.h/2 - _param.r ));
    _param.ctx.arc( _param.x + _param.w/2 - _param.r, ( _param.y + _param.h/2 - _param.r ), _param.r, 0, Math.PI*0.5, false);
    _param.ctx.lineTo( ( _param.x - _param.w/2 + _param.r ), ( _param.y + _param.h/2));
    _param.ctx.arc( ( _param.x - _param.w/2 + _param.r ), ( _param.y + _param.h/2 - _param.r), _param.r, Math.PI*0.5, Math.PI, false);
    _param.ctx.lineTo( ( _param.x - _param.w/2), _param.y - _param.h/2 + _param.r);
    _param.ctx.arc( ( _param.x - _param.w/2 + _param.r),  (_param.y - _param.h/2 + _param.r), _param.r, Math.PI, Math.PI*1.5, false);
    _param.ctx.closePath();
    _param.ctx.stroke();
    _param.ctx.restore();
}

function fillCircle(_param){
    _param.ctx.save();
    _param.ctx.beginPath();
    _param.ctx.translate(_param.x, _param.y);
    //_param.ctx.rotate(_param.rad);
    _param.ctx.fillStyle = "rgba(" +_param.red+ "," +_param.green+ "," +_param.blue+ "," +_param.alpha+ ")";
    _param.ctx.arc(0, 0, _param.r, 0, Math.PI * 2, true);
    _param.ctx.fill();
    _param.ctx.restore();
}

function strokeCircle(_param){
    _param.ctx.save();
    if(_param.type == 1){
        var distinct = _param.r * 2 * Math.PI;

        var oneline = distinct / 20;
        _param.ctx.setLineDash([oneline / 3 * 2,oneline / 3]);
    }
    _param.ctx.strokeStyle = "rgba(" +_param.red+ "," +_param.green+ "," +_param.blue+ "," +_param.alpha+ ")";
    _param.ctx.beginPath();
    _param.ctx.arc(_param.x, _param.y, _param.r, _param.rad, _param.rad + Math.PI * 180, false);
    _param.ctx.stroke();
    _param.ctx.restore();
}

function strokeEllipse(_param){
    _param.ctx.save();
    _param.ctx.beginPath();
    _param.ctx.translate(_param.x * BASE.ratio + BASE.drawOffset.x , _param.y * BASE.ratio + BASE.drawOffset.y);
    _param.ctx.scale(1,0.5);
    _param.ctx.arc(0, 0, _param.r, 0, Math.PI * 180, false);
    _param.ctx.restore();
    _param.ctx.strokeStyle = "rgba(" +_param.red+ "," +_param.green+ "," +_param.blue+ "," +_param.alpha+ ")";
    _param.ctx.stroke();
}

function strokeText(_param){
    _param.ctx.textAlign = 'center';
    _param.ctx.textBaseline = 'middle';
    //_param.ctx.font = '"' + _param.size + 'px"';
    _param.ctx.font = "30px 'ＭＳ Ｐゴシック'";
    _param.ctx.fillText(_param.text, _param.x, _param.y);
}

function drawImage(_param){
    _param.ctx.drawImage(
        IMAGE[_param.name], 
        _param.img.sx, 
        _param.img.sy, 
        _param.img.sw, 
        _param.img.sh,
        (_param.x - _param.w / 2)            * BASE.ratio + BASE.drawOffset.x, 
        (_param.y - _param.h / 2 + _param.z) * BASE.ratio + BASE.drawOffset.y,
        _param.w * BASE.ratio,
        _param.h * BASE.ratio
    );
}
