# The Gulp All-in-One Template

JavaScript development can specifically get complicated when it comes to integrating the common development tools needed for everything from unit testing to static code anlaysis. Rather than copying and pasting hundreds (and possibly) thousands of line of JavaScript code, I have adopted the approach of bundling CI/CD functionality into individual plugins. Specifcally the same as what you would find with Maven and Gradle in the Java Space.

Step one though is to abstract the CI/CD capabilities from the undelrying codebase, which is what this project demonstrates. Ideally each plugin and the buid itself should be centralized into their own modules. However, this is also not always an immediate possiblility depending on the development environment situation. As such, I use this is my generalized tempalte for when I do not yet have a standard way of breaking the build process into different parts.

It specifically contains gulp-based implementation for managing SCA, SAST, code formatting, and test automation as code independent of the primary codebase. It allows the immediate usage and enforcement of these standard tools on a specific project, where we can then start pulling those tools out and abstracting them into plugins/libraries one at a time, so that they can be used on other efforts within the same development environment/company.

# Usage

Download of the internet:

```bash
npm install
```

Get a listing of the available build tasks:

```bash
% gulp --tasks
[10:41:18] Tasks for ~/workspaces/personal/gulp-all-in-one-template/gulpfile.js
[10:41:18] ├── hello
[10:41:18] ├── test
[10:41:18] ├── prettiereslint
[10:41:18] ├── sca
[10:41:18] ├── retire
[10:41:18] ├── security
[10:41:18] └─┬ check
[10:41:18]   └─┬ <series>
[10:41:18]     ├── prettiereslint
[10:41:18]     ├── retire
[10:41:18]     └── test

```

Consider that this list is continually changing as I keep adding new tools.

## hello

This is an example of how to build (and test) a gulp plugin.

```bash
% gulp hello
[10:43:07] Using gulpfile ~/workspaces/personal/gulp-all-in-one-template/gulpfile.js
[10:43:07] Starting 'hello'...
Hello World! 1 + 2 = 3
[10:43:07] Finished 'hello' after 682 μs
```

It justs add 1 and 2 together, and displays the output at the command-line.

Of note is how we define an intended standalone plugin:

```javascript
function hello(done) {
  const result = addTheseNumbers(1, 2);
  console.log(`Hello World! 1 + 2 = ${result}`);
  done();
}

function addTheseNumbers(a, b) {
  return a + b;
}

module.exports = {
  hello: hello,
  addTheseNumbers: addTheseNumbers,
};
```

...how we then apply that plugin to the build environment:

**gulpfile.js**

```javascript
const core = require("./src/core/hello-plugin");

module.exports = {
	hello: core.hello,
}
```

...and then more specifically how we use test it:

```javascript
const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/core/hello-plugin");

describe("hello-plugin.js", function() {
  
  beforeEach(() => {
      consoleStub = sinon.stub(console, 'log');  
  });

  afterEach(() => {
      consoleStub.restore();
  })

  it("test addTheseNUmbers", function() {
    // given
    const a = 4;
    const b = 5;

    // when
    const result = subject.addTheseNumbers(a, b);

    // then
    expect(result).to.equal(9);
  });

  it("test hello", function() {
    // given
    const done = function() {};

    // when
    subject.hello(done);

    // then
    assert(consoleStub.calledWith('Hello World! 1 + 2 = 3'), 'console.log did not print Hello World! 1 + 2 = 3');

  });

});
```

## test

Execute unit testing using a cobination of mocha for execution and c8 for code coverage enforcement. It optionally allows the definition of a coverage based quality gate as defined in package.json, for example:

```json
{
 "settings": {
    "requireCodeCoverageAbove": 85
  }
}
```

Test execution is then via the following:

