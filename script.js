let themekey = localStorage["/themes/chosen"];
var themeee = document.getElementById("theme");
if (!themekey) { localStorage["/themes/chosen"] = "default"; themekey = "default"; }
fetch("/themes/" + themekey + ".css")
  .then((res) => {
    if (!res.ok) return window.onerror('failed to load theme');
    return res.text().then(body => {
      if (themeee) themeee.innerText = body;
    }).catch(window.onerror);
  }).catch(window.onerror);
if (document.getElementById("wm-ipp-base")) { document.getElementById("wm-ipp-base").remove() }
var bootdiv = document.getElementById('boot-screen');
bootdiv.style.display = "block";
document.getElementById("scriptnotworking").remove();
document.getElementById("noscript").remove();
var desktop = document.getElementById('desktopp');
var bootp = document.getElementById('bootp');
var dicon = document.getElementById('desktop-icons');
var listbar = document.getElementById('listbar');
var listbar_clock = document.getElementById("listbar_clock");
var version = "0.5.2.5_45.1875_20210721_Beta";
document.getElementById('bootver').innerText = version;
var apps = {
  "test": {
    "name": "test",
    "exec": function () {
      win({ title: "it works!", inner: "<h1>it works yey</h1>", closable: true, minimizable: true });
    },
    "icon": "exe file icon.png"
  },
  "credits": {
    "name": "credits",
    "exec": function () {
      win({ title: "credits", inner: "<textarea style=\"resize:none;width:100%;height:100%;\" disabled>HEXEc Credits:\nCoding:\n@dateplays, @NyokoSatouhSato aka Nam, @abruhuser aka sussy, @Ponali, @globalstorage aka FBI OPEN DOWN []. \nGraphics:\nIcons:\n@dateplays, @Ponali\nOther graphics: @dateplays, @NyokoSatouhSato aka Nam, @abruhuser aka sussy, @Ponali\nCursors: idk man ponali i think</textarea>", closable: true, maximizable: true, minimizable: true, width: 500, height: 500 });
    },
    "icon": "text file icon.png"
  },
  "crash": {
    "name": "crash the os",
    "exec": function () {
      window.onerror("you told the system to crash, why looking at this? lmao")
    },
    "icon": "exe file icon.png"
  },
  "explorer": {
    "name": "File Explorer",
    "exec": function () {
      win({ title: "File Explorer", inner: '<iframe style="width:100%;height:100%" width="100%" height="100%" frameBorder="0" src="explorer.html"></iframe>', closable: true, minimizable: true, maximizable: true })
    },
    "icon": "folder icon.png"
  },
  "gravity": {
    "name": "Very cute dolphin",
    "isGravity": false,
    "exec": function () {
      if (apps["gravity"].isGravity) return;
      document.onmouseup = null;
      document.onmousedown = null;
      for (i = 0; i < win.instances.length; i++) {
        if (win.instances[i]) if (win.instances[i].div) {
          win.instances[i].div.onmousedown = null;
          var title = document.getElementById("win_" + i + "_title");
          if (title) title.onmousedown = null;
        }
      }

      $("#desktopp").jGravity({
        target: ".icons,.window",
        depth: 6,
      });

      apps["gravity"].isGravity = true;
    },
    "icon": "dolphin.png"
  },
  "term": {
    "name": "Terminal",
    "exec": function () {
      win({ title: "Terminal", inner: '<iframe src="/terminal.html" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%"></iframe>', closable: true, maximizable: true, minimizable: true, width: 500, height: 400 });
    },
    "icon": "command prompt icon.png"
  },
  "clock": {
    "name": "Clock",
    "exec": function () {
      win({ title: "Clock", inner: '<iframe src="clock.html" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%"></iframe>', closable: true, maximizable: false, minimizable: true, width: 300, height: 250 })
    },
    "icon": "clock icon.png"
  },
  "dateplays's game": {
    "name": "23841,85791\n(a 2048 game)",
    "exec": function () {
      win({ title: "Note", inner: '<iframe src="23841 things/index.html" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%"></iframe>', closable: true, minimizable: true, width: 500, heigth: 400 });
    },
    "icon": "exe file icon.png"
  },
	"google":{
		"name": "Google Chrome",
		"exec": function(){
			var winid = win({title:"Google Chrome", inner: '',maximizable:true,minimizable:true,closable:true});
      win.instances[winid].inner.innerHTML = '<input type="url" id="url_box" style="width:100%;" onkeyup="if(event.key==\'Enter\'){document.getElementById(\'iframe_box_'+ winid +'\').src=this.value}"></input><iframe src="https://priler.github.io/dino3d/" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
		},
		"icon": "chrome.png"
	}
};

