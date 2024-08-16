apps.languages = {
  "name": "Languages",
	hide:true
	"exec":languagesapp
}

function languagesapp(){
	win({title:"Languages",inner:"your html here",width:300,height:500,closable:true,minimizable:true,maximizable:true})
}

if(navigator.language=="fr"){
	msgbox("Bienvenue sur HEXEc!<br>Vous êtes en train d'utiliser le langage Anglais. Voulez-vous changer de langage?","question","Changer de langage",[{title:"Oui",script:function(){localStorage["languages/chosen"]="french";location.reload()}},{title:"Non",script:function(id){win.instances[id].close()}}])
} else if (navigator.language=="vi"){
	// help me nam!!!
} else if (navigator.language=="gt"){
  msgbox("Come to Heskeke English, you want to change","question","Change language",[{title:"LOVE",script:function(){localStorage["languages/chosen"]="google_translate";location.reload()}},{title:"Unavailable",script:function(id){win.instances[id].close()}}])
}