apps.rate = {
	"name" : "rate HEXEc",
	"exec" : rate,
	"icon" : "star.gif"
}

window.isRated=false; // ah

function rate() {
	let id = win({
		title: "rate HEXEc",
		inner: "<div id='rating-view' style='text-align:right;position:relative;top:calc(100% - (1em + 8px));'>loading...</div><center><small>rate HEXEc</small></center><br><input type='number' min='1' max='5' name='ratingnumber' placeholder='Number of stars to rate'></input><button>Rate it, i'm hyped!</button>",
		minizable: true,
		closable: true,
		maximizable: false
	})
	if(window.isRated){
		win.instances[id].inner.innerHTML='You cannot rate again beacause you already rated :('
		return
	}
	fetch("https://hexec-sevrer.dateplays.repl.co/get-rating").then((data)=>data.text()).then((atext)=>{
		win.instances[id].inner.children[0].innerText=Math.round(parseInt(atext)*10)/10 + " stars"
	})
	win.instances[id].inner.querySelector("button").addEventListener("click",function(){
		window.isRated=true;
		fetch("https://hexec-sevrer.dateplays.repl.co/rate?r="+win.instances[id].inner.querySelector("input").value).then((data)=>{data.text();win.instances[id].inner.innerHTML='<small>Working on it...</small>';}).then(function(){
			win.instances[id].inner.innerHTML='<i>Your Rating has been sent!</i>';
		})
	})
}