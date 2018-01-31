
"use strict";

console.log("Inside Worker!!")
var count = 1;
onmessage = function (e) {
    console.log(e.data);
    var count = e.data;
    for (var index = 0; index < count; index++) {
        Math.random();
    }
    postMessage(randomNumber);
}