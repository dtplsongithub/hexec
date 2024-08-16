// The App store!
apps.store = {
	"name": "App Store",
	"exec": store,
	"icon": "store.png"
}

var otherServers = {
	"duck": "https://hexec-server2.abruhuser.repl.co",
	"nicejs apps": "https://hexec-sevrer.tbsharedaccount.repl.co"
};

function store() {
	let id = win({ title: "App Store", inner: "Loading...<br>This may take a minute if you have very bad internet connection.<br><progress></progress><br><small>If this screen is stuck for a very long time, try restarting the app.</small>", width: 500, height: 400, closable: true, maximizable: true, minimizable: true })
	let storewin = win.instances[id];
	let xhr = new XMLHttpRequest();
	let link = "https://hexec-sevrer.dateplays.repl.co/shop-apps";
	if(window.dev){
		link = "https://hexec-sevrer.dateplays.repl.co/dev-shop-apps"
	}
	xhr.open("GET", link);
	xhr.onload = function () {
		let json = JSON.parse(xhr.responseText);
		var sjson = {};
		var ssjson = {};
		var cserver = 0;
		for (i in otherServers) {

			(function (i) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", otherServers[i] + "/"+"dev-".repeat(window.dev)+"shop-apps");
				storewin.inner.innerHTML = `Fetching ${cserver} of ${Object.keys(otherServers).length} servers...<br><progress></progress><br><small>If this screen is stuck for a very long time, try restarting the app.</small>`
				xhr.onload = function () {
					console.log('got response from ', otherServers[i])
					if (!xhr.responseText) return;
					console.log('parsing...', otherServers[i]);
					try {
						var ejson = JSON.parse(xhr.responseText);
						sjson[i] = ejson;
						for (var item in ejson) {
							ssjson[item] = ejson[item];
						}
					} catch (_) { console.log('failed to parse', otherServers[i]);storewin.inner.innerHTML="<h3>An error occured while trying to parse data.</h3><br>Please ask the HEXEc Team.";
					}
					console.log(Object.keys(otherServers).length)
					if (cserver >= (Object.keys(otherServers).length - 1)) update();
				}
				console.log('sending xhr to ', otherServers[i])
				xhr.send();
				cserver++
			})(i);
		}

		//let jsonkeys = Object.keys(json);
		let scrn = "mainmenu";
		let file = "";
		let server = "https://hexec-sevrer.dateplays.repl.co";

		let servername = null;
		function update() {
			if (scrn == "mainmenu") {
				storewin.inner.innerHTML = "";
				for (var i in json) {
					// hi
					(function (i, app) {
						let appbtn = document.createElement("button");
						appbtn.innerHTML = '<img src="' + server + '/shop-getfile?file=' + app.icon + '" onerror="this.src=\'/images/icons/undefined%20file%20icon.png\'" height="32"/>&nbsp;' + app.title;
						storewin.inner.appendChild(appbtn);
						appbtn.addEventListener("click", function () {
							scrn = "app";
							file = i;
							server = "https://hexec-sevrer.dateplays.repl.co";
							servername = "main";
							//console.log(i);
							update();
						}, false)
					})(i, json[i]);
				}
				for (var i in sjson) {
					(function (i) {
						for (var j in sjson[i]) {
							(function (i, app, sapp) {
								let appbtn = document.createElement("button");
								appbtn.innerHTML = '<img src="' + sapp + '/shop-getfile?file=' + app.icon + '" onerror="this.src=\'/images/icons/undefined%20file%20icon.png\'" height="32"/>&nbsp;' + app.title + "<br><small>from " + i + " server";
								storewin.inner.appendChild(appbtn);
								appbtn.addEventListener("click", function () {
									scrn = "app";
									file = j;
									server = sapp;
									servername = i;
									//console.log(i);
									update();
								}, false)
							})(i, sjson[i][j], otherServers[i]);
						}
					})(i);
				}
				let devtext = document.createElement("i");
				devtext.innerHTML="Want to make your own app? <button onclick='window.dev=true;win.instances["+id+"].close();apps.store.exec()'>It's here</button>"
				storewin.inner.appendChild(devtext)
			} else if (scrn === "app") {
				//AAAAAAAAAAAAAAA this is unfixable. -TBSharedAccount
				// console.log(servername); // null but why
				if (!servername) {
					msgbox('Something went wrong! Error Code: 0x0020', 'info', 'App Store', [{ title: 'OK', script: function (d) { return win.instances[d].close(); } }]);
					return storewin.close();
				}
				let name = file;
				let app = null;
				//console.log(sjson);
				if (servername !== "main") app = sjson[servername][name]; else app = json[name];
				// console.log(servername);
				// console.log(name);
				// console.log(sjson[servername][name]);
				// console.log(json[name]);
				if (!app) {
					msgbox('Something went wrong! Error Code: 0x001f', 'info', 'App Store', [{ title: 'OK', script: function (d) { return win.instances[d].close(); } }]);
					//console.log(app);
					return storewin.close();
				}
				//console.log(app, json, jsonkeys, file);
				storewin.inner.innerHTML = '<button>Go Back</button><br><img src="' + server + '/shop-getfile?file=' + app.icon + '" onerror="this.src=\'/images/icons/undefined%20file%20icon.png\'" height="32"></img>&nbsp;' + app.title + "<br>" + app.description + "<br><button>Install</button>";
				storewin.inner.getElementsByTagName("button")[0].addEventListener("click", function () {
					scrn = "mainmenu";
					update();
				}, false);
				let instbtn = storewin.inner.getElementsByTagName("button")[1];
				if (!localStorage["/plugins/" + name]) {
					instbtn.addEventListener("click", function () {
						if (bootOptions === "diablePlugin") return msgbox("You cannot install an app while using 'Disable Plugins' boot mode.\nRestart HEXEc then try again.", "error", "App Store", [{ script: location.reload, title: "Restart" }, { script: function (id) { win.instances(id).close() }, title: "OK" }]);
						// installing app...
						// process
						instbtn.removeEventListener("click", null);
						instbtn.disabled = true;
						instbtn.innerHTML = "Installing...";
						fetch(server + "/shop-getfile?file=" + app.script) // app.script is script location from app. oh ok
							.then(data => data.text())
							.then(body => {
								if (!app.preventSaving) {
									localStorage["/plugins/" + name] = body;
								}
								if (app.restart === "required") {
									//location.reload();
									instbtn.outerHTML = '<span style="color:red;">Restarting is required to continue.</span><br><button onclick="location.reload()">Restart</button>';
								} else {
									instbtn.outerHTML = "Installed";
									setTimeout(function(){
										update()
									},1000)
								}
								if (app.postAction === "run") {
									eval(body);
									showdesktop()
								}
							});
					}, false);
				} else {
					instbtn.innerHTML="Uninstall"
					instbtn.addEventListener("click",function(){
						localStorage.removeItem("/plugins/"+name);
						update();
						showdesktop()
					}, false)
				}
			}
		}
		//update();
	}
	xhr.send();
}