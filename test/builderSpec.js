const
	Parser      = require('../lib/parser'),
	Builder		= require('../lib/builder'),
	expect		= require('chai').expect,
	r			= require('remove-tabs');
	
describe('MazeBuilder', function(){
	it('should return correct mazes when valid outlines are provided.', function(){
		var outlines = [
			Parser.parse(r`
				DESCRIBE: Parser`
			),
			
			Parser.parse(r`
				DESCRIBE: Parser
					CONTEXT: when a valid blueprint is given,
						IT: should pass a test spec.`
			)
		];
		
		var expected = [
			r`
			describe('Parser', function () {
			});`,
			
			r`
			describe('Parser', function () {
				context('when a valid blueprint is given,', function () {
					it('should pass a test spec.', function () {
					});
				});
			});`
		];
		
		for(var i = 0 ; i < outlines.length ; i++) {
			var maze = Builder.build(outlines[i]);
			
			expect(maze).to.equal(expected[i]);
		}
	});
});