const
	parser  = require('../lib/parser'),
	expect		= require('chai').expect;
	

describe('BluePrintParser', function(){
	it('should throw an error if there is a line which has indents gap more than 2.', function(){
	    var errorStr = '\t\tIT: should not have gap more than 2.';
	    
		var blueprint = 'DESCRIBE: Indents\n'+
					    '\t\tIT: should not have gap more than 2.';
		
		expect(parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid indent.');
	});
	
	
	it('should throw an error if there is an line which has no key.', function(){
		var blueprint =	'DESCRIBE: Lines\n'+
						'should have a key not like me.'
						
		expect(parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid line.');
	});
    
    
    it('should return a correct object if value of line is empty.', function(){
    	var blueprint = 
    		'DESCRIBE: value\n'+
    		'\tIT: should be able to be empty.\n'+
    		'\tIT: ';
    		
    	var frame = parser.parse(blueprint);
    	
    	expect(frame.children[0].children[1].value).to.equal('');
    });
    
    
    it('should return a correct object if a valid blueprint is given.', function(){
    	var blueprint = [	
    		'DESCRIBE: Parser\n'+
    		'\tCONTEXT: when a valid blueprint is given,\n'+
    		'\t\tIT: should pass a test spec.',
    		
    		'DESCRIBE: Parent\n'+
    		'\tCONTEXT: can have many\n'+
    		'\tCONTEXT: children'
    	];
    	
    	var expected = [
    		{
	    		key: 'describe',
	    		value: 'Parser',
	    		children: [
	    			{
	    				key: 'context', value: 'when a valid blueprint is given,',
	    				children: [
			    			{key: 'it', value: 'should pass a test spec.'}
		    			]
	    			}
	    		]
	    	},
	    	{
	    		key: 'describe',
	    		value: 'Parent',
	    		children: [
	    			{key: 'context', value: 'can have many'},
	    			{key: 'context', value: 'children'}
	    		]
	    	}
    	];
    	
    	for(var i = 0 ; i < blueprint.length ; i++) {
    		var frame 	= parser.parse(blueprint[i]);
    		
    		expect(frame.children[0]).to.deep.equal(expected[i]);
    	}
    });
});