const
	Parser  	= require('../lib/parser'),
	expect		= require('chai').expect,
	esprima		= require('esprima'),
	r			= require('remove-tabs'),
	util		= require('util'),
	$			= require('esquery'),
	diff		= require('deep-diff').diff;
	
	
describe('BluePrintParser', function(){
	it('should throw an error if there is a line which has indents gap more than 2.', function(){
	    var blueprint = r`
			DESCRIBE: Lines
					InIT: should not have gap more than 2.`;
		
		expect(Parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid indent.');
	});
	
	
	it('should throw an error if there is a line which has no key.', function(){
		var blueprint =	r`
			DESCRIBE: Lines
				should have a key not like me.`;
						
		expect(Parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid line.');
	});
    
    
    it('should throw an error if there is a line which has empty key.', function() {
    	var blueprint =	r`
    		DESCRIBE: Lines
				:should not have a empty key not like me.`;
						
		expect(Parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid line.');
    });
    
    
    it('should ignore a comment which has leading #.', function(){
    	var blueprints = [
    		r`
    		DESCRIBE: Comment
				# should ignore!`,
				
			r`
			DESCRIBE: Comment
				# should ignore
				CONTEXT: should not ignore.`
		];
		
    	
    	var lengths = [0, 1];
    	
    	for(var i = 0 ; i < blueprints.length ; i++) {
    		var outline = Parser.parse(blueprints[i]);
    		
    		var block = $(outline, 'CallExpression BlockStatement');
    		
	    	expect(block[0].body).to.have.length(lengths[i]);
    	}
    });
    
    
    it('should return a correct object if a line which has empty value.', function(){
    	var blueprint = r`
			DESCRIBE: Line
				IT: should be able to have empty value.
				IT: `;
    		
    	var outline = Parser.parse(blueprint);
    	var block = $(outline, 'CallExpression BlockStatement');
    	
    	expect(block[0].body).to.have.length(2);
    });
    
    
    it('should return a correct object if a valid blueprint is given.', function(){
    	
    	var blueprint = [ 
			r`
			DESCRIBE: Parser
	    		CONTEXT: when a valid blueprint is given,
					IT: should pass a test spec.`,
    		r`
			DESCRIBE: Parent
				CONTEXT: can have many
				CONTEXT: children`
    	];
    	
    	var expected = [
    		esprima.parse(r`
				describe('Parser', function() {
					context('when a valid blueprint is given,', function() {
						it('should pass a test spec.', function() {
						});
					});
				});`
    		),
	    	esprima.parse(r`
				describe('Parent', function() {
					context('can have many', function() {
					});
					context('children', function(){
					});
				});`
    		)
    	];
    	
    	for(var i = 0 ; i < blueprint.length ; i++) {
    		var outline 	= Parser.parse(blueprint[i]);
    		
    		expect(diff(outline, expected[i])).to.be.undefined;
    	}
    });
});