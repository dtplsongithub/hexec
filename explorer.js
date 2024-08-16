if (!location.hash.startsWith("#")) { location.hash = "#/"; }
if (Object.keys(window.parent.localStorage).length==0){
	window.parent.localStorage["/welcome.txt"] = "Welcome";
}
let keys = Object.keys(window.parent.localStorage);
for (i = 0; i < keys.length; i++) {
  if (keys[i].startsWith(location.hash.replace(/\#/g, "")) && keys[i].split("/").length == location.hash.split("/").length) {
    files.innerHTML += "<button onclick='open(keys["+i+"])'>" + he.encode(keys[i].slice(0,20) + "...".repeat(keys[i].length>20)) + "</button>";
  }
}
document.body.addEventListener("contextmenu", function (e) {
	e.preventDefault();
	files.innerHTML="<button onclick='newfile();'>Create file</button><button onclick='newfolder()'>Create Folder</button><button onclick='format()'>Format</button><button onclick='location.reload();'>Cancel</button>";
});

function newfile(){
	files.innerHTML="Enter title: <input type='text' id='newfilename'></input><button onclick='window.parent.localStorage[location.hash.replace(/\\#/g,\"\")+newfilename.value]=\"\";location.reload()'>Submit</button><button onclick='location.reload();'>Cancel</button>"; 
}

function newfolder(){
	files.innerHTML="Enter title: <input type='text' id='newfoldername'></input><button onclick='window.parent.localStorage[location.hash.replace(/\\#/g,\"\")+newfoldername.value]=\"[sysfile.folder]\";location.reload()'>Submit</button><button onclick='location.reload()'>Cancel</button>";
}

function format(){
	files.innerHTML="Are you sure? You can lose all your data, and they will never be recovered! Do you wish to continue?<button onclick='window.parent.localStorage.clear();window.parent.location.reload();'>Yes</button><button onclick='location.reload()'>No</button>";
}

function open(key){
	if(parent.localStorage[key].startsWith("[sysfile.folder]")){
		location.hash="#"+key;
		location.reload();
	} else {
		window.parent.app(key);
	}
}
/** dateplays: you guys are the best! **/
/** ponali: thanks **/
/** wait, where you coded the version?**/
// 0.2.3
// ponali: now building 0.2.3, before we were at 0.2.2
// ponali: 0.2.2 means it's in beta and it's 1.2.2
// no, i mean the other parts of the versions
// ponali: i am confused rn