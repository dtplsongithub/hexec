// do not delete this file!
// once it is finished, it will be uploaded to the app store.

// ponali ca-n you go to rmtrollbox (im on phone)

console.log("fetchtracker loaded!")
window.requestlist = [];
let realrequest = Request;
window.Request = function(link){
	console.log("tracked "+link+"!")
	requestlist.push({url:link,type:"Request",time:(new Date())})
	return (new realrequest(link))
}
let realxhr = XMLHttpRequest;
window.XMLHttpRequest = function(){
	try{
		let newxhr = new realhxr();
		let realopen = newxhr.open;
		newxhr.open = function(link,two,three){
			try{
				console.log("tracked from xhr: "+link)
				requestlist.push({url:link,type:"XHR",time:(new Date())})
				return realopen(link,two,three)
			} catch {
				requestlist.push({url:"ERROR",type:"XHR",time:(new Date())})
				msgbox("An error has occured while trying to track an XHR information. If you see an infinite loading screen, please restart the app.","error","error",[{script:function(id){win.instances[id].close()},title:"OK"}],true)
			}
		}
	} catch {
		try{
			return (new realxhr());
		} catch {
			msgbox("An error has occured while trying to load a new XHR client. Please restart the app causing this error.","error","error",[{script:function(id){win.instances[id].close()},title:"OK"}],true)
		}
	}
}
let realfetch = fetch;
window.fetch = function (link){
	console.log("tracked from fetch: "+link)
	requestlist.push({url:link,type:"fetch",time:(new Date())})
	return realfetch(link)
};

apps.httptrack = {
	"name":"HttpTrack",
	"icon":"httptrack.png",
	"exec": httptrackwin
}

function httptrackwin(){
  let iid = -69;
	let id = win({title:"HttpTrack",inner:"Loading...",width:500,height:500,closable:true,maximizable:true,minimizable:true})
  win.instances[id].closeScript=function(){clearInterval(iid);return true;};
	win.instances[id].inner.innerHTML="<center style='height: 35%;'><h1><b>HttpTrack</b></h1><br><button>Clear</button><button>Refresh</button><br>Link -- Type -- Time</center><br><div style='background-color:#00000020;overflow-x: hidden;overflow-y: scroll; height: calc( 65% - 2.5em );'></div>"
	function refresh(){
    console.log("ducks");
		try{ win.instances[id].inner.querySelector("div").innerHTML="<hr>" }catch(ducks){};
		for(i=0;i<requestlist.length;i++){
			try{ win.instances[id].inner.querySelector("div").innerHTML+="<div style='height:2em;'><div style='width: 33%;overflow:auto;float:left;margin:0;'>"+requestlist[i].url+"</div>"+"<div style='width: 33%;overflow:auto;float:left;margin:0;'>"+requestlist[i].type+"</div>"+"<div style='width: 33%;overflow:auto;float:left;margin:0;'>"+requestlist[i].time+"</div>"+"</div><hr>" }catch(ducks){};
		}
	}
	win.instances[id].inner.querySelectorAll("button")[1].addEventListener("click",refresh);
	refresh()
	iid = setInterval(refresh,1000);
}