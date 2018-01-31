"use strict";

var myWorker, dateForMainThread, dateForWorker;
if (window.Worker) {
    myWorker = new Worker('javascripts/worker.js');

    /**
     * It will get callback when worker sends a message to main thread
     * @param {*MessageEvent} e message which sends by a worker 
     */
    myWorker.onmessage = function (e) {
        document.getElementById("dedicatedthreadarea").innerText = "End... Time : " + ( new Date().getTime() - dateForWorker.getTime()) + " ms";
    }
    /**
     * It handles the error
     * @param {*MessageEvent} e 
     */
    myWorker.onerror = function (e) {
        // console.log(e.data);
    }
    
}else alert("Worker does not work in your broswer!!!")

/**
 * It handles generate btn click event
 * @param {*string} type It tells whether generate number in main thread or in worker.
 */
function generate(type){
    if(type === "worker"){
        document.getElementById("dedicatedthreadarea").innerText = "Started. It won't block the UI!!. Try clicking the UI";
        var count = parseInt(document.getElementById("dedicatedthreadinput").value);
        dateForWorker = new Date();
        myWorker.postMessage(count);
        return;
    }

    var li = "";
    console.time("mainthread");
    var count = parseInt(document.getElementById("mainthreadinput").value);
    var h2 = document.getElementById("mainthreadarea");
    h2.innerText = "Start... It will block the UI!!. Try clicking the UI.";
    var randomNumber = [];
    setTimeout(function(){
        dateForMainThread = new Date();
        for (var index = 0; index < count; index++) {
            Math.random();
        }
        h2.innerText = "End... Time : " + (new Date().getTime() - dateForMainThread.getTime()) + " ms";
        console.timeEnd("mainthread");
    },0);
}


 