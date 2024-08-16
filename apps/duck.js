apps.duck = {
	"name": "duck.hap",
	"exec": duck,
	"icon": "duck.png"
}

function duck() {
	let allimgs = document.querySelectorAll("img");
	for (i = 0; i < allimgs.length; i++) {
		allimgs[i].src = "/images/icons/duck.png";
	};
  //Who added lines below? idk ponali i think
  //LOL
	setInterval(() => {
		let id = win({ title: "quack", inner: ('<marquee>quack</marquee><br>'.repeat(10)), closable: false, maximizable: false, minimizable: false, width: 500, height: 500 });
		win.instances[id]
	}, 500)
}