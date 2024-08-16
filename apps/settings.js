apps.settings = {
  "name":"settings",
  "exec":main,
  "icon":"settings.png"
}

function main() {
  win({
    title:"Settings",
    inner:"<br><h2>Settings</h2><hr><button onclick=apps.appearance.exec()><img src='images/icons/themes.png'  width='32' height='32'>Appearance</img></button><button onclick=apps.languages.exec()><img src='images/icons/translate.jpg' width='32' height='32'>Languages</img></button>",
    closable:true,
    minizable:false,
    minizable:true,
    width: 700,
    height: 450
  })
}


apps.appearance = {
  hide: true,
  "exec": appearanceapp
}

function appearanceapp () {
  win({
    title:"Settings - Appearance",
    inner:"<br><h2>Appearance</h2><hr><button onclick=apps.themes.exec()><img src='images/icons/themes.png'  width='32' height='32'>Themes</img></button><button onclick=apps.screensaver.exec()><img src='images/icons/themes.jpg' width='32' height='32'>Screensaver</img></button>",
    closable:true,
    minizable:false,
    minizable:true,
    width: 700,
    height: 450
  })
}


apps.screensaver = {
  hide: true,
  "exec": screensaverapp
}

function screensaverapp () {
  win({
    title:"Settings - Appearance - Screensaver",
    inner:"Choose number of minutes of inactivity before screensaver<br><input type='number' min='1' max='120' id='screensavertime' placeholder='enter nr of minutes'><button onclick='screensavermins=parseInt(getElementById(\"screensavertime\"));'>h</button>",
    closable:true,
    minizable:false,
    minizable:true,
    width: 700,
    height: 450
  })
}