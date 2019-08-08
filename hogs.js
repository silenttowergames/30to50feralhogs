function hogStep(){
	const
		remove = [],
		shot = S().shot
	;
	
	for(const hog of hogs){
		hog.step();
		
		if(
			!hog.dead
			&&
			shot
			&&
			shot[0] > hog.pos[0] && shot[1] > hog.pos[1]
			&&
			shot[0] < hog.pos[0] + hog.width && shot[1] < hog.pos[1] + hog.height
		){
			Run.hits++;
			hog.dead = true;
			hog.deadTimer = hog.deadTimerLimit;
			setTimeout(() => sound('hit.wav').play(), (1000 / 60) * 5);
		}
		
		if(hog.remove){
			remove.push(hog);
		}
	}
	
	for(const hog of remove){
		let index = hogs.indexOf(hog);
		
		hogs.splice(index, 1);
	}
}

function hogDraw(){
	for(const hog of hogs){
		hog.draw();
	}
}

function hog(){
	const ret = {
		pos: [ -64, 64 ],
		posYinit: 0,
		
		width: 36,
		height: 20,
		
		dead: false,
		deadTimer: 0,
		deadTimerLimit: 45,
		
		velocity: 2,
		
		redHog: false,
		
		remove: false,
		
		step: function(){
			this.pos[0] += this.velocity;
			
			if(this.div > 0){
				this.pos[1] = this.posYinit + (this.pos[0] / this.div) * (this.NorP ? 1 : -1);
			}
			
			if(this.dead){
				const dec = Math.random() * 0.1;
				
				this.velocity = Math.max(dec, this.velocity - dec);
				
				if(this.velocity == dec){
					this.velocity = 0;
				}
				
				if(this.deadTimer-- <= 0){
					this.remove = true;
				}
			}
		},
		
		draw: function(){
			if(this.deadTimer > 0 && this.deadTimer % 8 == 0){
				return;
			}
			
			const
				frame = this.dead ? 3 : Math.max(0, Math.round((this.pos[0] + 64) / (S().size[0] / 30)) % 3),
				frameY = this.redHog
			;
			
			D().drawImage(
				img('hogs.png'),
				1 + (frame * 36),
				1 + (frameY ? 20 : 0),
				35,
				20,
				(this.pos[0] + shakeX()) * S().zoom,
				(this.pos[1] + shakeY()) * S().zoom,
				35 * S().zoom,
				20 * S().zoom
			);
		},
	};
	
	ret.posYinit = ret.pos[1] = (ret.pos[1] + (Math.random() * 40) - 20);
	
	ret.div = (Math.random() * 5) + 15;
	
	ret.NorP = ret.posYinit < 60;
	
	return ret;
}

function redHog(){
	const ret = hog();
	
	ret.pos[1] = 60;
	ret.redHog = true;
	
	ret.step = function(){
			let
			Xdif = 200 - this.pos[0],
			Ydif = 144 - this.pos[1]
		;
		
		this.rotation = (Math.atan2(Ydif, Xdif) * (180 / Math.PI)) + 55;
		
		this.pos[0] += Math.sin(this.rotation * Math.PI / 180) * this.velocity;
		this.pos[1] += Math.cos(this.rotation * Math.PI / 180) * this.velocity;
		
		if(this.pos[0] > 180){
			Dad.hit();
			this.remove = true;
		}
		
		if(this.dead){
			const dec = 0.1;
			
			this.velocity = Math.max(dec, this.velocity - dec);
			
			if(this.velocity == dec){
				this.velocity = 0;
			}
			
			if(this.deadTimer-- <= 0){
				this.remove = true;
			}
		}
	};
	
	return ret;
}

const hogs = [];