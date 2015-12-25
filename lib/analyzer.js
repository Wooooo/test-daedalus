const 
    esprima         = require('esprima'),
    parser          = require('./parser');

function traverse(outlineByMaze, outlineByBP) {
    
}   

function analyze(maze, blueprint) { // convert maze to outline, blueprint to outline
    var outlineByMaze = esprima.parse(maze);
    var outlineByBP = parser.parse(blueprint);
    
    // rebuild outlineByMaze by comparing with outlineByBP
}

exports.analyze = analyze;