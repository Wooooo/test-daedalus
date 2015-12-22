const
	Parser      = require('../lib/parser'),
	Builder		= require('../lib/builder'),
	expect		= require('chai').expect;
	
describe.skip('MazeBuilder', function(){
	it('should return correct mazes when valid outlines are provided.', function(){
		var outlines = [
			Parser.parse(
				'DESCRIBE: Parser\n'
			),
			
			Parser.parse(
				'DESCRIBE: Parser\n'+
				'	CONTEXT: when a valid blueprint is given,\n'+
				'		IT: should pass a test spec.'
			)
		];
		
		var expected = [
			'describe(\'Parser\', function() {\n'+
			'	// your codes here\n'+
			'});\n',
			
			'describe(\'Parser\', function() {\n'+
			'	context(\'when a valid blueprint is given,\', function() {\n'+
			'		it(\'should pass a test spec.\', function() {\n'+
			'			// your codes here\n'+
			'		});\n'+
			'	});\n'+
			'});\n'
		];
		
		for(var i = 0 ; i < outlines.length ; i++) {
			var maze = Builder.build(outlines[i]);
			
			expect(maze).to.equal(expected[i]);
		}
	});
});