function C(){
	return document.getElementById('c');
}

function D(){
	if(!S().ctx){
		S().ctx = C().getContext('2d');
	}
	
	return S().ctx;
}

function resize(){
	C().width = S().size[0];
	C().height = S().size[1];
	
	let zoom = Math.max(1, Math.min(window.innerWidth / C().width, window.innerHeight / C().height));
	
	if(zoom > 1){
		zoom = Math.floor(zoom);
	}
	
	C().width *= zoom;
	C().height *= zoom;
	
	S().zoom = zoom;
}

window.addEventListener('resize', resize);