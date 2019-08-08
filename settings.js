const Settings = {
	drawShots: false,
	
	fps: 60,
	size: [256, 144],
	
	shootTimer: 0,
	shootTimerLimit: 10,
	
	screenShake: [0, 0],
	screenShakeTimer: 0,
	screenShakeTimerLimit: 5,
	screenShakePos: [0, 0],
	
	shot: false,
	
	volume: {
		master: 0,
		sfx: 0,
		music: 0,
	},
};

function S(){
	return Settings;
}

function shakeX(){
	if(S().screenShakeTimer <= 0){
		return 0;
	}
	
	return S().screenShakePos[0];
}

function shakeY(){
	if(S().screenShakeTimer <= 0){
		return 0;
	}
	
	return S().screenShakePos[0];
}