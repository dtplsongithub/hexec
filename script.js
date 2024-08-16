var themekey = localStorage["/themes/chosen"];
var themeee = document.getElementById("theme");
var windowList = document.getElementById('windows-lists');
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
var bootp = document.getElementById('bootp-inner');
var dicon = document.getElementById('desktop-icons');
var listbar = document.getElementById('listbar');
var listbar_clock = document.getElementById("listbar_clock");
var version = "0.11";
var fullversion = "0.11_20230723 Beta"
// we need more changes -Ponali
var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var tips = ["Release will soon come!", "This thing looks like ubuntu but a little bit different, isn't it?", "'Very Cute Dolphin' is just a remake of the Windows 93 'Not a Virus, trust me... i'm a dolphin' icon.", "We didn't forgor the markdown file!", "Chat with anyone with Socket Messenger.", "Socket Messenger's name having Socket is a reference for socket.io, wich is actually used in the app!", "The credits icon is the second version of the markdown file.", "We're in beta, so the look of the OS's default is the 'classic' one.", "This is a tip. There are a lot of them actually!", "Google Chrome is useless, except if you want to play chrome dino in 5632596256263253656565565646524k!", "HEXEc is saved in wayback machine 5 times now!", "-insert tip here-", "more update and tips coming soon! Stay tuned! "];
document.getElementById("tip").innerText = tips[Math.round(Math.random() * (tips.length - 1))] + '<br><button>Startup Options</button>'.repeat(isMobile);
document.getElementById('bootver').innerText = version;
var bootOptions = 'normal';
var apps = {
  "test": {
    "name": "test",
    "exec": function() {
      win({ title: "it works!", inner: "<h1>it works yey</h1>", closable: true, minimizable: true });
      msgbox("info", "e", [{
        title: "error test",
        script: function() { return kdoigkjdogkjdgiojdkgdgij; }
      },
      {
        title: undefined, // undefined test
        script: undefined
      },
      {
        title: "it work",
        script: function() { alert("hello world"); }
      }], "test!");
    },
    "icon": "exe file icon.png"
  },
  "hexecver": {
    "name": "About",
    "exec": function() {
      //win({ title: "credits", inner: "<textarea style=\"resize:none;width:100%;height:100%;\" disabled>HEXEc Credits:\nCoding:\n@dateplays, @NyokoSatouhSato aka Nam, @abruhuser aka sussy, @Ponali, @globalstorage aka FBI OPEN DOWN []. \nGraphics:\nIcons:\n@dateplays, @Ponali\nOther graphics: @dateplays, @NyokoSatouhSato aka Nam, @abruhuser aka sussy, @Ponali\nCursors: idk man ponali i think</textarea>", closable: true, maximizable: true, minimizable: true, width: 500, height: 500 });
      // width:calc(100% - 7px);height:calc(100% - 159px);
      win({ title: "About", inner: '<center><img src="/images/boot%20logo.png" style="height: 95px;"><br><br><span>HEXEc version ' + version + '</span></center><br><button onclick="apps[\'credits-app\'].exec();" style="width:100%;">Credits</button>', closable: true, maximizable: false, minimizable: false, width: 500, height: 192 });
    },
    "icon": "../../favicon.ico"
  },
  "credits-app": {
    "name": "credits",
    "hide": true,
    "exec": function() {
      win({ title: "Credits", inner: '<iframe src="/credits.md.html" frameBorder="0" style="width:100%;height:calc(100% - 19px);" width="100%" height="100%"></iframe>', closable: true, maximizable: true, minimizable: false, width: 500, height: 500 });
    },
    "icon": "text file icon.png"
  },
  "crash": {
    "name": "crash the os",
    "exec": function() {
      window.onerror("you told the system to crash, why looking at this? lmao")
    },
    "icon": "exe file icon.png"
  },
  "explorer": {
    "name": "File Explorer",
    "exec": function() {
      win({ title: "File Explorer", inner: '<iframe style="width:100%;height:calc(100% - 19px);" width="100%" height="100%" frameBorder="0" src="explorer.html"></iframe>', closable: true, minimizable: true, maximizable: true })
    },
    "icon": "folder icon.png"
  },
  "gravity": {
    "name": "Very cute dolphin",
    "isGravity": false,
    "exec": function() {
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
  "cmd": {
    "name": "Terminal",
    "exec": function() {
      win({ title: "Terminal", inner: '<iframe src="/terminal.html" frameBorder="0" style="width:100%;height:calc(100% - 19px);" width="100%" height="100%"></iframe>', closable: true, maximizable: true, minimizable: true, width: 500, height: 400 });
    },
    "icon": "command prompt icon.png"
  },
  "clock": {
    "name": "Clock",
    "exec": function() {
      win({ title: "Clock", inner: '<iframe src="clock.html" frameBorder="0" style="width:100%;height:calc(100% - 19px);" width="100%" height="100%"></iframe>', closable: true, maximizable: false, minimizable: true, width: 300, height: 250 })
    },
    "icon": "clock icon.png"
  },
  "d2048": {
    "name": "23841,85791 (a 2048 game)",
    "exec": function() {
      win({ title: "23841,85791", inner: '<iframe src="23841 things/index.html" frameBorder="0" style="width:100%;height:calc(100% - 19px);" width="100%" height="100%"></iframe>', closable: true, maximizavle: true, minimizable: true, width: 300, height: 500, maximizable: true });
    },
    "icon": "23841 icon.png"
  },
  "chrome": {
    "name": "Google Chrome",
    "exec": function() {
      var winid = win({ title: "Google Chrome", inner: '', width: 600, height: 400, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<input type="url" id="url_box" style="width:calc(100% - 8px);" onkeyup="if(event.key==\'Enter\'){document.getElementById(\'iframe_box_' + winid + '\').src=this.value}"></input><iframe src="https://priler.github.io/dino3d/" frameBorder="0" style="width:100%;height:calc(100% - 40px);" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },
    "icon": "chrome.png"
  },
  "sdosterm": {
    "name": "sdfEmu terminal",
    "exec": function() {
      var winid = win({ title: "sdfEmu", inner: '', width: 600, height: 400, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<iframe src="https://stuff.mkcodes.repl.co/" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },//we've already got a terminal
    "icon": "s1.png"
  },
  "calc": {
    "name": "Calculator",
    "exec": function() {
      var winid = win({ title: "Calculator", inner: '', width: 300, height: 225, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<iframe src="/calc.html" frameBorder="0" style="width:100%;height:height:calc(100% - 19px);" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },
    "icon": "calc.png"
  },
  "calc2": {
    "name": "Calculator+",
    "exec": function() {
      var winid = win({ title: "Calculator+", inner: '', width: 300, height: 225, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<iframe src="https://calcuator.mkcodes.repl.co/" frameBorder="0" style="width:100%;height:height:calc(100% - 19px);" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },
    "icon": "calc.png" // i add some new features, pls make official
  },
  "acejs": {
    "name": "Ace9js",
    "exec": function() {//width: 300, height: 500
      var winid = win({ title: "Ace 9 IDE - Untitled", inner: '', width: 600, height: 400, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<iframe src="https://rocky-believed-tarp.glitch.me/" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },// just no
    "icon": "s3.png"
  },
  "sdf_3chat": {
    "name": "3chat",
    "exec": function() {
      var winid = win({ title: "3chat (filemsgr)", inner: '', width: 600, height: 400, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<iframe src="https://3chat-1.mkcodes.repl.co/" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },// we've already got a chat
    // which just says 'Piss off' and raises error btw
    "icon": "s4.png"
  },
  "notepad": {
    "name": "Notepad",
    "exec": function() {
      var winid = win({ title: "Notepad", inner: '', width: 600, height: 400, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<iframe src="https://zlinux.mkcodes.repl.co/Notes.html" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },// we've already working on notepad
    "icon": "s5.png"
  },
  "myfiles": {
    "name": "My files",
    "exec": function() {
      var winid = win({ title: "Cloud files", inner: '', width: 600, height: 400, maximizable: true, minimizable: true, closable: true });
      win.instances[winid].inner.innerHTML = '<iframe src="https://zlinux.mkcodes.repl.co/phedit/index.php" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
    },
    "icon": "s6.png" // (not my files coz not local) 
  },
};

// Open app
function app(file) {
  if (file.endsWith(".bat") && batch) {
    batch(localStorage[file])
  } else {
    set.notepad(file);
  }
}

//document.getElementById("listbar_clock").addEventListener("click", _ => { return _.preventDefault(); }); // bruh error

setInterval(() => {
  var hours = (new Date().getHours());
  var strhours = hours.toString();//"0".repeat(hours<10) + hours;
  var mins = (new Date().getMinutes());
  var strmins = "0".repeat(mins < 10) + mins;
  var secs = (new Date().getSeconds());
  var strsecs = "0".repeat(secs < 10) + secs;
  if (listbar_clock) listbar_clock.innerHTML = strhours + ":" + strmins; // crash fix
})

//var appsjson = "";
fetch("/apps/list.json")
  .then(data => data.text())
  .then(body => {
    var ee = JSON.parse(body);
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
    windowList.style.display = '';
    window.removeEventListener('keyup', null);
    setTimeout(function() { new Audio("/sounds/HEXEc startup.mp3").play(); }, 400);
    if (localStorage["/startup.js"]) try { console.log(eval(localStorage["/startup.js"])); } catch (e) { console.error(e); }
    showdesktop();
    return clearInterval(booti);
  } else {
    p = p + Math.round(Math.random() * 2);
    bootp.style.width = p + "%";
    document.getElementById("bootp-text").innerHTML = p + "%";
  }
}, 25);

window.addEventListener("keyup", function(e) {
  if (e.keyCode === 27) {
    window.removeEventListener('keyup', null);
    clearInterval(booti);
    document.getElementById("tip").style.display = 'none';
    p = 0;

    fetch("/themes/" + themekey + ".css")
      .then((res) => {
        if (!res.ok) return window.onerror('failed to load theme');
        return res.text().then(body => {
          if (themeee) themeee.innerText = body;
        }).catch(window.onerror);
      }).catch(window.onerror);

    bootdiv.innerHTML = "<h1>Startup Options</h1>You are seeing this beacause you pressed the <i>Escape key</i>, or this OS has suddently <i>crashed</i>.<br><br><button onclick='window.location.reload();'>Normal Boot</button><br>";
    var menu1 = document.createElement('button');
    menu1.innerText = "CommandLine only mode";
    menu1.addEventListener("click", function() {
      bootdiv.style.display = 'none';
      listbar.style.display = 'none';
      desktop.style.display = '';
      windowList.style.display = 'none';
      bootOptions = 'cmd';
      apps = {
        "crash": {
          "name": "crash the os",
          "exec": function() {
            window.onerror("The Terminal Asked to run a BSOD.");
          },
          "icon": "exe file icon.png"
        },
        "reboot": {
          "name": "reboot the os",
          "exec": function() {
            window.location.reload();
          },
          "icon": "exe file icon.png"
        }
      }
      desktop.innerHTML = '<iframe src="/terminal.html" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%"></iframe>';
    });
    bootdiv.appendChild(menu1);
    bootdiv.appendChild(document.createElement('br'));
    var menu2 = document.createElement('button');
    menu2.innerText = "Terminal with gui";
    menu2.addEventListener("click", function() {
      bootdiv.style.display = 'none';
      listbar.style.display = 'none';
      dicon.style.display = 'none';
      desktop.style.display = '';
      windowList.style.display = '';
      bootOptions = 'cmdgui';
      var winid = win({ title: "Terminal", inner: '<iframe src="/terminal.html" frameBorder="0" style="width:100%;height:100%" width="100%" height="100%"></iframe>', closable: false, maximizable: true, minimizable: false, width: 500, height: 400 });
      apps["desktop"] = {
        "name": "get the desktop back",
        "exec": function() {
          dicon.style.display = '';
          listbar.style.display = '';
          bootOptions = 'normal';
          win.instances[winid].close();
          delete apps["desktop"];
          showdesktop();
        },
        "icon": "exe file icon.png"
      };

    });
    bootdiv.appendChild(menu2);
  }
}, false);

function showdesktop() {
  if (bootOptions === 'cmd') return;
  block_extentions();
  dicon.innerHTML = "";
  dicon.addEventListener("click", function(e) {
    if (e.target[e.target.length - 1] == dicon) unselectall();
  })
  function unselectall() {
    var btns = dicon.getElementsByTagName("button")
    for (i = 0; i < btns.length; i++) { btns[i].classList.remove("selected"); };
  }

  if (apps["gravity"]) if (apps["gravity"].isGravity) $("#dicon").jGravity({ target: ".icons", depth: 6, });

  for (i in apps) {
    (function(apps, i) {
      if (!apps[i]) return;
      if (apps[i].hide) return;
      var em = document.createElement('button');
      var icon = '/images/icons/' + encodeURIComponent((apps[i].icon ? apps[i].icon : 'exe file icon.png'));
      var errIcon = '/images/icons/' + encodeURIComponent("undefined file icon.png");
      var appName = (apps[i].name ? he.encode(apps[i].name) : i);
      em.innerHTML = '<img onerror="this.src=\'' + errIcon + '\'" src="' + icon + '" width="32" height="32" /><br>' + appName;
      em.id = "app_icon_" + i;
      em.classList.add('icons');
      if (isMobile) {
        em.addEventListener('click', function() {
          try { apps[i].exec(); } catch (err) {
            msgbox("error", "app error", [
              {
                title: "close",
                script: function(d) { return win.instances[d].close(); }
              }
            ], err);
          }
        });
      } else {
        em.addEventListener('click', function() { unselectall(); em.classList.add("selected"); });
        em.addEventListener('dblclick', function() {
          em.classList.remove("selected");
          try { apps[i].exec(); } catch (err) {
            msgbox("error", "app error", [
              {
                title: "close",
                script: function(d) { return win.instances[d].close(); }
              }
            ], err);
          }
        });
      }
      dicon.appendChild(em);
      return;
    })(apps, i); // ok i fixed it or not
  }
}

function win(content) {
  if (bootOptions === 'cmd') return;
  win.firstZIndexView++;
  if (!document.visibilityState) {
    if (navigator.userAgent.includes("Windows")) {
      new Audio("/sounds/Windows Notification.wav").play();
    }
  }
  var title = content.title;
  var html = content.inner;
  var id = win.instances.length;
  var width = content.width;
  var height = content.height;
  if (!width) width = 300;
  if (!height) height = 200;
  console.log("window id " + id + " appended");
  var elem = document.createElement("div");
  elem.classList.add('window');
  elem.id = "win_" + id;
  var mh = "100%";
  //if (height === 200) mh = "calc(100% - 22px)"; else mh = "100%";
  //elem.classList.add(elem.id);
  elem.style.top = Math.round(Math.random() * (innerHeight - height)) + "px";
  elem.style.left = Math.round(Math.random() * (innerWidth - width)) + "px";
  elem.style.width = width + "px";
  elem.style.height = height + "px";
  elem.style.zIndex = win.firstZIndexView;
  elem.innerHTML = '<div id="win_' + id + '_title" class="wintitle">' + he.encode(title) + ('<div onclick="win.instances[' + id + '].close();" id="win_' + id + '_closebtn" class="wintitlebtn winclosebtn">X</div>').repeat((content.closable) + 0) + ('<div onclick="win.instances[' + id + '].maximize();" id="win_' + id + '_maximizebtn" class="wintitlebtn winmaximizebtn">&#x1F5D6;</div>').repeat((content.maximizable) + 0) + ('<div onclick="win.instances[' + id + '].minimize();" id="win_' + id + '_minimizebtn" class="wintitlebtn winminimizebtn">&#x1F5D5;</div>').repeat((content.minimizable) + 0) + '</div><div id="win_' + id + '_inner" style="width:100%;height:' + mh + ';" class="wininner">' + html + '</div>';
  // if (content.resizable) elem.style.resize = "both";
  windowList.appendChild(elem);

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
      resizable: content.resizable,
      setTitle: function(newTitle) {
        title = newTitle;
        win.instances[id].title = newTitle;
        var tmpelem = document.getElementById('win_' + id + '_title');
        if (tmpelem) tmpelem.innerHTML = he.encode(newTitle) + ('<div onclick="win.instances[' + id + '].close();" id="win_' + id + '_closebtn" class="wintitlebtn winclosebtn">X</div>').repeat((content.closable) + 0) + ('<div onclick="win.instances[' + id + '].maximize();" id="win_' + id + '_maximizebtn" class="wintitlebtn winmaximizebtn">&#x1F5D6;</div>').repeat((content.maximizable) + 0) + ('<div onclick="win.instances[' + id + '].minimize();" id="win_' + id + '_minimizebtn" class="wintitlebtn winminimizebtn">&#x1F5D5;</div>').repeat((content.minimizable) + 0);
      },
      close: function() {
        var close = true;
        if (win.instances[id].closeScript) if (typeof win.instances[id].closeScript === 'function') close = win.instances[id].closeScript();
        if (close) {
          win.instances[id].div.classList.add("closing");
          win.instances[id].div.innerHTML += ""/* resets window to apply close animation*/;
          setTimeout(() => { win.instances[id].div.remove(); delete win.instances[id]; }, 100);
          console.log("window " + id + " closed.");
          win.instances[id].closed = true;
        }
      },
      maximize: function() {
        win.instances[id].div.style.top = "0px";
        win.instances[id].div.style.left = "0px";
        win.instances[id].div.style.width = "calc( 100vw - ( 5px + 5px ) )"; // Viewport Width.
        win.instances[id].div.style.height = "calc( 100vh - ( 16px + 5px ) )";  // Viewport Height.
        win.instances[id].draggable = false;
        document.getElementById("win_" + id + "_maximizebtn").innerHTML = "&#x1F5D7;";
        document.getElementById("win_" + id + "_maximizebtn").onclick = function() { win.instances[id].unmaximize(); };
        document.getElementById("win_" + id + "_maximizebtn").id = "win_" + id + "_unmaximizebtn";
        win.instances[id].maximized = true;
        win.instances[id].active();
      },
      unmaximize: function() {
        win.instances[id].div.style.top = win.instances[id].top + "px";
        win.instances[id].div.style.left = win.instances[id].left + "px";
        win.instances[id].div.style.width = win.instances[id].width + "px";
        win.instances[id].div.style.height = win.instances[id].height + "px";
        win.instances[id].draggable = true;
        document.getElementById("win_" + id + "_unmaximizebtn").innerHTML = "&#x1F5D6;";
        document.getElementById("win_" + id + "_unmaximizebtn").onclick = function() { win.instances[id].maximize(); };
        document.getElementById("win_" + id + "_unmaximizebtn").id = "win_" + id + "_maximizebtn";
        win.instances[id].maximized = false;
        win.instances[id].active();
      },
      minimize: function() {
        if (bootOptions === 'cmdgui') return;
        win.instances[id].div.classList.add("minimizing");
        setTimeout(() => {
          win.instances[id].div.style.display = "none";
          listbar.innerHTML += '<div onclick="win.instances[' + id + '].restore()" class="minimizewin" id="win_' + id + '_obj">' + title + '</div>';
          win.instances[id].div.classList.remove("minimizing");
        }, 100);
        win.instances[id].minimized = true;
      },
      restore: function() {
        win.instances[id].div.style.display = "block";
        document.getElementById("win_" + id + "_obj").remove();
        win.instances[id].minimized = false;
        win.instances[id].active();
      },
      active: function() {
        for (i = 0; i < win.instances.length; i++) { if (win.instances[i]) { if (win.instances[i].inactive) { win.instances[i].inactive(); } } };
        win.instances[id].div.classList.add("active")
        win.firstZIndexView++;
        win.instances[id].div.style.zIndex = win.firstZIndexView;
        listbar.style.zIndex = win.firstZIndexView + 1;
      },
      inactive: function() {
        win.instances[id].div.classList.remove("active");
      }
    }
  );
  win.instances[id].active();
  win.instances[id].div.addEventListener("mousedown", win.instances[id].active);
  return id;
}

async function msgbox(icon, title, buttons, content) {
  /*if(!((title instanceof String)&&(buttons instanceof Array)&&(icon instanceof String)&&(content instanceof String))){
    throw "One of the parameters do not have right instance. Make sure it's using these instances at the right order: 'String, String, Array, String'."
  }*/
  if (bootOptions === 'cmd') return;
  if (!icon) icon = "info";
  if (!content) content = "none";
  if (!Array.isArray(buttons)) buttons = [];
  for (i = 0; i < buttons.length; i++) {
    if (!buttons[i].script) buttons[i].script = function() { return; };
    if (!buttons[i].title) buttons[i].title = "none";
  }
  if (icon == "info") {
    icon = ":P"
    if (!title) title = "Information" // i do these titles in case there is no custom title, or when the "custom title" does not work     ah well ok
  } else if (icon == "question") {
    icon = ":O";
    if (!title) title = "Question"
  } else if (icon == "warning") {
    icon = ":/";
    if (!title) title = "Alert!"
  } else if (icon == "error") {
    icon = ":(";
    if (!title) title = "Oops!"
  } else if (icon == "none") {
    icon = "";
    if (!title) title = "Dialog"
  } else {
    throw "Icon not valid.";
  }
  var id = win({ title: title, inner: ('<center><h1>' + icon + '</h1></center><p>' + content + '</p>' + ('<button></button>'.repeat(buttons.length))), closable: true });
  var end = function(param) {
    return param
  }
  for (i = 0; i < buttons.length; i++) {
    (function(id, i) {
      win.instances[id].inner.getElementsByTagName("button")[i].innerText = buttons[i].title;
      win.instances[id].inner.getElementsByTagName("button")[i].addEventListener("click", function() {
        try {
          buttons[i].script(id);
        } catch (err) {
          msgbox("error", "script error", [
            {
              title: "close",
              script: function(d) { return win.instances[d].close(); }
            }
          ], err);
        }
        return end(i);
      }, false);
    })(id, i);
  }
}

function dragElement(id) {
  if (win.instances[id]) { win.instances[id].active(); }
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var elmnt = document.getElementById("win_" + id);
  if (document.getElementById("win_" + id + "_title")) {
    document.getElementById("win_" + id + "_title").onmousedown = dragMouseDown;
  } else throw new Error('No Titlebar bruh');

  function dragMouseDown(e) {
    if (!win.instances[id].draggable) return;
    e = e || window.event;
    if (!isMobile) e.preventDefault();
    if (e.clientY === 10 || e.clientY < 10) return e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!win.instances[id].draggable) return;
    e = e || window.event;
    if (!isMobile) e.preventDefault();
    if (e.clientY === 10 || e.clientY < 10) return e.preventDefault();
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

win.firstZIndexView = 0;

function ConvertStringToHex(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + arr.join("\\u");
}
// to report errors and yes i copied pasted this, ngl xd
window.onerror = function(e) { //  ConvertStringToHex(e.toString()).toString().replace(/\\u/g,".")
  document.body.innerHTML = "<center><h1><b>Oops!</b></h1></center></big></big></big><br>Your HEXEc computer has performed an illegal operation so it was needed to show this screen and shut down all services of this machine.<br>Sorry for any incovinience made by this error screen.<br>You can restart your machine to continue using HEXEc.<br>Or you can report this error to the HEXEc team: <span class='error'>" + e.toString() + "</span><br>Thank you for reading.<br>Please refresh the page.<br><br>Error code: <b class='error' id=\"errcode\">0</b><br><br><button onclick='window.location.reload();'>Refresh</button>";
  document.body.style = "background-color:blue;color:white;";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://cors-enabled.herokuapp.com/https://hexec-sevrer.dateplays.repl.co/store-error?err=" + encodeURIComponent(e.toString()))
  xhr.onload = function() {
    let text = xhr.responseText;
    let errcode = "0".repeat(4 - text.length) + text;
    let btag = document.getElementById("errcode");
    if (btag) btag.innerText = errcode;
  }
  xhr.send();
}

function block_extentions() {
  var usingdarkreader = false;
  var darkreaderenabled = false;
  var darkreaderlength = document.querySelectorAll("style.darkreader").length;
  if (darkreaderlength === 0 || darkreaderlength < 0) darkreaderenabled = true;
  setInterval(() => {
    if (document.querySelectorAll("script.darkreader") && (!darkreaderenabled)) {
      var darkreaders = document.querySelectorAll("style.darkreader");
      for (i = 0; i < darkreaders.length; i++) darkreaders[i].remove();
      if (!usingdarkreader) {
        usingdarkreader = true;
        msgbox("warning", "Extention Blocked", [{ script: function(id) { win.instances[id].close(); themeee = "dark"; location.reload() }, title: "Use Dark Theme" }, { script: function(id) { win.instances[id].close(); darkreaderenabled = true; }, title: "Unblock Extention" }, { script: function(id) { win.instances[id].close() }, title: "Keep Blocking Extention" }], "It Seems Like you are using the extention Dark Reader while viewing the OS.<br>It is reccommended to stop this extention on this OS and use Dark Theme.<br>Choose one of the options:")
      }
    } // fixed
  });// you didnt close a { at line 386                YES I DID      that was some minute ago            oh...
}