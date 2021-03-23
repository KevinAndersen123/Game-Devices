function main()
{
    var ws = new WebSocket("ws://149.153.106.133:8000/wstest?Id=" + createUUID());
    var connected;
    //called when the websocket is opened
    ws.onopen = function() {
       ws.send("Hello, world");
       connected = true;
    };
    //called when the client receives a message
    ws.onmessage = function (evt) {
       alert(evt.data);
    };
    document.addEventListener("keydown", () => this.keyDownHandler(event,ws,connected));
}
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }
function message(ws)
{
    var msg = window.prompt("Enter your message");
    ws.send(msg);
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

 

