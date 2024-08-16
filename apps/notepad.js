apps.notepad = {
  "name": "Notepad",
  "exec": note,
  "icon": "text file icon.png"
}
function note(file) {
  let id = win({ title: "Notepad", inner: "Please wait...", width: 500, height: 400, closable: true, minimizable: true, maximizable: true });
  let notewin = win.instances[id];
  notewin.inner.innerHTML = '<textarea style="width:calc( 100% - 5px );height: calc(100% - 48px);"></textarea><button onclick="apps.notepad.exec()">New</button><button>Save</button>';
  notewin.setTitle("Notepad - Unsaved Document");
  win.instances[id].closeScript = function () {
    return confirm("Are you sure to close this window?");
  };
}

// PONALI DID YOU READED IDEaS I MEAN you did notepad pretty well BUȚ THE ERROR CODES ARE JUST... I WANTED THEM JUST TO BE A NUMBER LIKE 0001

// ponali? 