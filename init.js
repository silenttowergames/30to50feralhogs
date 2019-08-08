window.addEventListener('load', function(){
	resize();
	touchEvents();
	loadSounds();
	initSounds();
	
	S().gameInterval = setInterval(() => { step(); draw(); }, 1000 / S().fps);
});

function step(){
	if(S().screenShakeTimer > 0){
		S().screenShakeTimer--;
		S().screenShakePos = [(Math.random() * 2) - 1, (Math.random() * 2) - 1];
	}
	
	if(S().shootTimer > 0){
		S().shootTimer--;
	}
	
	if(S().dragging && MPos.X > S().size[0] - 70 & MPos.Y > S().size[1] - 60){
		reload();
	}else if(S().dragging && S().shootTimer == 0){
		shoot();
	}
	
	if(S().draggingDelay === false){
		S().dragging = false;
		S().draggingDelay = undefined;
	}
	
	if(Run){
		Run.step();
	}
	
	Dad.step();
	hogStep();
}

function draw(){
	D().clearRect(0, 0, C().width, C().height);
	
	D().imageSmoothingEnabled = false;
	
	D().fillStyle = 'rgb(157, 206, 109)';
	D().fillRect(0, 0, C().width, C().height);
	
	D().drawImage(
		img('backdrop_mockup.png'),
		0,
		0,
		S().size[0] * S().zoom,
		(S().size[1] - 16) * S().zoom
	);
	
	D().drawImage(
		img('backdrop_mockup.png'),
		shakeX() * S().zoom,
		shakeY() * S().zoom,
		S().size[0] * S().zoom,
		(S().size[1] - 16) * S().zoom
	);
	
	hogDraw();
	
	if(S().drawShots){
		D().fillStyle = '#FF00FF';
		for(let dot of dots){
			D().fillRect(
				dot[0] * S().zoom,
				dot[1] * S().zoom,
				S().zoom,
				S().zoom
			);
		}
	}
	
	D().fillStyle = '#000';
	D().fillRect(0, (S().size[1] - 18) * S().zoom, S().size[0] * S().zoom, 18 * S().zoom);
	
	if(Run){
		Run.hud();
	}
	
	Dad.draw();
	
	S().shot = false;
}