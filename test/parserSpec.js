const
	parser  = require('../lib/parser'),
	expect		= require('chai').expect;
	

describe('BluePrintParser', function(){
	it('should throw an error if there is a line which has indents gap more than 2.', function(){
	    var blueprint = 'DESCRIBE: Indents\n'+
					    '\t\tIT: should not have gap more than 2.';
		
		expect(parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid indent.');
	});
	
	
	it('should throw an error if there is a line which has no key.', function(){
		var blueprint =	'DESCRIBE: Lines\n'+
						'should have a key not like me.'
						
		expect(parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid line.');
	});
    
    
    it('should throw an error if there is a line which has empty key.', function() {
    	var blueprint =	'DESCRIBE: Lines\n'+
						':should not have a empty key not like me.';
						
		expect(parser.parse.bind(null, blueprint)).to.throw(Error, 'Invalid line.');
    });
    
    
    it('should ignore a comment which has leading #.', function(){
    	var blueprint = 'DESCRIBE: Comment\n'+
    					'# should ignore!';
    	
    	var outline = parser.parse(blueprint);
    	
    	expect(outline.children[0].children).to.be.undefined;
    });
    
    
    it('should return a correct object if a line which has empty value.', function(){
    	var blueprint = 
    		'DESCRIBE: Line\n'+
    		'\tIT: should be able to have empty value.\n'+
    		'\tIT: ';
    		
    	var outline = parser.parse(blueprint);
    	
    	expect(outline.children[0].children[1].value).to.equal('');
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
    		var outline 	= parser.parse(blueprint[i]);
    		
    		expect(outline.children[0]).to.deep.equal(expected[i]);
    	}
    });
});