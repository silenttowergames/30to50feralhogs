function SonKid(){
	return {
		pos: [S().size[0] / 2, (S().size[1] / 3) + 8],
		
		yFrame: 0,
		
		frame: 0,
		
		step: function(){
			this.pos[0] += 1;
			this.pos[1] += 0.2;
		},
		
		draw: function(){
			this.frame += 1;
			
			D().drawImage(
				img('kids.png'),
				1 + ((Math.floor(this.frame / 10) % 3) * 20),
				1 + (this.yFrame * 29),
				18,
				28,
				this.pos[0] * S().zoom,
				this.pos[1] * S().zoom,
				18 * S().zoom,
				28 * S().zoom
			);
		},
	};
}

function DaughterKid(){
	const ret = SonKid();
	
	ret.yFrame = 1;
	
	ret.pos[0] -= 24;
	ret.pos[1] -= 8;
	
	return ret;
}

const
	Son = SonKid(),
	Daughter = DaughterKid()
;