const
	labyParser  = require('../lib/parser'),
	expect		= require('chai').expect;
	

describe('Icarus', function(){
	it('should throw an error if there is a line which has indents gap more than 2.', function(){
	    var errorStr = '\t\tCONTEXT: should not have gap more than 2.';
	    
		var labyStr =   'DESCRIBE: Indents\n'+
					    errorStr;
		
		expect(labyParser.parse.bind(null, labyStr)).to.throw(Error, 'Invalid indent.');
	});
	
	it('should throw an error if there is an line which has no key.', function(){
	    var errorStr = 'should have a key not like me.';
		
		var labyStr =	'DESCRIBE: Lines\n'+
						errorStr;
						
		expect(labyParser.parse.bind(null, labyStr)).to.throw(Error, 'Invalid line.');
	});
    
    
});