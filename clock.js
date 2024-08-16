setInterval(function () {
	let hours = (new Date().getHours());
	let strhours = hours.toString();//"0".repeat(hours<10) + hours;
	let mins = (new Date().getMinutes());
	let strmins = "0".repeat(mins<10) + mins;
	let secs = (new Date().getSeconds());
	let strsecs = "0".repeat(secs<10) + secs;
	document.getElementById("digital_clock").innerHTML = strhours + ":" + strmins + ":" + strsecs;
}); // you can leave the number, milliseconds are not my thing 