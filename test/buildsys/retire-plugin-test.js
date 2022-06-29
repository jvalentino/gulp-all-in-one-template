const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/buildsys/retire-plugin");
const cli = require("../../src/util/cli");
const packageJson = require("../../src/util/package-json");

describe("retire-plugin.js", function() {

    beforeEach(() => {
    });
  
    afterEach(() => {
        sinon.restore();
    });

    it("test retire when no quality gate", function(done) {
        // given
        sinon.stub(packageJson, 'parse').returns({});
        const cliStub = sinon.stub(cli, "execute");

        // when
        subject.retire(done);

        // then
        expect(cliStub.callCount).to.equal(1);
        expect(cliStub.calledWith(`node_modules/.bin/./retire --js src --outputformat json --outputpath build/retire.json --severity none`)).to.equal(true);

    });

    it("test retire when quality gate", function(done) {
        // given
        sinon.stub(packageJson, 'parse').returns({settings:{securityFailsOnSeverity:"high"}});
        const cliStub = sinon.stub(cli, "execute");

        // when
        subject.retire(done);

        // then
        expect(cliStub.callCount).to.equal(1);
        expect(cliStub.calledWith(`node_modules/.bin/./retire --js src --outputformat json --outputpath build/retire.json --severity high`)).to.equal(true);

    });

});