```bash
% gulp test
[10:51:10] Using gulpfile ~/workspaces/personal/gulp-all-in-one-template/gulpfile.js
[10:51:10] Starting 'test'...
> node_modules/.bin/./c8 node_modules/.bin/./mocha --reporter spec ./test --recursive
  11 passing (42ms)

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   94.95 |    88.23 |     100 |   94.95 |                   
 buildsys                   |   96.58 |       90 |     100 |   96.58 |                   
  common-build.js           |     100 |      100 |     100 |     100 |                   
  prettier-eslint-plugin.js |     100 |      100 |     100 |     100 |                   
  retire-plugin.js          |     100 |      100 |     100 |     100 |                   
  test-plugin.js            |   85.71 |    66.66 |     100 |   85.71 | 20-23             
 core                       |     100 |      100 |     100 |     100 |                   
  hello-plugin.js           |     100 |      100 |     100 |     100 |                   
 util                       |   91.76 |    81.81 |     100 |   91.76 |                   
  cli.js                    |   90.27 |    77.77 |     100 |   90.27 | 20-21,49-51,58,65 
  package-json.js           |     100 |      100 |     100 |     100 |                   
----------------------------|---------|----------|---------|---------|-------------------
exit code: 0
> node_modules/.bin/./c8 check-coverage --lines 85
exit code: 0
[10:51:11] Finished 'test' after 1.13 s
```

## prettiereslint

Handles formatting the code using prettier with regard to eslint settings, but only if package.json specifies to do so:

```json
{
 "settings": {
    "formatAndFixCode": true
  }
}
```

It is run using the following:

```bash
% gulp prettiereslint
[12:59:28] Using gulpfile ~/workspaces/personal/gulp-all-in-one-template/gulpfile.js
[12:59:28] Starting 'prettiereslint'...
> node_modules/.bin/./prettier-eslint "src/**/*.js" --write -l info
7 files were unchanged
exit code: 0
[12:59:29] Finished 'prettiereslint' after 755 ms
```



## security

The purpose of this task is to be a catch-all for all seccurity and SAST related tools, but for the moment only includes retire.

Additionally a quality gate can be set to tell the build to fail on finding issues of a certain severity level or higher using package.json, for example:

```json
{
  "settings": {
    "securityFailsOnSeverity": "low"
  }
}
```

The tooling is then run using the following:

```bash
% gulp security
[13:09:37] Using gulpfile ~/workspaces/personal/gulp-all-in-one-template/gulpfile.js
[13:09:37] Starting 'security'...
> node_modules/.bin/./retire --js src --outputformat json --outputpath build/retire.json --severity low
exit code: 0
[13:09:45] Finished 'security' after 7.99 s
```

# The Common Build

The concept of a common build is collection of plugins, all eventually hosted at a central location, in which one just refers to as a library. This is done to bring down all the associate build tooling assuming convention over configuring, without having to do yet more copy and pasting.

The basic concept is you define a single file to represent the entirety of a build. This specifically is some default configuration involving a series of pligins:

```javascript

const gulp = require("gulp");
const testPlugin = require("./test-plugin");
const prettierEslintPlugin = require("./prettier-eslint-plugin");
const retirePlugin = require("./retire-plugin");

/**
 * Represents a collection of gulp tasks that will make up the common build. When this method
 * is called it injects these gulp tasks and series into the current environment.
 *
 * @param {module.exports} exports
 */
function apply(exports) {
  exports.test = testPlugin.test;
  exports.prettiereslint = prettierEslintPlugin.prettiereslint;
  exports.sca = prettierEslintPlugin.prettiereslint;
  exports.retire = retirePlugin.retire;
  exports.security = retirePlugin.retire;

  exports.check = gulp.series(
    prettierEslintPlugin.prettiereslint,
    retirePlugin.retire,
    testPlugin.test
  );
}

module.exports = {
  apply: apply,
};
```

The concept is then that any other project can use this capability simply by including it in its gulpfile.js. Noting that if this an NPM module it would then need to be include in package.json under devDependencies:

gulpfile.js

```javascript
const commonBuild = require("./src/buildsys/common-build");
commonBuild.apply(module.exports);
```

