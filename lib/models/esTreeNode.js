function EsTreeNode(type) {
    if( type === 'Program' ) {
        return {
			type: 'Program',
			body: [],
			sourceType: 'script'
		};
    }
    
    else if( type === 'ExpressionStatement' ) {
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
		};
    }
}

module.exports = EsTreeNode;