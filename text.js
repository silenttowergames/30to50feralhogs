function text(str, x, y, _size, color){
	if(!_size){
		_size = 16;
	}
	
	size = _size * S().zoom;
	
	if(!color){
		color = '#FFF';
	}
	
	D().font = `${size}px PressStart2P`;
	D().fillStyle = color;
	D().fillText(
		str,
		x * S().zoom,
		(y + _size) * S().zoom
	);
}