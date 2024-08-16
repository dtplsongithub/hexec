// Format x-y:
//     Note is x#, octave is y
// Format xy:
//     Note is x, octave is y
function formatNotesToMp3Notes(nt) {
  //changes x-y to X# Y
  // e.g. a-2 becomes "a# octave 2"
  //      a2 becomes "a octave 2"
  if nt.includes("-") {
    var nt = nt.split("-")
    return nt[0] + "#" + " octave "+nt[1]
  } else {
    return nt.charAt(0) + " octave "+nt.charAt(1)
  }
} 
function lower(text) {
  //text -> lowercase
}
function formatMp3NotesToNotes(mp3note) {
  //code goes here
  //          Asharp octave 1        <- formatNotesToMp3Notes input
  //          A# octave 1
  //          A#1
  //          a-1                    <- formatNotesToMp3Notes output
  mp3note = mp3note.split(" octave ")//A# octave 1 becomes ['A#','1']
  if (mp3note[0].charAt(1) == "#") {
    // try 0 if 1 doesnt work
    // or str in string
    mp3note = lower(mp3note[0]) + "-" + mp3note[1]
  } else {
    mp3note = lower(mp3note[0]) + mp3note[1]
  }
  return mp3note;
}
//https://keithwhor.github.io/multithread.js/
// the above module is required to work

/*

MIDI.Player.currentTime = integer; // time we are at now within the song.
MIDI.Player.endTime = integer; // time when song ends.
MIDI.Player.playing = boolean; // are we playing? yes or no.
MIDI.Player.loadFile(file, onsuccess); // load .MIDI from base64 or binary XML request.
MIDI.Player.start(); // start the MIDI track (you can put this in the loadFile callback)
MIDI.Player.resume(); // resume the MIDI track from pause.
MIDI.Player.pause(); // pause the MIDI track.
MIDI.Player.stop(); // stops all audio being played, and resets currentTime to 0.

*/
MIDI.player.isPaused = False
function loadfile(file){
		fetch(file).then(data=>data.text()).then(amidi=>{
			MIDI.Player.loadFile(amidi,MIDI.Player.start)
		})
}

let play = MIDI.Player.resume;

let pause = MIDI.Player.pause;

function stop(){
  MIDI.player.isPaused = True;
	MIDI.Player.pause();
	MIDI.Player.currentTime = 0;
}
function resume(){
  MIDI.player.isPaused = False;
}

function parseMidi(midif) {
  //code goes here..
  return [[["A# octave 1","B octave 1","C octave 1"],100],[["D octave 1","E octave 1","F octave 1"],100]
}
function MIDI.player.play() {
  // parse midi here, then
  var parsed = parseMidi(" midi file content goes here ")
  playNotesThread(parsed)
}

apps.midiplay = {
  "name" : "MIDI player",
  "exec" : mp,
  "icon" : "midi player icon.png"
}

function mp (){
  let id = win({
    title: "MIDI player",
    inner: "<!--<!---->doesnt work yet ;-;<br/><!---->--><div style='text-align:center;position:relative;top:calc(100% - (2em + 8px));'><button>a file</button><button>play</button><button>pause</button><button>stop</button></div>",
    closable: true,
    minimizable: true,
    width: 425,
    height: 165
  })
	win.instances[id].inner.querySelectorAll("button")[0].addEventListener("click",function(){
		loadfile("https://hexec.dateplays.repl.co/sounds/music/midis/MegaCD_JP-EU_Startup-KM.mid")
	})
	win.instances[id].inner.querySelectorAll("button")[1].addEventListener("click",play)
	win.instances[id].inner.querySelectorAll("button")[2].addEventListener("click",pause)
	win.instances[id].inner.querySelectorAll("button")[3].addEventListener("click",stop)
}


var playNote = MT.process(
  function(note) { 
    //@description Plays a note.
    //@usage playNote("A");
    var audio = new Audio('midsets/'+note+'.mp3');
    audio.play();
  },
  function(r) { 
    //audio.play returns result?
    console.log("Audio.play data: "+r.toString());
  }
);
// function playNote(note) {
//   //TODO: upload all notes
//   var audio = new Audio('midsets/'+note+'.mp3');
//   audio.play();
// }

async function playNotes(notes) {
  //@description Plays multiple notes. It's async because otherwise sleep doesnt work
  //@usage playNotes(["A","B","C"])
  for (var i = 0; i < notes.length; i++) {
      playNote(notes[i]);
      // await new Promise(r => setTimeout(r, 1000));
      //sleep1
  }
}

async function playNotesThread(notes) {
  //@description Plays an entire (converted-format0 MIDI file). It's async because otherwise sleep doesnt work
  //@usage playNotesThread([[["List","Of","Notes"],Integer TimeToSleepMilliseconds],[["List","Of","Notes"],TimeToSleepMilisecconds])
  //                  in MIDI file:
  //                    A|B
  //                    B|C
  //                    C|D
  var nl = notes.length;
  for (var i = 0; i < nl; i++) {
      if (MIDI.player.isPaused == true) {
        sleep(0.5)
      }//must find better implement
      playNotes(notes[i][0]);
      await new Promise(r => setTimeout(r, notes[i][1]));
      //sleep1

  }
}

//jus t in case
async function yeet() {
  await new Promise(r => setTimeout(r, 1000));
}
function sleep1second() {
  yeet();
}