document.getElementById("listbar_clock").addEventListener("click", _ => { return _.preventDefault(); }); // bruh error

setInterval(() => {
  let hours = (new Date().getHours());
  let strhours = hours.toString();//"0".repeat(hours<10) + hours;
  let mins = (new Date().getMinutes());
  let strmins = "0".repeat(mins < 10) + mins;
  let secs = (new Date().getSeconds());
  let strsecs = "0".repeat(secs < 10) + secs;
  if (listbar_clock) listbar_clock.innerHTML = strhours + ":" + strmins; // crash fix
})

//let appsjson = "";
fetch("/apps/list.json")
  .then(data => data.text())
  .then(body => {
    let ee = JSON.parse(body);
    for (i = 0; i < ee.length; i++) {
      fetch("/apps/" + (ee[i]))
        .then(data => data.text())
        .then(body => eval(body))
    }
  });

var p = 0;
var booti = setInterval(() => {
  if (p >= 100) {
    bootdiv.style.display = 'none';
    listbar.style.display = '';
    desktop.style.display = '';
    setTimeout(function () { new Audio("/sounds/HEXEc startup.mp3").play(); }, 1000);
    if (localStorage["/startup.js"]) try { console.log(eval(localStorage["/startup.js"])); } catch (e) { console.error(e); }
    showdesktop();
    return clearInterval(booti);
  } else {
    p = p + Math.round(Math.random() * 4);
    bootp.value = p;
  }
}, 25);

function showdesktop() {
  dicon.innerHTML = "";
  dicon.addEventListener("click", function (e) {
    if (e.target[e.target.length - 1] == dicon) unselectall();
  })
  function unselectall() {
    var btns = dicon.getElementsByTagName("button")
    for (i = 0; i < btns.length; i++) { btns[i].classList.remove("selected"); };
  }

  if (apps["gravity"]) if (apps["gravity"].isGravity) $("#dicon").jGravity({ target: ".icons", depth: 6, });

  for (i in apps) {
    (function (apps, i) {
      if (!apps[i]) return;
      if (apps[i].hide) return;
      var em = document.createElement('button');
      var icon = '/images/icons/' + encodeURIComponent((apps[i].icon ? apps[i].icon : 'exe file icon.png'));
      var errIcon = '/images/icons/' + encodeURIComponent("undefined file icon.png");
      em.innerHTML = '<img onerror="this.src=\'' + errIcon + '\'" src="' + icon + '" width="32" height="32" /><br>' + he.encode(apps[i].name);
      em.id = "app_icon_" + i;
      em.classList.add('icons');
      em.addEventListener('click', function () { unselectall(); em.classList.add("selected"); });
      em.addEventListener('dblclick', function () { em.classList.remove("selected"); apps[i].exec(); });
      dicon.appendChild(em);
      return;
    })(apps, i); // ok i fixed it or not
  }
}

