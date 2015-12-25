const escodegen = require('escodegen');


function build(outline, options) {
    options = (options || {format: {indent: {style: '\t'}}});
    return escodegen.generate(outline, options);
}

exports.build = build;