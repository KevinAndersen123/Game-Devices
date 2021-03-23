//Kevin Andersen

/**
 * square constructer
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height 
 * @param {String} colour 
 */
function Square(x, y, width, height, colour)
{
    //sets values
    this.x = x;
    this.y =y;
    this.width = width;
    this.height = height;
    this.colour = colour;
}

/**
 * Draws square on the browser, takes ctx as a paramater
 * @param {CanvasRenderingContext2D} ctx canvas on the page
 */
Square.prototype.draw = function(ctx)
{
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}