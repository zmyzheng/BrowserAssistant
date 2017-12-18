// ==UserScript==
// @name         Browser Assistant
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  keep an eye on every page!
// @author       Huafeng
// @match        http*://*/*
// @exclude    https://*.youtube.com/*
// @run-at       document-idle
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

BrowserAssistant = {
    config:{
        uid:'1',
        key:'0LpJv0suPPfD4wzSdl6gaFfx4XkLULeW'
    }
};


(function() {
    'use strict';
    setTimeout(MyGetText, 5000);
})();



function MyGetText() {
    var contents = $("p, h1, h2, h3, h4, h5, h6, a, span");
    var s = '';
    for (var i=0;i<contents.length;i++)
    {
        s+= contents[i].innerText;
        s+= ' ';
        if(s.length>5000)
            break;
    }
    s = s.replace(/[^a-zA-Z\s\d..!:;?]/g,"");
    var payload = {
        uid:BrowserAssistant.config.uid,
        key:BrowserAssistant.config.key,
        url:document.URL,
        time: Math.floor(Date.now()/1000),
        content: s,
    };
    httpPostAsync(console.log, payload);
}




function httpPostAsync(callback, payload)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("POST", 'https://huafeng.me:12345/upload', true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(JSON.stringify(payload));
}


function discard(e) {}