"use strict";

const fs = require("fs");

function parse() {
    const text = fs.readFileSync('package.json');
    const json = JSON.parse(text);
    return json;
}

module.exports = {
    parse: parse
}