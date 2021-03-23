//Reviewed by Krystian Sarowski
/**
 * This is entry point for program
 */
var time1; //starting time
var position1; //starting pos

 function main()
 {
    this.ctx;
    this.initCanvas();
    this.initWorld();
    console.log(is_touch_device());
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
     this.ctx = canvas.getContext("2d");
     // Adds the canvas element to the document.
     document.body.appendChild(canvas);
 }
 /**
* prints out “Initialising game world"
*/
function initWorld()
{
    document.addEventListener("touchstart", () => this.onTouchStart(event));
    document.addEventListener("touchmove", () => this.onTouchMove(event),{passive:false});
    document.addEventListener("touchstart",function(e){e.preventDefault();},{passive:false})
    document.addEventListener("touchend", () => this.onTouchEnd(event));
    console.log("Initilising game world");
}
/**
 * gets the starting position of the touch
 * @param {Event} event input that happens in window
 */
function onTouchStart(event)
{
    time1 = new Date();
   var touches = event.touches;
   // Print out (x,y) co-ords of touch: touches[0].clientX contains 
   //  the x position.
   position1 = [event.touches[0].clientX,event.touches[0].clientY];
   this.ctx.beginPath();
   this.ctx.moveTo(touches[0].clientX,touches[0].clientY);	//the previous touch
}
/**
 * draws a line from start pos of touch to the last pos of touch
 * @param {Event} event input that happens in window
 */
function onTouchMove(event)
{
    var changeInTouched = event.changedTouches;
    
    var time2 = new Date();
    var swipeTime = (time2-time1)/1000;

    //draws line if less than a certain time
    if(swipeTime < 0.15)
    {
        this.ctx.lineTo(changeInTouched[0].clientX,changeInTouched[0].clientY);	//the current touch
        this.ctx.strokeStyle = "#fc03fc"
        this.ctx.stroke();
    }
   
}
/**
 * checks if a swipe is done or not
 * @param {Event} event 
 */
function onTouchEnd(event)
{
    var changeInTouched = event.changedTouches;
    var time2 = new Date();
    var swipeTime = (time2-time1)/1000;

    if(swipeTime < 0.2)
    {
        var endPosition = [changeInTouched[0].clientX, changeInTouched[0].clientY];

        var distance = Math.abs(Math.sqrt(((endPosition[0]-position1[0])*(endPosition[0]-position1[0])) + ((endPosition[1]-position1[1])*(endPosition[1]-position1[1]))));
        
        console.log("Swipe Detected! "+ "Distance: "+ distance + "time: " + swipeTime );
    }
}
