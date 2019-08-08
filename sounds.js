const Sounds = {};

function sound(name, type){
	if(type){
		Sounds[name] = new Howl({ src: [ name ], loop: type == 'music',});
		Sounds[name].type = type;
	}
	
	Sounds[name]._volume = volume(Sounds[name].type);
	
	return Sounds[name];
}

function loadSounds(){
	sound('shoot0.wav', 'sfx');
	sound('shoot1.wav', 'sfx');
	sound('shoot2.wav', 'sfx');
	sound('shoot3.wav', 'sfx');
	
	sound('reload.wav', 'sfx');
	
	sound('noammo.wav', 'sfx');
	
	sound('hit.wav', 'sfx');
	sound('hurt.wav', 'sfx');
	sound('death.wav', 'sfx');
	sound('round.wav', 'sfx');
	
	sound('rumbling.wav', 'sfx');
	
	sound('song.ogg', 'music');
	sound('title.ogg', 'music');
}

function shootSFX(){
	const id = Math.floor(Math.random() * 4);
	
	sound(`shoot${id}.wav`).play();
}

function volume(which, n){
	if(n){
		S().volume[which] = euler(n);
	}
	
	if(which == 'master'){
		Howler.volume(S().volume[which]);
	}
	
	return S().volume[which];
}

function euler(n){
	return Math.pow(n, 2.7183);
}

function initSounds(){
	volume('master', 0.75);
	volume('music', 1);
	volume('sfx', 1);
}