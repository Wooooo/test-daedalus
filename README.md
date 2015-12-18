# Daedalus
[![Build Status](https://travis-ci.org/Wooooo/test-daedalus.svg?branch=master)](https://travis-ci.org/Wooooo/test-daedalus)
[![Coverage Status](https://coveralls.io/repos/Wooooo/test-daedalus/badge.svg?branch=master&service=github)](https://coveralls.io/github/Wooooo/test-daedalus?branch=master)
[![Npm Version](https://img.shields.io/npm/v/test-daedalus.svg)](https://npmjs.org/wooooo/test-daedalus)
[![Npm License](https://img.shields.io/npm/l/test-daedalus.svg)](https://npmjs.org/wooooo/test-daedalus)

Test builder for synchorizing scenarios and test specs.

<a name="motivation"></a>
## Motivation
There are awesome testing frameworks for tdd(test-driven-development) like 
[mocha](https://mochajs.org), [jasmine](http://jasmine.github.io). <br/>
I really like them, but, sadly, it is difficult to plan tests by these tools. <br/>
Test specification is not human-readable! <br/>
The bigger test spec becomes, the harder to maintain and understand it. <br/>

I looked around web to find a soution, then I met an amazing testing framework [cucumber](https://github.com/cucumber/cucumber-js). <br/>
Cucumber provides [gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) syntax and converts gherkin file to js test file. <br/>
Yes, that's exactly what I want!! <br/>
However, to be honest, I prefer mocha, jamine syntax('describe', 'it', 'context') to cucumber('when', 'given', 'then');

So I am supposed to make a module which converts human-readable scenarios to js specs having mocha, jasmine syntax.