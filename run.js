let Run = false;

function run(){
	return {
		hogs: 0,
		hogLimit: 51,
		
		hits: 0,
		hp: 3,
		
		round: 1,
		
		timer: -120,
		timerInit: -120,
		
		postRoundTimer: 120,
		postRoundTimerLimit: 120,
		
		step: function(){
			if(this.hogs >= this.hogLimit){
				if(this.postRoundTimer-- <= 0){
					this.postRoundTimer = this.postRoundTimerLimit;
					this.timer = this.timerInit;
					this.hogs = 0;
					this.round++;
				}
				
				return;
			}
			
			this.timer++;
			
			if(this.timer < 0){
				return;
			}
			
			if(this.timer % 30 == 0){
				if(this.hogs < (this.hogLimit - 2) && Math.random() * 10 < 1){
					for(let i = 0; i < 2; i++){
						hogs.push(new hoglet(30 + (20 * (i + 1))));
					}
					
					this.hogs += 1;
				}else if(Math.random() * 10 < 1){
					hogs.push(new redHog());
				}else{
					hogs.push(new hog());
				}
				
				this.hogs++;
			}
		},
		
		hud: function(){
			if(this.timer < 0){
				D().fillStyle = '#000';
				D().fillRect(((S().size[1] - 4) / 2) * S().zoom, 6 * S().zoom, 124 * S().zoom, 10 * S().zoom);
				text(`ROUND ${this.round}`, S().size[1] / 2, 8, 8);
			}
			
			if(Dad.clip <= 5){
				D().fillStyle = '#000';
				D().fillRect(((S().size[1] - 4) / 2) * S().zoom, 6 * S().zoom, 124 * S().zoom, 20 * S().zoom);
				//text('SHOOT  YOURSELF', S().size[1] / 2, 8, 8);
				text('   CLICK GUN   ', S().size[1] / 2, 8, 8);
				text('   TO RELOAD   ', S().size[1] / 2, 16, 8);
			}
			
			text(`CLIP: ${Dad.clip}`, 1, S().size[1] - 17, 8);
			text(`AMMO: ${Dad.ammo}`, 1, S().size[1] - 8, 8);
			text(`ROUND ${this.round}`, S().size[0] - 160, S().size[1] - 17, 8);
			text(`KILLS: ${this.hits}`, S().size[0] - 160, S().size[1] - 8, 8);
			
			for(let i = 0; i < Dad.health; i++){
				D().drawImage(
					img('heart.png'),
					(S().size[0] - 1 - (9 * (i + 1))) * S().zoom,
					0,
					10 * S().zoom,
					9 * S().zoom
				);
			}
		},
	};
}