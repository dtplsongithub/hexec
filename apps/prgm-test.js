//do you know why regex at line 28 isnt working???
// this is copy pasted code, scrol to bottom for actual code i wrote
//compiles 2 js
//@author sdf
//START COPY PASTED CODE
// new Console() method
 
// Using require to access fs module
const fs = require('fs');
 
// Using require to access console module
const { Console } = require('console');
 
// Creating write Stream
const output = fs.createWriteStream('./out.log');
const errorOutput = fs.createWriteStream('./err.log');
 
//
const options = { stdout: output, stderr: errorOutput,
ignoreErrors: true, colorMode: false };
const logger = new Console(options);
 
//END COPY PASTED CODE
function compileLine(string) {
  string = string.replace(/ECHO (.*?);/gi, 'document.body.innerHTML += \'$1\'+\'\\n\'');
  string = string.replace(/%(.*?)%/gi, '\'+$1+\'');
  // string = string.replace(/SET (.*?) AS STRINGS '(.*?)';/gi, 'var $1 = \'$2\';')
  string = string.replace(/SET (.*?) AS (.*?);/gi, 'var $1 = $2;')
  string = string.replace(/\.\[REPLACES (.*?) TO (.*?)\]/gi, "'.replace($1,$2)+'")
  //%var% => '+var+'
  //ECHO 1%var%1
  //print('1%var%1')
  //print('1'+var+'1')
  return string
}
console.log(compileLine(`SET test AS 'hmm';
ECHO what if the %test% was debuged.[REPLACES Amongus TO sus];`));