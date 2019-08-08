let Run = false;

function run(){
	return {
		hogs: 0,
		hogLimit: 51,
		
		hits: 0,
		hitsTotal: 0,
		hp: 3,
		
		round: 1,
		
		timer: -120,
		timerInit: -120,
		
		postRoundTimer: 300,
		postRoundTimerLimit: 300,
		
		lose: false,
		
		loseCanClick: 0,
		loseCanClickLimit: 240,
		
		step: function(){
			if(this.lose === false && Dad.ammo <= 0 && Dad.clip <= 0){
				this.lose = ['You ran out of bullets!', 'Ammo laws only allow so much'];
				sound('death.wav').play();
			}
			
			if(this.hogs >= this.hogLimit){
				if(this.postRoundTimer-- <= 0){
					if(this.lose === false && this.hits >= 30 && this.hits <= 50){
						this.postRoundTimer = this.postRoundTimerLimit;
						this.timer = this.timerInit;
						this.hogs = 0;
						Dad.ammo += this.hits;
						this.hits = 0;
						this.round++;
						sound('round.wav').play();
					}else if(this.hits == 51 && this.lose === false){
						this.lose = [`A real man only ever shoots 50`, "Don't you wanna be a real man?"];
						sound('death.wav').play();
					}else if(this.lose === false && this.hits < 30){
						this.lose = ['The feral hogs got your kids!', 'You have to shoot at least 30!'];
						sound('death.wav').play();
					}
				}
			}
			
			if(Dad.health <= 0 && this.lose === false){
				this.lose = [ 'The hogs killed you!', 'They just swallowed you whole' ];
				sound('death.wav').play();
			}
			
			if(this.lose !== false){
				if(this.loseCanClick++ >= this.loseCanClickLimit && S().dragging){
					S().deleteRun = true;
					intro.timer[0] = false;
					started = false;
					S().dragging = false;
					Son = SonKid();
					Daughter = DaughterKid();
					Dad.health = Dad.healthLimit;
					Dad.clip = Dad.clipLimit;
					Dad.ammo = Dad.ammoLimit;
					hogs = [];
				}
				
				return;
			}
			
			this.timer++;
			
			if(this.timer < 0 || this.hogs >= this.hogLimit){
				return;
			}
			
			if(this.timer % 30 == 0){
				if(this.hogs < (this.hogLimit - 2) && Math.random() * 10 < 1){
					for(let i = 0; i < 2; i++){
						const _hog = new hoglet(30 + (20 * (i + 1)));
						_hog.velocity += this.round / 10;
						
						hogs.push(_hog);
					}
					
					this.hogs += 1;
				}else if(Math.random() * 10 < 1){
					const _hog = new redHog();
					_hog.velocity += this.round / 10;
					
					hogs.push(_hog);
				}else{
					const _hog = new hog();
					_hog.velocity += this.round / 10;
					
					hogs.push(_hog);
				}
				
				this.hogs++;
			}
		},
		
		hud: function(){
			if(this.timer < 0){
				D().fillStyle = '#000';
				D().fillRect(102 * S().zoom, 8 * S().zoom, 67 * S().zoom, 11 * S().zoom);
				text(`ROUND ${this.round < 10 ? ' ' : ''}${this.round}`, 104, 10, 8);
			}
			
			if(Dad.clip <= 5){
				D().fillStyle = '#000';
				D().fillRect(((S().size[1] - 4) / 2) * S().zoom, 8 * S().zoom, 124 * S().zoom, 20 * S().zoom);
				text('   CLICK GUN   ', S().size[1] / 2, 10, 8);
				text('   TO RELOAD   ', S().size[1] / 2, 18, 8);
			}
			
			if(this.lose !== false){
				// Failure message
				D().fillStyle = '#000';
				D().fillRect(6 * S().zoom, 8 * S().zoom, (256 - 12) * S().zoom, 20 * S().zoom);
				text(this.lose[0], 8, 10, 8);
				text(this.lose[1], 8, 18, 8);
				
				if(this.loseCanClick++ >= this.loseCanClickLimit){
					D().fillStyle = '#000';
					D().fillRect(((S().size[1] - 4) / 2) * S().zoom, 62 * S().zoom, 124 * S().zoom, 20 * S().zoom);
					text(`Kills: ${this.hitsTotal}`, S().size[1] / 2, 64, 8);
					text('Shoot To Retry', S().size[1] / 2, 72, 8);
				}
			}
			
			text(`CLIP: ${Dad.clip}`, 1, S().size[1] - 17, 8);
			text(`AMMO: ${Dad.ammo}`, 1, S().size[1] - 8, 8);
			text(`ROUND ${this.round}`, S().size[0] - 160, S().size[1] - 17, 8);
			text(`KILLS: ${this.hitsTotal}`, S().size[0] - 160, S().size[1] - 8, 8);
			
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