var canExec = firstboot;
var today = new Date();

if ((today.getMonth() === 3 && today.getDate() === 1)) canExec = true;

if (Math.random() <= 0.05) canExec = true;
if (Math.random() <= 0.001) canExec = true;
if (Math.random() <= 0.0001) canExec = true;
// canExec= true
if (canExec) {
  apps.o = {
	  "name": "⁇",
	  "exec": dqm,
	  "icon": "double_question_mark.png"
  }
}

function dqm() {
  if (!canExec) return;
  canExec = false;
  localStorage["osnotfound"] = "⁇";
  apps = {};
  for (i = 0; i <= 69; i++) apps["o"+i] = {"name":"⁇","exec":function(){},"icon":"double_question_mark.png"};
  showdesktop();
  desktop.style.background="";
  desktop.style.backgroundImage="url(/images/icons/double_question_mark.png)";
  desktop.style.backgroundRepeat="no-repeat";
  desktop.style.backgroundSize="100% 100%";
	for (i = 0; i <= 500; i++) {
		setInterval(() => {
			var winid = win({ title: "⁇", inner: "⁇", closable: false, minimizable: false, maximizable: false, width: i * 1.1, height: (550 - i) / 50, x: i, y: i });
      win.instances[winid].draggable=false;
      win.instances[winid].active=function(){return'';};

		}), 3000
	}
}