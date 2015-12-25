var tabSize = 4, tab = '    ';
var keyLowercase = true;


function generateNode(root, idx) {
	if( idx === 0 ) {
		return {
			type: 'Program',
			body: [],
			sourceType: 'script'
		}
	}
	
	else {
		return { 
			type: 'ExpressionStatement',
       		expression: { 
       			type: 'CallExpression',
          		callee: { 
          			type: 'Identifier', 
          			name: root.key
          		},
          		arguments: [ 
           			{ 
           				type: 'Literal', 
           				value: root.value, 
           				raw: `'${root.value}'`
           			},
             		{ 
             			type: 'FunctionExpression',
               			id: null,
               			params: [],
               			defaults: [],
               			expression: false,
               			generator: false,
               			body: { 
               				type: 'BlockStatement',
                  			body: [
                       		]
               			}
             		}
             	]
       		}
		}
	};
}


function insertChildIntoNode(node, child) {
	if( node.type === 'ExpressionStatement' ) {
		node.expression.arguments[1].body.body.push(child);
	}
	
	else if( node.type === 'Program' ) {
		node.body.push(child);
	}
}


function traverse(phrases, curIdx) {
	var root = phrases[curIdx];
	
	var node = generateNode(root, curIdx);
	
	
	var i = curIdx+1, len = phrases.length;
	
	while(i < len) {
		var next = phrases[i];
		
		if( next.level - root.level > 1 ) { // error
			throw new Error('Invalid indent.');
		}
		
		else if( next.level <= root.level ) {// end
			break;
		}
		
		var res = traverse(phrases, i);
		
		insertChildIntoNode(node, res[0]);
		
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
	
	var match = line.match(/^[\t]+/); 		// find leading tabs
	if( match !== null ) tabs = match[0].length;
	
	
	var contents = line.substr(tabs);		// exclude leading tabs
	if( contents === '' ) return; 			// ignore empty line
	
	
	if( contents[0] === '#' ) return;			// ignore comment
	
	
	var colonIdx = contents.indexOf(':'); //find first colon
	if( colonIdx === -1 ) throw new Error(`Invalid line.`);
	
	
	var key = contents.substr(0, colonIdx).trim(), 
		value = contents.substr(colonIdx+1).trim();
	
	if( key === '' ) throw new Error(`Invalid line.`);
		
		
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