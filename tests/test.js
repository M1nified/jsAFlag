"use strict";

// import * as af from 'AFlag.js';

let ALink = require("../src/ALink.js");
let AFlags = require("../src/AFlags.js");
console.log(ALink)
let fs = require('fs');

let www = fs.readFileSync('web2.html',{
    encoding:'utf8'
});

let af = new AFlags(www);

af.setFlags({
    flaga:'wartosc'
});