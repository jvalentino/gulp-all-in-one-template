const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/buildsys/test-plugin");
const cli = require("../../src/util/cli");
const packageJson = require("../../src/util/package-json");

let cliMock = null;

describe("test-plugin.js", function() {

    beforeEach(() => {
        cliMock = sinon.mock(cli);
    });
  
    afterEach(() => {
        cliMock.restore();
        sinon.restore();
    })
  
    it("test test when no quality gate", function(done) {
        // given
        cliMock.expects("execute").once().withArgs("node_modules/.bin/./c8 node_modules/.bin/./mocha --reporter spec ./test --recursive");
        sinon.stub(packageJson, 'parse').returns({});

        // when
        subject.test(done);

        // then
        cliMock.verify();
    });

    /* FIXME: Can't figure out why the second call always returns false
    it("test test when quality gate", function(done) {
        // given
        const cliStub = sinon.stub(cli, "execute");
        //cliMock.expects("execute").atLeast(1).withExactArgs("node_modules/.bin/./c8 node_modules/.bin/./mocha --reporter spec ./test --recursive");
        sinon.stub(packageJson, 'parse').returns({settings:{requireCodeCoverageAbove:55}});
        //cliMock.expects("execute").atLeast(1).withExactArgs("node_modules/.bin/./c8 check-coverage --lines 55");

        // when
        subject.test(done);

        // then
        console.log(cliStub.calledWith("node_modules/.bin/./c8 node_modules/.bin/./mocha --reporter spec ./test --recursive"));
        console.log(cliStub.calledWith(`node_modules/.bin/./c8 check-coverage --lines 55`));
        cliMock.verify();
    });
  */
    
  
  });