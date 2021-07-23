// let canvas = document.getElementById("analogic_clock");
// let ctx = canvas.getContext("2d");
setInterval(function () {
	let hours = (new Date().getHours());
	let strhours = hours.toString();//"0".repeat(hours<10) + hours;
	let mins = (new Date().getMinutes());
	let strmins = "0".repeat(mins<10) + mins;
	let secs = (new Date().getSeconds());
	let strsecs = "0".repeat(secs<10) + secs;
	document.getElementById("digital_clock").innerHTML = strhours + ":" + strmins + ":" + strsecs;
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.beginPath();
	// //hours
	// ctx.strokeStyle = "#000000";
	// ctx.lineWidth = 5;
	// ctx.moveTo(((Math.sin(hours)*120)+25), ((Math.cos(hours/-6)*120)+25)); // fixed
	// ctx.lineTo(50, 50);
	// ctx.stroke(); 
	// //minutes
	// ctx.strokeStyle = "#404040";
	// ctx.lineWidth = 3;
	// ctx.moveTo(((Math.sin(mins/-30)*120)+25), ((Math.cos(mins/-30)*120)+25));
	// ctx.lineTo(50, 50);
	// ctx.stroke();
	// //seconds
	// ctx.strokeStyle = "#FF0000";
	// ctx.lineWidth = 2;
	// ctx.moveTo(((Math.sin(secs/-30)*3)+25), ((Math.cos(secs/-30)*3)+25));
	// ctx.lineTo(50, 50);
	// ctx.stroke();
}); // you can leave the number, milliseconds are not my thing 