function win(content) {
	win.firstZIndexView++;
  if (!document.visibilityState) {
    if (navigator.userAgent.includes("Windows")) {
      new Audio("/sounds/Windows Notification.wav").play();
    }
  }
  let title = content.title;
  let html = content.inner;
  let id = win.instances.length;
  let width = content.width;
  let height = content.height;
  if (!width) width = 300;
  if (!height) height = 200;
  console.log("window id " + id + " appended");
  let elem = document.createElement("div");
  elem.classList.add('window');
  elem.id = "win_" + id;
  //elem.classList.add(elem.id);
  elem.style.top = Math.round(Math.random() * (innerHeight - height)) + "px";
  elem.style.left = Math.round(Math.random() * (innerWidth - width)) + "px";
  elem.style.width = width + "px";
  elem.style.height = height + "px";
	elem.style.zIndex = win.firstZIndexView;
  elem.innerHTML = '<div id="win_' + id + '_title" class="wintitle">' + he.encode(title) + ('<div onclick="win.instances[' + id + '].close();" id="win_' + id + '_closebtn" class="wintitlebtn winclosebtn">X</div>').repeat((content.closable) + 0) + ('<div onclick="win.instances[' + id + '].maximize();" id="win_' + id + '_maximizebtn" class="wintitlebtn winmaximizebtn">&#x1F5D6;</div>').repeat((content.maximizable) + 0) + ('<div onclick="win.instances[' + id + '].minimize();" id="win_' + id + '_minimizebtn" class="wintitlebtn winminimizebtn">&#x1F5D5;</div>').repeat((content.minimizable) + 0) + '</div><div id="win_' + id + '_inner" style="width:100%; height:100%;" class="wininner">' + html + '</div>';
  desktop.appendChild(elem);

  //console.log(elem.id);
  //if (apps["gravity"]) if (apps["gravity"].isGravity) $("#desktopp").jGravity({ target: '.' + elem.id, depth: 6, }); else dragElement(id);

  dragElement(id); // this line make window draggable
  //desktop.innerHTML += '<div class="window animate__animated animate__fadeIn" id="win_' + id + '" style="top:' + Math.round(Math.random() * (innerHeight - height)) + 'px; left:' + Math.round(Math.random() * (innerWidth - width)) + 'px; width:' + width + 'px; height:' + height + 'px;"><div id="win_' + id + '_title" class="wintitle">' + title + '<div onclick="win.instances[' + id + '].close();" id="win_' + id + '_closebtn" class="winclosebtn">X</div>'.repeat((content.closable) + 0) + '</div><div id="win_' + id + '_inner" style="width:' + width + 'px; height:' + height + 'px;" class="wininner">' + html + '</div></div>';

  win.instances.push(
    {
      title: title,
      div: elem,
      inner: document.getElementById("win_" + id + "_inner"),
      top: parseInt(elem.style.top.replace(/px/g, ""), 10),
      left: parseInt(elem.style.left.replace(/px/g, ""), 10),
      width: width,
      height: height,
      draggable: true,
      closed: false,
      minimized: false,
      maximized: false,
      setTitle: function (newTitle) {
        title = newTitle;
        win.instances[id].title = newTitle;
        var tmpelem = document.getElementById('win_' + id + '_title');
        if (tmpelem) tmpelem.innerHTML = he.encode(newTitle) + ('<div onclick="win.instances[' + id + '].close();" id="win_' + id + '_closebtn" class="wintitlebtn winclosebtn">X</div>').repeat((content.closable) + 0) + ('<div onclick="win.instances[' + id + '].maximize();" id="win_' + id + '_maximizebtn" class="wintitlebtn winmaximizebtn">&#x1F5D6;</div>').repeat((content.maximizable) + 0) + ('<div onclick="win.instances[' + id + '].minimize();" id="win_' + id + '_minimizebtn" class="wintitlebtn winminimizebtn">&#x1F5D5;</div>').repeat((content.minimizable) + 0);
      },
      close: function () {
        let close = true;
        if (win.instances[id].closeScript) if (typeof win.instances[id].closeScript === 'function') close = win.instances[id].closeScript();
        if (close) {
          win.instances[id].div.classList.add("closing");
          win.instances[id].div.innerHTML += ""/* resets window to apply close animation*/;
          setTimeout(() => { win.instances[id].div.remove(); delete win.instances[id]; }, 100);
          console.log("window " + id + " closed.");
          win.instances[id].closed = true;
        }
      },
      maximize: function () {
        win.instances[id].div.style.top = "0px";
        win.instances[id].div.style.left = "0px";
        win.instances[id].div.style.width = "calc( 100vw - ( 5px + 5px ) )"; // Viewport Width.
        win.instances[id].div.style.height = "calc( 100vh - ( 16px + 5px + 5px + 5px ) )";  // Viewport Height.
        win.instances[id].draggable = false;
        document.getElementById("win_" + id + "_maximizebtn").innerHTML = "&#x1F5D7;";
        document.getElementById("win_" + id + "_maximizebtn").onclick = function () { win.instances[id].unmaximize(); };
        document.getElementById("win_" + id + "_maximizebtn").id = "win_" + id + "_unmaximizebtn";
        win.instances[id].maximized = true;
        win.instances[id].active();
      },
      unmaximize: function () {
        win.instances[id].div.style.top = win.instances[id].top + "px";
        win.instances[id].div.style.left = win.instances[id].left + "px";
        win.instances[id].div.style.width = win.instances[id].width + "px";
        win.instances[id].div.style.height = win.instances[id].height + "px";
        win.instances[id].draggable = true;
        document.getElementById("win_" + id + "_unmaximizebtn").innerHTML = "&#x1F5D6;";
        document.getElementById("win_" + id + "_unmaximizebtn").onclick = function () { win.instances[id].maximize(); };
        document.getElementById("win_" + id + "_unmaximizebtn").id = "win_" + id + "_maximizebtn";
        win.instances[id].maximized = false;
        win.instances[id].active();
      },
      minimize: function () {
        win.instances[id].div.classList.add("minimizing");
        setTimeout(() => {
          win.instances[id].div.style.display = "none";
          listbar.innerHTML += '<div onclick="win.instances[' + id + '].restore()" class="minimizewin" id="win_' + id + '_obj">' + title + '</div>';
          win.instances[id].div.classList.remove("minimizing");
        }, 100);
        win.instances[id].minimized = true;
      },
      restore: function () {
        win.instances[id].div.style.display = "block";
        document.getElementById("win_" + id + "_obj").remove();
        win.instances[id].minimized = false;
        win.instances[id].active();
      },
      active: function () {
        for (i = 0; i < win.instances.length; i++) { if (win.instances[i]) { if (win.instances[i].inactive) { win.instances[i].inactive(); } } };
        win.instances[id].div.classList.add("active")
				win.firstZIndexView++;
				win.instances[id].div.style.zIndex=win.firstZIndexView;
				listbar.style.zIndex=win.firstZIndexView+1;
      },
      inactive: function () {
        win.instances[id].div.classList.remove("active");
      }
    }
  );
  win.instances[id].active();
  win.instances[id].div.addEventListener("mousedown", win.instances[id].active);
  return id;
}

function dragElement(id) {
  if (win.instances[id]) { win.instances[id].active(); }
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var elmnt = document.getElementById("win_" + id);
  if (document.getElementById("win_" + id + "_title")) {
    document.getElementById("win_" + id + "_title").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (!win.instances[id].draggable) return;
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!win.instances[id].draggable) return;
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

win.instances = [];

win.firstZIndexView=0;

window.onerror = function (e) {
  document.body.innerHTML = "Your HEXEc computer has performed an illegal operation so it was needed to show this screen and shut down all services of this machine.<br>Sorry for any incovinience made by this error screen.<br>You can restart your machine to continue using HEXEc.<br>Or you can report this error to the HEXEc team: <span class='error'>" + e + "</span><br>Thank you for reading.<br>Please refresh the page.<br><br><button onclick='window.location.reload();'>Refresh</button>"; document.body.style = "background-color:blue;color:white;";
}