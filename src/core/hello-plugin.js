"use strict";

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
