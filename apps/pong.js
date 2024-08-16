apps.pong = {
	"name":"pon.game",
	"exec": pong,
  hide:true,
	"icon": "pong.png" // WTFFFF
}
function pong(){
	let id = win({inner:"Please wait.",title:"pon.game",width:400,height:300,closable:true,maximizable:true,minimizable:true});
	win.instances[id].inner.innerHTML='<style>.pongwin,#modes,.modesel{font-family: "Courier New";} .pongwin{background-color:black;background-image:url(/images/icons/pong.png);background-repeat:no-repeat;background-position: center;color:white;backdrop-filter:brightness(0.5);float:left;margin:0;padding:0;border:none;width:100%;height:100%;} .pongwin *{background-color:rgba(0,0,0,0.5);vertical-align:center;text-align:center;position:relative;top:30%;} .modesel{margin-left:1em;margin-right:1em;} .modesel.selected{font-weight:bold;color:white;} input{color:white;}</style><div class="pongwin"><div id="modes"><span id="mode_offline_sel" class="modesel selected" mode="offline">Offline</span><span id="mode_online_sel" class="modesel" mode="online">Online</span></div><br><div id="mode_menu_offline" style="display:block;"><button>1 Player Local</button><button>2 Player Local</button></div><div id="mode_menu_online" style="display:none;"><button>Create game</button><button>Join game</button><button>Join Random Game</button><input id="invite_id"></input></div><div id="select_mode" style="display:none;">Choose a mode...<br><button>Classic</button><button>Turbo</button><button>Cancel</button></div></div>';
	let allmodes = win.instances[id].inner.getElementsByClassName("modesel");
	for(i=0;i<allmodes.length;i++){
		allmodes[i].addEventListener("click",function(){
			console.log(allmodes[i])
			console.log(this)
			for(a=0;a<allmodes.length;a++){
				allmodes[a].classList.remove("selected");
				win.instances[id].inner.querySelector("#mode_menu_"+allmodes[a].getAttribute("mode")).style.display="none";
			}
			this.classList.add("selected");
			win.instances[id].inner.querySelector("#mode_menu_"+this.getAttribute("mode")).style.display="block";
		})
	}
	let players = "...";
	let mode = "...";
	win.instances[id].inner.getElementsByTagName("button")[0].addEventListener("click",function(){players="1plc";selmode();},false);win.instances[id].inner.getElementsByTagName("button")[1].addEventListener("click",function(){players="2plc";selmode();},false);
	function selmode(){
		if(players!="..."){
			if(players.startsWith("web")){
				alert("later!")
			} else {
				for(a=0;a<allmodes.length;a++){
					// allmodes[a].classList.remove("selected");
					allmodes[a].style.display="none";
					win.instances[id].inner.querySelector("#mode_menu_"+allmodes[a].getAttribute("mode")).style.display="none";
				}
				win.instances[id].inner.querySelector("#select_mode").style.display="block";
			}
		}
	}
	win.instances[id].inner.querySelector("#select_mode").querySelectorAll("button")[0].addEventListener("click",function(){
		mode="classic";
		play();
	},false)
	win.instances[id].inner.querySelector("#select_mode").querySelectorAll("button")[2].addEventListener("click",function(){
		allmodes[0].classList.add("selected");
		win.instances[id].inner.querySelector("#mode_menu_offline").style.display="block";
		for(a=0;a<allmodes.length;a++){
			allmodes[a].style.display="";
		}
		win.instances[id].inner.querySelector("#select_mode").style.display="none";
	},false)
}
// function pong(){
// 	msgbox("This program is discontinued. Try using a Way Back Machine crawl.")
// }