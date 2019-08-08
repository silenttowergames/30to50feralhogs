const Dad = {
	shake: 0,
	shakeLimit: 30,
	
	ammo: 100,
	ammoLimit: 100,
	clip: 30,
	clipLimit: 30,
	reload: 0,
	reloadLimit: 45,
	
	health: 3,
	healthLimit: 3,
	
	pos: [
		S().size[0] - 54 - 16,
		S().size[1] + 32
	],
	
	step: function(){
		if(this.reload > 0){
			this.reload--;
		}
		
		if(this.shake > 0){
			this.shake--;
		}
		
		if(started){
			if(Run.lose === false){
				this.pos = [
					S().size[0] - 54 - 16,
					S().size[1] - 60
				];
			}else{
				this.pos[0] += 0.25;
				this.pos[1] += 1;
			}
		}else{
			if(this.pos[1] == S().size[1] - 60 || intro.timer[0] === false){
				this.pos = [
					S().size[0] - 54 - 16,
					S().size[1] + 32
				];
			}
			
			if(intro.timer[0] !== false){
				this.pos[1] -= 0.4;
			}
		}
	},
	
	draw: function(){
		let
			shakeX = 0,
			shakeY = 0
		;
		
		if(
			(this.shake > 0 && this.shake % 8 == 0)
			||
			(this.reload > 0 && this.reload % 8 == 0)
		){
			return;
		}
		
		if(this.reload > 0){
			shakeX = 8;
			shakeY = 16;
		}
		
		if(this.reload > 0 || this.shake > 0 || S().shootTimer >= S().shootTimerLimit - 2){
			shakeX += Math.random() * 1;
			shakeY += Math.random() * 1;
		}
		
		D().drawImage(
			img('dad.png'),
			(this.pos[0] + shakeX) * S().zoom,
			(this.pos[1] + shakeY) * S().zoom,
			54 * S().zoom,
			60 * S().zoom
		);
	},
	
	hit: function(){
		if(this.shake > 0){
			return;
		}
		
		sound('hurt.wav').play();
		
		this.health--;
		
		this.shake = this.shakeLimit;
	},
};