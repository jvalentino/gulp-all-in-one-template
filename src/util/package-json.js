"use strict";

const fs = require("fs");

function parse(file="package.json") {
    const text = fs.readFileSync(file);
    const json = JSON.parse(text);
    return json;
}

module.exports = {
    parse: parse
}