apps.winxy = {
  "name" : "window xy test",
  "icon" : "exe file icon.png",
  "exec" : win_
}

function win_ () {
  win({
    title:"a",
    inner:"x is 0 and y is 0",
    closable:true,
    minimizable: true,
    maximizable: true,
    // the moment of truth
    x: 0,
    y: 0
  })
}