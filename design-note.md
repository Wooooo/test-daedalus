# Design note

## Term
### blueprint
- Human-readable test scenario
- Use yaml file extention for syntax highlighting but syntax is different a lot
```yaml
DESCRIBE: I
	CONTEXT: when the weather is cloudy,
		IT: should feel blue..
		IT: should prepare for an umbrella.
		
	CONTEXT: when the weather is sunny,
		IT: should run everywhere like an insane dog!!
		IT: should go picnic with friends.
```
- Every line contains pair([key]: [value])
- Indent-sensitive like python, yaml
- If below line has one more indent, it is a child of current line
- If below line has same indent, it is a sibling of current line
- Following above rules, each node has children and value

### outline
- Javascript object to contain esTree(abstract syntax tree for ecmascript)
- Parsed by parser module


### maze
- Test specifications which is consist of ttd framework syntax('describe', 'it', etc)
- Created by builder with 'outline'
```javascript
describe('I', function() {
    context('when the weather is cloudy', function() {
        it('should feel blue..', function() {
            // your codes here
        });
        
        it('should prepare for an umbrella.', function() {
            // your codes here
    });
    
    context('when the weather is sunny,', function() {
        ...
    });
});

```