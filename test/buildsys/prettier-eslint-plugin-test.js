const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/buildsys/prettier-eslint-plugin");
const cli = require("../../src/util/cli");
const packageJson = require("../../src/util/package-json");

describe("prettier-eslint-plugin.js", function() {

    beforeEach(() => {
    });
  
    afterEach(() => {
        sinon.restore();
    });

    it("test test when no quality gate", function(done) {
        // given
        sinon.stub(packageJson, 'parse').returns({});
        const cliStub = sinon.stub(cli, "execute");

        // when
        subject.prettiereslint(done);

        // then
        expect(cliStub.callCount).to.equal(0);

    });

    it("test test when quality gate", function(done) {
        // given
        sinon.stub(packageJson, 'parse').returns({settings:{formatAndFixCode:true}});
        const cliStub = sinon.stub(cli, "execute");

        // when
        subject.prettiereslint(done);

        // then
        expect(cliStub.callCount).to.equal(1);
        expect(cliStub.calledWith(`node_modules/.bin/./prettier-eslint "src/**/*.js" --write -l info`)).to.equal(true);

    });

});