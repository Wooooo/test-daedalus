const 
    r           = require('remove-tabs'),
    Analyzer    = require('../lib/analyzer'),
    expect      = require('chai').expect;

describe('Analyzer', function() {
    it('should detect diffs between outlines by maze and blueprint.', function(){
        var mazes =[
            r`
            describe('Analyzer', function() {
                it('should detect diffs', function() {
                });
                it('by maze and blueprints', function() {
                });
            });`
        ];
        
        var blueprints = [
            r`
            'DESCRIBE: Analyzer
                IT: should detect diffs
                IT: by maze and blueprints`
        ];
        
        var expectedStatus = [
            {message: 'OK'}
        ];
        
        for(var i = 0 ; i < mazes.length ; i++) {
            expect(Analyzer.analyze(mazes[i], blueprints[i])).to.have.property('status')
                .that.to.deep.equal(expectedStatus[i]);
        }
    });
});