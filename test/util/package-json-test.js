const expect    = require("chai").expect;
const sinon = require('sinon');
const referee = require("@sinonjs/referee");
const assert = referee.assert;

const subject = require("../../src/util/package-json");

describe("package-json.js", function() {
  
    beforeEach(() => {
        
    });
  
    afterEach(() => {
        
    })

    it("test parse", function() {
        const json = subject.parse(__dirname + "/package-example.json");    
    
        expect( json.settings.requireCodeCoverageAbove).to.equal(100);
    });
    

});