apps.screenmeth = {
	"name": "ScreenMeth",
	"exec": scrnmeth,
	"icon": "snowflake.png"
}

function scrnmeth(){
	html2canvas(document.body).then(canvas => {
		document.body.innerHTML="";
    document.body.appendChild(canvas)
	});
}