let Run = new run();

function run(){
	return {
		hogs: 0,
		hits: 0,
		hp: 3,
		
		round: 1,
		
		timer: 0,
		
		step: function(){
			if(this.hogs >= 51){
				return;
			}
			
			this.timer++;
			
			if(this.timer % 30 == 0){
				if(Math.random() * 10 < 1){
					hogs.push(new redHog());
				}else{
					hogs.push(new hog());
				}
				
				this.hogs++;
			}
		},
		
		hud: function(){
			if(Dad.clip <= 5){
				D().fillStyle = '#000';
				D().fillRect(((S().size[1] - 4) / 2) * S().zoom, 6 * S().zoom, 124 * S().zoom, 20 * S().zoom);
				text('SHOOT  YOURSELF', S().size[1] / 2, 8, 8);
				text('   TO RELOAD', S().size[1] / 2, 16, 8);
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