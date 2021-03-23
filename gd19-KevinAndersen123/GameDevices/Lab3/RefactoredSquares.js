//Kevin Andersen
//Time 1hour 28mins
/**
 * main is the entry point for Javascript programs.
 *
 */

function main()
{
    var ctx =  initCanvas();
	createSquare();
	var square = createSquare();
	document.addEventListener("keydown", () => this.keyDownHandler(square, event,ctx));
	square.draw(ctx);
}
 
/**
 * Initialises the canvas - the drawing surface. The canvas
 * is added to the document. When a HTML document is loaded into a
 * browser, it becomes a document object. This document object is
 * the root node of the HTML document and is considered the 'owner' of all other
 * nodes such as forms, buttons, the canvas etc.
 * @return {CanvasRenderingContext2D} ctx, the canvas on the screen
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
/**
 * Helper function that clamps value between min and max and returns value.
 * Example: clamp(10, 1, 3) will return 3
 * @param {Integer} value integer value to be clamped.
 * @param {Integer} min lower range value.
 * @param {Integer} max upper range value.
* @return {Integer} min if value is less than min, max if max is less than value, otherwise value.
 */
function clamp(value, min, max)
{
	if(max<min) {
		var temp = min;
		min = max;
		max = temp;
	}
	return Math.max(min, Math.min(value, max));
}
/**
 * Checks the keyboard input of the user
 * 
 * @param {Square} square object
 * @param {Event} e event
 * @param {ctx} ctx 2d canvas
 */
function keyDownHandler (square,e,ctx)
{
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }

	if(e.keyCode === 37) // left
	{
		square.x-=15;
	}
	if(e.keyCode === 38) //up
	{
		square.y-=15;
	}
	if(e.keyCode === 39) //right
	{
		square.x+=15;
	}
	if(e.keyCode === 40) //down
	{
		square.y+=15;
	}
	
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	square.draw(ctx);

}

/**
 * Helper function that returns a string of the form 'rgb(r,g,b)' where
 * r,g and b are numeric values.
 * @param {Number} r assumed numeric value for red.
 * @param {Number} g assumed numeric value for green.
 * @param {Number} b assumed numeric value for blue.
* @returns {String} a string of the form 'rgb(r,g,b)' where r,g and b are integers clamped between 0 and 255.
 */
function rgb(r, g, b)
{
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}

/**
 *creates an object square
 *@return {Square} returns the new square object
 */
function createSquare()
{
	
		var r = Math.floor((Math.random() * 255)); //random number between 0 to 255 to get rbg values
		var g = Math.floor((Math.random() * 255));
		var b = Math.floor((Math.random() * 255));

		var colour = rgb(r,g,b);
	
        // args are x,y,width,height
        var x = Math.floor((Math.random() * window.innerWidth) + 1);
        var y = Math.floor((Math.random() * window.innerHeight) + 1);
	
		var square = new Square(x,y,50,50,colour); //creates new square
		return square;
}