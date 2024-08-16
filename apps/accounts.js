apps.account = {
  "name": "HEXEc Accounts",
  "icon" :"",
  "exec": accountsapp
}

if(localStorage["/accounts/lastsession"]){
	let token = localStorage["/accounts/lastsession"];
	function invconnect(id){
		win.instances[id].close()
		window.accountsToken=token;
	}
	function connect(id){
		alert("normal connecting will be made later, beacause we can't find out what we need to use for that. we're opening invisible connection.");
		invconnect(id)
	}
	msgbox("You were connected last session. Do you want to reconnect?","question","HEXEc Accounts",[{title:"Yes",script:connect},{title:"Yes, Invisibly",script:invconnect},{title:"No, Thanks",script:function(id){win.instances[id].close()}},{title:"Open HEXEc Accounts",script:function(id){win.instances[id].close();apps.account.exec()}}])
}

function accountsapp(){
	let id = win({title:"HEXEc Accounts", inner:"<h1>Sign in with HEXEc Accounts</h1><p><input type='text' id='username' placeholder='Username/E-Mail' /><br><input type='password' id='password' placeholder='Password' /><br><button>Sign in</button><br><button>Make yourself an account</button></p>",width:400,height:600,closable:true,minimizable:true,maximizable:true})
	win.instances[id].inner.querySelectorAll("button")[0].addEventListener("click",function(){
		let username = win.instances[id].inner.querySelector("#username").value;
		let password = win.instances[id].inner.querySelector("#password").value;
		fetch("https://hexec-sevrer.dateplays.repl.co/access-acc?name="+username+"&password="+password).then(data=>data.text()).then(body=>{
			if(body=="does-not-exist"){
				//win.instances[id].close();
				msgbox("We couldn't sign up to your HEXEc account beacause the account does not exist.<br>Make sure you:<br># Didn't forget the username and password<br># Check if there are no errors on the password/username<br><br>If your account got caught by someone, Please ask the HEXEc team in our Discord Server. (Check the apps)","error","HEXEc Accounts",[{script:function(id){win.instances[id].close()},title:"OK"}],false)
			} else {
				win.instances[id].inner.innerHTML="<div style='float:left;width:100%;height:calc(50% - 0.5em);'></div><center>Signing in...</center>";
				fetch("https://hexec-sevrer.dateplays.repl.co/acc-info?token="+body).then(data=>data.text()).then(sdata=>{
					window.accountsToken=body;
					localStorage["/accounts/lastsession"]=body;
					win.instances[id].closeScript=function(){
						localStorage.removeItem("/accounts/lastsession");
						return true
					}
					let userinfo=JSON.parse(sdata);
					if(!userinfo.description){
						userinfo.description="We can't find "+userinfo.username+"'s description."
					}
					win.instances[id].inner.innerHTML="--Profile Pictures will arrive later, just wait some secs ;)--<br><br><b>"+userinfo.username+"</b><font color='grey' size='1'> "+userinfo.mail+"</font><br>"+userinfo.description.replace(new RegExp("\n","g"),"<br>")+"<br><button>Edit Description</button><br><br><b>My Friends</b><br><span id='friends'>Loading...</span>";
					if((userinfo.friends.length==0)||(!userinfo.friends)){
						win.instances[id].inner.querySelector("#friends").innerHTML="You don't have any friends... 😥<br><img src='https://c.tenor.com/HCquFoN228wAAAAC/insomnia-sad.gif'></img>"
					} else {
						let friendrender = "";
						for(i=0;i<userinfo.friends.length;i++){
							friendrender+="<div class='friendren'>Loading... <progress></progress> <small>If this loading screen appeared for about more than 5 minutes, this is beacause this app bugged out. If this happens, please ask hexec developpers what to do.</small></div><br>"
						}
						win.instances[id].inner.querySelector("#friends").innerHTML=friendrender;
						for(i=0;i<10;i++){
							fetch("https://hexec-sevrer.dateplays.repl.co/acc-info?token="+userinfo.friends[i]).then(data=>data.text()).then(frdata=>{
								let friendinfo = JSON.parse(frdata);
								console.log(i);
								console.log(frdata)
								try{win.instances[id].inner.querySelectorAll(".friendren")[i-10].innerHTML="<b>"+friendinfo.username+"</b><font color='grey' size='1'> "+friendinfo.mail+"</font> <button>Open Profile</button>";win.instances[id].inner.querySelectorAll(".friendren")[i-10].querySelector("button").addEventListener("click",function(){spectateUser(friendinfo)})}catch{win.instances[id].inner.querySelectorAll(".friendren")[i-10].innerHTML="Cannot make preview."}
							})
						}
					}
					win.instances[id].inner.querySelectorAll("button")[0].addEventListener("click",function(){
						// edit description
						let desceditid = win({title:"HEXEc Accounts - Edit description",inner:"Please wait...",width:400,height:400,closable:false,maximizable:false,minimizable:false});
						let descedit = win.instances[desceditid];
						descedit.inner.innerHTML='<textarea style="width:390px;height:360px;">'+userinfo.description+'</textarea><button>Save</button><button>Exit</button>';
						descedit.inner.children[1].addEventListener("click",function(){
							let newdesc = descedit.inner.querySelector("textarea").value;
							fetch("https://hexec-sevrer.dateplays.repl.co/edit-acc-info?token="+body+"&parameter=description&value="+encodeURIComponent(newdesc)).then(data=>data.text()).then(function(ee){
								if(ee="ok"){
									descedit.close()
								}
							})
						},false)
						descedit.inner.querySelectorAll("button")[1].addEventListener("click",descedit.close,false);
					})
				})
			}
		})
	});
  win.instances[id].inner.querySelectorAll("button")[1].addEventListener("click",function(){
    win.instances[id].inner.innerHTML="<h1>make an HEXEc Account</h1><p><input type='text' class='info-username' placeholder='Username' /><br><input type='email' class='info-email' placeholder='E-Mail' /><br><input type='password' class='info-passwd' placeholder='Password' /><br><br><button>Make account</button><br><button>i already have an account</button></p>";
    win.instances[id].inner.querySelectorAll("button")[0].addEventListener("click",function(){
      var uname = win.instances[id].inner.querySelectorAll(".info-username")[0].value;
      var email = win.instances[id].inner.querySelectorAll(".info-email")[0].value;
      var passwd = win.instances[id].inner.querySelectorAll(".info-passwd")[0].value;
      var endduckurl = "?name="+encodeURIComponent(uname)+"&password="+encodeURIComponent(passwd)+"&email="+encodeURIComponent(email);
      fetch("https://hexec-sevrer.dateplays.repl.co/create-acc"+endduckurl).then(function(duck){
        if (!duck.ok) {throw "ducked up";return;}
        duck.text().then(function(body){
          if (body === "not-valid") {
            msgbox("some info is invalid","error","HEXEc Accounts",[{script:function(id){win.instances[id].close()},title:"OK"}],false);
            throw "some info is invalid";
            return;
          }

          //localStorage["/accounts/token"]=body;

          win.instances[id].inner.innerHTML="<h1>done</h1><br><button>Close</button>";
          win.instances[id].inner.querySelectorAll("button")[0].addEventListener("click",function(){
            win.instances[id].close();
            accountsapp();
          });
        });
      })
    });
    win.instances[id].inner.querySelectorAll("button")[1].addEventListener("click",function(){
      win.instances[id].close();
      accountsapp();
    });
  });
}

function spectateUser(data){
	let id = win({title:"HEXEc Accounts - "+data.username+"'s profile",inner:"Please wait",width:400,height:600,closable:true,minimizable:true,maximizable:true})
	win.instances[id].inner.innerHTML="--Profile Pictures will arrive later, just wait some secs ;)--<br><br><b>"+data.username+"</b><font color='grey' size='1'> "+data.mail+"</font><br>"+data.description.replace(new RegExp("\n","g"),"<br><a href='mailto:"+data.mail+"'>Mail User</a>")
}

window.friendAccount = function(token){
	try{
		if(!window.accountsToken){ // accountsToken is the variable of the token used while connection with the account
			apps.account.exec(); // open login page
		} else {
			fetch("https://hexec-sevrer.dateplays.repl.co/friend-acc?signed="+window.accountsToken+"&token="+token);
		}
	}catch{
		alert("Can't friend, error")
	}
}