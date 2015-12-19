var endNewLine = 0;
var startNewLine = 0;


function nNewLines(n) {
    var str = '';
    
    for(var i = 0 ; i < n ; i++) str += '\n';
    
    return str;
}


function nTabs(n) {
    var str = '';
    
    for(var i = 0 ; i < n ; i++) str += '\t';
    
    return str;
}


function traverse(root, level) {
    var walls = '', i;
    
    
    if( level !== 0 ) {
        walls += nTabs(level-1)+`${root.key}('${root.value}', function() {\n`;
    }
    
    
    var childWalls = (root.children || []).reduce(function(prev, child, idx) {
        if( idx === 0 ) prev = nNewLines(startNewLine) + prev;
        
        return prev + traverse(child, level+1)+'\n'+nNewLines(endNewLine);
    }, '');
    
    
    walls += childWalls === '' ? nTabs(level)+'// your codes here\n' : childWalls;
    
    
    if( level !== 0 ) {
        walls += nTabs(level-1)+'});';
    }
    
    return walls;
}

function build(outline) {
    return traverse(outline, 0);
}

exports.build = build;