function main()
{
    var ws = new WebSocket("ws://149.153.106.133:8080/wstest?Id="+createUUID());
    var connected;

    var message={}
    message.type = "test"
    message.data = "hello"
    var ctx = initCanvas();
    //called when the websocket is opened
    ws.onopen = function() 
    {
        var sendingObj =  JSON.stringify(message);
        ws.send(sendingObj);
        connected = true;
    };
    //called when the client receives a message
    ws.onmessage = function (evt) 
    {
        var incomingObj = JSON.parse(evt.data);
        if(incomingObj.type === "updateState")
        {
            updateLocalState(incomingObj);
        }
        else
        {
            alert(incomingObj.data);
        }
    };
    document.addEventListener("keydown", () => this.keyDownHandler(event,ws,connected));
    document.addEventListener("click", () => this.updateState(event, ws, connected) );
}
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }
function message(ws)
{
    var msg = {};
    msg.type = "text";
    msg.data = window.prompt("Enter your message");
    var messageObj = JSON.stringify(msg);
    ws.send(messageObj);
}
function updateState(event, ws,connected)
{
    if(connected === false)
    {
        return;
    }
    var mousePos = {}; 
    mousePos.type = "updateState";
    mousePos.x = event.x;
    mousePos.y = event.y;
    mousePos.data = mousePos.x,mousePos.y;

    var msPos = JSON.stringify(mousePos);
    ws.send(msPos);
}
function updateLocalState(incomingObj)
{
    console.log("Pos X: " + incomingObj.x + " " + "Pos Y: " + incomingObj.y);
}
function keyDownHandler(e,ws,connected)
{
    if(connected === false)
    {
        return;
    }

    if(e.keyCode === 32)
    {
        message(ws);
    }
}
/**
* Initialises the canvas - the drawing surface. The canvas
* is added to the document. When a HTML document is loaded into a
* browser, it becomes a document object. This document object is
* the root node of the HTML document and is considered the 'owner' of all other
* nodes such as forms, buttons, the canvas etc.
*/
function initCanvas()
{
    // Use the document object to create a new element canvas.
    var canvas = document.createElement("canvas");
     // Assign the canvas an id so we can reference it elsewhere.
     canvas.id = 'mycanvas';
     canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // We want this to be a 2D canvas.
    var ctx = canvas.getContext("2d");
    // Adds the canvas element to the document.
    document.body.appendChild(canvas);
    return ctx;
}
