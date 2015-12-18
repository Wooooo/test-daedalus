const
	assert  = require('assert'),
	fs      = require('fs');
	
var tabSize = 4, tab = '    ';
var keyLowercase = true;

function traverse(phrases, curIdx) {
	var root = phrases[curIdx];
	
	var node = {
		key: root.key,
		value: root.value,
		children: []
	};
	
	var i = curIdx+1, len = phrases.length;
	
	while(i < len) {
		var next = phrases[i];
		
		if( next.level - root.level > 1 ) { // error
			throw new Error('Invalid indents.');
		}
		
		else if( next.level <= root.level ) {// end
			break;
		}
		
		var res = traverse(phrases, i);
		
		node.children.push(res[0]);
		
		i = res[1];
	}
	
	return [node, i];
}


function splitLines(str) {
	return str
	.replace(/\r\n/g,'\n') //for window
	.split('\n');
}

//TODO allow leading spaces also
function lineToPhrase(line) {
	var tabs = 0;
	
	var match = line.match(/^[\t]+/); 		//find leading tabs
	if( match !== null ) tabs = match[0].length;
	
	var contents = line.substr(tabs);		//exclude leading tabs
	if( contents === '' ) return; 			//ignore empty line
	
	var colonIdx = contents.indexOf(':'); //find first colon
	if( colonIdx === -1 ) 
		throw new Error(`Invalid line. ${contents}`);
	
	var key = contents.substr(0, colonIdx).trim(), 
		value = contents.substr(colonIdx+1).trim();
	
	key = keyLowercase ? key.toLowerCase() : key;
	return {
		level: tabs,
		key: key,
		value: value
	};
}

function parse(str) {
	var lines = splitLines(str);
	var phrases = lines.map(lineToPhrase).filter(val => val !== void 0);
	
	phrases.unshift({level: -1});	// root
	return traverse(phrases, 0)[0];
}

exports.parse = parse;