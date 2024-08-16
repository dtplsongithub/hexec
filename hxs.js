// HEXEc Scripting language (HXS)
// HXS is a compiled language that compiles to JavaScript
// It is extremely simple, which makes it good for making scripts to do repetitive things
// and because it compiles to JavaScript it has pretty good performance

// Hello world program:
// echo "Hello world"

// Alert Hello world program:
// alert "Hello world!" "My Program"

// Variables Example program:
/*
set $count=10
loop $count
{
  echo "ducks"
}
*/
// Hello world with variables:
/*
set $text="Hello world!"
set $title="MyApp"
alert $text $title
*/

// Written from scratch by:
// nicejs (@TBSharedAccount)
function hxs(text) {
		let pTD_ignore_regex = /==|true|false|\+/
		function parseTheDuc(text) {
			if (text.match(pTD_ignore_regex)) return text;
			if (text.match(/\$([A-z_]+)/) && text.startsWith('$')) {
				return "{VAR{!!}}"+varReplace(text, 1);
			}
			return JSON.parse(text);
		}
    function parseArguments(text) {
        return text.match(strANMatcher)?.map?.(x => parseTheDuc(x));
    }
    function setVarParser(text) {
        return text.replace(/^set \$([A-z_]+)=(.*)$/g,(str,name,content) => {
            endResult += `var _${name} = ${content};`
            text = "";
            return "";
        })
    }
    
    function getName(line) {
        return line.split(/ +/)[0];
    }
		function genVarName() {
			return "_"+Math.random().toString(36).slice(2);
		}
    function varReplace(text, mode = 0) {
        if (mode === 0) return text.replace(/\$([A-z_]+)/g,(str,name) => `"+_${name}+"`);
        if (mode === 1) return text.replace(/\$([A-z_]+)/g,(str, name) => `_${name}`)
    }
		function bVarParse(text) {
			if (text.toString().startsWith('{VAR{!!}}_')) return text.slice(9);
			return text;
		}
    function strDuc(text) {
				if (typeof text === "number") return text;
				if (typeof text === "boolean") return text;
				if (text.startsWith('{VAR{!!}}_')) return text.slice(9);
        return varReplace(JSON.stringify(text), 0);
    }
    const strMatcher = /"([^"\\]|\\[\s\S])*"/g;
		const strANMatcher = /"([^"\\]|\\[\s\S])*"|(\d+)|==|\$([A-z_]+)/g;
    const commands = {
        echo(i,text) {
            return `console.log(${strDuc(text)});`;
        },
        js(i,text) {
            return varReplace(text);
        },
        alert(i,text, title) {
            return `await (() => new Promise(resolve => msgbox(${strDuc(text)}, 'warning', ${strDuc(title)},[{title: 'OK',script: function (d) {  return resolve(win.instances[d].close()); }}])))();`
        },
				info(i,text, title) {
            return `await (() => new Promise(resolve => msgbox(${strDuc(text)}, 'info', ${strDuc(title)},[{title: 'OK',script: function (d) {  return resolve(win.instances[d].close()); }}])))();`
        },
				error(i,text, title) {
            return `await (() => new Promise(resolve => msgbox(${strDuc(text)}, 'error', ${strDuc(title)},[{title: 'OK',script: function (d) {  return resolve(win.instances[d].close()); }}])))();`
        },
				confirm(i, vname, text, title) {
					return `_${vname} = await (() => new Promise(resolve => msgbox(${strDuc(text)}, 'question', ${strDuc(title)},[{title: 'Yes',script: function (d) {  win.instances[d].close(); return resolve("yes"); }},{title: 'No',script: function (d) {  win.instances[d].close(); return resolve("no"); }}])))();`
				},
				start(i,program) {
					return `apps[${strDuc(program)}].exec();`;
				},
				storage(i,action, data, value) {
					switch (action) {
						case "remove":
							return `localStorage.removeItem(${strDuc(data)});`
						case "set":
							return `localStorage.setItem(${strDuc(data)}, ${strDuc(value)});`;
						case "get":
							return `var _${data} = localStorage.getItem(${strDuc(value)});`;
					}
				},
        js(i,code) {
          return code;
        },
        monkeypatch(i,jsfunction, code) {
          // variables are not supported here.
          return `${jsfunction} = () => {${code}};`
        },
				iframe(i, title, url, width=600, height=400) {
					return `
					(() => {
						var winid = win({ title: ${strDuc(title)}, inner: '', width: ${width}, height: ${height}, maximizable: true, minimizable: true, closable: true, resizable: true });
      			win.instances[winid].inner.innerHTML = '<iframe src=${strDuc(url)} frameBorder="0" style="width:100%;height:100%;" width="100%" height="100%" id="iframe_box_' + winid + '"></iframe>'
					})();
					`;
				},
				loop(i,count) {
					let loopvar = genVarName();
					let duck = `for (let ${loopvar} = 0; ${loopvar} < ${bVarParse(count)}; ${loopvar}++) `
					
					return duck;
				},
				"if"(i, x, op, y) {
					return `if (${strDuc(x)} ${op} ${strDuc(y)}) `;
				},
				"{"(i) {
					return "{";
				},
				"}"(i) {
					return "};";
				},
				increase(i,vname) {
					return `_${vname}++;`
				},
				decrease(i,vname) {
					return `_${vname}--;`;
				},
				math(i,resultStore,expr) {
					return `var _${resultStore} = eval(${strDuc(expr)}.toUpperCase());`;
				},
				run(i,script) {
					return `eval(hxs(localStorage.getItem(${strDuc(script)})))`
				},
				input(i,varName,text) {
					return `var _${varName} = prompt(${strDuc(text)});`;
				}
    };
    const lines = text.replace(/\/\*(.*)\*\//gs,"").split('\n');
    let endResult = "";
    for (let i = 0; i < lines.length; i++) {
				let line = lines[i].trimStart();
				if (line.startsWith('//')) continue;

        setVarParser(line);
        if (!getName(line)) continue;
        let command = commands[getName(line)];
        let args = parseArguments(line);
        if (getName(line) === "") continue;
        if (getName(line) === "set") continue;
				
        if (!command) {console.error(`Unknown Command: ${command}`); continue}
        if (args) {
            endResult += command(i,...args);
        } else {
            endResult += command(i);
        }
    }
    return `(async()=>{${endResult}})();`;

}
hxs.example = `set $nice="Yes."
if $nice == "Yes."
	alert "Welcome to HXS - The future of HEXEc Apps!" "HXS Welcome"
end
set $count=0
loop 69
	increase "count"
	echo "Count: $count"
end`;
module.exports = hxs;
