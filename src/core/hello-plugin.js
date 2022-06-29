"use strict";


function hello(done) {
	console.log("Hello World");
	done();
}

module.exports = {
	hello: hello
}