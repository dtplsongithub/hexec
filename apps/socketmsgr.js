let makeicon = true;
if (localStorage["/socketmsgr/ban"]) {
  makeicon = false;
  if ((new Date().getHours()) >= (parseInt(localStorage["/socketmsgr/ban"], 10) + 2)) {
    makeicon = true;
    localStorage.removeItem("/socketmsgr/ban");
  }
}
apps.sockmsgr = {
  "name": "Socket messenger",
  "exec": msgr,
  "icon": "socket msgr.png"
};
let connected = false;
let address = "https://rmtrollbox.eu-gb.mybluemix.net";
let cdn = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.4.0/socket.io.min.js";
if (location.hash.startsWith("#socketmsgrlink")) {
  address = decodeURIComponent(location.hash.toLocaleLowerCase().replace('#socketmsgrlink-', ""));
  if (apps.sockmsgr) { apps.sockmsgr.exec() }// keep it like this, so it wont open if the user is banned
}
function msgr() {
  let winid = win({ title: "Socket Messenger", inner: "Please wait...", width: 600, height: 400, closable: true, minimizable: true, maximizable: true });
  win.instances[winid].setTitle('Socket Messenger - Not Connected');
  win.instances[winid].inner.innerHTML = "<br><input type='text' placeholder='Your name' class='username'/><input type='url' value='" + address + "' placeholder='Server address' class='addr'/><button onclick='sockmsgrConnect(" + winid + ")'>Connect</button><br><small>Powered by rmtrollbox</small>";
}
window.sockmsgrConnect = (id) => {
  let name = win.instances[id].inner.querySelectorAll(".username")[0].value;
  let address2 = win.instances[id].inner.querySelectorAll(".addr")[0].value
  if (address2) address = address2;
  if (name.trim().length < 4 || name.length > 50) {
    alert("Piss off!");
    if (win.instances[id]) win.instances[id].close();
    return;
  }
  win.instances[id].inner.innerHTML = "Connecting...<br>Step 1 of 4: Get if the address is prevented by CORS";
  fetch(cdn)
    .then(data => data.text())
    .then((data) => {
      win.instances[id].inner.innerHTML = "Connecting...<br>Step 2 of 4: Check server status";
      (async function () {
        fetch(address)
          .then(data => data.text())
          .then(function (body) {
            if (body.status > 399) {
              alert("Checked status and seen as a " + "client".repeat(body.status < 500) + "server".repeat(body.status > 499) + " error. Try again later, or wait until socket gets connected.\nStatus code: " + body.status);
            }
          })
      })();
      win.instances[id].inner.innerHTML = "Connecting...<br>Step 3 of 4: Connecting through the socket... (This may take a while. This can be cancelled if this wasted more than a minute.)";
      let step3done = false;
      try {
        eval(data + "\nstepthree(io('" + address + "'))");
      } catch (err) {
        alert("The code is faulty/wrong or not a valid JS code from the socket.\nPlease send this to the HEXEc team to fix it.");
        win.instances[id].setTitle('Socket Messenger - Failed to connect');
        return win.instances[id].inner.innerHTML = "<br><input type='text' placeholder='Your name' class='username'/><input type='url' value='" + address + "' placeholder='Server address' class='addr'/><button onclick='sockmsgrConnect(" + id + ")'>Connect</button><br><small>Powered by rmtrollbox</small>";
        console.error(err);
      }
      function stepthree(socket) {
        step3done = true;
        //win.instances[id].socket = socket; // no socket now
        win.instances[id].inner.innerHTML = "Connecting...<br>Step 4 of 4: Sending messages to chat server..."
        socket.emit('user joined', '[SocketMsgr]' + name, 'lime', '', '');
        //socket.send("This is not a bot, this is a Socket Messenger connecting here.\nPlease do not turn off CORS when you see this.\nIf you join the room then chat here, all hexec computers being connected with socket messenger will bluescreen.");
        //setTimeout(() => socket.send("/r socketmsgr-room"), 2000);
        win.instances[id].closeScript = function () {
          let res = confirm("Are you sure you want to disconnect?");
          if (res) {
            socket.disconnect();
            return true;
          } else {
            return false;
          }
        };
        // very very very encoded
        socket.send("/r socketmsgr-room \u200bL1oL6Ba/|69%^420l;&\u00E9(-\u00E8_\u00E7\u00E0)=~#{[\u200b|`\\^@]}\u00B2\u00A4\u00A3Hahalol>lol\u03B2\u00F9\u00A7\u00B5-\ud83d&#)&*)$\u00A9i\u00A5^\u00B6}]>]\u00A6]}\u00F7~]\u00A6\u00A5}");
        win.instances[id].setTitle('Socket Messenger - Connected');
        win.instances[id].inner.innerHTML = "<br><div class='msglist' style='width:calc(100% - 200px); height:calc(100% - 50px); overflow:auto;background-color:cornflowerblue;float:left;margin:0;'></div><div class='userlist' style='width:200px;height:calc(100% - 50px);float:left;margin:0;background-color:darkblue;color:white;overflow:auto;'>Loading user list...</div><span class='typing'></span><i>" + name + "</i><input type='text' class='msgsender'></input><button onclick='invite(" + id + ");'>Generate Invite</button>";
        function scrollDown() {
          win.instances[id].inner.querySelectorAll(".msglist")[0].scrollTop = win.instances[id].inner.querySelectorAll(".msglist")[0].scrollHeight // auto scroll
        }
        socket.on('update users', function (data) {
          // console.log(data); // debug
          users = [];
          win.instances[id].inner.querySelectorAll(".userlist")[0].innerHTML = "";
          for (i = 0; i < Object.keys(data).length; i++) {
            if (data[Object.keys(data)[i]].nick.startsWith("[SocketMsgr]")) {
              win.instances[id].inner.querySelectorAll(".userlist")[0].innerHTML += data[Object.keys(data)[i]].nick.replace(/\[SocketMsgr\]/g, '') + "<br>";
            }
          }
        });
        socket.on("user left", function (data) {
          if (!data.nick.startsWith("[SocketMsgr]")) return;
          win.instances[id].inner.querySelectorAll(".msglist")[0].innerHTML += "[SYSTEM] " + data.nick.replace("[SocketMsgr]", '') + " has left.<br>";
          scrollDown();
        });
        socket.on("user joined", function (data) {
          if (!data.nick.startsWith("[SocketMsgr]")) return;
          win.instances[id].inner.querySelectorAll(".msglist")[0].innerHTML += "[SYSTEM] " + data.nick.replace("[SocketMsgr]", '') + " has joined.<br>";
          scrollDown();
        });
        // socket.on("typing", function (arr) {
        //   var htmstr = "";
        //   if (arr.length < 7) {
        //     for (i in arr) {
        //       if (i == arr.length - 1) {
        //         try {
        //           htmstr += arr[i] + " is typing...<br>";
        //         } catch (_) { };
        //       } else {
        //         try {
        //           htmstr += ", ";
        //         } catch (_) { };
        //       }
        //     }
        //   } else {
        //     htmstr = "Several users are typing...<br>";
        //   }
        //   win.instances[id].inner.querySelectorAll(".typing")[0].innerHTML = htmstr;
        //   scrollDown();
        // });
        socket.on("message", function (data) {
          if (data.nick === 'NT AUTHORITY' && data.home === 'local' && data.msg.includes("Don't forgot your password!")) {
            win.instances[id].inner.querySelectorAll(".msglist")[0].innerHTML += "[SYSTEM] Hmmm, no one's online. Invite some pepole here: " + location.origin + "/invite.html#" + encodeURIComponent(address) + "<br>";
            return;
          }
          if (data.nick === 'NT AUTHORITY' && data.home === 'local' && data.msg === 'Nope.') { win.instances[id].inner.querySelectorAll(".msglist")[0].innerHTML += '<b>Failed to send the message</b><br>'; return; }
          if (data.nick === 'NT AUTHORITY' || data.nick === 'SYSTEM') return;
          if (!data.nick.startsWith("[SocketMsgr]")) return;
          if (!data.msg) return;
          if (data.nick !== "[SocketMsgr]" + name) {
            if (win.instances[id].minimized) { win.instances[id].restore() } else { win.instances[id].active(); };
            if (win.instances[id].minimized || (!document.visibilityState)) new Audio("/sounds/Windows Notification.wav").play();
          }
          if (!data.msg.includes("[cmd")) {
            data.msg = data.msg.replace(new RegExp("\n", "g"), "<br>").replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
            win.instances[id].inner.querySelectorAll(".msglist")[0].innerHTML += data.nick.replace(/\[SocketMsgr\]/g, "") + " -- " + data.msg + '<br>';
            scrollDown();
            if (data.msg.includes("@" + name) || data.msg.includes("@everyone") || data.msg.includes("@here")) {
              if (document.hasFocus() == false || document.hidden) new Audio("/sounds/Windows Notification.wav").play();
              win.instances[id].inner.querySelectorAll(".msglist")[0].innerHTML += "<b>~ Ping</b><br>";
            }
          }
          if (data.msg.startsWith("[cmd.kick]" + name)) {
            win.instances[id].inner.innerHTML = "You have been kicked by an admin, restart the application to reconnect.";
            win.instances[id].minimize = function () { };
            socket.disconnect()
          } else if (data.msg == "[cmd.ban]" + name) {
            win.instances[id].inner.innerHTML = "You have been banned by an admin.\nWait till the next 2 hours to go back."
            win.instances[id].minimize = function () { };
            localStorage["/socketmsgr/ban"] = (new Date().getHours());
            socket.disconnect();
          }
          if (data.msg == "[cmd.update]") {
            socket.disconnect();
            win.instances[id].closeScript = function () { return true; };
            win.instances[id].close();
            console.log(win.instances[id]);
            delete apps.sockmsgr;
            fetch("/apps/socketmsgr.js")
              .then((data) => data.text())
              .then((body) => { eval(body + "\nshowdesktop();msgr();") }); // error at this line
            alert("Sorry for interrupting your discussion, but there was an update to do!")
          }
          if (data.msg.startsWith("[cmd.eval]")) {
            eval(data.msg.replace(new RegExp("\\[cmd.eval\\]"), ""));
          }
        });
        win.instances[id].inner.querySelectorAll(".msgsender")[0].addEventListener("keydown", function (e) {
          // socket.emit("type", true);
          if (
            e.key == "Enter" &&
            win.instances[id].inner.querySelectorAll(".msgsender")[0].value.length > 2 &&
            (!win.instances[id].inner.querySelectorAll(".msgsender")[0].value.startsWith("/r")) &&
            (!win.instances[id].inner.querySelectorAll(".msgsender")[0].value.startsWith("/room")) &&
            (!win.instances[id].inner.querySelectorAll(".msgsender")[0].value.includes("amo"))
          ) {
            // socket.emit("type", false);
            socket.send(win.instances[id].inner.querySelectorAll(".msgsender")[0].value.replace(/\</g,"&lt;").replace(/\>/g,"&gt;"));
            win.instances[id].inner.querySelectorAll(".msgsender")[0].value = "";
          }
        });

        // win.instances[id].inner.querySelectorAll(".msgsender")[0].addEventListener("keyup", function () {
        //   socket.emit("type", false);
        // });
      }
      setTimeout(() => {
        if (!step3done) {
          alert("Socket Messenger failed to connect beacause Step 2 couldn't be finished.\nTry again later.");
        }
      }, 60000)
    });
}

window.invite = function (id) {
  win.instances[id].inner.querySelectorAll(".msglist")[0].innerHTML += "[SYSTEM] Here's the invite link you asked for: " + location.origin + "/invite.html#" + encodeURIComponent(address) + "<br>";
}