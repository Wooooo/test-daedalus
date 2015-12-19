const
    parser      = require('./lib/parser'),
    builder     = require('./lib/builder');

exports.parse = parser.parse;
exports.build = builder.build;