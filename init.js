window.addEventListener('contextmenu', event => event.preventDefault());

window.addEventListener('load', function(){
	resize();
	touchEvents();
	loadSounds();
	initSounds();
	
	S().gameInterval = setInterval(() => { step(); draw(); }, 1000 / S().fps);
});

const intro = {
	text: '"Run, kids!"',
	timer: [ false, 200, 10, 10 ],
};
let started = false;

function step(){
	if(S().deleteRun){
		S().deleteRun = undefined;
		Run = false;
	}
	
	if(S().screenShakeTimer > 0){
		S().screenShakeTimer--;
		S().screenShakePos = [(Math.random() * 2) - 1, (Math.random() * 2) - 1];
	}
	
	if(!started){
		if(intro.timer[0] === false){
			if(S().dragging && intro.timer[2] >= intro.timer[3]){
				intro.timer[0] = intro.timer[1];
				sound('rumbling.wav').play();
				S().screenShakeTimer = 150;
				intro.timer[2] = 0;
			}else if(intro.timer[2] < intro.timer[3]){
				intro.timer[2]++;
			}
		}else{
			if(intro.timer[0]-- <= 0){
				S().dragging = false;
				started = true;
				Run = new run();
			}
			
			Son.step();
			Daughter.step();
		}
		
		Dad.step();
		
		return;
	}
	
	if(S().shootTimer > 0){
		S().shootTimer--;
	}
	
	if(S().dragging && MPos.X > S().size[0] - 70 & MPos.Y > S().size[1] - 60){
		reload();
	}else if(S().dragging && S().shootTimer == 0){
		shoot();
	}
	
	if(Run){
		Run.step();
	}
	
	Dad.step();
	hogStep();
}

function draw(){
	// Preliminary
	D().clearRect(0, 0, C().width, C().height);
	D().imageSmoothingEnabled = false;
	D().fillStyle = 'rgb(157, 206, 109)';
	D().fillRect(0, 0, C().width, C().height);
	
	// Backdrop
	D().drawImage(
		img('backdrop_mockup.png'),
		0,
		0,
		S().size[0] * S().zoom,
		(S().size[1] - 16) * S().zoom
	);
	
	// Backdrop that shakes
	D().drawImage(
		img('backdrop_mockup.png'),
		shakeX() * S().zoom,
		shakeY() * S().zoom,
		S().size[0] * S().zoom,
		(S().size[1] - 16) * S().zoom
	);
	
	// Hogs
	hogDraw();
	
	// HUD black bar
	D().fillStyle = '#000';
	D().fillRect(0, (S().size[1] - 18) * S().zoom, S().size[0] * S().zoom, 18 * S().zoom);
	
	// HUD
	if(Run){
		Run.hud();
	}
	
	// Intro text
	if(!started){
		Son.draw();
		Daughter.draw();
		
		if(intro.timer[0] === false){
			D().fillStyle = '#000';
			D().fillRect(44 * S().zoom, 44 * S().zoom, 182 * S().zoom, 39 * S().zoom);
			text('HOG ASSAULT', 48, 48, 16, '#FFF');
			text('    Click to Start', 48, 72, 8, '#FFF');
		}else{
			text(intro.text, 64, S().size[1] - 12, 8);
		}
	}
	
	// Dad
	Dad.draw();
	
	// Reset shot now
	S().shot = false;
	
	if(S().draggingDelay === false){
		S().dragging = false;
		S().draggingDelay = undefined;
	}
}