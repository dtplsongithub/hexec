$(document).ready(function() {
	var requestAnimationFrame = window.requestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.msRequestAnimationFrame;
	
	// this keeps from resizing
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	let width = canvas.width;
	let height = canvas.height;
	function setVars(){
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		width = canvas.width;
		height = canvas.height;
	}
	setVars();
	setTimeout(setVars,5000)
	
	// initial variables
	var num = Math.round((innerWidth*innerHeight)/10000);
	var radius = 2;
	var thickness = 1;
	var color = '#FFFFFF';
	var line_distance = 100;
	
	// array for the particles
	var particles = [];
	for (var i = 0; i < num; i++) {
		particles.push(
			new create_particle()
		);
	}
	
	function create_particle() {
		// Random position
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		
		// Velocity
		this.vx = Math.random() * 2;
		this.vy = Math.random() * 2;
		
		// Color & Radius
		this.color = color;
		this.radius = radius;  
	}
	
	// draws the background and the particles
	function draw() {
		ctx.fillStyle='#050505';
		ctx.fillRect(0, 0, width, height);
		//
		for (var i = 0; i < particles.length; i++) {
			var a = particles[i];
			for (var j = 0; j < particles.length; j++) {
				var b = particles[j];
				if (Math.abs(b.x - a.x) < line_distance && Math.abs(b.y - a.y) < line_distance) {
					ctx.beginPath();
					ctx.lineWidth = thickness;
					ctx.strokeStyle = color;
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.stroke();
				}
			}
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(a.x, a.y, a.radius, Math.PI * 2, false);
			ctx.fill();
			a.x += a.vx;
			a.y += a.vy;
			
			// To prevent the balls from moving out of the canvas
			if (a.x < radius) a.vx *= (a.vx / -a.vx);
			if (a.y < radius) a.vy *= (a.vy / -a.vy);
			if (a.x > width - radius) a.vx *= (-a.vx / a.vx);
			if (a.y > height - radius) a.vy *= (-a.vy / a.vy);
		}
		requestAnimationFrame(draw);
	}
	draw();
});

// disable screensaver on click
window.addEventListener("click", cancelScreensaver);
window.addEventListener("onmousemove", cancelScreensaver);
window.addEventListener("onmouseenter", cancelScreensaver);
window.addEventListener('contextmenu', cancelScreensaver);
window.addEventListener("keydown", cancelScreensaver);
window.addEventListener("keyup", cancelScreensaver);
window.addEventListener("keypress", cancelScreensaver);
function cancelScreensaver(e) {
  if (e) {
    if (e.keyCode == 123) return;
    if (e.preventDefault) e.preventDefault();
  }

	if(window.parent.click) {
		window.parent.click();
	} else if(window.parent.document.click) {
		window.parent.document.click();
	} else if(window.parent.document.body.click) {
		window.parent.document.body.click();
	}
}