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