function shoot(x, y){
	if(Dad.clip <= 0){
		sound('noammo.wav').play();
		
		S().shootTimer = S().shootTimerLimit;
		
		return;
	}
	
	if(Dad.reload > 0 || S().shootTimer > 0){
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
	
	S().shot = [x, y];
	
	Dad.clip--;
	
	addDot(x, y);
}

function reload(){
	if(Dad.ammo <= 0 || Dad.clip >= Dad.clipLimit || Dad.reload > 0){
		return;
	}
	
	Dad.reload = Dad.reloadLimit;
	
	let take = Math.min(Dad.clipLimit - Dad.clip, Dad.ammo);
	Dad.ammo -= take;
	Dad.clip += take;
}