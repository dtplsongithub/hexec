// The App store! version 2 coded by:
// @TBSharedAccount
console.log('new store loaded')

var otherServers = {
	"duck": "https://hexec-server2.abruhuser.repl.co",
	"nicejs apps": "https://hexec-sevrer.tbsharedaccount.repl.co"
};

//#region miniQuery
function $j(el) {
	return {
		text(txt) {
			if (!txt) return this.first().innerText;
			el.forEach(x => x.innerText = txt);
			return this;
		},
		html(txt) {
			if (!txt) return this.first().innerHTML;
			el.forEach(x => x.innerHTML = txt);
			return this;
		},
		src(txt) {
			if (!txt) return this.first().src;
			el.forEach(x => x.src = txt);
			return this;
		},
		width(txt) {
			if (!txt) return this.first().width;
			el.forEach(x => x.width = txt);
			return this;
		},
		height(txt) {
			if (!txt) return this.first().height;
			el.forEach(x => x.height = txt);
			return this;
		},
		on(event, callback) {
			el.forEach(x => x.addEventListener(event, callback));
			return this;
		},
		off(event) {
			el.forEach(x => x.removeEventListener(event));
			return this;
		},
		once(event,callback) {
			this.on(event,(...args) => {
				this.off(event);
				callback.call(this,...args);
			})
			return this;
		},
		/** @returns {HTMLElement} HTMLElement */
		first() {
			return el[0];
		},
		append(element) { // better then jquery lol
			if (Array.isArray(element)) {
				element.forEach(x => this.first().appendChild(x));
				return this;
			}
			el.appendChild(element);
			return this;
		},
		arr() {
			return el;
		}
	}
}

function $(el) {
	if (typeof el === "string") return $(document.querySelectorAll(el));
	return $j([el]);
}
function $new(type) { return $j([document.createElement(type)]); }
function $br() { return $new('br'); }
function $frag() { return $j([document.createDocumentFragment()]); }
function $external(script) {
	return $('body').append( $new('script').src(script) );
}
//#endregion

function appButton(title, icon, server, onClick) {
	return $new("button")
		.html(`<img src="${server}/shop-getfile?file=${icon}" onerror="this.src='/images/icons/undefined%20file%20icon.png'" height="32"/>&nbsp;${title}`)
		.on('click', onClick)
		.first();
}

function appPage(title, icon, description, serverURL, installCallback, gobackCallback) {
	//return `<button>Go Back</button><br><img src="' + server + '/shop-getfile?file=' + app.icon + '" onerror="this.src='/images/icons/undefined%20file%20icon.png'" height="32"></img>&nbsp;${title}<br> + app.description + "<br><button>Install</button>`;
	let frag = $frag();
	let gobackBtn = $new('button').text("Go Back").on('click', gobackCallback);

	let image = $new('img').src(`${serverURL}/shop-getfile?file=${icon}`).height(32);
	image.on('error', () => {
		image.src(escape("/images/icons/undefined file icon.png"));
	});

	let appName = $new("span").text(title);
	let appDesc = $new('span').text(description);
	let instBtn = $new('button').text("Install").on('click', installCallback.bind(this,instBtn));

	return frag
		.append(gobackBtn)
		.append($br())
		.append(image)
		.append(appDesc)
		.append(instBtn)
		.first();

}
function appObjToArr(apps, serverURL, server, onClick) {
	return Object.entries(apps).map(x => appButton(x[1].title, x[1].icon, serverURL, onClick.bind(this, { appId: x[0], app: x[1] })));
}
async function fetchj(url) {
	return await (await fetch(url)).json();
}
async function fetcht(url) {
	return await (await fetch(url)).text()
}

function pluginInstallMenu(storewin, server, defaultServer,  otherServersApps, apps, {appId, app}) {
	let serverURL = otherServers[server];
	console.log('changing menu...')
	storewin.div.children[1].innerHTML = appPage(
		app.title, 
		app.icon, 
		app.description, 
		serverURL, 
		async (installButton) => {
			installButton.text('Installing')
			let script = await fetcht(server === "default" ? defaultServer : serverURL)
			if (!app.preventSaving) localStorage.setItem(`/plugins/${app.title}`, script);
			if (app.restart === "required") location.reload();
			if (app.postAction === "run") eval(script);
			installButton.text('Installed');
		}, 
		() => {
			storewin.div.children[1].innerHTML = mainMenu(apps, defaultServer, storewin, otherServersApps);
		}
	);
}

function mainMenu(apps, defaultServer, storewin, otherServersApps) {

	let appList = $new('div')
			.append(appObjToArr(apps, "default", defaultServer, pluginInstallMenu.bind(this, storewin, "default")));

		for (var server in otherServersApps) {
			let appArr = appObjToArr(
				otherServersApps[server],
				otherServers[server],
				server,
				pluginInstallMenu.bind(this, storewin, server, defaultServer, otherServersApps, apps)
			);
			console.log(appArr)
			appList.append(appArr)
		}
	return appList.html();
}

async function store() {
	let id = win({ title: "App Store", inner: "Fetching...", width: 500, height: 400, closable: true, maximizable: true, minimizable: true });
	let storewin = win.instances[id];
	try {
		let defaultServer = "https://hexec-sevrer.dateplays.repl.co"
		console.log(defaultServer)
		console.log(fetchj)
		let apps = await fetchj(`${defaultServer}/shop-apps`);
		let otherServersApps = {};

		for (var server in otherServers) {
			let servURL = otherServers[server];
			otherServersApps[server] = await fetchj(`${servURL}/shop-apps`);
		}


		console.log('updating screen')
		
		storewin.div.children[1].innerHTML = mainMenu(apps, defaultServer, storewin, otherServersApps);

	} catch (err) {
		console.error(err);// stop hexec from crashing every single time
		try {
			log.error(err, "store");
			msgbox(err, "error", "store", [
				{
					title: "close",
					script: function (d) { return win.instances[d].close(); }
				}
			]);
		} catch (err) {
			// msgbox can crash sometime
			log.error(err, "store");
			console.error(err);
		}
	}
}
apps.newstore = {
	"name": "App Store (v2)",
	"exec": store,
	"icon": "store.png"
}