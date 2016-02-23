'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.altversion = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  all: function(test) {
    test.expect(4);

    var actual = grunt.file.read('test/build/constants.js');
    test.equal(actual, '//default', 'should run for the default setting');

    actual = grunt.file.read('test/build/alt/constants.js');
    test.equal(actual, '//alternative', 'should run for the version');

    var actual = grunt.file.read('test/build/styles.css');
    test.equal(actual, '/* default */', 'should run for the default setting');

    actual = grunt.file.read('test/build/alt/styles.css');
    test.equal(actual, '/* alternative */', 'should run for the version');

    test.done();
  }
};
