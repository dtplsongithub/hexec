window.batch = function(data){
	let commands = data.split("\n");
	for(i=0;i<commands.length;i++){
		let cmd = commands[i];
		if(apps[cmd]){
			apps[cmd].exec();
		} else {
			msgbox("error","Batch File Error",[{script:function(id){win.instances[id].close();},title:"OK"}],"The command '"+cmd+"' is not valid nor an app.<br>Line "+i)
		}
	}
}