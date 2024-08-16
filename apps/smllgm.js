apps.smllgm = {
  "name": "Small Incremental Game",
  "exec": smllgm,
  "icon": "smllgm.png"
}

function smllgm() {
  let game = {
    number: 0,
    numberGain: 1,
    costs: [10]
  }
  let id = win({ title: "Small Incremental Game", inner: `<h1>The Small Incremental Game</h1><p>${game.number}</p><button>Increment number by 1</button><br><button style="display: none">Multiply number gain by 1.5<br>Cost: ${game.costs[0]}</button>`, closable: true, maximizable: true, minimizable: true })
  function incrementNumber() {
    game.number = game.number + game.numberGain;
    win.instances[id].inner.getElementsByTagName("p")[0].innerText = game.number;
    if (game.number >= 10) {
      win.instances[id].inner.getElementsByTagName("button")[1].style.display = "inline-block"
    }
  }
  function multiplyNumberGain() {
    game.numberGain *= 1.5;
    game.number -= game.costs[0];
    game.costs[0] *= 1.1
    win.instances[id].inner.getElementsByTagName("button")[1].innerText = `Multiply number gain by 1.5\nCost: ${game.costs[0]}`;
  }
  for (let i = 0; i > win.instances[id].inner.getElementsByTagName("button").length; i++) {
    win.instances[id].inner.getElementsByTagName("button")[i].style.transition = "3s"
  }
  win.instances[id].inner.getElementsByTagName("button")[0].addEventListener("click", incrementNumber, false);
  win.instances[id].inner.getElementsByTagName("button")[1].addEventListener("click", multiplyNumberGain, false);

}