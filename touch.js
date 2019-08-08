function touchEvents(){
	C().addEventListener('mousedown', touchHandler);
	C().addEventListener('mousemove', touchHandler);
	C().addEventListener('touchstart', touchHandler);
	C().addEventListener('touchmove', touchHandler);
	window.addEventListener('mousedown', startTouching);
	window.addEventListener('mouseup', stopTouching);
	window.addEventListener('touchstart', startTouching);
	window.addEventListener('touchend', stopTouching);
}

function startTouching(){
	S().dragging = true;
}

function stopTouching(){
	S().draggingDelay = false;
}

function touchHandler(e){
	if(e.type == 'mousemove' && !S().dragging){
		return;
	}
	
	let pos;
	
	if(e.type == 'mousedown' || e.type == 'mousemove'){
		pos = [ e.x, e.y ];
	}else{
		const touch = e.changedTouches[0];
		
		pos = [ touch.clientX, touch.clientY ];
	}
	
	const rect = C().getBoundingClientRect();
	pos = [ pos[0] - rect.left, pos[1] - rect.top ];
	
	pos[0] = Math.round(pos[0] / S().zoom);
	pos[1] = Math.round(pos[1] / S().zoom);
	
	MPos.X = pos[0];
	MPos.Y = pos[1];
}

function shoot(x, y){
	if(S().shootTimer > 0){
		return;
	}
	
	if(x === undefined || y === undefined){
		x = MPos.X;
		y = MPos.Y;
	}
	
	shootSFX();
	
	S().shootTimer = S().shootTimerLimit;
	
	if(S().screenShakeTimer <= 0){
		S().screenShakeTimer = S().screenShakeTimerLimit;
	}
	
	addDot(x, y);
}

const dots = [];
function addDot(x, y){
	dots.push([x, y]);
}

const MPos = {
	X: 0,
	Y: 0,
};